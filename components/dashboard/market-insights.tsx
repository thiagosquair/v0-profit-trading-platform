"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Brain, Users } from "lucide-react"
import { t } from "@/lib/simple-translations"

interface QuoteData {
  c: number // current price
  d: number // change
  dp: number // percent change
  h: number // high price of day
  l: number // low price of day
  o: number // open price of day
  pc: number // previous close price
  t: number // timestamp
}

const instruments = [
  { symbol: "XAUUSD", label: "Gold (XAU/USD)" },
  { symbol: "AAPL", label: "Apple (AAPL)" },
  { symbol: "EURUSD", label: "EUR/USD" },
  { symbol: "GBPUSD", label: "GBP/USD" },
  { symbol: "USDJPY", label: "USD/JPY" },
]

export function MarketInsights() {
  const [selectedSymbol, setSelectedSymbol] = useState("XAUUSD")
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuote(symbol: string) {
      setLoading(true)
      setError(null)
      setQuote(null)
      try {
        const res = await fetch(`/api/finnhub/quote?symbol=${symbol}`)
        if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`)
        const data: QuoteData = await res.json()
        setQuote(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuote(selectedSymbol)
  }, [selectedSymbol])

  // fallback static data for major pairs
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
                {/* Major pairs list */}
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

                {/* Instrument selector */}
                <div className="mt-6">
                  <label htmlFor="instrument-select" className="block mb-2 font-semibold">
                    {t("selectInstrument")}
                  </label>
                  <select
                    id="instrument-select"
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >
                    {instruments.map((inst) => (
                      <option key={inst.symbol} value={inst.symbol}>
                        {inst.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live quote data for selected instrument */}
                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{instruments.find((i) => i.symbol === selectedSymbol)?.label} Live Quote</h3>
                  {loading && <p>{t("loading")}...</p>}
                  {error && <p className="text-red-600">Error: {error}</p>}
                  {quote && (
                    <div className="space-y-1 mt-2">
                      <p>
                        Current Price: <strong>${quote.c.toFixed(2)}</strong>
                      </p>
                      <p>
                        Change:{" "}
                        <span className={quote.d >= 0 ? "text-green-600" : "text-red-600"}>
                          {quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)
                        </span>
                      </p>
                      <p>High: ${quote.h.toFixed(2)}</p>
                      <p>Low: ${quote.l.toFixed(2)}</p>
                      <p>Open: ${quote.o.toFixed(2)}</p>
                      <p>Previous Close: ${quote.pc.toFixed(2)}</p>
                    </div>
                  )}
                </div>
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
