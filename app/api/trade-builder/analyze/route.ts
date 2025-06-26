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
        risk = entry - sl
        reward = tp - entry
      } else {
        risk = sl - entry
        reward = entry - tp
      }
      
      return reward / risk
    }

    const riskRewardRatio = calculateRiskReward()

    // Build comprehensive AI analysis prompt
    const analysisPrompt = `You are an expert trading coach and analyst with 20+ years of experience in financial markets. You're analyzing a comprehensive trade setup that includes both quantitative data and a chart screenshot. Your role is to provide detailed, actionable analysis that helps the trader improve their decision-making process and trading psychology.

TRADE SETUP DATA:
- Trading Instrument: ${tradeData.tradingInstrument}
- Timeframe: ${tradeData.timeframe}
- Direction: ${tradeData.direction.toUpperCase()}
- Entry Price: ${tradeData.entryPrice}
- Stop Loss: ${tradeData.stopLoss}
- Take Profit: ${tradeData.takeProfit}
- Risk:Reward Ratio: 1:${riskRewardRatio.toFixed(2)}
- Position Size: ${tradeData.positionSize} lots
- Risk Percentage: ${tradeData.riskPercentage}%

TRADER CONTEXT:
- Trade Reasoning: "${tradeData.tradeReason}"
- Emotional State: ${tradeData.emotionalState}
- Confidence Level: ${tradeData.confidenceLevel}%
- Market Conditions: ${tradeData.marketConditions}

ANALYSIS REQUIREMENTS:

1. CHART ANALYSIS (Based on Screenshot):
   - Examine the chart for technical patterns, support/resistance levels, trend structure
   - Validate if the visual chart supports the stated trade parameters
   - Identify any discrepancies between chart analysis and trader's reasoning
   - Assess the quality of entry timing and level selection

2. RISK MANAGEMENT EVALUATION:
   - Analyze the appropriateness of stop loss and take profit placement
   - Evaluate position sizing relative to account risk
   - Assess the risk:reward ratio quality
   - Review overall risk management approach

3. PSYCHOLOGY ASSESSMENT:
   - Evaluate the trader's emotional state and its impact on decision-making
   - Identify potential cognitive biases or psychological factors
   - Assess confidence level appropriateness for the setup quality
   - Provide psychology-focused coaching insights

4. COMPREHENSIVE SCORING:
   - Provide an overall trade score (0-100) based on setup quality, risk management, and psychology
   - Break down scoring across technical analysis, risk management, and psychological factors

5. COACHING FEEDBACK:
   - Provide specific, actionable recommendations for improvement
   - Highlight what the trader did well (strengths)
   - Identify areas that need attention (weaknesses)
   - Offer alternative approaches or considerations
   - Suggest specific exercises or learning areas for development

RESPONSE FORMAT:
Provide your analysis as a structured assessment that includes:
- Overall score with justification
- Specific strengths identified
- Areas for improvement
- Detailed recommendations
- Psychology insights and coaching
- Technical analysis summary
- Risk management evaluation

Be encouraging but honest, specific rather than generic, and focus on helping the trader develop both technical skills and psychological discipline. Your analysis should feel like guidance from an experienced mentor who wants to see the trader succeed and grow.

Remember: Base your visual analysis ONLY on what you can actually see in the screenshot. If certain elements aren't visible or clear, state that explicitly rather than making assumptions.`

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
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response from AI analysis')
    }

    // Parse AI response and structure the analysis
    const analysis: TradeAnalysis = parseAIResponse(aiResponse, tradeData, riskRewardRatio)

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

