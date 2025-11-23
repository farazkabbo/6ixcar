import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_SYSTEM_INSTRUCTION } from './constants';


export const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
 
  throw new Error('API key not found. Set GEMINI_API_KEY in your .env.local file');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Get Gemini model (modern default)
export const getGeminiModel = () => {
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
      responseMimeType: 'text/plain',
    },
  });
};

// Generate chat response
export async function generateChatResponse(
  message: string,
  history: { role: string; content: string }[]
): Promise<string> {
  try {
    const model = getGeminiModel();

    // Filter out assistant messages at the start and format conversation history
    // Gemini requires first message to be from 'user'
    let filteredHistory = history.filter((msg) => msg.role !== 'system');
    
    // Remove leading assistant messages
    while (filteredHistory.length > 0 && filteredHistory[0].role === 'assistant') {
      filteredHistory = filteredHistory.slice(1);
    }

    const formattedHistory = filteredHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        responseMimeType: 'text/plain',
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response as any;

    // Safety diagnostics
    const promptFeedback = response?.promptFeedback;
    const blockReason = promptFeedback?.blockReason;
    if (blockReason && blockReason !== 'BLOCK_REASON_UNSPECIFIED') {
      throw new Error(`Response blocked by safety: ${blockReason}`);
    }

    const text = response.text?.() ?? '';
    if (!text) {
      const finishReason = response?.candidates?.[0]?.finishReason;
      throw new Error(`Empty response from model. finishReason=${finishReason ?? 'unknown'}`);
    }

    return text;
  } catch (error: any) {
    console.error('Error generating chat response:', error);
    // Propagate SDK error messages to API route for clearer client errors
    const msg = error?.message || error?.toString?.() || 'Unknown error';
    throw new Error(msg);
  }
}

// Generate car recommendation
export async function generateCarRecommendation(
  budget: number,
  province: string,
  requirements: string[]
): Promise<string> {
  try {
    const model = getGeminiModel();

    const prompt = `${GEMINI_SYSTEM_INSTRUCTION}

User needs a car recommendation:
- Budget: $${budget.toLocaleString()} CAD
- Province: ${province}
- Requirements: ${requirements.join(', ')}

Please provide 3-5 specific car recommendations with:
1. Make and model
2. Approximate price range
3. Why it's a good fit for their needs
4. Winter readiness score (if in cold province)
5. Estimated insurance cost for their province`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating car recommendation:', error);
    throw new Error('Failed to generate car recommendation');
  }
}

// Calculate winter readiness score
export function calculateWinterScore(features: {
  hasAWD?: boolean;
  groundClearance?: number; // in inches
  hasHeatedSeats?: boolean;
  hasRemoteStart?: boolean;
  hasAdvancedTraction?: boolean;
}): {
  score: number;
  rating: string;
  details: string[];
} {
  let score = 0;
  const details: string[] = [];

  if (features.hasAWD) {
    score += 30;
    details.push('✓ AWD/4WD (+30 points)');
  } else {
    details.push('✗ No AWD/4WD');
  }

  if (features.groundClearance && features.groundClearance >= 8) {
    score += 25;
    details.push(`✓ Good ground clearance (${features.groundClearance}") (+25 points)`);
  } else if (features.groundClearance) {
    score += 10;
    details.push(`⚠ Low ground clearance (${features.groundClearance}") (+10 points)`);
  }

  if (features.hasHeatedSeats) {
    score += 10;
    details.push('✓ Heated seats (+10 points)');
  }

  if (features.hasRemoteStart) {
    score += 10;
    details.push('✓ Remote start (+10 points)');
  }

  if (features.hasAdvancedTraction) {
    score += 15;
    details.push('✓ Advanced traction control (+15 points)');
  }

  // Add 10 base points for winter tire compatibility (assumed for all modern cars)
  score += 10;
  details.push('✓ Winter tire compatible (+10 points)');

  let rating = '';
  if (score >= 90) rating = 'Excellent for Canadian winters';
  else if (score >= 75) rating = 'Very good for winter';
  else if (score >= 60) rating = 'Good with winter tires';
  else rating = 'Not recommended for harsh winters';

  return { score, rating, details };
}
