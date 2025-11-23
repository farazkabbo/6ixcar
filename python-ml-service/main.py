"""
6ixKar ML Service - FastAPI Application
AI-powered car valuation and depreciation prediction
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

# Import models
from models.valuation import get_valuation, initialize_model
from models.depreciation import get_depreciation

# Initialize FastAPI app
app = FastAPI(
    title="6ixKar ML Service",
    description="AI-powered car valuation and depreciation prediction for Canadian market",
    version="1.0.0"
)

# CORS middleware (allow Next.js to call this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your Next.js domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ValuationRequest(BaseModel):
    make: str
    model: str
    year: int
    mileage: int
    trim: str = "Base"
    province: str = "ON"
    listing_price: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example": {
                "make": "Honda",
                "model": "CR-V",
                "year": 2022,
                "mileage": 35000,
                "trim": "EX",
                "province": "ON",
                "listing_price": 28500
            }
        }


class DepreciationRequest(BaseModel):
    make: str
    model: str
    purchasePrice: int
    year: int = 2024
    mileage: int = 0
    province: str = "ON"

    class Config:
        json_schema_extra = {
            "example": {
                "make": "Toyota",
                "model": "RAV4",
                "purchasePrice": 40000,
                "year": 2024,
                "mileage": 0,
                "province": "BC"
            }
        }


# Health check
@app.get("/")
async def root():
    return {
        "service": "6ixKar ML Service",
        "status": "🚀 Running",
        "version": "1.0.0",
        "endpoints": {
            "valuation": "/api/valuation",
            "depreciation": "/api/depreciation",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "6ixKar ML"}


# Valuation endpoint
@app.post("/api/valuation")
async def predict_valuation(request: ValuationRequest):
    """
    Predict fair market price and calculate deal score
    
    Returns:
    - fairPrice: ML-predicted fair market value
    - dealScore: 0-100 score (higher = better deal)
    - pricePosition: How listing compares to market
    - advice: Recommendation for user
    """
    try:
        car_data = request.dict()
        result = get_valuation(car_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Valuation error: {str(e)}")


# Depreciation endpoint
@app.post("/api/depreciation")
async def predict_depreciation(request: DepreciationRequest):
    """
    Predict 5-year depreciation curve
    
    Returns:
    - yearlyValues: Value for each year (0-5)
    - annualDepreciationRate: % per year
    - resaleValue5Year: Expected value after 5 years
    - percentRetained: % of original value retained
    - advice: Resale strategy recommendation
    """
    try:
        car_data = request.dict()
        result = get_depreciation(car_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Depreciation error: {str(e)}")


# Combined endpoint (for convenience)
@app.post("/api/full-analysis")
async def full_analysis(request: ValuationRequest):
    """
    Get both valuation and depreciation in one call
    """
    try:
        # Get valuation
        valuation_data = request.dict()
        valuation = get_valuation(valuation_data)
        
        # Get depreciation (using fair price)
        depreciation_data = {
            'make': request.make,
            'model': request.model,
            'purchasePrice': valuation['fairPrice'],
            'year': request.year,
            'mileage': request.mileage,
            'province': request.province
        }
        depreciation = get_depreciation(depreciation_data)
        
        return {
            "valuation": valuation,
            "depreciation": depreciation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")


# Initialize ML model on startup
@app.on_event("startup")
async def startup_event():
    print("\n" + "="*50)
    print("🍁 6ixKar ML Service Starting...")
    print("="*50)
    initialize_model()
    print("="*50)
    print("✅ Service ready at http://localhost:8000")
    print("📚 API docs at http://localhost:8000/docs")
    print("="*50 + "\n")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
