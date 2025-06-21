"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Brain, Users } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function MarketInsights() {
  const marketData = {
    fearGreedIndex: 65,
    sentiment: t("bullish"),
    volatility: 23.5,
    majorPairs: [
      { pair: "EUR/USD", sentiment: t("bullish"), strength: 75, change: "+0.45%" },
      { pair: "GBP/USD", sentiment: t("bearish"), strength: 35, change: "-0.23%" },
      { pair: "USD/JPY", sentiment: t("neutral"), strength: 50, change: "+0.12%" },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("marketInsightsTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("marketInsightsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("fearGreedIndex")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketData.fearGreedIndex}</div>
            <Progress value={marketData.fearGreedIndex} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {t("greed")} {t("extreme")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("marketSentiment")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{marketData.sentiment}</div>
            <p className="text-xs text-muted-foreground mt-1">+2.3% {t("today")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("volatilityIndex")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketData.volatility}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("low")} {t("volatilityIndex")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("tradingOpportunities")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("high")} {t("confidenceLevel")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="sentiment">{t("sentimentAnalysis")}</TabsTrigger>
          <TabsTrigger value="news">{t("marketNews")}</TabsTrigger>
          <TabsTrigger value="psychology">{t("psychologyIndicators")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("marketTrends")}</CardTitle>
              <CardDescription>
                {t("sentimentAnalysis")} {t("overview")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.majorPairs.map((pair) => (
                  <div key={pair.pair} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">{pair.pair}</span>
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
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{t("sentimentAnalysis")}</span>
              </CardTitle>
              <CardDescription>
                {t("marketSentiment")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("sentimentAnalysis")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{t("marketNews")}</span>
              </CardTitle>
              <CardDescription>
                {t("newsImpact")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("marketNews")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="psychology">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{t("psychologyIndicators")}</span>
              </CardTitle>
              <CardDescription>
                {t("marketSentiment")} {t("psychologyIndicators")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("psychologyIndicators")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
