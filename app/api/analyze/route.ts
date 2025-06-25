import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { put } from '@vercel/blob';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  // Upload image to Vercel Blob Storage
  const blob = await put(file.name, file.stream(), {
    access: 'public',
  });

  const imageUrl = blob.url;

  const prompt = `
You are a professional trading coach and mentor. Analyze the attached screenshot of a completed trade, which includes a projection with entry, stop loss, and take profit levels marked on a charts.

Your role is to provide constructive feedback to help the trader improve.

1. Identify the trade direction (long/short), entry, SL, and TP from the chart.
2. Determine if this was a win or a loss based on price action.
3. Estimate the Risk-to-Reward ratio and comment if it was worth taking.
4. Assess the logic of the setup, market structure, and alignment.
5. Reflect on discipline and execution.
6. Give 2–3 helpful, actionable suggestions.

Keep your tone helpful and coach-like. Mention if anything is unclear in the image.
`;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful trading mentor AI.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const result = chatResponse.choices[0]?.message?.content;
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('OpenAI Vision API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