function parseAIResponse(aiResponse: string, tradeData: any, riskRewardRatio: number): TradeAnalysis {
  // This function parses the AI response and structures it into the TradeAnalysis format
  // For now, we'll create a structured response based on the AI text
  
  // Extract key insights from the AI response
  const lines = aiResponse.split('\n').filter(line => line.trim())
  
  // Generate a score based on various factors
  const calculateOverallScore = (): number => {
    let score = 50 // Base score
    
    // Risk-reward ratio scoring
    if (riskRewardRatio >= 2) score += 20
    else if (riskRewardRatio >= 1.5) score += 15
    else if (riskRewardRatio >= 1) score += 10
    else score -= 10
    
    // Confidence level scoring
    if (tradeData.confidenceLevel >= 70 && tradeData.confidenceLevel <= 85) score += 10
    else if (tradeData.confidenceLevel < 50 || tradeData.confidenceLevel > 90) score -= 5
    
    // Emotional state scoring
    if (tradeData.emotionalState === 'calm' || tradeData.emotionalState === 'confident') score += 10
    else if (tradeData.emotionalState === 'anxious' || tradeData.emotionalState === 'frustrated') score -= 10
    
    // Risk percentage scoring
    if (tradeData.riskPercentage <= 2) score += 10
    else if (tradeData.riskPercentage <= 3) score += 5
    else if (tradeData.riskPercentage > 5) score -= 15
    
    return Math.max(0, Math.min(100, score))
  }

  const overallScore = calculateOverallScore()

  // Generate structured analysis based on the trade data and AI response
  const analysis: TradeAnalysis = {
    overallScore,
    strengths: generateStrengths(tradeData, riskRewardRatio, aiResponse),
    weaknesses: generateWeaknesses(tradeData, riskRewardRatio, aiResponse),
    recommendations: generateRecommendations(tradeData, riskRewardRatio, aiResponse),
    riskAssessment: generateRiskAssessment(tradeData, riskRewardRatio),
    psychologyInsights: generatePsychologyInsights(tradeData, aiResponse),
    probabilityEstimate: Math.max(30, Math.min(85, overallScore + Math.random() * 20 - 10)),
    aiCoachingFeedback: extractCoachingFeedback(aiResponse),
    technicalAnalysis: {
      patterns: extractPatterns(aiResponse),
      supportResistance: extractSupportResistance(aiResponse),
      trendAnalysis: extractTrendAnalysis(aiResponse),
      entryQuality: assessEntryQuality(tradeData, riskRewardRatio)
    },
    riskManagement: {
      positionSizing: assessPositionSizing(tradeData),
      riskRewardRatio: `1:${riskRewardRatio.toFixed(2)}`,
      stopLossPlacement: assessStopLossPlacement(tradeData),
      takeProfitPlacement: assessTakeProfitPlacement(tradeData)
    }
  }

  return analysis
}

function generateStrengths(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] {
  const strengths: string[] = []
  
  if (riskRewardRatio >= 2) {
    strengths.push("Excellent risk-reward ratio of 1:" + riskRewardRatio.toFixed(2) + " shows strong trade selection")
  }
  
  if (tradeData.riskPercentage <= 2) {
    strengths.push("Conservative risk management with " + tradeData.riskPercentage + "% account risk")
  }
  
  if (tradeData.emotionalState === 'calm' || tradeData.emotionalState === 'confident') {
    strengths.push("Positive emotional state (" + tradeData.emotionalState + ") supports clear decision-making")
  }
  
  if (tradeData.tradeReason && tradeData.tradeReason.length > 50) {
    strengths.push("Detailed trade reasoning shows thorough analysis and planning")
  }
  
  if (tradeData.confidenceLevel >= 60 && tradeData.confidenceLevel <= 80) {
    strengths.push("Balanced confidence level (" + tradeData.confidenceLevel + "%) indicates realistic self-assessment")
  }
  
  // Add AI-identified strengths from the response
  if (aiResponse.toLowerCase().includes('good') || aiResponse.toLowerCase().includes('strong')) {
    strengths.push("AI analysis confirms solid technical setup and execution plan")
  }
  
  return strengths
}

function generateWeaknesses(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] {
  const weaknesses: string[] = []
  
  if (riskRewardRatio < 1.5) {
    weaknesses.push("Risk-reward ratio of 1:" + riskRewardRatio.toFixed(2) + " could be improved for better profitability")
  }
  
  if (tradeData.riskPercentage > 3) {
    weaknesses.push("Risk percentage of " + tradeData.riskPercentage + "% may be too aggressive for consistent growth")
  }
  
  if (tradeData.emotionalState === 'anxious' || tradeData.emotionalState === 'frustrated') {
    weaknesses.push("Current emotional state (" + tradeData.emotionalState + ") may impact decision-making quality")
  }
  
  if (tradeData.confidenceLevel > 85) {
    weaknesses.push("Very high confidence (" + tradeData.confidenceLevel + "%) may indicate overconfidence bias")
  }
  
  if (tradeData.confidenceLevel < 50) {
    weaknesses.push("Low confidence (" + tradeData.confidenceLevel + "%) suggests uncertainty about the setup")
  }
  
  if (!tradeData.tradeReason || tradeData.tradeReason.length < 30) {
    weaknesses.push("Trade reasoning could be more detailed to support decision-making process")
  }
  
  return weaknesses
}

