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
You are an expert trading coach and technical analyst. Your name is ProFitz AI. Your task is to conduct a detailed analysis of the trading screenshot provided by the user. The user is looking for specific, actionable feedback to improve their trading skills. You must base your entire analysis on the visual information present in the chart.

**Your analysis must be structured in the following way:**

**1. Trade Summary:**
   - **Instrument:** Identify the trading instrument if visible (e.g., EUR/USD, BTC/USD, AAPL).
   - **Trade Direction:** State whether this was a **Long** or **Short** trade.
   - **Entry Price:** Identify the exact entry price from the chart.
   - **Stop Loss:** Identify the exact stop loss level from the chart.
   - **Take Profit:** Identify the exact take profit level from the chart.

**2. Outcome Analysis:**
   - **Result:** Based on the price action relative to the entry, stop loss, and take profit levels, determine if the trade was a **Win**, **Loss**, or is **Still Active**. Explain your reasoning by referencing the price movement on the chart.
   - **Risk-to-Reward Ratio (RRR):** Calculate the RRR of the trade. Comment on whether the RRR was favorable and aligned with sound risk management principles (e.g., 1:2 or better).

**3. Technical Analysis & Setup Logic:**
   - **Market Structure:** Describe the market structure at the time of entry (e.g., uptrend, downtrend, range-bound, key support/resistance levels). Reference specific price points or chart areas to support your description.
   - **Candlestick Analysis:** Identify any significant candlestick patterns near the entry point (e.g., engulfing pattern, doji, hammer). Explain what these patterns indicated.
   - **Indicator Analysis (if visible):** If there are any technical indicators on the chart (e.g., Moving Averages, RSI, MACD), analyze their signals at the time of the trade. Were they confirming the trade setup or providing conflicting signals?
   - **Overall Setup Quality:** Provide an overall assessment of the trade setup\"s quality. Was it a high-probability setup? Why or why not? Be specific and reference the visual evidence.

**4. Execution & Discipline:**
   - **Entry Timing:** Comment on the timing of the entry. Was it optimal, or could it have been improved? Explain your reasoning based on the chart.
   - **Stop Loss Placement:** Assess the placement of the stop loss. Was it logical (e.g., behind a key structural level)? Or was it too tight or too wide?
   - **Profit Target Placement:** Evaluate the placement of the take profit target. Was it realistic given the market structure and volatility?

**5. Actionable Coach\"s Feedback:**
   - **What Went Well:** Identify 1-2 positive aspects of this trade, even if it was a loss. (e.g., \"You did a great job of identifying the overall trend.\")
   - **Areas for Improvement:** Provide 2-3 specific, actionable suggestions for what the trader could do differently next time. These suggestions must be directly related to your analysis of this specific trade.
   - **A Question for Reflection:** Ask the trader a thought-provoking question to encourage self-reflection (e.g., \"What was your emotional state when you saw the price move against you?\".)

**Important Instructions:**
*   If any of the requested information is not clearly visible in the image, you must state that explicitly (e.g., \"The take profit level is not visible in the screenshot.\").
*   Do not provide generic trading advice. Your feedback must be 100% tailored to the trade shown in the image.
*   Maintain a helpful, encouraging, and professional tone throughout your analysis.
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
