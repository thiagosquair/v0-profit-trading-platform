import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@/lib/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, userProfile, context } = await request.json()

    const systemPrompt = `You are an expert trading psychology coach with deep knowledge of behavioral finance, cognitive biases, and emotional regulation in trading. Your role is to provide personalized, actionable guidance to help traders improve their psychological approach to trading.

User Profile:
- Trading Experience: ${userProfile?.tradingExperience || "Not specified"}
- Trading Style: ${userProfile?.tradingStyle || "Not specified"}
- Risk Tolerance: ${userProfile?.riskTolerance || "Not specified"}
- Main Challenges: ${userProfile?.psychologicalChallenges?.join(", ") || "Not specified"}
- Goals: ${userProfile?.goals?.join(", ") || "Not specified"}

Context: ${context || "General coaching session"}

Guidelines:
1. Be empathetic and understanding
2. Provide specific, actionable advice
3. Reference relevant psychological concepts when appropriate
4. Ask follow-up questions to better understand the situation
5. Encourage self-reflection and awareness
6. Keep responses concise but comprehensive
7. Focus on practical strategies that can be implemented immediately`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 500,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI Coach API Error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
