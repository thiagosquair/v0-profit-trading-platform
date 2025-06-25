import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { put } from '@vercel/blob';
import { 
  TradeContext, 
  AnalysisAPIResponse, 
  ANALYSIS_CONSTRAINTS 
} from './types';
import { 
  validateFormData,
  extractContextFromFormData,
  buildAnalysisPrompt,
  handleOpenAIError,
  validateImageUrl,
  formatAnalysisResponse,
  formatErrorResponse
} from './utils';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest): Promise<NextResponse<AnalysisAPIResponse>> {
  try {
    // Parse form data
    const formData = await req.formData();
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        formatErrorResponse(validation.errors.join(', ')),
        { status: 400 }
      );
    }

    // Extract file and context
    const file = formData.get('image') as File;
    const context = extractContextFromFormData(formData);

    // Upload image to Vercel Blob Storage
    let imageUrl: string;
    try {
      const blob = await put(file.name, file.stream(), {
        access: 'public',
      });
      imageUrl = blob.url;
    } catch (error) {
      console.error('Blob upload error:', error);
      return NextResponse.json(
        formatErrorResponse('Failed to upload image'),
        { status: 500 }
      );
    }

    // Verify image URL is accessible
    const isImageAccessible = await validateImageUrl(imageUrl);
    if (!isImageAccessible) {
      return NextResponse.json(
        formatErrorResponse('Uploaded image is not accessible'),
        { status: 500 }
      );
    }

    // Build dynamic prompt based on user context
    const prompt = buildAnalysisPrompt(context);

    // Call OpenAI Vision API
    const chatResponse = await openai.chat.completions.create({
      model: ANALYSIS_CONSTRAINTS.MODEL,
      messages: [
        { 
          role: 'system', 
          content: 'You are ProFitz AI, an expert trading coach and technical analyst. Provide detailed, actionable feedback based on the trading screenshot and user context provided.' 
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high'
              },
            },
          ],
        },
      ],
      max_tokens: ANALYSIS_CONSTRAINTS.MAX_TOKENS,
      temperature: ANALYSIS_CONSTRAINTS.TEMPERATURE,
    });

    // Extract and validate response
    const analysis = chatResponse.choices[0]?.message?.content;
    if (!analysis) {
      return NextResponse.json(
        formatErrorResponse('No analysis generated from AI'),
        { status: 500 }
      );
    }

    // Format successful response
    const response = formatAnalysisResponse(
      analysis,
      context,
      imageUrl,
      chatResponse.usage?.total_tokens || 0
    );

    return NextResponse.json(response);

  } catch (error: any) {
    // Handle OpenAI-specific errors
    const errorResponse = handleOpenAIError(error);
    return NextResponse.json(
      formatErrorResponse(errorResponse.message),
      { status: errorResponse.status }
    );
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'screenshot-analysis',
    timestamp: new Date().toISOString()
  });
}

