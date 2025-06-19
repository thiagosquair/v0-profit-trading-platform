import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { userProfile, behavioralPatterns, recentSessions, goals } = await request.json()

    const systemPrompt = `You are an expert trading psychology coach creating personalized coaching plans. Based on the user's profile, behavioral patterns, and goals, create a comprehensive coaching plan.

User Profile:
- Trading Experience: ${userProfile?.tradingExperience || "Not specified"}
- Trading Style: ${userProfile?.tradingStyle || "Not specified"}
- Risk Tolerance: ${userProfile?.riskTolerance || "Not specified"}
- Main Challenges: ${userProfile?.psychologicalChallenges?.join(", ") || "Not specified"}
- Goals: ${userProfile?.goals?.join(", ") || "Not specified"}

Behavioral Patterns: ${behavioralPatterns?.map((p: any) => `${p.name} (${p.severity})`).join(", ") || "None identified"}

Recent Session Themes: ${recentSessions?.map((s: any) => s.theme).join(", ") || "No recent sessions"}

Create a structured coaching plan with:
1. Immediate priorities (next 1-2 weeks)
2. Short-term goals (1-3 months)
3. Long-term objectives (3-12 months)
4. Specific exercises and techniques
5. Milestones and success metrics
6. Weekly focus areas

Provide practical, actionable recommendations tailored to their trading style and experience level.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: "Create a personalized coaching plan based on the provided information.",
      maxTokens: 1200,
    })

    return NextResponse.json({ plan: text })
  } catch (error) {
    console.error("Coaching Plan API Error:", error)
    return NextResponse.json({ error: "Failed to generate coaching plan" }, { status: 500 })
  }
}
