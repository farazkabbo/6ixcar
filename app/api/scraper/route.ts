import { NextRequest, NextResponse } from 'next/server';
import { ScraperRequest, ScraperResponse } from '@/types';
import { PROVINCES } from '@/lib/constants';

// Mock data for demonstration
// In production, this would scrape autotrader.ca, kijiji.ca, etc.
export async function POST(request: NextRequest) {
  try {
    const body: ScraperRequest = await request.json();
    const { make, model, year } = body;

    // Validate inputs
    if (!make || !model || !year) {
      return NextResponse.json(
        { error: 'Make, model, and year are required' },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    if (year < 1990 || year > currentYear + 1) {
      return NextResponse.json(
        { error: 'Invalid year' },
        { status: 400 }
      );
    }

    // Mock calculation based on year
    const vehicleAge = currentYear - year;
    let basePrice = 35000; // Starting price for new car

    // Depreciation: ~15% per year for first 5 years, then ~10% per year
    for (let i = 0; i < vehicleAge; i++) {
      if (i < 5) {
        basePrice *= 0.85; // 15% depreciation
      } else {
        basePrice *= 0.90; // 10% depreciation
      }
    }

   
    const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Tesla', 'Porsche'];
    const economyBrands = ['Honda', 'Toyota', 'Mazda', 'Hyundai', 'Kia'];
    
    if (luxuryBrands.some(brand => make.toLowerCase().includes(brand.toLowerCase()))) {
      basePrice *= 1.4;
    } else if (economyBrands.some(brand => make.toLowerCase().includes(brand.toLowerCase()))) {
      basePrice *= 0.85;
    }

  
    const variance = 0.1; // ±10%
    const randomFactor = 1 + (Math.random() * variance * 2 - variance);
    basePrice *= randomFactor;

    // Round to nearest 500
    const averagePrice = Math.round(basePrice / 500) * 500;

    // Calculate price range
    const priceRange = {
      low: Math.round(averagePrice * 0.85 / 100) * 100,
      high: Math.round(averagePrice * 1.15 / 100) * 100,
    };

    // Generate mock listings count
    const listings = Math.floor(Math.random() * 50) + 20;

 
    const provinces: { [key: string]: number } = {};
    PROVINCES.forEach((province) => {
      let provinceFactor = 1.0;
      
      // BC and ON tend to have higher prices
      if (province.code === 'BC' || province.code === 'ON') {
        provinceFactor = 1.08;
      }
      // QC has lower prices due to stricter inspection laws
      else if (province.code === 'QC') {
        provinceFactor = 0.92;
      }
      // Prairie provinces have moderate prices
      else if (['AB', 'SK', 'MB'].includes(province.code)) {
        provinceFactor = 0.95;
      }

      provinces[province.code] = Math.round(averagePrice * provinceFactor / 100) * 100;
    });

    const result: ScraperResponse = {
      averagePrice,
      priceRange,
      listings,
      provinces,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Scraper API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch car prices',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
