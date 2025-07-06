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
import { FeatureGate } from "@/components/FeatureGate"
import { useUser } from "@/contexts/UserContext"

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

export function ScreenshotAnalysis() {
  const { hasFeature, isFeatureEnabled, getRemainingUsage } = useUser()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string>("")
  const [tradeData, setTradeData] = useState<TradeData>({
    instrument: "",
    tradeDirection: "long",
    entryPrice: "",
    stopLossPrice: "",
    takeProfitPrice: "",
    riskRewardRatio: "",
    percentageAchieved: ""
  })
  const [context, setContext] = useState("")
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [insights, setInsights] = useState<TradingInsights | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if user has access to screenshot analysis
  const hasAccess = hasFeature('screenshot_analysis')
  const isEnabled = isFeatureEnabled('screenshot_analysis')

  // Get remaining usage (if applicable)
  const remainingAnalyses = getRemainingUsage('trade_analyses')

  // Load saved analyses from localStorage
  useEffect(() => {
    const savedAnalyses = localStorage.getItem('screenshot-analyses')
    if (savedAnalyses) {
      try {
        const parsed = JSON.parse(savedAnalyses)
        setAnalyses(parsed.map((a: any) => ({ ...a, timestamp: new Date(a.timestamp) })))
      } catch (error) {
        console.error('Error loading saved analyses:', error)
      }
    }
  }, [])

  // Calculate insights whenever analyses change
  useEffect(() => {
    if (analyses.length > 0) {
      calculateInsights()
    }
  }, [analyses])

  const calculateInsights = () => {
    const totalTrades = analyses.length
    const longTrades = analyses.filter(a => a.tradeData.tradeDirection === 'long').length
    const shortTrades = totalTrades - longTrades
    
    const validRRRTrades = analyses.filter(a => a.tradeData.riskRewardRatio && !isNaN(parseFloat(a.tradeData.riskRewardRatio)))
    const avgRiskReward = validRRRTrades.length > 0 
      ? validRRRTrades.reduce((sum, a) => sum + parseFloat(a.tradeData.riskRewardRatio), 0) / validRRRTrades.length 
      : 0

    const validPercentageTrades = analyses.filter(a => a.tradeData.percentageAchieved && !isNaN(parseFloat(a.tradeData.percentageAchieved)))
    const winningTrades = validPercentageTrades.filter(a => parseFloat(a.tradeData.percentageAchieved) > 0)
    const losingTrades = validPercentageTrades.filter(a => parseFloat(a.tradeData.percentageAchieved) < 0)
    
    const winRate = validPercentageTrades.length > 0 ? (winningTrades.length / validPercentageTrades.length) * 100 : 0
    const avgWinPercentage = winningTrades.length > 0 
      ? winningTrades.reduce((sum, a) => sum + parseFloat(a.tradeData.percentageAchieved), 0) / winningTrades.length 
      : 0
    const avgLossPercentage = losingTrades.length > 0 
      ? Math.abs(losingTrades.reduce((sum, a) => sum + parseFloat(a.tradeData.percentageAchieved), 0) / losingTrades.length)
      : 0

    const instrumentCounts = analyses.reduce((acc, a) => {
      acc[a.tradeData.instrument] = (acc[a.tradeData.instrument] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const mostTradedInstrument = Object.entries(instrumentCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
    
    const bestRRRTrade = validRRRTrades.sort((a, b) => parseFloat(b.tradeData.riskRewardRatio) - parseFloat(a.tradeData.riskRewardRatio))[0] || null

    const newInsights: TradingInsights = {
      totalTrades,
      avgRiskReward,
      longTradePercentage: totalTrades > 0 ? (longTrades / totalTrades) * 100 : 0,
      shortTradePercentage: totalTrades > 0 ? (shortTrades / totalTrades) * 100 : 0,
      winRate,
      avgWinPercentage,
      avgLossPercentage,
      mostTradedInstrument,
      bestRRRTrade,
      recentImprovement: winRate > 50 ? "Your win rate is above 50% - great job!" : "Focus on improving your win rate",
      strengthAreas: [
        winRate > 60 ? "High win rate" : null,
        avgRiskReward > 2 ? "Good risk management" : null,
        totalTrades > 10 ? "Consistent trading activity" : null
      ].filter(Boolean) as string[],
      improvementAreas: [
        winRate < 50 ? "Win rate optimization" : null,
        avgRiskReward < 1.5 ? "Risk-reward ratio" : null,
        totalTrades < 5 ? "Trading frequency" : null
      ].filter(Boolean) as string[],
      tradingStreak: Math.max(0, analyses.slice(-5).filter(a => parseFloat(a.tradeData.percentageAchieved || '0') > 0).length),
      consistencyScore: Math.min(100, (winRate + (avgRiskReward * 10) + (totalTrades * 2)))
    }

    setInsights(newInsights)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const analyzeScreenshot = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('context', context)

      const response = await fetch('/api/screenshot-analysis', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setAnalysis(result.analysis)
      
      // Save the analysis
      const newAnalysis: Analysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        analysis: result.analysis,
        imageName: selectedFile.name,
        tradeData: { ...tradeData },
        context
      }

      const updatedAnalyses = [...analyses, newAnalysis]
      setAnalyses(updatedAnalyses)
      localStorage.setItem('screenshot-analyses', JSON.stringify(updatedAnalyses))

    } catch (error) {
      console.error('Error analyzing screenshot:', error)
      setAnalysis('Error analyzing screenshot. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysis("")
    setTradeData({
      instrument: "",
      tradeDirection: "long",
      entryPrice: "",
      stopLossPrice: "",
      takeProfitPrice: "",
      riskRewardRatio: "",
      percentageAchieved: ""
    })
    setContext("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const deleteAnalysis = (id: string) => {
    const updatedAnalyses = analyses.filter(a => a.id !== id)
    setAnalyses(updatedAnalyses)
    localStorage.setItem('screenshot-analyses', JSON.stringify(updatedAnalyses))
  }

  // Main component content
  const mainContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Screenshot Analysis</h1>
          <p className="text-gray-600 mt-1">Upload your trading screenshots for AI-powered analysis</p>
        </div>
        {remainingAnalyses !== 'unlimited' && (
          <Badge variant="outline" className="text-sm">
            {remainingAnalyses} analyses remaining
          </Badge>
        )}
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
          <TabsTrigger value="insights">Trading Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Trading Screenshot
              </CardTitle>
              <CardDescription>
                Upload a screenshot of your trading setup, chart analysis, or trade execution for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                    <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your screenshot here</p>
                      <p className="text-gray-600">or click to browse files</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Trade Data Form */}
              {selectedFile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="instrument">Instrument</Label>
                    <Input
                      id="instrument"
                      placeholder="e.g., EURUSD, AAPL, BTC"
                      value={tradeData.instrument}
                      onChange={(e) => setTradeData(prev => ({ ...prev, instrument: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direction">Trade Direction</Label>
                    <Select value={tradeData.tradeDirection} onValueChange={(value: 'long' | 'short') => setTradeData(prev => ({ ...prev, tradeDirection: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long</SelectItem>
                        <SelectItem value="short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entry">Entry Price</Label>
                    <Input
                      id="entry"
                      placeholder="Entry price"
                      value={tradeData.entryPrice}
                      onChange={(e) => setTradeData(prev => ({ ...prev, entryPrice: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss</Label>
                    <Input
                      id="stopLoss"
                      placeholder="Stop loss price"
                      value={tradeData.stopLossPrice}
                      onChange={(e) => setTradeData(prev => ({ ...prev, stopLossPrice: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="takeProfit">Take Profit</Label>
                    <Input
                      id="takeProfit"
                      placeholder="Take profit price"
                      value={tradeData.takeProfitPrice}
                      onChange={(e) => setTradeData(prev => ({ ...prev, takeProfitPrice: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rrr">Risk:Reward Ratio</Label>
                    <Input
                      id="rrr"
                      placeholder="e.g., 1:2, 1:3"
                      value={tradeData.riskRewardRatio}
                      onChange={(e) => setTradeData(prev => ({ ...prev, riskRewardRatio: e.target.value }))}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="context">Additional Context (Optional)</Label>
                    <Textarea
                      id="context"
                      placeholder="Provide any additional context about this trade, market conditions, or specific questions you have..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={analyzeScreenshot}
                  disabled={!selectedFile || isAnalyzing || (remainingAnalyses === 0)}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Screenshot
                    </>
                  )}
                </Button>
                {selectedFile && (
                  <Button variant="outline" onClick={clearAnalysis}>
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">AI is analyzing your screenshot...</span>
                  </div>
                  <Progress value={33} className="w-full" />
                </div>
              )}

              {/* Analysis Results */}
              {analysis && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Brain className="h-5 w-5" />
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-green-900">
                      {analysis.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Analysis History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analysis History
              </CardTitle>
              <CardDescription>
                Review your previous screenshot analyses and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyses.length === 0 ? (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No analyses yet. Upload your first screenshot to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.slice().reverse().map((analysis) => (
                    <Card key={analysis.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {analysis.tradeData.instrument || 'Unknown'}
                            </Badge>
                            <Badge variant={analysis.tradeData.tradeDirection === 'long' ? 'default' : 'secondary'}>
                              {analysis.tradeData.tradeDirection === 'long' ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {analysis.tradeData.tradeDirection.toUpperCase()}
                            </Badge>
                            {analysis.tradeData.riskRewardRatio && (
                              <Badge variant="outline">
                                RR: {analysis.tradeData.riskRewardRatio}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {analysis.timestamp.toLocaleDateString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAnalysis(analysis.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysis.tradeData.entryPrice && (
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Entry:</span>
                                <span className="ml-1 font-medium">{analysis.tradeData.entryPrice}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">SL:</span>
                                <span className="ml-1 font-medium">{analysis.tradeData.stopLossPrice}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">TP:</span>
                                <span className="ml-1 font-medium">{analysis.tradeData.takeProfitPrice}</span>
                              </div>
                            </div>
                          )}
                          <div className="prose prose-sm max-w-none">
                            <p className="text-gray-700 line-clamp-3">{analysis.analysis}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Trading Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Trading Insights
              </CardTitle>
              <CardDescription>
                AI-powered insights based on your screenshot analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!insights || analyses.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Upload more analyses to see detailed insights about your trading patterns.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Total Trades</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{insights.totalTrades}</p>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">Win Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{insights.winRate.toFixed(1)}%</p>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Avg R:R</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">1:{insights.avgRiskReward.toFixed(1)}</p>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">Consistency</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{insights.consistencyScore.toFixed(0)}</p>
                    </Card>
                  </div>

                  {/* Strengths and Improvements */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800">
                          <Award className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {insights.strengthAreas.length > 0 ? (
                          <ul className="space-y-2">
                            {insights.strengthAreas.map((strength, index) => (
                              <li key={index} className="flex items-center gap-2 text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-700">Keep analyzing to identify your strengths!</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-800">
                          <AlertTriangle className="h-5 w-5" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {insights.improvementAreas.length > 0 ? (
                          <ul className="space-y-2">
                            {insights.improvementAreas.map((area, index) => (
                              <li key={index} className="flex items-center gap-2 text-orange-700">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                {area}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-orange-700">Great job! No major areas for improvement identified.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Recent Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Trading Streak (Last 5 trades)</span>
                          <Badge variant={insights.tradingStreak >= 3 ? 'default' : 'secondary'}>
                            {insights.tradingStreak} wins
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Most Traded Instrument</span>
                          <Badge variant="outline">{insights.mostTradedInstrument}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium mb-1">Recent Improvement:</p>
                          <p>{insights.recentImprovement}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <FeatureGate 
      feature="screenshot_analysis"
      upgradeMessage="Upload trading screenshots for AI-powered analysis of your decision-making and emotional state. Get detailed insights into your trading psychology and performance patterns."
    >
      {mainContent}
    </FeatureGate>
  )
}

