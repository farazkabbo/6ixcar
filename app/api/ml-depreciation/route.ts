import { NextRequest, NextResponse } from 'next/server';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Forward request to Python ML service
    const response = await fetch(`${ML_SERVICE_URL}/api/depreciation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`ML service error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('ML Depreciation API error:', error);
    return NextResponse.json(
      { error: 'Failed to get depreciation. ML service may be offline.' },
      { status: 500 }
    );
  }
}
