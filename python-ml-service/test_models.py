"""
Quick test script for ML models
Run this to verify models are working correctly
"""

import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.valuation import get_valuation, initialize_model
from models.depreciation import get_depreciation


def test_valuation():
    """Test car valuation model"""
    print("\n" + "="*60)
    print("🧪 Testing Valuation Model")
    print("="*60)
    
    test_cases = [
        {
            'make': 'Honda',
            'model': 'CR-V',
            'year': 2022,
            'mileage': 35000,
            'trim': 'EX',
            'province': 'ON',
            'listing_price': 28500
        },
        {
            'make': 'Toyota',
            'model': 'RAV4',
            'year': 2021,
            'mileage': 50000,
            'trim': 'Limited',
            'province': 'BC',
            'listing_price': 35000
        },
        {
            'make': 'Ford',
            'model': 'F-150',
            'year': 2020,
            'mileage': 75000,
            'trim': 'Platinum',
            'province': 'AB',
            'listing_price': 42000
        }
    ]
    
    for i, car in enumerate(test_cases, 1):
        print(f"\nTest Case {i}:")
        print(f"  Car: {car['year']} {car['make']} {car['model']} {car['trim']}")
        print(f"  Mileage: {car['mileage']:,} km")
        print(f"  Province: {car['province']}")
        print(f"  Listing Price: ${car['listing_price']:,}")
        
        try:
            result = get_valuation(car)
            print(f"\n  ✅ Fair Price: ${result['fairPrice']:,}")
            print(f"  📊 Deal Score: {result['dealScore']}/100")
            print(f"  💡 Assessment: {result['pricePosition']}")
            print(f"  🎯 Confidence: {result['confidence']:.1%}")
            print(f"  💬 Advice: {result['advice']}")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print("\n" + "="*60)


def test_depreciation():
    """Test depreciation prediction model"""
    print("\n" + "="*60)
    print("🧪 Testing Depreciation Model")
    print("="*60)
    
    test_cases = [
        {
            'make': 'Toyota',
            'model': 'RAV4',
            'purchasePrice': 40000,
            'year': 2024,
            'province': 'ON'
        },
        {
            'make': 'BMW',
            'model': 'X5',
            'purchasePrice': 70000,
            'year': 2024,
            'province': 'BC'
        },
        {
            'make': 'Honda',
            'model': 'Civic',
            'purchasePrice': 30000,
            'year': 2024,
            'province': 'AB'
        }
    ]
    
    for i, car in enumerate(test_cases, 1):
        print(f"\nTest Case {i}:")
        print(f"  Car: {car['year']} {car['make']} {car['model']}")
        print(f"  Purchase Price: ${car['purchasePrice']:,}")
        print(f"  Province: {car['province']}")
        
        try:
            result = get_depreciation(car)
            print(f"\n  📉 Depreciation Rate: {result['annualDepreciationRate']}% per year")
            print(f"  💰 5-Year Value: ${result['resaleValue5Year']:,}")
            print(f"  📊 Retention: {result['percentRetained']:.1f}%")
            print(f"  ⭐ Rating: {result['retentionRating']}")
            print(f"  💡 Advice: {result['advice']}")
            print(f"\n  Year-by-Year Values:")
            for year, value in enumerate(result['yearlyValues']):
                print(f"    Year {year}: ${value:,}")
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    print("\n" + "="*60)


def main():
    print("\n" + "="*60)
    print("🍁 6ixKar ML Service - Model Testing")
    print("="*60)
    
    # Initialize models
    print("\n📦 Initializing models...")
    initialize_model()
    
    # Run tests
    test_valuation()
    test_depreciation()
    
    print("\n✅ All tests completed!")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()
