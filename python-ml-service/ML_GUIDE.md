# 🤖 6ixKar ML Service Guide

AI-powered car valuation and depreciation prediction for the Canadian market.

## What Does This Service Do?

The ML service provides two key features:

### 1. **Car Valuation** 🏷️
- Predicts fair market price for used cars
- Calculates a "Deal Score" (0-100) to help buyers
- Considers: make, model, year, mileage, trim, province
- Uses Random Forest machine learning model

### 2. **Depreciation Prediction** 📉
- Forecasts car value over 5 years
- Brand-specific depreciation rates
- Provides selling window recommendations
- Shows retention ratings (Excellent, Good, Average, Poor)

---

## Quick Start

### Install Dependencies
```bash
cd python-ml-service
pip install -r requirements.txt
```

### Run the Service
```bash
python run.py
```

Service starts at: **http://localhost:8000**

### View API Documentation
Open browser to: **http://localhost:8000/docs**

---

## API Endpoints

### 1. Health Check
**GET** `/health`

Response:
```json
{
  "status": "healthy",
  "service": "6ixKar ML"
}
```

### 2. Car Valuation
**POST** `/api/valuation`

Request body:
```json
{
  "make": "Honda",
  "model": "CR-V",
  "year": 2022,
  "mileage": 35000,
  "trim": "EX",
  "province": "ON",
  "listing_price": 28500
}
```

Response:
```json
{
  "fairPrice": 27850,
  "dealScore": 75,
  "pricePosition": "Good Deal",
  "confidence": 0.92,
  "advice": "This is a good deal! Price is 2.3% below market value.",
  "marketRange": {
    "low": 26000,
    "high": 29500
  }
}
```

**Deal Score Explained:**
- **90-100**: Excellent deal (10%+ below market)
- **70-89**: Good deal (5-10% below market)
- **50-69**: Fair price (within 5% of market)
- **30-49**: Slightly overpriced (5-10% above)
- **0-29**: Overpriced (10%+ above market)

### 3. Depreciation Forecast
**POST** `/api/depreciation`

Request body:
```json
{
  "make": "Toyota",
  "model": "RAV4",
  "purchasePrice": 40000,
  "year": 2024,
  "mileage": 0,
  "province": "BC"
}
```

Response:
```json
{
  "yearlyValues": [40000, 35200, 31350, 28100, 25380, 23050],
  "annualDepreciationRate": 12.0,
  "resaleValue5Year": 23050,
  "percentRetained": 57.6,
  "retentionRating": "Excellent",
  "advice": "Best time to sell: Year 3-4",
  "totalDepreciation": 16950
}
```

**Retention Ratings:**
- **Excellent**: Retains 55%+ after 5 years (Toyota, Lexus, Honda)
- **Good**: Retains 45-55% (Mazda, Subaru, Nissan)
- **Average**: Retains 35-45% (Ford, Chevrolet, Hyundai)
- **Poor**: Retains <35% (Luxury brands: BMW, Mercedes, Audi)

### 4. Full Analysis
**POST** `/api/full-analysis`

Combines valuation + depreciation in one call.

Request body: Same as valuation endpoint

Response:
```json
{
  "valuation": { ... },
  "depreciation": { ... }
}
```

---

## How the ML Models Work

### Valuation Model (Random Forest)

**Training Data:**
- 2,000 synthetic car listings
- 15 popular makes (Toyota, Honda, Ford, etc.)
- 5 models per make (CR-V, RAV4, F-150, etc.)
- Realistic mileage: 12,000-22,000 km/year
- Provincial price multipliers

**Features Used:**
1. Make (Toyota, Honda, Ford...)
2. Model (CR-V, RAV4, F-150...)
3. Year (2018-2024)
4. Mileage (0-200,000 km)
5. Trim (Base, Sport, Limited, Platinum)
6. Province (ON, BC, AB, QC...)
7. Vehicle age
8. Age × mileage interaction

**Model Details:**
- Algorithm: Random Forest Regressor
- Trees: 100
- Max depth: 15
- Features: Categorical encoding via LabelEncoder
- Accuracy: ~92% on test data

**Deal Score Calculation:**
```
diff = (listing_price - fair_price) / fair_price * 100

If diff <= -15%: score = 100 (Excellent)
If diff <= -10%: score = 90-99 (Great)
If diff <= -5%:  score = 70-89 (Good)
If diff <= 5%:   score = 50-69 (Fair)
If diff <= 10%:  score = 30-49 (Overpriced)
If diff > 10%:   score = 0-29 (Very Overpriced)
```

### Depreciation Model (Exponential Decay)

