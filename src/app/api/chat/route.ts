import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// System context about FOS documentation
const SYSTEM_PROMPT = `You are an AI assistant for the FOS blockchain documentation website. You help users understand the FOS platform which includes:

- NFT minting with Merkle tree whitelist verification
- Prize distribution using Chainlink VRF for randomness
- Smart contracts following ERC-721, ERC-2981, and AccessControl patterns
- A web platform with landing page, dashboard, and admin panel

When answering questions:
1. Be helpful and concise
2. Focus on explaining blockchain/crypto concepts when asked
3. Reference documentation sections when relevant

Keep responses brief and helpful.`;

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is not set');
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        console.log('Initializing GoogleGenAI with API key...');

        // Initialize with explicit API key
        const ai = new GoogleGenAI({ apiKey });

        console.log('Calling gemini-2.5-flash model...');

        // Use gemini-2.5-flash as per official docs
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${SYSTEM_PROMPT}\n\nUser question: ${message}\n\nProvide a helpful response:`,
        });

        console.log('Response received:', response);

        // Access text property directly (not as function)
        const text = response.text;

        return NextResponse.json({ response: text });

    } catch (error: unknown) {
        console.error('AI Chat error:', error);

        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error details:', errorMessage);

        return NextResponse.json(
            { error: `AI error: ${errorMessage}` },
            { status: 500 }
        );
    }
}
