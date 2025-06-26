"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { RefreshCw, TrendingUp, TrendingDown, Activity, Brain, Newspaper, BarChart3 } from 'lucide-react'

// Data models (matching our backend API)
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

export default function MarketInsights() {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  // State for each data type
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null)
  const [sentimentData, setSentimentData] = useState<SentimentAnalysisData | null>(null)
  const [newsData, setNewsData] = useState<MarketNewsData | null>(null)
  const [psychologyData, setPsychologyData] = useState<PsychologyIndicatorsData | null>(null)

  // Fetch data from our API
  const fetchData = async (endpoint: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/market-insights?endpoint=${endpoint}`)
      const result = await response.json()
      
      if (result.success) {
        switch (endpoint) {
          case 'overview':
            setOverviewData(result.data)
            break
          case 'sentiment':
            setSentimentData(result.data)
            break
          case 'news':
            setNewsData(result.data)
            break
          case 'psychology':
            setPsychologyData(result.data)
            break
        }
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error)
    } finally {
      setLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    fetchData('overview')
  }, [])

  // Load data when tab changes
  useEffect(() => {
    switch (activeTab) {
      case 'overview':
        if (!overviewData) fetchData('overview')
        break
      case 'sentiment':
        if (!sentimentData) fetchData('sentiment')
        break
      case 'news':
        if (!newsData) fetchData('news')
        break
      case 'psychology':
        if (!psychologyData) fetchData('psychology')
        break
    }
  }, [activeTab])

  const refreshCurrentTab = () => {
    fetchData(activeTab)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getSentimentColor = (sentiment: string) => {
    const lower = sentiment.toLowerCase()
    if (lower.includes('bullish') || lower.includes('positive') || lower.includes('greed')) {
      return 'text-green-600'
    } else if (lower.includes('bearish') || lower.includes('negative') || lower.includes('fear')) {
      return 'text-red-600'
    }
    return 'text-gray-600'
  }

  const getSentimentBadgeVariant = (sentiment: string) => {
    const lower = sentiment.toLowerCase()
    if (lower.includes('bullish') || lower.includes('positive') || lower.includes('greed')) {
      return 'default' // Green-ish
    } else if (lower.includes('bearish') || lower.includes('negative') || lower.includes('fear')) {
      return 'destructive' // Red-ish
    }
    return 'secondary' // Gray
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Insights</h1>
          <p className="text-muted-foreground">Real-time market psychology and sentiment analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Last updated: {formatTime(lastUpdated)}
          </span>
          <Button 
            onClick={refreshCurrentTab} 
            disabled={loading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Sentiment Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center space-x-2">
            <Newspaper className="h-4 w-4" />
            <span>Market News</span>
          </TabsTrigger>
          <TabsTrigger value="psychology" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Psychology Indicators</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {loading && !overviewData ? (
            <div className="text-center py-8">Loading overview data...</div>
          ) : overviewData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fear & Greed Index */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Fear & Greed Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewData.fearGreedIndex.value}</div>
                  <div className={`text-sm ${getSentimentColor(overviewData.fearGreedIndex.sentiment)}`}>
                    {overviewData.fearGreedIndex.sentiment}
                  </div>
                  <Progress value={overviewData.fearGreedIndex.value} className="mt-2" />
                  {overviewData.fearGreedIndex.change && (
                    <div className="flex items-center mt-2 text-xs">
                      {overviewData.fearGreedIndex.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      {overviewData.fearGreedIndex.change > 0 ? '+' : ''}{overviewData.fearGreedIndex.change.toFixed(1)}% Today
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Market Sentiment */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getSentimentColor(overviewData.marketSentiment.overall)}`}>
                    {overviewData.marketSentiment.overall}
                  </div>
                  {overviewData.marketSentiment.change && (
                    <div className="flex items-center mt-2 text-xs">
                      {overviewData.marketSentiment.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      {overviewData.marketSentiment.change > 0 ? '+' : ''}{overviewData.marketSentiment.change.toFixed(1)}% Today
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Volatility Index */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Volatility Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewData.volatilityIndex.value}</div>
                  <div className="text-sm text-muted-foreground">{overviewData.volatilityIndex.description}</div>
                </CardContent>
              </Card>

              {/* Trading Opportunities */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trading Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overviewData.tradingOpportunities.count}</div>
                  <div className="text-sm text-muted-foreground">{overviewData.tradingOpportunities.description}</div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No overview data available</div>
          )}
        </TabsContent>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          {loading && !sentimentData ? (
            <div className="text-center py-8">Loading sentiment analysis...</div>
          ) : sentimentData ? (
            <div className="space-y-6">
              {/* Overall Sentiment */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Market Sentiment</CardTitle>
                  <CardDescription>Aggregated sentiment from news and social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold">{sentimentData.overallSentiment.score.toFixed(2)}</div>
                    <Badge variant={getSentimentBadgeVariant(sentimentData.overallSentiment.label)}>
                      {sentimentData.overallSentiment.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment by Asset */}
              {sentimentData.sentimentByAsset && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment by Asset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sentimentData.sentimentByAsset.map((asset) => (
                        <div key={asset.asset} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{asset.asset}</div>
                            <div className="text-sm text-muted-foreground">
                              {asset.newsCount} news • {asset.socialMentionCount} mentions
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${asset.score > 0 ? 'text-green-600' : asset.score < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                              {asset.score > 0 ? '+' : ''}{asset.score.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Top Keywords */}
              {sentimentData.topKeywords && (
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Keywords</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sentimentData.topKeywords.map((keyword, index) => (
                        <Badge 
                          key={index} 
                          variant={getSentimentBadgeVariant(keyword.sentiment)}
                          className="text-sm"
                        >
                          {keyword.keyword} ({(keyword.relevance * 100).toFixed(0)}%)
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No sentiment data available</div>
          )}
        </TabsContent>

        {/* Market News Tab */}
        <TabsContent value="news" className="space-y-6">
          {loading && !newsData ? (
            <div className="text-center py-8">Loading market news...</div>
          ) : newsData ? (
            <div className="space-y-4">
              {newsData.news.map((article) => (
                <Card key={article.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                        {article.sentiment && (
                          <Badge variant={getSentimentBadgeVariant(article.sentiment.label)} className="ml-2">
                            {article.sentiment.label}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{article.summary}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{article.source}</span>
                          <span>{new Date(article.publishedAt).toLocaleString()}</span>
                        </div>
                        {article.relatedTickers && (
                          <div className="flex space-x-1">
                            {article.relatedTickers.map((ticker) => (
                              <Badge key={ticker} variant="outline" className="text-xs">
                                {ticker}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          Read Full Article
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) :
(Content truncated due to size limit. Use line ranges to read in chunks)
