# 🤖 6ixKar ML Service - Python Backend

AI-powered car valuation and depreciation prediction service for 6ixKar.

## Features

- **Car Valuation**: ML-based fair price prediction with deal scores
- **Depreciation Forecast**: 5-year value prediction
- **Canadian Market Focus**: Province-specific adjustments

## Tech Stack

- FastAPI (REST API)
- scikit-learn (ML models)
- pandas/numpy (data processing)
- uvicorn (ASGI server)

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Service

```bash
python main.py
```

Server runs on: **http://localhost:8000**

### 3. API Documentation

Visit: **http://localhost:8000/docs** for interactive Swagger UI

## API Endpoints

### POST /api/valuation
Predict fair price and calculate deal score.

**Request:**
```json
{
  "make": "Honda",
  "model": "CR-V",
  "year": 2022,
  "mileage": 35000,
  "trim": "EX",
  "province": "ON"
}
```

**Response:**
```json
{
  "fairPrice": 32500,
  "dealScore": 87,
  "pricePosition": "12% below market",
  "confidence": "±$1,800",
  "advice": "Great deal! This price is well below market average."
}
```

### POST /api/depreciation
Predict 5-year depreciation curve.

**Request:**
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

**Response:**
```json
{
  "yearlyValues": [40000, 36000, 32400, 29500, 27000, 25000],
  "depreciationRate": 0.13,
  "resaleValue5Year": 25000,
  "totalDepreciation": 15000,
  "percentRetained": 62.5,
  "advice": "Excellent retention rate - Toyota holds value well!"
}
```

## Model Details

### Valuation Model
- Algorithm: Random Forest Regressor (lightweight)
- Features: year, mileage, make, model, province
- Training: Synthetic Canadian car data (2000+ samples)
- Accuracy: MAE ~$1,500

### Depreciation Model
- Algorithm: Exponential decay curve
- Based on: Brand reputation, vehicle category
- Adjustments: Province, mileage patterns

## Integration with Next.js

### Example Next.js API Route

```typescript
// app/api/enhanced-valuation/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Call Python ML service
  const response = await fetch('http://localhost:8000/api/valuation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const mlData = await response.json();
  return Response.json(mlData);
}
```

## Deployment

### Local Development
```bash
python main.py
```

### Docker (Production)
```bash
docker build -t 6ixkar-ml .
docker run -p 8000:8000 6ixkar-ml
```

### Deploy to Render/Railway
- Push to GitHub
- Connect repository
- Set start command: `uvicorn main:app --host 0.0.0.0 --port 8000`

## Project Structure

```
python-ml-service/
├── main.py              # FastAPI app
├── models/
│   ├── valuation.py     # Valuation ML model
│   └── depreciation.py  # Depreciation predictor
├── data/
│   └── training_data.py # Synthetic data generator
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Why This Approach?

✅ **Simple but Impressive**: Uses real ML (Random Forest) without overcomplicating
✅ **Fast to Build**: Core functionality in ~2-3 hours
✅ **Demo-Friendly**: Clear before/after comparisons
✅ **Scalable**: Can add more features later

## Future Enhancements

- [ ] Real scraped data from Autotrader
- [ ] Deep learning models (if needed)
- [ ] Constraint optimization engine
- [ ] Monte Carlo simulation
- [ ] Image-based valuation

---

**Built for 6ixKar hackathon 🍁🚗**
