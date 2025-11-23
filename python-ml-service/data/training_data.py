"""
Synthetic Canadian Car Training Data Generator
Generates realistic car listings for ML model training
"""

import pandas as pd
import numpy as np

# Canadian provinces
PROVINCES = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'NT', 'YT', 'NU']

# Car data
MAKES = {
    'Toyota': {'base_price': 35000, 'depreciation': 0.12, 'reliability': 0.95},
    'Honda': {'base_price': 32000, 'depreciation': 0.13, 'reliability': 0.93},
    'Mazda': {'base_price': 30000, 'depreciation': 0.14, 'reliability': 0.90},
    'Hyundai': {'base_price': 28000, 'depreciation': 0.15, 'reliability': 0.88},
    'Kia': {'base_price': 27000, 'depreciation': 0.15, 'reliability': 0.87},
    'Ford': {'base_price': 38000, 'depreciation': 0.16, 'reliability': 0.85},
    'Chevrolet': {'base_price': 36000, 'depreciation': 0.17, 'reliability': 0.84},
    'Subaru': {'base_price': 33000, 'depreciation': 0.13, 'reliability': 0.92},
    'Nissan': {'base_price': 31000, 'depreciation': 0.15, 'reliability': 0.86},
    'Volkswagen': {'base_price': 34000, 'depreciation': 0.16, 'reliability': 0.87},
    'BMW': {'base_price': 55000, 'depreciation': 0.20, 'reliability': 0.80},
    'Mercedes': {'base_price': 60000, 'depreciation': 0.22, 'reliability': 0.79},
    'Audi': {'base_price': 52000, 'depreciation': 0.21, 'reliability': 0.81},
    'Lexus': {'base_price': 50000, 'depreciation': 0.14, 'reliability': 0.96},
    'Tesla': {'base_price': 65000, 'depreciation': 0.18, 'reliability': 0.83},
}

MODELS = {
    'Toyota': ['RAV4', 'Camry', 'Corolla', 'Highlander', 'Tacoma'],
    'Honda': ['CR-V', 'Civic', 'Accord', 'Pilot', 'HR-V'],
    'Mazda': ['CX-5', 'CX-30', 'Mazda3', 'CX-9', 'MX-5'],
    'Hyundai': ['Tucson', 'Elantra', 'Santa Fe', 'Kona', 'Palisade'],
    'Kia': ['Sportage', 'Forte', 'Sorento', 'Seltos', 'Telluride'],
    'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge'],
    'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Blazer'],
    'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Ascent'],
    'Nissan': ['Rogue', 'Sentra', 'Altima', 'Pathfinder', 'Murano'],
    'Volkswagen': ['Tiguan', 'Jetta', 'Atlas', 'Golf', 'Passat'],
    'BMW': ['X3', 'X5', '3 Series', '5 Series', 'X1'],
    'Mercedes': ['GLC', 'C-Class', 'E-Class', 'GLE', 'GLA'],
    'Audi': ['Q5', 'A4', 'Q3', 'Q7', 'A6'],
    'Lexus': ['RX', 'ES', 'NX', 'IS', 'GX'],
    'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
}

TRIMS = ['Base', 'LE', 'EX', 'Limited', 'Sport', 'Premium', 'Platinum']

# Province price multipliers (some provinces have higher/lower prices)
PROVINCE_MULTIPLIERS = {
    'ON': 1.08, 'QC': 0.95, 'BC': 1.10, 'AB': 1.03,
    'MB': 0.98, 'SK': 0.97, 'NS': 1.00, 'NB': 0.96,
    'NL': 1.02, 'PE': 0.98, 'NT': 1.15, 'YT': 1.12, 'NU': 1.18
}


def generate_training_data(n_samples=2000):
    """Generate synthetic car listing data for training"""
    np.random.seed(42)
    
    data = []
    current_year = 2024
    
    for _ in range(n_samples):
        # Random car selection
        make = np.random.choice(list(MAKES.keys()))
        model = np.random.choice(MODELS[make])
        year = np.random.randint(2015, 2025)
        age = current_year - year
        
        # Mileage (realistic Canadian driving: 15,000-20,000 km/year)
        avg_km_per_year = np.random.uniform(12000, 22000)
        mileage = int(age * avg_km_per_year * np.random.uniform(0.8, 1.2))
        mileage = max(0, mileage)  # New cars have 0 km
        
        # Trim
        trim = np.random.choice(TRIMS)
        trim_multiplier = 1.0 + (TRIMS.index(trim) * 0.05)  # Higher trims cost more
        
        # Province
        province = np.random.choice(PROVINCES)
        province_mult = PROVINCE_MULTIPLIERS[province]
        
        # Calculate base price
        make_data = MAKES[make]
        base_price = make_data['base_price']
        
        # Apply depreciation (compound yearly)
        depreciation_rate = make_data['depreciation']
        depreciated_value = base_price * (1 - depreciation_rate) ** age
        
        # Apply mileage penalty (high mileage reduces value)
        expected_mileage = age * 18000
        if mileage > expected_mileage:
            excess_km = mileage - expected_mileage
            mileage_penalty = 1 - (excess_km / 200000) * 0.15  # Max 15% penalty
            mileage_penalty = max(0.85, mileage_penalty)
        else:
            mileage_penalty = 1.0
        
        # Calculate final price
        price = depreciated_value * trim_multiplier * province_mult * mileage_penalty
        
        # Add some random variance (±8%)
        price = price * np.random.uniform(0.92, 1.08)
        price = int(price / 100) * 100  # Round to nearest $100
        
        # Ensure minimum price
        price = max(5000, price)
        
        data.append({
            'make': make,
            'model': model,
            'year': year,
            'mileage': mileage,
            'trim': trim,
            'province': province,
            'price': price,
            'age': age,
            'reliability_score': make_data['reliability'],
        })
    
    return pd.DataFrame(data)


def get_training_data():
    """Get training data (generate if not exists)"""
    return generate_training_data(2000)


if __name__ == '__main__':
    # Test data generation
    df = generate_training_data(100)
    print(df.head(10))
    print(f"\nDataset shape: {df.shape}")
    print(f"\nPrice statistics:\n{df['price'].describe()}")