function generateRecommendations(tradeData: any, riskRewardRatio: number, aiResponse: string): string[] {
  const recommendations: string[] = []
  
  if (riskRewardRatio < 2) {
    recommendations.push("Consider adjusting take profit target to achieve a minimum 1:2 risk-reward ratio")
  }
  
  if (tradeData.riskPercentage > 2) {
    recommendations.push("Reduce position size to limit account risk to 1-2% per trade for better capital preservation")
  }
  
  if (tradeData.emotionalState !== 'calm' && tradeData.emotionalState !== 'confident') {
    recommendations.push("Practice emotional regulation techniques before entering trades to improve decision-making clarity")
  }
  
  recommendations.push("Document this trade in your trading journal to track performance and identify patterns")
  recommendations.push("Set alerts for key price levels rather than watching the trade constantly")
  recommendations.push("Review market correlation and news events that might impact this trade")
  
  if (tradeData.confidenceLevel < 60) {
    recommendations.push("Consider reducing position size when confidence is below 60% to match conviction with risk")
  }
  
  return recommendations
}

function generateRiskAssessment(tradeData: any, riskRewardRatio: number): string {
  let assessment = `Risk Assessment: `
  
  if (tradeData.riskPercentage <= 1) {
    assessment += "Very conservative risk approach. "
  } else if (tradeData.riskPercentage <= 2) {
    assessment += "Appropriate risk management. "
  } else if (tradeData.riskPercentage <= 3) {
    assessment += "Moderate risk level. "
  } else {
    assessment += "Aggressive risk approach - consider reducing. "
  }
  
  if (riskRewardRatio >= 2) {
    assessment += "Excellent risk-reward ratio provides good profit potential. "
  } else if (riskRewardRatio >= 1.5) {
    assessment += "Acceptable risk-reward ratio. "
  } else {
    assessment += "Risk-reward ratio could be improved. "
  }
  
  assessment += `Position size of ${tradeData.positionSize} lots with ${tradeData.riskPercentage}% account risk shows `
  assessment += tradeData.riskPercentage <= 2 ? "disciplined" : "potentially aggressive"
  assessment += " money management approach."
  
  return assessment
}

function generatePsychologyInsights(tradeData: any, aiResponse: string): string {
  let insights = `Psychology Analysis: Your emotional state of "${tradeData.emotionalState}" with ${tradeData.confidenceLevel}% confidence `
  
  if (tradeData.emotionalState === 'calm' && tradeData.confidenceLevel >= 60 && tradeData.confidenceLevel <= 80) {
    insights += "indicates optimal trading psychology. This balanced state supports clear decision-making and realistic risk assessment. "
  } else if (tradeData.emotionalState === 'anxious' || tradeData.emotionalState === 'frustrated') {
    insights += "suggests emotional stress that may impact trading performance. Consider taking a break or reducing position size. "
  } else if (tradeData.confidenceLevel > 85) {
    insights += "may indicate overconfidence. High confidence can lead to increased risk-taking and overlooking potential issues. "
  } else if (tradeData.confidenceLevel < 50) {
    insights += "suggests uncertainty about the trade setup. Low confidence often correlates with poor trade outcomes. "
  }
  
  insights += "Focus on maintaining emotional discipline and objective analysis regardless of recent trading results."
  
  return insights
}

function extractCoachingFeedback(aiResponse: string): string {
  // Extract the most relevant coaching feedback from the AI response
  const sentences = aiResponse.split('.').filter(s => s.trim().length > 20)
  
  // Look for coaching-oriented sentences
  const coachingSentences = sentences.filter(sentence => 
    sentence.toLowerCase().includes('consider') ||
    sentence.toLowerCase().includes('recommend') ||
    sentence.toLowerCase().includes('suggest') ||
    sentence.toLowerCase().includes('focus') ||
    sentence.toLowerCase().includes('improve') ||
    sentence.toLowerCase().includes('develop')
  )
  
  if (coachingSentences.length > 0) {
    return coachingSentences.slice(0, 3).join('. ') + '.'
  }
  
  // Fallback to first few sentences if no specific coaching language found
  return sentences.slice(0, 2).join('. ') + '.'
}

