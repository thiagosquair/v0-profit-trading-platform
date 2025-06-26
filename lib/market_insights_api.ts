import { NextRequest, NextResponse } from 'next/server'

// Data models based on our design
interface OverviewData {
  fearGreedIndex: {
    value: number
    sentiment: string
    change?: number
  }
  marketSentiment: {
    overall: string
    change?: number
  }
  volatilityIndex: {
    value: number
    description: string
  }
  tradingOpportunities: {
    count: number
    description: string
  }
}

interface SentimentAnalysisData {
  overallSentiment: {
    score: number
    label: string
  }
  sentimentByAsset?: {
    asset: string
    score: number
    newsCount: number
    socialMentionCount: number
  }[]
  topKeywords?: {
    keyword: string
    sentiment: string
    relevance: number
  }[]
}

interface MarketNewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
  sentiment?: {
    score: number
    label: string
  }
  relatedTickers?: string[]
}

interface MarketNewsData {
  news: MarketNewsItem[]
  totalResults: number
}

interface PsychologyIndicator {
  name: string
  value: number
  scale: string
  description: string
  trend?: string
  insights?: string
}

interface PsychologyIndicatorsData {
  indicators: PsychologyIndicator[]
  overallPsychologySummary?: string
}

// Helper function to fetch Fear & Greed Index
async function fetchFearGreedIndex(): Promise<{ value: number; sentiment: string; change?: number }> {
  try {
    // For now, we'll use a mock implementation
    // In production, this would call the actual API (e.g., RapidAPI Fear & Greed Index)
    const mockValue = Math.floor(Math.random() * 100)
    let sentiment = "Neutral"
    
    if (mockValue < 25) sentiment = "Extreme Fear"
    else if (mockValue < 45) sentiment = "Fear"
    else if (mockValue < 55) sentiment = "Neutral"
    else if (mockValue < 75) sentiment = "Greed"
    else sentiment = "Extreme Greed"
    
    return {
      value: mockValue,
      sentiment,
      change: Math.random() * 10 - 5 // Random change between -5 and +5
    }
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error)
    return { value: 50, sentiment: "Neutral" }
  }
}

// Helper function to fetch VIX (Volatility Index)
async function fetchVolatilityIndex(): Promise<{ value: number; description: string }> {
  try {
    // Mock implementation - in production, use Polygon.io or similar
    const mockVix = Math.random() * 50 + 10 // Random value between 10-60
    let description = "Normal Volatility"
    
    if (mockVix < 20) description = "Low Volatility Index"
    else if (mockVix > 30) description = "High Volatility Index"
    
    return {
      value: parseFloat(mockVix.toFixed(1)),
      description
    }
  } catch (error) {
    console.error('Error fetching Volatility Index:', error)
    return { value: 20.0, description: "Normal Volatility" }
  }
}

// Helper function to fetch market sentiment
async function fetchMarketSentiment(): Promise<{ overall: string; change?: number }> {
  try {
    // Mock implementation - in production, use Finnhub or similar
    const sentiments = ["Bullish", "Bearish", "Neutral"]
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
    
    return {
      overall: randomSentiment,
      change: Math.random() * 6 - 3 // Random change between -3% and +3%
    }
  } catch (error) {
    console.error('Error fetching Market Sentiment:', error)
    return { overall: "Neutral" }
  }
}

// Helper function to fetch trading opportunities
async function fetchTradingOpportunities(): Promise<{ count: number; description: string }> {
  try {
    // Mock implementation - in production, use algorithmic analysis or market data
    const count = Math.floor(Math.random() * 20) + 5 // Random between 5-25
    const descriptions = [
      "High Confidence Level",
      "Emerging Opportunities",
      "Moderate Risk Opportunities",
      "Conservative Opportunities"
    ]
    
    return {
      count,
      description: descriptions[Math.floor(Math.random() * descriptions.length)]
    }
  } catch (error) {
    console.error('Error fetching Trading Opportunities:', error)
    return { count: 10, description: "Moderate Opportunities" }
  }
}

// Helper function to fetch sentiment analysis data
async function fetchSentimentAnalysis(): Promise<SentimentAnalysisData> {
  try {
    // Mock implementation - in production, use Finnhub, Polygon.io, or similar
    const overallScore = Math.random() * 2 - 1 // Random between -1 and 1
    let label = "Neutral"
    
    if (overallScore < -0.5) label = "Strongly Negative"
    else if (overallScore < -0.1) label = "Slightly Negative"
    else if (overallScore > 0.5) label = "Strongly Positive"
    else if (overallScore > 0.1) label = "Slightly Positive"
    
    return {
      overallSentiment: {
        score: parseFloat(overallScore.toFixed(2)),
        label
      },
      sentimentByAsset: [
        { asset: "AAPL", score: 0.6, newsCount: 15, socialMentionCount: 1250 },
        { asset: "TSLA", score: -0.2, newsCount: 8, socialMentionCount: 890 },
        { asset: "NVDA", score: 0.8, newsCount: 12, socialMentionCount: 2100 }
      ],
      topKeywords: [
        { keyword: "earnings", sentiment: "positive", relevance: 0.9 },
        { keyword: "inflation", sentiment: "negative", relevance: 0.7 },
        { keyword: "growth", sentiment: "positive", relevance: 0.8 }
      ]
    }
  } catch (error) {
    console.error('Error fetching Sentiment Analysis:', error)
    return {
      overallSentiment: { score: 0, label: "Neutral" }
    }
  }
}

