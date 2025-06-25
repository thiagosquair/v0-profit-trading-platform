import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, sessionId, context } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert trading psychology coach with deep knowledge of behavioral finance, emotional regulation, and performance optimization for traders.

RESPONSE FORMAT GUIDELINES:
- Structure your responses with clear sections
- Use numbered points or bullet points when appropriate
- Keep paragraphs short (2-3 sentences max)
- Include practical, actionable advice
- Be supportive and encouraging
- Use relevant trading psychology concepts
- End with a follow-up question when appropriate

RESPONSE STRUCTURE:
1. Acknowledge the trader's concern/question
2. Provide 2-3 key insights or strategies
3. Give specific actionable steps
4. Ask a follow-up question to continue the conversation

Keep responses concise but comprehensive (3-4 short paragraphs maximum).
Focus on practical strategies that can be implemented immediately.
Be empathetic and understanding of trading psychology challenges.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 400,
    })

    return NextResponse.json({
      response: text,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Coach API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to process coaching request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
