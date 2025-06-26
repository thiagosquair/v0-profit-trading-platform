"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, BarChart3, Brain, Clock, X, TrendingUp, TrendingDown, Target, DollarSign, Percent, AlertTriangle, Award, Calendar, Activity, Zap } from "lucide-react"

interface TradeData {
  instrument: string
  tradeDirection: 'long' | 'short'
  entryPrice: string
  stopLossPrice: string
  takeProfitPrice: string
  riskRewardRatio: string
  percentageAchieved: string
}

interface Analysis {
  id: string
  timestamp: Date
  analysis: string
  imageName: string
  tradeData: TradeData
  context: string
}

interface TradingInsights {
  totalTrades: number
  avgRiskReward: number
  longTradePercentage: number
  shortTradePercentage: number
  winRate: number
  avgWinPercentage: number
  avgLossPercentage: number
  mostTradedInstrument: string
  bestRRRTrade: Analysis | null
  recentImprovement: string
  strengthAreas: string[]
  improvementAreas: string[]
  tradingStreak: number
  consistencyScore: number
}

// Local storage utilities
const STORAGE_KEY = 'profitz_trade_analyses'

const saveAnalysesToStorage = (analyses: Analysis[]) => {
  try {
    if (typeof window !== 'undefined') { // Ensure localStorage is available
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses))
    }
  } catch (error) {
    console.error('Failed to save analyses to storage:', error)
  }
}

const loadAnalysesFromStorage = (): Analysis[] => {
  try {
    if (typeof window !== 'undefined') { // Ensure localStorage is available
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.map((analysis: any) => ({
          ...analysis,
          timestamp: new Date(analysis.timestamp)
        }))
      }
    }
  } catch (error) {
    console.error('Failed to load analyses from storage:', error)
  }
  return []
}

