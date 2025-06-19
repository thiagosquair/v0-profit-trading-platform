import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { sessionType, userProfile, context, currentState } = await request.json()

    const sessionPrompts = {
      "crisis-intervention": `You are providing crisis intervention for a trader experiencing severe emotional distress. Focus on:
- Immediate emotional stabilization
- Risk assessment and safety
- Grounding techniques
- Emergency coping strategies
- When to step away from trading
Be empathetic, direct, and prioritize their wellbeing over trading performance.`,

      "pre-trading-prep": `You are helping a trader prepare mentally for their trading session. Focus on:
- Mental state assessment
- Goal setting for the session
- Risk management mindset
- Emotional preparation
- Strategy review and confidence building
Keep responses concise and actionable for immediate implementation.`,

      "post-trading-review": `You are conducting a post-trading session review. Focus on:
- Emotional state during trades
- Decision-making quality analysis
- Lessons learned identification
- Pattern recognition
- Improvement areas for next session
Be analytical but supportive, helping them learn from both wins and losses.`,

      "behavioral-intervention": `You are addressing specific behavioral patterns. Focus on:
- Pattern interruption techniques
- Alternative behavior strategies
- Cognitive restructuring
- Habit formation principles
- Accountability measures
Provide specific, practical interventions they can implement immediately.`,

      "confidence-building": `You are helping build trading confidence. Focus on:
- Strengths identification
- Past success analysis
- Skill development areas
- Positive visualization
- Gradual exposure techniques
Be encouraging while maintaining realistic expectations.`,

      "stress-management": `You are providing stress management coaching. Focus on:
- Stress identification and triggers
- Relaxation techniques
- Breathing exercises
- Mindfulness practices
- Stress prevention strategies
Provide immediate relief techniques and long-term management strategies.`,
    }

    const systemPrompt = `${sessionPrompts[sessionType as keyof typeof sessionPrompts] || sessionPrompts["crisis-intervention"]}

User Profile:
- Trading Experience: ${userProfile?.tradingExperience || "Not specified"}
- Trading Style: ${userProfile?.tradingStyle || "Not specified"}
- Main Challenges: ${userProfile?.psychologicalChallenges?.join(", ") || "Not specified"}

Current Context: ${context || "No additional context"}
Current Emotional State: ${currentState || "Not specified"}

Provide specialized coaching appropriate for this session type. Be professional, empathetic, and focused on practical solutions.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: "Provide specialized coaching based on the session type and user's current situation.",
      maxTokens: 600,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Specialized Session API Error:", error)
    return NextResponse.json({ error: "Failed to generate specialized response" }, { status: 500 })
  }
}