// Helper function to fetch market news
async function fetchMarketNews(): Promise<MarketNewsData> {
  try {
    // Mock implementation - in production, use Finnhub, Marketaux, or similar
    const mockNews: MarketNewsItem[] = [
      {
        id: "1",
        title: "Federal Reserve Signals Potential Rate Changes",
        summary: "The Federal Reserve indicated possible adjustments to interest rates in response to recent economic data.",
        url: "https://example.com/news/1",
        source: "Reuters",
        publishedAt: new Date().toISOString(),
        sentiment: { score: -0.3, label: "slightly negative" },
        relatedTickers: ["SPY", "QQQ"]
      },
      {
        id: "2",
        title: "Tech Stocks Rally on AI Optimism",
        summary: "Major technology companies saw significant gains as investors remain optimistic about AI developments.",
        url: "https://example.com/news/2",
        source: "Bloomberg",
        publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        sentiment: { score: 0.7, label: "positive" },
        relatedTickers: ["AAPL", "MSFT", "NVDA"]
      },
      {
        id: "3",
        title: "Energy Sector Shows Mixed Results",
        summary: "Oil and gas companies reported varied quarterly results amid changing market conditions.",
        url: "https://example.com/news/3",
        source: "CNBC",
        publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        sentiment: { score: 0.1, label: "neutral" },
        relatedTickers: ["XOM", "CVX"]
      }
    ]
    
    return {
      news: mockNews,
      totalResults: mockNews.length
    }
  } catch (error) {
    console.error('Error fetching Market News:', error)
    return { news: [], totalResults: 0 }
  }
}

// Helper function to fetch psychology indicators
async function fetchPsychologyIndicators(): Promise<PsychologyIndicatorsData> {
  try {
    // Mock implementation - in production, use specialized psychology APIs or internal data
    const indicators: PsychologyIndicator[] = [
      {
        name: "Trader Confidence",
        value: Math.floor(Math.random() * 40) + 60, // 60-100
        scale: "0-100",
        description: "Overall confidence level among retail traders",
        trend: "increasing",
        insights: "Confidence has been steadily rising due to recent market stability."
      },
      {
        name: "Risk Appetite",
        value: Math.floor(Math.random() * 30) + 40, // 40-70
        scale: "0-100",
        description: "Willingness to take on market risk",
        trend: "stable",
        insights: "Risk appetite remains moderate with slight preference for defensive positions."
      },
      {
        name: "FOMO Index",
        value: Math.floor(Math.random() * 50) + 25, // 25-75
        scale: "0-100",
        description: "Fear of missing out on market opportunities",
        trend: "decreasing",
        insights: "FOMO levels have decreased as markets have stabilized."
      }
    ]
    
    return {
      indicators,
      overallPsychologySummary: "Market psychology shows cautious optimism with moderate risk appetite and stable confidence levels."
    }
  } catch (error) {
    console.error('Error fetching Psychology Indicators:', error)
    return {
      indicators: [],
      overallPsychologySummary: "Unable to load psychology indicators at this time."
    }
  }
}

// API Routes

// GET /api/market-insights/overview
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint')
  
  try {
    switch (endpoint) {
      case 'overview':
        const [fearGreed, volatility, sentiment, opportunities] = await Promise.all([
          fetchFearGreedIndex(),
          fetchVolatilityIndex(),
          fetchMarketSentiment(),
          fetchTradingOpportunities()
        ])
        
        const overviewData: OverviewData = {
          fearGreedIndex: fearGreed,
          marketSentiment: sentiment,
          volatilityIndex: volatility,
          tradingOpportunities: opportunities
        }
        
        return NextResponse.json({ success: true, data: overviewData })
        
      case 'sentiment':
        const sentimentData = await fetchSentimentAnalysis()
        return NextResponse.json({ success: true, data: sentimentData })
        
      case 'news':
        const newsData = await fetchMarketNews()
        return NextResponse.json({ success: true, data: newsData })
        
      case 'psychology':
        const psychologyData = await fetchPsychologyIndicators()
        return NextResponse.json({ success: true, data: psychologyData })
        
      default:
        return NextResponse.json(
          { error: 'Invalid endpoint. Use: overview, sentiment, news, or psychology' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Market Insights API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch market insights data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

