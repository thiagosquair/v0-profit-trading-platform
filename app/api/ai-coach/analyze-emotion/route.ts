import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, userProfile, sessionHistory } = await request.json()

    const systemPrompt = `You are an expert emotion analysis AI specialized in trading psychology. Analyze the user's message for emotional indicators and provide detailed insights.

User Profile:
- Trading Experience: ${userProfile?.tradingExperience || "Not specified"}
- Main Challenges: ${userProfile?.psychologicalChallenges?.join(", ") || "Not specified"}

Recent Session Context: ${
      sessionHistory
        ?.slice(-3)
        .map((msg: any) => `${msg.role}: ${msg.content}`)
        .join("\n") || "No recent context"
    }

Analyze the message for:
1. Primary emotions (fear, greed, confidence, anxiety, frustration, etc.)
2. Emotional intensity (1-10 scale)
3. Cognitive biases present
4. Stress indicators
5. Trading psychology state
6. Risk factors

Provide a JSON response with:
{
  "primaryEmotion": "emotion name",
  "intensity": number,
  "secondaryEmotions": ["emotion1", "emotion2"],
  "cognitiveBiases": ["bias1", "bias2"],
  "stressLevel": number,
  "riskFactors": ["factor1", "factor2"],
  "recommendations": ["rec1", "rec2"],
  "urgencyLevel": "low|medium|high"
}`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Analyze this message for emotional and psychological indicators: "${message}"`,
      maxTokens: 800,
    })

    // Parse the JSON response
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        primaryEmotion: "neutral",
        intensity: 5,
        secondaryEmotions: [],
        cognitiveBiases: [],
        stressLevel: 5,
        riskFactors: [],
        recommendations: ["Continue monitoring emotional state"],
        urgencyLevel: "low",
      }
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Emotion Analysis API Error:", error)
    return NextResponse.json({ error: "Failed to analyze emotions" }, { status: 500 })
  }
}
