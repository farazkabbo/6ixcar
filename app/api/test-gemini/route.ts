import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        status: 'error',
        message: 'GOOGLE_GEMINI_API_KEY not found in environment variables',
        solution: 'Add your Gemini API key to .env.local'
      }, { status: 500 });
    }

    // Test the API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent('Say "Hello, 6ixKar is working!" in 5 words.');
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      status: 'success',
      message: 'Gemini API is working!',
      testResponse: text,
      apiKeyPresent: true,
      apiKeyPrefix: apiKey.substring(0, 10) + '...'
    });
    
  } catch (error: any) {
    console.error('Gemini API Test Error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Unknown error',
      errorDetails: error.toString(),
      possibleCauses: [
        '1. Invalid API key - Get a new one from https://makersuite.google.com/app/apikey',
        '2. API key quota exceeded - Check your usage limits',
        '3. API key not activated - Wait a few minutes after creation',
        '4. Network issue - Check your internet connection'
      ]
    }, { status: 500 });
  }
}
