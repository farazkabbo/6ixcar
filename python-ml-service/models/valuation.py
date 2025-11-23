"""
Car Valuation ML Model
Predicts fair market price and calculates deal scores
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from typing import Dict, Any
import pickle
import os


class CarValuationModel:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            random_state=42,
            n_jobs=-1
        )
        self.make_encoder = LabelEncoder()
        self.model_encoder = LabelEncoder()
        self.trim_encoder = LabelEncoder()
        self.province_encoder = LabelEncoder()
        self.is_trained = False
    
    def prepare_features(self, df: pd.DataFrame, fit=False) -> pd.DataFrame:
        """Prepare features for model"""
        df = df.copy()
        
        # Encode categorical variables
        if fit:
            df['make_encoded'] = self.make_encoder.fit_transform(df['make'])
            df['model_encoded'] = self.model_encoder.fit_transform(df['model'])
            df['trim_encoded'] = self.trim_encoder.fit_transform(df['trim'])
            df['province_encoded'] = self.province_encoder.fit_transform(df['province'])
        else:
            # Handle unseen categories by using most common
            df['make_encoded'] = df['make'].apply(
                lambda x: self._safe_encode(x, self.make_encoder)
            )
            df['model_encoded'] = df['model'].apply(
                lambda x: self._safe_encode(x, self.model_encoder)
            )
            df['trim_encoded'] = df['trim'].apply(
                lambda x: self._safe_encode(x, self.trim_encoder)
            )
            df['province_encoded'] = df['province'].apply(
                lambda x: self._safe_encode(x, self.province_encoder)
            )
        
        # Create age feature
        df['age'] = 2024 - df['year']
        
        # Create mileage per year feature
        df['mileage_per_year'] = df['mileage'] / (df['age'] + 1)
        
        return df
    
    def _safe_encode(self, value, encoder):
        """Safely encode value, return 0 if unseen"""
        try:
            return encoder.transform([value])[0]
        except:
            return 0  # Default encoding for unseen categories
    
    def train(self, training_data: pd.DataFrame):
        """Train the model"""
        df = self.prepare_features(training_data, fit=True)
        
        # Select features
        features = [
            'year', 'mileage', 'age', 'mileage_per_year',
            'make_encoded', 'model_encoded', 'trim_encoded', 'province_encoded'
        ]
        
        X = df[features]
        y = df['price']
        
        # Train model
        self.model.fit(X, y)
        self.is_trained = True
        
        # Calculate training accuracy
        predictions = self.model.predict(X)
        mae = np.mean(np.abs(predictions - y))
        
        print(f"✅ Model trained successfully!")
        print(f"📊 Mean Absolute Error: ${mae:,.0f}")
        print(f"📈 R² Score: {self.model.score(X, y):.3f}")
    
    def predict(self, car_data: Dict[str, Any]) -> Dict[str, Any]:
        """Predict fair price and calculate deal score"""
        if not self.is_trained:
            raise ValueError("Model not trained yet!")
        
        # Convert to DataFrame
        df = pd.DataFrame([car_data])
        df = self.prepare_features(df, fit=False)
        
        # Prepare features
        features = [
            'year', 'mileage', 'age', 'mileage_per_year',
            'make_encoded', 'model_encoded', 'trim_encoded', 'province_encoded'
        ]
        
        X = df[features]
        
        # Predict
        fair_price = int(self.model.predict(X)[0])
        
        # Calculate confidence interval (using tree predictions)
        tree_predictions = [tree.predict(X)[0] for tree in self.model.estimators_]
        std_dev = np.std(tree_predictions)
        confidence = int(std_dev * 1.5)  # ~90% confidence
        
        # Calculate deal score if listing price provided
        listing_price = car_data.get('listing_price', fair_price)
        
        # Deal score: 0-100 scale
        # Perfect score (100) = 15% below fair price
        # Bad score (0) = 20% above fair price
        price_diff_percent = ((fair_price - listing_price) / fair_price) * 100
        
        if price_diff_percent >= 15:
            deal_score = 100
        elif price_diff_percent <= -20:
            deal_score = 0
        else:
            # Linear scale between -20% and +15%
            deal_score = int(((price_diff_percent + 20) / 35) * 100)
        
        deal_score = max(0, min(100, deal_score))
        
        # Determine position
        if price_diff_percent > 10:
            position = f"{abs(int(price_diff_percent))}% below market"
            advice = "🎉 Excellent deal! This is well below market value."
        elif price_diff_percent > 5:
            position = f"{abs(int(price_diff_percent))}% below market"
            advice = "✅ Good deal! Price is below fair market value."
        elif price_diff_percent > -5:
            position = "at market value"
            advice = "📊 Fair price. Aligned with market average."
        elif price_diff_percent > -10:
            position = f"{abs(int(price_diff_percent))}% above market"
            advice = "⚠️ Slightly overpriced. Consider negotiating."
        else:
            position = f"{abs(int(price_diff_percent))}% above market"
            advice = "❌ Overpriced. Not recommended at this price."
        
        return {
            'fairPrice': fair_price,
            'listingPrice': listing_price,
            'dealScore': deal_score,
            'pricePosition': position,
            'confidence': f"±${confidence:,}",
            'priceDifference': int(fair_price - listing_price),
            'percentDifference': round(price_diff_percent, 1),
            'advice': advice,
            'modelConfidence': 'high' if std_dev < 2000 else 'medium' if std_dev < 4000 else 'low'
        }


# Global model instance
valuation_model = CarValuationModel()


def initialize_model():
    """Initialize and train the model"""
    from data.training_data import get_training_data
    
    print("🚀 Initializing Car Valuation Model...")
    training_data = get_training_data()
    valuation_model.train(training_data)
    print("✅ Model ready for predictions!")


def get_valuation(car_data: Dict[str, Any]) -> Dict[str, Any]:
    """Get car valuation"""
    if not valuation_model.is_trained:
        initialize_model()
    
    return valuation_model.predict(car_data)
