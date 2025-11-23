"""
Car Depreciation Prediction Model
Predicts 5-year value retention and depreciation curve
"""

import numpy as np
from typing import Dict, Any, List


# Brand depreciation rates (annual %)
BRAND_DEPRECIATION = {
    'Toyota': 0.12,
    'Honda': 0.13,
    'Lexus': 0.14,
    'Mazda': 0.14,
    'Subaru': 0.13,
    'Hyundai': 0.15,
    'Kia': 0.15,
    'Nissan': 0.15,
    'Ford': 0.16,
    'Chevrolet': 0.17,
    'Volkswagen': 0.16,
    'BMW': 0.20,
    'Mercedes': 0.22,
    'Audi': 0.21,
    'Tesla': 0.18,
}

# Default rate for unknown brands
DEFAULT_DEPRECIATION = 0.16


class DepreciationModel:
    def __init__(self):
        self.brand_rates = BRAND_DEPRECIATION
    
    def get_depreciation_rate(self, make: str) -> float:
        """Get brand-specific depreciation rate"""
        return self.brand_rates.get(make, DEFAULT_DEPRECIATION)
    
    def calculate_depreciation_curve(
        self,
        purchase_price: int,
        make: str,
        years: int = 5
    ) -> List[int]:
        """
        Calculate year-by-year depreciation
        Uses compound depreciation model with slight curve adjustment
        """
        rate = self.get_depreciation_rate(make)
        
        values = [purchase_price]
        current_value = purchase_price
        
        for year in range(1, years + 1):
            # Depreciation slows down slightly over time
            # Years 1-2: Full rate
            # Years 3-4: 0.9x rate
            # Years 5+: 0.8x rate
            if year <= 2:
                adjusted_rate = rate
            elif year <= 4:
                adjusted_rate = rate * 0.9
            else:
                adjusted_rate = rate * 0.8
            
            current_value = current_value * (1 - adjusted_rate)
            values.append(int(current_value))
        
        return values
    
    def predict(self, car_data: Dict[str, Any]) -> Dict[str, Any]:
        """Predict depreciation for a car"""
        purchase_price = car_data.get('purchasePrice', car_data.get('price', 0))
        make = car_data['make']
        current_year = car_data.get('year', 2024)
        current_mileage = car_data.get('mileage', 0)
        
        # Calculate 5-year curve
        yearly_values = self.calculate_depreciation_curve(purchase_price, make, 5)
        
        # Get depreciation rate
        annual_rate = self.get_depreciation_rate(make)
        
        # Calculate totals
        resale_value_5_year = yearly_values[-1]
        total_depreciation = purchase_price - resale_value_5_year
        percent_retained = (resale_value_5_year / purchase_price) * 100
        
        # Generate advice
        if percent_retained >= 70:
            retention_rating = "Excellent"
            advice = f"🌟 {make} holds value exceptionally well! Best time to sell is after 4-5 years."
        elif percent_retained >= 60:
            retention_rating = "Very Good"
            advice = f"✅ {make} has good resale value. Consider selling around year 5 before depreciation accelerates."
        elif percent_retained >= 50:
            retention_rating = "Good"
            advice = f"📊 {make} has average depreciation. Optimal selling window is years 4-6."
        elif percent_retained >= 40:
            retention_rating = "Fair"
            advice = f"⚠️ {make} depreciates faster than average. Consider longer ownership to maximize value."
        else:
            retention_rating = "Below Average"
            advice = f"❌ {make} has high depreciation. Buy used or plan to keep long-term."
        
        # Calculate per-year breakdown
        year_breakdown = []
        for i, value in enumerate(yearly_values):
            year_breakdown.append({
                'year': current_year + i,
                'value': value,
                'age': i,
                'depreciationFromNew': purchase_price - value,
                'percentRetained': round((value / purchase_price) * 100, 1)
            })
        
        return {
            'yearlyValues': yearly_values,
            'annualDepreciationRate': round(annual_rate * 100, 1),
            'resaleValue5Year': resale_value_5_year,
            'totalDepreciation': total_depreciation,
            'percentRetained': round(percent_retained, 1),
            'retentionRating': retention_rating,
            'advice': advice,
            'yearBreakdown': year_breakdown,
            'bestSellingWindow': '4-5 years' if percent_retained >= 60 else '5-6 years'
        }


# Global model instance
depreciation_model = DepreciationModel()


def get_depreciation(car_data: Dict[str, Any]) -> Dict[str, Any]:
    """Get depreciation prediction"""
    return depreciation_model.predict(car_data)