// Insights calculation utilities
const calculateTradingInsights = (analyses: Analysis[]): TradingInsights => {
  if (analyses.length === 0) {
    return {
      totalTrades: 0,
      avgRiskReward: 0,
      longTradePercentage: 0,
      shortTradePercentage: 0,
      winRate: 0,
      avgWinPercentage: 0,
      avgLossPercentage: 0,
      mostTradedInstrument: '',
      bestRRRTrade: null,
      recentImprovement: '',
      strengthAreas: [],
      improvementAreas: [],
      tradingStreak: 0,
      consistencyScore: 0
    }
  }

  const totalTrades = analyses.length
  const longTrades = analyses.filter(a => a.tradeData.tradeDirection === 'long').length
  const shortTrades = totalTrades - longTrades
  
  // Calculate average risk-reward ratio
  const avgRiskReward = analyses.reduce((sum, a) => {
    const rrr = parseFloat(a.tradeData.riskRewardRatio) || 0
    return sum + rrr
  }, 0) / totalTrades

  // Calculate win rate from trades with percentage achieved
  const closedTrades = analyses.filter(a => a.tradeData.percentageAchieved && a.tradeData.percentageAchieved !== '')
  const winningTrades = closedTrades.filter(a => parseFloat(a.tradeData.percentageAchieved) > 0)
  const losingTrades = closedTrades.filter(a => parseFloat(a.tradeData.percentageAchieved) < 0)
  
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0
  
  const avgWinPercentage = winningTrades.length > 0 ? 
    winningTrades.reduce((sum, t) => sum + parseFloat(t.tradeData.percentageAchieved), 0) / winningTrades.length : 0
  
  const avgLossPercentage = losingTrades.length > 0 ? 
    Math.abs(losingTrades.reduce((sum, t) => sum + parseFloat(t.tradeData.percentageAchieved), 0) / losingTrades.length) : 0

  // Find most traded instrument
  const instrumentCounts: { [key: string]: number } = {}
  analyses.forEach(a => {
    instrumentCounts[a.tradeData.instrument] = (instrumentCounts[a.tradeData.instrument] || 0) + 1
  })
  const mostTradedInstrument = Object.keys(instrumentCounts).reduce((a, b) => 
    instrumentCounts[a] > instrumentCounts[b] ? a : b, '')

  // Find best RRR trade
  const bestRRRTrade = analyses.reduce((best, current) => {
    const currentRRR = parseFloat(current.tradeData.riskRewardRatio) || 0
    const bestRRR = best ? parseFloat(best.tradeData.riskRewardRatio) || 0 : 0
    return currentRRR > bestRRR ? current : best
  }, null as Analysis | null)

  // Calculate recent improvement
  const recentTrades = analyses.slice(0, Math.min(5, analyses.length))
  const olderTrades = analyses.slice(5, Math.min(10, analyses.length))
  
  let recentImprovement = ''
  if (recentTrades.length >= 3 && olderTrades.length >= 3) {
    const recentAvgRRR = recentTrades.reduce((sum, t) => sum + (parseFloat(t.tradeData.riskRewardRatio) || 0), 0) / recentTrades.length
    const olderAvgRRR = olderTrades.reduce((sum, t) => sum + (parseFloat(t.tradeData.riskRewardRatio) || 0), 0) / olderTrades.length
    
    if (recentAvgRRR > olderAvgRRR) {
      recentImprovement = `Risk-Reward ratio improved by ${((recentAvgRRR - olderAvgRRR) / olderAvgRRR * 100).toFixed(1)}%`
    } else if (recentAvgRRR < olderAvgRRR) {
      recentImprovement = `Focus needed: Risk-Reward ratio decreased by ${((olderAvgRRR - recentAvgRRR) / olderAvgRRR * 100).toFixed(1)}%`
    } else {
      recentImprovement = 'Consistent risk management maintained'
    }
  }

  // Determine strength and improvement areas
  const strengthAreas: string[] = []
  const improvementAreas: string[] = []

  if (avgRiskReward >= 2.0) strengthAreas.push('Excellent Risk-Reward Management')
  else if (avgRiskReward < 1.5) improvementAreas.push('Risk-Reward Ratio needs improvement')

  if (winRate >= 60) strengthAreas.push('Strong Win Rate')
  else if (winRate < 40 && closedTrades.length >= 5) improvementAreas.push('Win Rate needs attention')

  if (longTradePercentage > 20 && longTradePercentage < 80) strengthAreas.push('Good Directional Balance')
  else improvementAreas.push('Consider diversifying trade directions')

  // Calculate trading streak (consecutive wins/losses)
  let tradingStreak = 0
  if (closedTrades.length > 0) {
    const sortedTrades = closedTrades.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    const lastTradeResult = parseFloat(sortedTrades[0].tradeData.percentageAchieved) > 0
    
    for (const trade of sortedTrades) {
      const isWin = parseFloat(trade.tradeData.percentageAchieved) > 0
      if (isWin === lastTradeResult) {
        tradingStreak++
      } else {
        break
      }
    }
  }

  // Calculate consistency score (0-100)
  const rrVariance = analyses.reduce((sum, a) => {
    const rrr = parseFloat(a.tradeData.riskRewardRatio) || 0
    return sum + Math.pow(rrr - avgRiskReward, 2)
  }, 0) / totalTrades
  
  const consistencyScore = Math.max(0, Math.min(100, 100 - (rrVariance * 20)))

  return {
    totalTrades,
    avgRiskReward,
    longTradePercentage: (longTrades / totalTrades) * 100,
    shortTradePercentage: (shortTrades / totalTrades) * 100,
    winRate,
    avgWinPercentage,
    avgLossPercentage,
    mostTradedInstrument,
    bestRRRTrade,
    recentImprovement,
    strengthAreas,
    improvementAreas,
    tradingStreak,
    consistencyScore
  }
}