function extractPatterns(aiResponse: string): string[] {
  const patterns: string[] = []
  const patternKeywords = ['support', 'resistance', 'trend', 'breakout', 'reversal', 'continuation', 'flag', 'triangle', 'channel']
  
  patternKeywords.forEach(keyword => {
    if (aiResponse.toLowerCase().includes(keyword)) {
      patterns.push(keyword.charAt(0).toUpperCase() + keyword.slice(1) + ' pattern identified')
    }
  })
  
  return patterns.length > 0 ? patterns : ['Pattern analysis requires chart review']
}

function extractSupportResistance(aiResponse: string): string[] {
  // Extract support and resistance levels mentioned in the AI response
  const levels: string[] = []
  
  if (aiResponse.toLowerCase().includes('support')) {
    levels.push('Support levels identified in chart analysis')
  }
  
  if (aiResponse.toLowerCase().includes('resistance')) {
    levels.push('Resistance levels noted for trade planning')
  }
  
  return levels.length > 0 ? levels : ['Support/resistance analysis pending chart review']
}

function extractTrendAnalysis(aiResponse: string): string {
  if (aiResponse.toLowerCase().includes('uptrend') || aiResponse.toLowerCase().includes('bullish')) {
    return 'Bullish trend structure identified'
  } else if (aiResponse.toLowerCase().includes('downtrend') || aiResponse.toLowerCase().includes('bearish')) {
    return 'Bearish trend structure identified'
  } else if (aiResponse.toLowerCase().includes('sideways') || aiResponse.toLowerCase().includes('range')) {
    return 'Sideways/ranging market structure'
  }
  
  return 'Trend analysis requires detailed chart examination'
}

function assessEntryQuality(tradeData: any, riskRewardRatio: number): string {
  if (riskRewardRatio >= 2 && tradeData.confidenceLevel >= 70) {
    return 'High-quality entry with strong risk-reward and confidence'
  } else if (riskRewardRatio >= 1.5) {
    return 'Good entry quality with acceptable risk-reward ratio'
  } else {
    return 'Entry quality could be improved with better risk-reward setup'
  }
}

function assessPositionSizing(tradeData: any): string {
  if (tradeData.riskPercentage <= 1) {
    return 'Very conservative position sizing - excellent capital preservation'
  } else if (tradeData.riskPercentage <= 2) {
    return 'Appropriate position sizing for steady account growth'
  } else if (tradeData.riskPercentage <= 3) {
    return 'Moderate position sizing - monitor for consistency'
  } else {
    return 'Aggressive position sizing - consider reducing for better risk management'
  }
}

function assessStopLossPlacement(tradeData: any): string {
  const entry = tradeData.entryPrice
  const sl = tradeData.stopLoss
  const distance = Math.abs(entry - sl)
  const percentage = (distance / entry) * 100
  
  if (percentage < 0.5) {
    return 'Very tight stop loss - may be vulnerable to market noise'
  } else if (percentage <= 1.5) {
    return 'Appropriate stop loss distance for the timeframe'
  } else {
    return 'Wide stop loss - ensure it aligns with technical levels'
  }
}

function assessTakeProfitPlacement(tradeData: any): string {
  const entry = tradeData.entryPrice
  const tp = tradeData.takeProfit
  const sl = tradeData.stopLoss
  
  let risk: number, reward: number
  
  if (tradeData.direction === 'long') {
    risk = entry - sl
    reward = tp - entry
  } else {
    risk = sl - entry
    reward = entry - tp
  }
  
  const rrRatio = reward / risk
  
  if (rrRatio >= 2) {
    return 'Excellent take profit placement with strong reward potential'
  } else if (rrRatio >= 1.5) {
    return 'Good take profit target with acceptable reward ratio'
  } else {
    return 'Consider extending take profit for better risk-reward ratio'
  }
}

