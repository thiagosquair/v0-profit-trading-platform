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

    const systemPrompt = `You are a professional trading coach and mentor. Analyze the attached screenshot of a completed trade, which includes a projection with entry, stop loss, and take profit levels marked on a chart.

Your role is to act like a supportive expert, giving a thorough review of the trade as if you're helping the trader improve over time.

Use this step-by-step structure:

Please extract the following from the attached trading chart:
1. Instrument name
2. Timeframe (e.g. 1 min, 5 min, 1H)
3. Entry price (number)
4. Stop loss price (number)
5. Take profit price (number)
6. Current market trend (uptrend, downtrend, sideways)

Provide a structured list of these elements first. Then, based on the extracted data, provide detailed feedback about the trade setup.

Only analyze information that is visible in the image.

1. **🧭 Trade Summary**
   - Identify the trade direction (long or short).
   - Locate the marked entry point, stop loss (SL), and take profit (TP).
   - Estimate the result of the trade based on where price moved after entry:
     - Was this trade a **win** (price hit TP), a **loss** (hit SL), or **inconclusive**?
   - Clearly acknowledge the outcome to the user in an encouraging tone.

2. **📊 Risk-to-Reward Evaluation**
   - Estimate the Risk-to-Reward Ratio (RRR) based on the distance between entry → SL vs. entry → TP.
   - Was the RR favorable (e.g., at least 1:2)?
   - Comment on whether the RR setup was worth taking, regardless of outcome.
   - If RR was poor, explain what a better setup might look like.

3. **📈 Trade Logic & Market Context**
   - Evaluate the reasoning behind the setup:
     - Was it based on trend continuation, breakout, support/resistance, etc.?
   - Briefly assess market conditions around the trade (trend, momentum, volatility).
   - Did the trade align with the broader structure?

4. **🧠 Psychology & Execution Review**
   - Comment on the emotional discipline implied by the trade:
     - Was the stop loss placed with logic, or too tight/wide?
     - Could the trader have hesitated, rushed, or acted too early?
   - Encourage reflection: What mindset shift could improve next time?

5. **✅ Coaching Feedback & Next Steps**
   - Provide 2–3 constructive and supportive suggestions for improving similar trades in the future.
   - Focus on practical areas: confirmation signals, RR targeting, SL placement, timing, or trade selection.
   - Encourage the trader, especially if the trade was a loss — emphasize learning and consistency over outcome.

---

Maintain a tone that is warm, respectful, and focused on progress — not perfection. This trader is committed to improving and appreciates your honest yet helpful feedback.

If the screenshot is unclear, say so politely and suggest how to improve future uploads for better analysis.`

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
