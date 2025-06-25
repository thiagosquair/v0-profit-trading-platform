import { NextResponse } from "next/server"
import { generateText, openai } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, sessionId, context } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create a more comprehensive system prompt based on context
    const systemPrompt = `You are an expert trading psychology coach with deep knowledge of behavioral finance, emotional regulation, and performance optimization for traders. 

Current context: ${context || "general coaching"}

Your role is to:
- Provide personalized coaching insights
- Help traders identify and overcome psychological barriers
- Offer practical strategies for emotional regulation
- Guide traders through performance analysis
- Support goal setting and achievement

Respond in a supportive, professional, and actionable manner. Keep responses concise but comprehensive.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 500,
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
