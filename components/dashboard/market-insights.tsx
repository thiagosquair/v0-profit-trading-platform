"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, AlertTriangle, Brain, Globe, Clock, Users } from "lucide-react"

export function MarketInsights() {
  const [liveData, setLiveData] = useState({
    fearGreedIndex: 65,
    marketSentiment: "Bullish",
    volatilityIndex: 23.5,
    majorPairs: [
      { pair: "EUR/USD", sentiment: "Bullish", strength: 75, change: "+0.45%" },
      { pair: "GBP/USD", sentiment: "Bearish", strength: 35, change: "-0.23%" },
      { pair: "USD/JPY", sentiment: "Neutral", strength: 50, change: "+0.12%" },
      { pair: "AUD/USD", sentiment: "Bullish", strength: 68, change: "+0.31%" },
    ],
  })

  const psychologyIndicators = [
    {
      name: "Market Fear & Greed",
      value: 65,
      status: "Greed",
      description: "Markets showing signs of overconfidence",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      name: "Retail Sentiment",
      value: 78,
      status: "Extreme Bullish",
      description: "High retail participation, potential reversal signal",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      name: "Institutional Flow",
      value: 45,
      status: "Neutral",
      description: "Balanced institutional positioning",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Volatility Expectation",
      value: 32,
      status: "Low",
      description: "Markets expecting calm conditions",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  const newsImpact = [
    {
      time: "2 hours ago",
      event: "Fed Chair Speech",
      impact: "High",
      sentiment: "Hawkish",
      pairs: ["USD/EUR", "USD/GBP", "USD/JPY"],
      psychologyNote: "Increased uncertainty may lead to risk-off behavior",
    },
    {
      time: "4 hours ago",
      event: "ECB Rate Decision",
      impact: "Medium",
      sentiment: "Neutral",
      pairs: ["EUR/USD", "EUR/GBP"],
      psychologyNote: "As expected, minimal psychological impact",
    },
    {
      time: "6 hours ago",
      event: "US Employment Data",
      impact: "High",
      sentiment: "Positive",
      pairs: ["USD/CAD", "USD/AUD"],
      psychologyNote: "Strong data boosting USD confidence",
    },
  ]

  const tradingTips = [
    {
      title: "High Greed Alert",
      description: "Current fear & greed index suggests overconfidence. Consider contrarian positions.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      title: "Low Volatility Environment",
      description: "Perfect conditions for range trading strategies. Avoid breakout trades.",
      type: "info",
      icon: Activity,
    },
    {
      title: "Retail Sentiment Extreme",
      description: "78% retail bullish - historically a contrarian signal. Exercise caution.",
      type: "danger",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Live Insights</h1>
          <p className="text-muted-foreground mt-2">Real-time market psychology and sentiment analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="news">News Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fear & Greed</p>
                    <p className="text-2xl font-bold">{liveData.fearGreedIndex}</p>
                    <p className="text-sm text-orange-600">Greed Zone</p>
                  </div>
                  <Brain className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Market Sentiment</p>
                    <p className="text-2xl font-bold">{liveData.marketSentiment}</p>
                    <p className="text-sm text-green-600">+2.3% today</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Volatility Index</p>
                    <p className="text-2xl font-bold">{liveData.volatilityIndex}</p>
                    <p className="text-sm text-blue-600">Low volatility</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Pairs</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-sm text-purple-600">High activity</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Major Pairs Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle>Major Pairs Sentiment</CardTitle>
              <CardDescription>Real-time sentiment analysis for major currency pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveData.majorPairs.map((pair) => (
                  <div key={pair.pair} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-semibold">{pair.pair}</div>
                      <Badge
                        variant={
                          pair.sentiment === "Bullish"
                            ? "default"
                            : pair.sentiment === "Bearish"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {pair.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Strength</div>
                        <Progress value={pair.strength} className="w-20" />
                      </div>
                      <div
                        className={`font-semibold ${pair.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                      >
                        {pair.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {psychologyIndicators.map((indicator) => (
              <Card key={indicator.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{indicator.name}</span>
                    <Badge className={`${indicator.bgColor} ${indicator.color}`}>{indicator.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Level</span>
                        <span className="font-semibold">{indicator.value}</span>
                      </div>
                      <Progress value={indicator.value} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trading Psychology Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Psychology-Based Trading Tips</CardTitle>
              <CardDescription>AI-generated insights based on current market psychology</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <tip.icon
                      className={`h-5 w-5 mt-0.5 ${
                        tip.type === "warning"
                          ? "text-orange-500"
                          : tip.type === "danger"
                            ? "text-red-500"
                            : "text-blue-500"
                      }`}
                    />
                    <div>
                      <h4 className="font-semibold">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Retail vs Institutional Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Retail Traders</span>
                      <span className="text-sm font-semibold">78% Bullish</span>
                    </div>
                    <Progress value={78} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">
                      High retail bullishness often signals market tops
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Institutional</span>
                      <span className="text-sm font-semibold">45% Bullish</span>
                    </div>
                    <Progress value={45} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Institutions remain cautious despite retail optimism
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Divergence Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-orange-700">High Divergence Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Large gap between retail (78% bullish) and institutional (45% bullish) sentiment suggests potential
                    market reversal.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">
                      <strong>Psychology Insight:</strong> When retail sentiment is extremely bullish while institutions
                      remain neutral, it often indicates market euphoria and potential correction ahead.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>News Impact & Psychology Analysis</CardTitle>
              <CardDescription>How recent news events are affecting market psychology</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {newsImpact.map((news, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{news.event}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{news.time}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant={news.impact === "High" ? "destructive" : "secondary"}>
                          {news.impact} Impact
                        </Badge>
                        <Badge variant="outline">{news.sentiment}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Affected Pairs: </span>
                        <span className="text-sm text-muted-foreground">{news.pairs.join(", ")}</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <div className="flex items-start space-x-2">
                          <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-blue-800">Psychology Note: </span>
                            <span className="text-sm text-blue-700">{news.psychologyNote}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