**Brand-Specific Rates:**
| Brand | Annual Rate | 5-Year Retention |
|-------|-------------|------------------|
| Toyota | 12% | 58% |
| Lexus | 14% | 56% |
| Honda | 13% | 57% |
| Mazda | 15% | 55% |
| Subaru | 15% | 55% |
| Ford | 18% | 48% |
| Chevrolet | 18% | 48% |
| BMW | 20% | 42% |
| Mercedes | 22% | 38% |
| Audi | 20% | 42% |

**Formula:**
```
value_year_n = purchase_price * (1 - rate) ^ (year * curve_adjustment)

curve_adjustment = 0.85  # Slower depreciation after year 2
```

**Selling Window Advice:**
- **Excellent retention** (Toyota, Honda): Sell year 3-4
- **Good retention** (Mazda, Subaru): Sell year 2-3
- **Average retention** (Ford, Chevy): Sell year 2-3
- **Poor retention** (Luxury): Sell year 2 or keep long-term

---

## Integration with Next.js

The Next.js app has proxy routes to call the ML service:

### `/app/api/ml-valuation/route.ts`
Forwards requests to Python ML service at `http://localhost:8000/api/valuation`

### `/app/api/ml-depreciation/route.ts`
Forwards requests to Python ML service at `http://localhost:8000/api/depreciation`

**Usage from Frontend:**
```typescript
// Get car valuation
const response = await fetch('/api/ml-valuation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    mileage: 35000,
    trim: 'EX',
    province: 'ON',
    listing_price: 28500
  })
});

const valuation = await response.json();
console.log(`Fair price: $${valuation.fairPrice}`);
console.log(`Deal score: ${valuation.dealScore}/100`);
```

---

## Project Structure

```
python-ml-service/
├── main.py                 # FastAPI application
├── run.py                  # Development runner
├── requirements.txt        # Python dependencies
├── README.md              # Service overview
├── ML_GUIDE.md            # This file
├── data/
│   └── training_data.py   # Synthetic data generator
└── models/
    ├── valuation.py       # Random Forest model
    └── depreciation.py    # Depreciation calculator
```

---

## Development

### Regenerate Training Data
```bash
cd data
python training_data.py
```
Creates `training_data.csv` with 2,000 samples.

### Test Valuation Model
```python
from models.valuation import get_valuation

result = get_valuation({
    'make': 'Toyota',
    'model': 'RAV4',
    'year': 2022,
    'mileage': 40000,
    'trim': 'Limited',
    'province': 'ON',
    'listing_price': 32000
})

print(f"Fair price: ${result['fairPrice']}")
print(f"Deal score: {result['dealScore']}/100")
```

### Test Depreciation Model
```python
from models.depreciation import get_depreciation

result = get_depreciation({
    'make': 'Honda',
    'model': 'CR-V',
    'purchasePrice': 35000,
    'year': 2024,
    'mileage': 0,
    'province': 'BC'
})

print(f"5-year value: ${result['resaleValue5Year']}")
print(f"Retention: {result['percentRetained']}%")
```

---

## Deployment

### Option 1: Railway.app (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd python-ml-service
railway up
```

Get your service URL (e.g., `https://your-service.railway.app`) and add to Next.js `.env`:
```
ML_SERVICE_URL=https://your-service.railway.app
```

### Option 2: Render.com
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t 6ixkar-ml .
docker run -p 8000:8000 6ixkar-ml
```

---

## Limitations & Future Improvements

### Current Limitations
- **Synthetic data**: Models trained on generated data, not real market data
- **Simple features**: Doesn't consider accident history, service records, modifications
- **No real-time data**: Prices don't update with market fluctuations
- **Limited makes/models**: 15 makes with 5 models each

### Future Enhancements
1. **Real data scraping**: Integrate with AutoTrader, Kijiji APIs
2. **Image analysis**: Add computer vision to assess vehicle condition
3. **Market trends**: Track price changes over time
4. **More features**: Accident history, ownership count, fuel economy
5. **Deep learning**: Switch to neural networks for better predictions
6. **Location**: Consider city-level pricing (Toronto vs. Thunder Bay)

---

## Troubleshooting

### Issue: `ModuleNotFoundError: No module named 'fastapi'`
**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: Port 8000 already in use
**Solution:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use different port
uvicorn main:app --port 8001
```

### Issue: Models not training
**Solution:**
```bash
# Verify training data exists
cd data
python training_data.py

# Check generated file
ls training_data.csv
```

### Issue: CORS errors from Next.js
**Solution:** In `main.py`, update CORS origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Support

Need help? Check:
- **FastAPI Docs**: http://localhost:8000/docs (when running)
- **Main README**: ../README.md
- **Setup Guide**: ../SETUP.md
- **Run Guide**: ../RUN.md

---

Built with ❤️ for the Canadian car buying community 🍁
