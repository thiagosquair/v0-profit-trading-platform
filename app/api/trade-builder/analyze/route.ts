import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { put } from '@vercel/blob'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface TradeBuilderRequest {
  tradingInstrument: string
  timeframe: string
  direction: string
  entryPrice: string
  stopLoss: string
  takeProfit: string
  tradeReason: string
  emotionalState: string
  confidenceLevel: string
  marketConditions: string
  riskPercentage: string
  positionSize: string
  screenshot: File
}

interface TradeAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  riskAssessment: string
  psychologyInsights: string
  probabilityEstimate: number
  aiCoachingFeedback: string
  technicalAnalysis: {
    patterns: string[]
    supportResistance: string[]
    trendAnalysis: string
    entryQuality: string
  }
  riskManagement: {
    positionSizing: string
    riskRewardRatio: string
    stopLossPlacement: string
    takeProfitPlacement: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract trade data
    const tradeData = {
      tradingInstrument: formData.get('tradingInstrument') as string,
      timeframe: formData.get('timeframe') as string,
      direction: formData.get('direction') as string,
      entryPrice: parseFloat(formData.get('entryPrice') as string),
      stopLoss: parseFloat(formData.get('stopLoss') as string),
      takeProfit: parseFloat(formData.get('takeProfit') as string),
      tradeReason: formData.get('tradeReason') as string,
      emotionalState: formData.get('emotionalState') as string,
      confidenceLevel: parseInt(formData.get('confidenceLevel') as string),
      marketConditions: formData.get('marketConditions') as string,
      riskPercentage: parseFloat(formData.get('riskPercentage') as string),
      positionSize: parseFloat(formData.get('positionSize') as string),
    }

    // Handle screenshot upload
    const screenshot = formData.get('screenshot') as File
    if (!screenshot) {
      return NextResponse.json(
        { error: 'Screenshot is required for analysis' },
        { status: 400 }
      )
    }

    // Upload screenshot to Vercel Blob
    const blob = await put(`trade-screenshots/${Date.now()}-${screenshot.name}`, screenshot, {
      access: 'public',
    })

    // Calculate risk-reward ratio
    const calculateRiskReward = () => {
      const entry = tradeData.entryPrice
      const sl = tradeData.stopLoss
      const tp = tradeData.takeProfit
      
      let risk: number, reward: number
      
      if (tradeData.direction === 'long') {
        risk = Math.abs(entry - sl)
        reward = Math.abs(tp - entry)
      } else {
        risk = Math.abs(sl - entry)
        reward = Math.abs(entry - tp)
      }
      
      if (risk === 0) return 0; // Avoid division by zero
      return reward / risk
    }

    const riskRewardRatio = calculateRiskReward()

    // Build comprehensive AI analysis prompt
    const analysisPrompt = `You are an expert trading coach and analyst with 20+ years of experience in financial markets. You're analyzing a comprehensive trade setup that includes both quantitative data and a chart screenshot. Your role is to provide detailed, actionable analysis that helps the trader improve their decision-making process and trading psychology.\n\nYour analysis MUST be highly specific, technical, and directly reference elements visible in the screenshot and the provided trade data. Avoid vague or generic statements.\n\nTRADE SETUP DATA:\n- Trading Instrument: ${tradeData.tradingInstrument}\n- Timeframe: ${tradeData.timeframe}\n- Direction: ${tradeData.direction.toUpperCase()}\n- Entry Price: ${tradeData.entryPrice}\n- Stop Loss: ${tradeData.stopLoss}\n- Take Profit: ${tradeData.takeProfit}\n- Risk:Reward Ratio: 1:${riskRewardRatio.toFixed(2)}\n- Position Size: ${tradeData.positionSize} lots\n- Risk Percentage: ${tradeData.riskPercentage}%\n\nTRADER CONTEXT:\n- Trade Reasoning: "${tradeData.tradeReason}"\n- Emotional State: ${tradeData.emotionalState}\n- Confidence Level: ${tradeData.confidenceLevel}%\n- Market Conditions: ${tradeData.marketConditions}\n\nANALYSIS REQUIREMENTS:\n\n1. TECHNICAL CHART ANALYSIS (BASED SOLELY ON SCREENSHOT):\n   - **Trend Analysis**: Identify the prevailing trend (uptrend, downtrend, range-bound) on the given timeframe. Look for higher highs/lows or lower highs/lows. State explicitly if the trend is unclear.\n   - **Key Levels**: Identify significant support and resistance levels. Are these levels visible in the screenshot? Are they respected?\n   - **Chart Patterns**: Detect any recognizable chart patterns (e.g., head and shoulders, double top/bottom, triangles, flags, wedges). If none, state that.\n   - **Candlestick Analysis**: Comment on the most recent candlestick patterns around the entry/SL/TP levels. Are there any reversal or continuation patterns?\n   - **Entry Quality**: Evaluate the entry point's alignment with the trend, key levels, and any patterns. Is it a high-probability entry based on the chart?\n   - **Discrepancies**: Point out any discrepancies between the provided trade data (Entry, SL, TP) and what is visually apparent on the chart. For example, if the entry price is clearly not at a key level shown.\n\n2. RISK MANAGEMENT EVALUATION:\n   - **Stop Loss Placement**: Is the Stop Loss placed logically (e.g., below a swing low for long, above a swing high for short)? Is it too tight or too wide given the market volatility and timeframe?\n   - **Take Profit Placement**: Is the Take Profit target realistic and aligned with key levels or potential trend exhaustion? Is it too ambitious or too conservative?\n   - **Risk:Reward Ratio Quality**: Evaluate the calculated 1:${riskRewardRatio.toFixed(2)} R:R. Is it favorable for the strategy? Is it achievable based on the chart?\n   - **Position Sizing**: Comment on the risk percentage and position size. Is it appropriate for the account and the trade setup?\n\n3. PSYCHOLOGY ASSESSMENT:\n   - Evaluate the trader's emotional state and its potential impact on decision-making for this specific trade.\n   - Identify potential cognitive biases (e.g., FOMO, revenge trading, overconfidence) based on the trade reason and emotional state.\n   - Provide psychology-focused coaching insights directly related to this trade setup.\n\n4. COMPREHENSIVE SCORING:\n   - Provide an **Overall Trade Score (0-100)**. Justify this score by explicitly referencing points from the technical analysis, risk management, and psychology sections.\n\n5. COACHING FEEDBACK:\n   - **Strengths**: Highlight specific aspects the trader did well in this setup, referencing technicals, risk management, or psychology.\n   - **Areas for Improvement**: Pinpoint precise areas where the trade setup or trader's approach could be improved.\n   - **Actionable Recommendations**: Provide 3-5 concrete, numbered steps the trader can take to improve for future trades. These should be specific and implementable.\n   - **Mentoring Tone**: Maintain a supportive, encouraging, yet honest and direct tone, as an experienced mentor would.\n\nRESPONSE FORMAT:\nYour response MUST be a JSON object with the following structure. Ensure all fields are populated. If a specific pattern or level is not found, use "None identified" or "N/A".\n\n```json\n{\n  "overallScore": <number 0-100>,\n  "strengths": ["<string>", "<string>"],\n  "weaknesses": ["<string>", "<string>"],\n  "recommendations": ["<string>", "<string>"],\n  "riskAssessment": "<string>",\n  "psychologyInsights": "<string>",\n  "probabilityEstimate": <number 0-100>,\n  "aiCoachingFeedback": "<string>",\n  "technicalAnalysis": {\n    "patterns": ["<string>"],\n    "supportResistance": ["<string>"],\n    "trendAnalysis": "<string>",\n    "entryQuality": "<string>"\n  },\n  "riskManagement": {\n    "positionSizing": "<string>",\n    "riskRewardRatio": "<string>",\n    "stopLossPlacement": "<string>",\n    "takeProfitPlacement": "<string>"\n  }\n}\n```\n\nRemember: Base your visual analysis ONLY on what you can actually see in the screenshot. If certain elements aren't visible or clear, state that explicitly rather than making assumptions. The `probabilityEstimate` should be a reasonable estimate based on the overall score and your analysis, between 0-100.`

    // Call OpenAI API with vision capabilities
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: analysisPrompt
            },
            {
              type: "image_url",
              image_url: {
                url: blob.url,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 3000,
      temperature: 0.7,
      response_format: { type: "json_object" }, // Request JSON object
    })

    const aiResponseContent = completion.choices[0]?.message?.content

    if (!aiResponseContent) {
      throw new Error('No response from AI analysis')
    }

    // Parse AI response and structure the analysis
    const analysis: TradeAnalysis = JSON.parse(aiResponseContent)

    return NextResponse.json({
      success: true,
      analysis,
      screenshotUrl: blob.url,
      tradeData
    })

  } catch (error) {
    console.error('Trade Builder Analysis Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze trade',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// The parseAIResponse function is no longer needed as we are requesting JSON directly
// However, we need to ensure the client-side expects the exact JSON structure
// and handle potential parsing errors if the AI doesn't return perfect JSON.
// For now, we assume the AI will return valid JSON due to response_format.

// Dummy functions for parsing, these will be replaced by direct JSON parsing
function parseAIResponse(aiResponse: string, tradeData: any, riskRewardRatio: number): TradeAnalysis {
  // This function is a placeholder. The AI is now instructed to return JSON directly.
  // We will parse the JSON directly in the POST handler.
  // This dummy implementation is just to satisfy TypeScript for now.
  return {
    overallScore: 0,
    strengths: [],
    weaknesses: [],
    recommendations: [],
    riskAssessment: "",
    psychologyInsights: "",
    probabilityEstimate: 0,
    aiCoachingFeedback: "",
    technicalAnalysis: {
      patterns: [],
      supportResistance: [],
      trendAnalysis: "",
      entryQuality: ""
    },
    riskManagement: {
      positionSizing: "",
      riskRewardRatio: "",
      stopLossPlacement: "",
      takeProfitPlacement: ""
    }
  }
}

function generateStrengths(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] { return [] }
function generateWeaknesses(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] { return [] }
function generateRecommendations(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] { return [] }
function generateRiskAssessment(tradeData: any, riskRewardRatio: number): string { return "" }
function generatePsychologyInsights(tradeData: any, aiResponse: string): string { return "" }
function extractCoachingFeedback(aiResponse: string): string { return "" }
function extractPatterns(aiResponse: string): string[] { return [] }
function extractSupportResistance(aiResponse: string): string[] { return [] }
function extractTrendAnalysis(aiResponse: string): string { return "" }
function assessEntryQuality(tradeData: any, riskRewardRatio: number): string { return "" }
function assessPositionSizing(tradeData: any): string { return "" }
function assessStopLossPlacement(tradeData: any): string { return "" }
function assessTakeProfitPlacement(tradeData: any): string { return "" }


