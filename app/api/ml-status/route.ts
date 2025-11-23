import { NextRequest, NextResponse } from 'next/server';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export async function GET(req: NextRequest) {
  try {
    // Check if Python ML service is running
    const response = await fetch(`${ML_SERVICE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    if (!response.ok) {
      throw new Error('Service unhealthy');
    }

    const data = await response.json();
    
    return NextResponse.json({
      status: 'online',
      service: data.service || '6ixKar ML',
      timestamp: new Date().toISOString(),
      endpoint: ML_SERVICE_URL,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'offline',
        error: 'Python ML service not reachable',
        endpoint: ML_SERVICE_URL,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
