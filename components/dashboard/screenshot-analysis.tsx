"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, BarChart3, Brain, Clock, X, TrendingUp, TrendingDown, Target, DollarSign, Percent, AlertTriangle } from "lucide-react"

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

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    setSelectedFile(file)
    setShowTradeForm(true) // Show trade form after image selection
    setError(null)

    // Create preview URL
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
      
      // Add trade data to form
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

      // Add to history
      const newAnalysis: Analysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        analysis: data.analysis,
        imageName: selectedFile.name,
        tradeData: { ...tradeData }
      }
      setAnalyses((prev) => [newAnalysis, ...prev])
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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
            Trade History
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            Progress Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
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
                        {/* Instrument */}
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

                        {/* Trade Direction */}
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

                        {/* Entry Price */}
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

                        {/* Stop Loss */}
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

                        {/* Take Profit */}
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

                        {/* Risk Reward Ratio */}
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

                        {/* Percentage Achieved */}
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
                          </div>
                          <span className="text-xs text-muted-foreground">{item.timestamp.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-muted-foreground grid grid-cols-3 gap-4">
                          <span>Entry: {item.tradeData.entryPrice}</span>
                          <span>SL: {item.tradeData.stopLossPrice}</span>
                          <span>TP: {item.tradeData.takeProfitPrice}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {item.analysis.substring(0, 300)}...
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
          <Card>
            <CardHeader>
              <CardTitle>Your Trading Progress & Insights</CardTitle>
              <CardDescription>AI-generated insights from your trading journey</CardDescription>
            </CardHeader>
            <CardContent>
              {analyses.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">{analyses.length}</div>
                        <p className="text-sm text-muted-foreground">Trades Analyzed</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">
                          {(analyses.reduce((sum, a) => sum + parseFloat(a.tradeData.riskRewardRatio || '0'), 0) / analyses.length).toFixed(1)}
                        </div>
                        <p className="text-sm text-muted-foreground">Avg Risk:Reward</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round((analyses.filter(a => a.tradeData.tradeDirection === 'long').length / analyses.length) * 100)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Long Trades</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Detailed progress insights coming soon...</p>
                  </div>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

