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
    
    // Return user-friendly error
    return NextResponse.json(
      { 
        error: 'Failed to generate response. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
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
