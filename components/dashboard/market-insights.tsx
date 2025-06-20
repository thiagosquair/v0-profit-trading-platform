"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/simple-translations"
import { TrendingUp, Activity, AlertTriangle, Brain, Globe, Users } from "lucide-react"

export function MarketInsights() {
  const [liveData, setLiveData] = useState({
    fearGreedIndex: 65,
    marketSentiment: t("bullish"),
    volatilityIndex: 23.5,
    majorPairs: [
      { pair: "EUR/USD", sentiment: t("bullish"), strength: 75, change: "+0.45%" },
      { pair: "GBP/USD", sentiment: t("bearish"), strength: 35, change: "-0.23%" },
      { pair: "USD/JPY", sentiment: t("neutral"), strength: 50, change: "+0.12%" },
      { pair: "AUD/USD", sentiment: t("bullish"), strength: 68, change: "+0.31%" },
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
      status: t("neutral"),
      description: "Balanced institutional positioning",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Volatility Expectation",
      value: 32,
      status: t("low"),
      description: "Markets expecting calm conditions",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  const newsImpact = [
    {
      time: "2 hours ago",
      event: "Fed Chair Speech",
      impact: t("high"),
      sentiment: "Hawkish",
      pairs: ["USD/EUR", "USD/GBP", "USD/JPY"],
      psychologyNote: "Increased uncertainty may lead to risk-off behavior",
    },
    {
      time: "4 hours ago",
      event: "ECB Rate Decision",
      impact: t("medium"),
      sentiment: t("neutral"),
      pairs: ["EUR/USD", "EUR/GBP"],
      psychologyNote: "As expected, minimal psychological impact",
    },
    {
      time: "6 hours ago",
      event: "US Employment Data",
      impact: t("high"),
      sentiment: t("positive"),
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
          <h1 className="text-3xl font-bold">{t("marketInsightsTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("realTimeMarketPsychology")}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">{t("live")}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="psychology">{t("psychology")}</TabsTrigger>
          <TabsTrigger value="sentiment">{t("sentiment")}</TabsTrigger>
          <TabsTrigger value="news">{t("newsImpact")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("fearGreed")}</p>
                    <p className="text-2xl font-bold">{liveData.fearGreedIndex}</p>
                    <p className="text-sm text-orange-600">{t("greedZone")}</p>
                  </div>
                  <Brain className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("marketSentiment")}</p>
                    <p className="text-2xl font-bold">{liveData.marketSentiment}</p>
                    <p className="text-sm text-green-600">+2.3% {t("today")}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("volatilityIndex")}</p>
                    <p className="text-2xl font-bold">{liveData.volatilityIndex}</p>
                    <p className="text-sm text-blue-600">{t("lowVolatility")}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("activePairs")}</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-sm text-purple-600">{t("highActivity")}</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Major Pairs Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle>{t("majorPairsSentiment")}</CardTitle>
              <CardDescription>{t("realTimeSentimentAnalysis")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveData.majorPairs.map((pair) => (
                  <div key={pair.pair} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-semibold">{pair.pair}</div>
                      <Badge
                        variant="outline"
                        className={
                          pair.sentiment === t("bullish")
                            ? "text-green-600 border-green-600"
                            : pair.sentiment === t("bearish")
                              ? "text-red-600 border-red-600"
                              : "text-blue-600 border-blue-600"
                        }
                      >
                        {pair.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{t("strength")}</div>
                        <Progress value={pair.strength} className="w-20 h-2" />
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

          {/* Trading Psychology Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Psychology Alerts</CardTitle>
              <CardDescription>Current market conditions and psychological considerations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradingTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg border ${
                      tip.type === "warning"
                        ? "bg-yellow-50 border-yellow-200"
                        : tip.type === "danger"
                          ? "bg-red-50 border-red-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <tip.icon
                      className={`h-5 w-5 mt-0.5 ${
                        tip.type === "warning"
                          ? "text-yellow-600"
                          : tip.type === "danger"
                            ? "text-red-600"
                            : "text-blue-600"
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

        <TabsContent value="psychology" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {psychologyIndicators.map((indicator) => (
              <Card key={indicator.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{indicator.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{indicator.value}</span>
                      <Badge className={`${indicator.bgColor} ${indicator.color}`}>{indicator.status}</Badge>
                    </div>
                    <Progress value={indicator.value} className="h-3" />
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                      <span className="text-sm text-muted-foreground">78% {t("bullish")}</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Institutional</span>
                      <span className="text-sm text-muted-foreground">45% {t("neutral")}</span>
                    </div>
                    <Progress value={45} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{t("bullish")}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("neutral")}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={20} className="w-20 h-2" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("bearish")}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("newsImpact")} & Market Psychology</CardTitle>
              <CardDescription>Recent events and their psychological impact on markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {newsImpact.map((news, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{news.event}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            news.impact === t("high")
                              ? "text-red-600 border-red-600"
                              : news.impact === t("medium")
                                ? "text-yellow-600 border-yellow-600"
                                : "text-green-600 border-green-600"
                          }
                        >
                          {news.impact} {t("impact")}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{news.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Sentiment:</span>
                        <Badge variant="outline">{news.sentiment}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Affected Pairs:</span>
                        <div className="flex space-x-1">
                          {news.pairs.map((pair) => (
                            <Badge key={pair} variant="secondary" className="text-xs">
                              {pair}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">{news.psychologyNote}</p>
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
