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

    console.log("Received message:", message)

    const systemPrompt = `You are an expert trading psychology coach and seasoned professional trader. 
You combine deep knowledge of behavioral finance with practical market analysis skills.

Your job is to:
- Help traders emotionally regulate after wins and losses
- Coach users toward consistent, process-driven performance
- Actively identify potential flaws or strengths in a trader’s approach
- When asked about trades (e.g. entries or setups), analyze:
    - Recent price action context
    - Trend, support/resistance, and volatility
    - Macro/fundamental events (if relevant)
    - Probability and risk-reward (but no financial advice)
- Help the user develop trader self-awareness and strategic thinking

Always respond in a supportive and structured way. Prioritize user development. Avoid long lectures. Encourage learning and process-based thinking.

Current context: ${context || "general coaching"}`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 500,
    })

    console.log("Generated response:", text)

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
