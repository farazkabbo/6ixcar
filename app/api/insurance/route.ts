import { NextRequest, NextResponse } from 'next/server';
import { InsuranceRequest, InsuranceResponse } from '@/types';
import { PROVINCES, BASE_INSURANCE_RATES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body: InsuranceRequest = await request.json();
    const { make, model, year, province, age } = body;

    // Validate inputs
    if (!province) {
      return NextResponse.json(
        { error: 'Province is required' },
        { status: 400 }
      );
    }

    // Find province info
    const provinceData = PROVINCES.find((p) => p.code === province);
    if (!provinceData) {
      return NextResponse.json(
        { error: 'Invalid province code' },
        { status: 400 }
      );
    }

    // Calculate base rates
    let liability = BASE_INSURANCE_RATES.liability;
    let collision = BASE_INSURANCE_RATES.collision;
    let comprehensive = BASE_INSURANCE_RATES.comprehensive;

    // Apply province multiplier
    liability *= provinceData.insuranceMultiplier;
    collision *= provinceData.insuranceMultiplier;
    comprehensive *= provinceData.insuranceMultiplier;

    // Apply age factor (younger drivers pay more)
    let ageFactor = 1.0;
    if (age < 25) {
      ageFactor = 1.5; // 50% more for drivers under 25
    } else if (age < 30) {
      ageFactor = 1.2; // 20% more for drivers 25-29
    } else if (age >= 55) {
      ageFactor = 0.9; // 10% discount for experienced drivers 55+
    }

    liability *= ageFactor;
    collision *= ageFactor;
    comprehensive *= ageFactor;

    // Apply vehicle age factor (newer cars cost more to insure)
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - year;
    let vehicleFactor = 1.0;
    
    if (vehicleAge <= 2) {
      vehicleFactor = 1.3; // New cars
    } else if (vehicleAge <= 5) {
      vehicleFactor = 1.1; // Recent cars
    } else if (vehicleAge >= 10) {
      vehicleFactor = 0.8; // Older cars
    }

    collision *= vehicleFactor;
    comprehensive *= vehicleFactor;

    // Calculate totals
    const monthly = Math.round(liability + collision + comprehensive);
    const annual = monthly * 12;

    const result: InsuranceResponse = {
      monthly,
      annual,
      breakdown: {
        liability: Math.round(liability),
        collision: Math.round(collision),
        comprehensive: Math.round(comprehensive),
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Insurance API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to calculate insurance rates',
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