export function ScreenshotAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [context, setContext] = useState("")
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showTradeForm, setShowTradeForm] = useState(false)
  
  // Initialize insights with a default object to prevent null access
  const [insights, setInsights] = useState<TradingInsights>(calculateTradingInsights([]))
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Trade data state
  const [tradeData, setTradeData] = useState<TradeData>({
    instrument: '',
    tradeDirection: 'long',
    entryPrice: '',
    stopLossPrice: '',
    takeProfitPrice: '',
    riskRewardRatio: '',
    percentageAchieved: ''
  })

  // Load analyses from storage on component mount
  useEffect(() => {
    const storedAnalyses = loadAnalysesFromStorage()
    setAnalyses(storedAnalyses)
    setInsights(calculateTradingInsights(storedAnalyses))
  }, [])

  // Update insights whenever analyses change
  useEffect(() => {
    setInsights(calculateTradingInsights(analyses))
  }, [analyses])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    setSelectedFile(file)
    setShowTradeForm(true)
    setError(null)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const validateTradeData = (): boolean => {
    const required = ['instrument', 'entryPrice', 'stopLossPrice', 'takeProfitPrice', 'riskRewardRatio']
    for (const field of required) {
      if (!tradeData[field as keyof TradeData]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`)
        return false
      }
    }
    return true
  }

  const calculateRRR = () => {
    const entry = parseFloat(tradeData.entryPrice)
    const sl = parseFloat(tradeData.stopLossPrice)
    const tp = parseFloat(tradeData.takeProfitPrice)

    if (entry && sl && tp) {
      let risk, reward, rrr
      
      if (tradeData.tradeDirection === 'long') {
        risk = Math.abs(entry - sl)
        reward = Math.abs(tp - entry)
      } else {
        risk = Math.abs(sl - entry)
        reward = Math.abs(entry - tp)
      }
      
      rrr = reward / risk
      setTradeData(prev => ({ ...prev, riskRewardRatio: rrr.toFixed(2) }))
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return
    
    if (!validateTradeData()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", selectedFile)
      formData.append("context", context)
      
      Object.entries(tradeData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setAnalysis(data.analysis)

      const newAnalysis: Analysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        analysis: data.analysis,
        imageName: selectedFile.name,
        tradeData: { ...tradeData },
        context
      }
      
      const updatedAnalyses = [newAnalysis, ...analyses]
      setAnalyses(updatedAnalyses)
      saveAnalysesToStorage(updatedAnalyses)
      
    } catch (err) {
      setError("Failed to analyze screenshot. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysis(null)
    setError(null)
    setShowTradeForm(false)
    setTradeData({
      instrument: '',
      tradeDirection: 'long',
      entryPrice: '',
      stopLossPrice: '',
      takeProfitPrice: '',
      riskRewardRatio: '',
      percentageAchieved: ''
    })
    setContext('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getTradeStatusBadge = (percentageAchieved: string) => {
    if (!percentageAchieved) return <Badge variant="outline">Active</Badge>
    
    const percentage = parseFloat(percentageAchieved)
    if (percentage > 0) {
      return <Badge className="bg-green-100 text-green-800">Win +{percentage}%</Badge>
    } else if (percentage < 0) {
      return <Badge className="bg-red-100 text-red-800">Loss {percentage}%</Badge>
    } else {
      return <Badge variant="outline">Breakeven</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Trading Coach</h1>
        <p className="text-muted-foreground mt-2">Upload your trade screenshot and get personalized coaching feedback</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            New Analysis
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-4 w-4 mr-2" />
            Trade History ({analyses.length})
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            Progress Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {/* Upload content remains the same as before */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Upload Trade Screenshot</span>
                </CardTitle>
                <CardDescription>
                  Upload your trading screenshot and provide trade details for personalized coaching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedFile ? (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                  >
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Trade Screenshot</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your trading screenshot or click to browse
                    </p>
                    <Button type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Screenshot
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={previewUrl! || "/placeholder.svg"}
                        alt="Trade Screenshot Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={clearSelection}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {showTradeForm && (
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Trade Details
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </CardTitle>
                      <CardDescription>
                        Provide your trade details for accurate coaching analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="instrument" className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            Instrument *
                          </Label>
                          <Input
                            id="instrument"
                            placeholder="e.g., EURUSD, BTCUSD, AAPL"
                            value={tradeData.instrument}
                            onChange={(e) => setTradeData(prev => ({ ...prev, instrument: e.target.value.toUpperCase() }))}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label className="flex items-center gap-1">
                            Trade Direction *
                          </Label>
                          <Select
                            value={tradeData.tradeDirection}
                            onValueChange={(value: 'long' | 'short') => setTradeData(prev => ({ ...prev, tradeDirection: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="long">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  Long (Buy)
                                </div>
                              </SelectItem>
                              <SelectItem value="short">
                                <div className="flex items-center gap-2">
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                  Short (Sell)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="entryPrice" className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Entry Price *
                          </Label>
                          <Input
                            id="entryPrice"
                            type="number"
                            step="any"
                            placeholder="1.0850"
                            value={tradeData.entryPrice}
                            onChange={(e) => setTradeData(prev => ({ ...prev, entryPrice: e.target.value }))}
                            onBlur={calculateRRR}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="stopLossPrice" className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            Stop Loss Price *
                          </Label>
                          <Input
                            id="stopLossPrice"
                            type="number"
                            step="any"
                            placeholder="1.0800"
                            value={tradeData.stopLossPrice}
                            onChange={(e) => setTradeData(prev => ({ ...prev, stopLossPrice: e.target.value }))}
                            onBlur={calculateRRR}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="takeProfitPrice" className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-green-500" />
                            Take Profit Price *
                          </Label>
                          <Input
                            id="takeProfitPrice"
                            type="number"
                            step="any"
                            placeholder="1.0950"
                            value={tradeData.takeProfitPrice}
                            onChange={(e) => setTradeData(prev => ({ ...prev, takeProfitPrice: e.target.value }))}
                            onBlur={calculateRRR}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="riskRewardRatio" className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            Risk:Reward Ratio *
                          </Label>
                          <Input
                            id="riskRewardRatio"
                            placeholder="2.0"
                            value={tradeData.riskRewardRatio}
                            onChange={(e) => setTradeData(prev => ({ ...prev, riskRewardRatio: e.target.value }))}
                            className="mt-1"
                            readOnly
                          />
                          <p className="text-xs text-muted-foreground mt-1">Auto-calculated from your prices</p>
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="percentageAchieved" className="flex items-center gap-1">
                            <Percent className="h-4 w-4" />
                            Percentage Achieved (Optional)
                          </Label>
                          <Input
                            id="percentageAchieved"
                            type="number"
                            placeholder="75 (if trade is closed or partially closed)"
                            value={tradeData.percentageAchieved}
                            onChange={(e) => setTradeData(prev => ({ ...prev, percentageAchieved: e.target.value }))}
                            className="mt-1"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Leave empty if trade is still active. Enter percentage if closed (100% = full TP hit, -100% = full SL hit)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {showTradeForm && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="context">Additional Context (Optional)</Label>
                      <Textarea
                        id="context"
                        placeholder="Describe your reasoning for this trade, market conditions, or specific questions for your coach..."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full" size="lg">
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Getting Your Coaching Feedback...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Get AI Coaching Analysis
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </p>
                  </div>
                )}

                {analysis && (
                  <Card className="border-green-200 bg-green-50/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                        <Brain className="h-5 w-5" />
                        Your Coaching Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm whitespace-pre-wrap text-green-900 leading-relaxed">{analysis}</div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Trading Progress</CardTitle>
                <CardDescription>Recent coaching sessions and improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyses.length > 0 ? (
                  analyses.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{item.tradeData.instrument}</p>
                          <Badge variant={item.tradeData.tradeDirection === 'long' ? 'default' : 'destructive'} className="text-xs">
                            {item.tradeData.tradeDirection.toUpperCase()}
                          </Badge>
                          {getTradeStatusBadge(item.tradeData.percentageAchieved)}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          RRR: {item.tradeData.riskRewardRatio} | {item.timestamp.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.analysis.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Upload your first trade for coaching!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Your Trade History & Coaching Sessions</CardTitle>
              <CardDescription>Review your previous trades and coaching feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {analyses.length > 0 ? (
                <div className="space-y-4">
                  {analyses.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-lg">{item.tradeData.instrument}</h4>
                            <Badge variant={item.tradeData.tradeDirection === 'long' ? 'default' : 'destructive'}>
                              {item.tradeData.tradeDirection.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">RRR: {item.tradeData.riskRewardRatio}</Badge>
                            {getTradeStatusBadge(item.tradeData.percentageAchieved)}
                          </div>
                          <span className="text-xs text-muted-foreground">{item.timestamp.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-muted-foreground grid grid-cols-3 gap-4">
                          <span>Entry: {item.tradeData.entryPrice}</span>
                          <span>SL: {item.tradeData.stopLossPrice}</span>
                          <span>TP: {item.tradeData.takeProfitPrice}</span>
                        </div>
                        {item.context && (
                          <div className="text-sm text-muted-foreground mt-2">
                            <strong>Context:</strong> {item.context}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {item.analysis}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Trade History Yet</h3>
                  <p className="text-muted-foreground mb-4">Start uploading your trades to build your coaching history</p>
                  <Button onClick={() => document.querySelector('[value="upload"]')?.click()}>
                    Upload First Trade
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Trading Progress & Insights</CardTitle>
                <CardDescription>AI-generated insights from your trading journey</CardDescription>
              </CardHeader>
              <CardContent>
                {insights && insights.totalTrades > 0 ? (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-600">{insights.totalTrades}</div>
                          <p className="text-sm text-muted-foreground">Trades Analyzed</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-600">{insights.avgRiskReward.toFixed(1)}</div>
                          <p className="text-sm text-muted-foreground">Avg Risk:Reward</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-purple-600">{insights.winRate.toFixed(0)}%</div>
                          <p className="text-sm text-muted-foreground">Win Rate</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-orange-600">{insights.consistencyScore.toFixed(0)}</div>
                          <p className="text-sm text-muted-foreground">Consistency Score</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Trading Balance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Long Trades</span>
                              <span>{insights.longTradePercentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={insights.longTradePercentage} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Short Trades</span>
                              <span>{insights.shortTradePercentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={insights.shortTradePercentage} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Current Streak
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{insights.tradingStreak}</div>
                            <p className="text-sm text-muted-foreground">
                              {insights.tradingStreak > 0 ? 'Consecutive trades in current direction' : 'No active streak'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Insights and Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-600">
                            <Award className="h-5 w-5" />
                            Your Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {insights.strengthAreas.length > 0 ? (
                            <ul className="space-y-2">
                              {insights.strengthAreas.map((strength, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Keep analyzing trades to identify your strengths!</p>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-orange-600">
                            <Target className="h-5 w-5" />
                            Growth Areas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {insights.improvementAreas.length > 0 ? (
                            <ul className="space-y-2">
                              {insights.improvementAreas.map((area, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  {area}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">Great job! No major areas for improvement identified.</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Improvement */}
                    {insights.recentImprovement && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Recent Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{insights.recentImprovement}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Best Trade */}
                    {insights.bestRRRTrade && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            Best Risk:Reward Trade
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">{insights.bestRRRTrade.tradeData.instrument}</p>
                              <p className="text-sm text-muted-foreground">
                                RRR: {insights.bestRRRTrade.tradeData.riskRewardRatio} | {insights.bestRRRTrade.timestamp.toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={insights.bestRRRTrade.tradeData.tradeDirection === 'long' ? 'default' : 'destructive'}>
                              {insights.bestRRRTrade.tradeData.tradeDirection.toUpperCase()}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Most Traded Instrument */}
                    {insights.mostTradedInstrument && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Most Traded Instrument
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-2">{insights.mostTradedInstrument}</div>
                            <p className="text-sm text-muted-foreground">Your most frequently analyzed instrument</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Insights Yet</h3>
                    <p className="text-muted-foreground">Upload and analyze trades to see your progress insights</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

