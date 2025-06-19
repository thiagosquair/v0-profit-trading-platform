import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@/lib/openai"
// Remove the old import: import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const tradingContext = formData.get("context") as string
    const userProfile = JSON.parse((formData.get("userProfile") as string) || "{}")

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const imageUrl = `data:${image.type};base64,${base64}`

    const systemPrompt = `You are an expert trading psychology analyst with deep knowledge of technical analysis, risk management, and behavioral finance. Analyze the provided trading screenshot and provide insights on:

1. Technical Analysis Quality
2. Risk Management Assessment
3. Psychological State Indicators
4. Decision-Making Patterns
5. Emotional Biases Detected
6. Recommendations for Improvement

User Profile:
- Trading Experience: ${userProfile?.tradingExperience || "Not specified"}
- Trading Style: ${userProfile?.tradingStyle || "Not specified"}
- Risk Tolerance: ${userProfile?.riskTolerance || "Not specified"}

Trading Context: ${tradingContext || "No additional context provided"}

Provide a comprehensive analysis that helps the trader understand both the technical and psychological aspects of their trading decision.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this trading screenshot and provide detailed psychological and technical insights.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    })

    return NextResponse.json({ analysis: completion.choices[0].message.content })
  } catch (error) {
    console.error("Screenshot Analysis API Error:", error)
    return NextResponse.json({ error: "Failed to analyze screenshot" }, { status: 500 })
  }
}
