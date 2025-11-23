import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';
import { ChatRequest, ChatResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Limit history to last 10 messages for context
    const limitedHistory = history?.slice(-10) || [];

    // Generate response using Gemini
    const response = await generateChatResponse(message, limitedHistory);

    const result: ChatResponse = {
      response,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Check specific error types
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let userMessage = 'Failed to generate response. Please try again.';
    
    if (errorMessage.includes('API key')) {
      userMessage = '⚠️ Gemini API key issue. Please check your .env.local file.';
    } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
      userMessage = '⚠️ API quota exceeded. Please wait a minute and try again.';
    } else if (errorMessage.includes('GEMINI_API_KEY')) {
      userMessage = '⚠️ GEMINI_API_KEY not found. Add it to .env.local';
    }
    
    // Return user-friendly error
    return NextResponse.json(
      { 
        error: userMessage,
        details: errorMessage,
        help: 'Visit /api/test-gemini to diagnose the issue'
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
