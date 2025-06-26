"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Calculator, 
  Brain, 
  Target, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  BarChart3
} from "lucide-react"
import { t } from "@/lib/simple-translations"

// Enhanced Trade Data Interface
interface EnhancedTrade {
  // Mandatory Fields (matching TradingView projection tool)
  tradingInstrument: string
  timeframe: string
  entryPrice: number | null
  stopLoss: number | null
  takeProfit: number | null
  tradeReason: string
  
  // Additional Fields
  direction: 'long' | 'short' | null
  positionSize: number | null
  riskPercentage: number | null
  
  // Screenshot
  screenshot: File | null
  screenshotPreview: string | null
  
  // Psychology Context
  emotionalState: string
  confidenceLevel: number
  marketConditions: string
  
  // Calculated Fields
  riskRewardRatio: number | null
  potentialProfit: number | null
  potentialLoss: number | null
}

// Analysis Result Interface
interface TradeAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  riskAssessment: string
  psychologyInsights: string
  probabilityEstimate: number
  aiCoachingFeedback: string
}

export function TradeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<TradeAnalysis | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [tradeData, setTradeData] = useState<EnhancedTrade>({
    tradingInstrument: '',
    timeframe: '',
    entryPrice: null,
    stopLoss: null,
    takeProfit: null,
    tradeReason: '',
    direction: null,
    positionSize: null,
    riskPercentage: 2,
    screenshot: null,
    screenshotPreview: null,
    emotionalState: '',
    confidenceLevel: 50,
    marketConditions: '',
    riskRewardRatio: null,
    potentialProfit: null,
    potentialLoss: null
  })

  const steps = [
    { 
      id: 1, 
      title: "Trade Setup", 
      description: "Define your trade parameters",
      icon: Target,
      fields: ['tradingInstrument', 'timeframe', 'direction', 'entryPrice', 'stopLoss', 'takeProfit']
    },
    { 
      id: 2, 
      title: "Screenshot Upload", 
      description: "Upload your TradingView chart",
      icon: ImageIcon,
      fields: ['screenshot']
    },
    { 
      id: 3, 
      title: "Trade Context", 
      description: "Provide reasoning and context",
      icon: Brain,
      fields: ['tradeReason', 'emotionalState', 'marketConditions']
    },
    { 
      id: 4, 
      title: "Risk Management", 
      description: "Configure position sizing",
      icon: Calculator,
      fields: ['positionSize', 'riskPercentage']
    },
    { 
      id: 5, 
      title: "AI Analysis", 
      description: "Get comprehensive trade analysis",
      icon: TrendingUp,
      fields: []
    }
  ]

  // Calculate risk-reward ratio and potential P&L
  const calculateRiskMetrics = () => {
    if (tradeData.entryPrice && tradeData.stopLoss && tradeData.takeProfit && tradeData.direction) {
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
      
      const rrRatio = reward / risk
      
      setTradeData(prev => ({
        ...prev,
        riskRewardRatio: Math.round(rrRatio * 100) / 100,
        potentialLoss: risk,
        potentialProfit: reward
      }))
    }
  }

  // Handle screenshot upload
  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setTradeData(prev => ({
            ...prev,
            screenshot: file,
            screenshotPreview: e.target?.result as string
          }))
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please upload an image file')
      }
    }
  }

  // Remove screenshot
  const removeScreenshot = () => {
    setTradeData(prev => ({
      ...prev,
      screenshot: null,
      screenshotPreview: null
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const currentStepData = steps[currentStep - 1]
    const errors: string[] = []
    
    currentStepData.fields.forEach(field => {
      if (field === 'screenshot') {
        if (!tradeData.screenshot) {
          errors.push('Screenshot is required')
        }
      } else if (field === 'tradeReason') {
        if (!tradeData.tradeReason.trim()) {
          errors.push('Trade reason is required')
        }
      } else if (field === 'tradingInstrument') {
        if (!tradeData.tradingInstrument) {
          errors.push('Trading instrument is required')
        }
      } else if (field === 'timeframe') {
        if (!tradeData.timeframe) {
          errors.push('Timeframe is required')
        }
      } else if (field === 'direction') {
        if (!tradeData.direction) {
          errors.push('Trade direction is required')
        }
      } else if (['entryPrice', 'stopLoss', 'takeProfit'].includes(field)) {
        if (!tradeData[field as keyof EnhancedTrade]) {
          errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`)
        }
      }
    })
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  // Handle next step
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === 1) {
        calculateRiskMetrics()
      }
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  // Handle AI Analysis
  const handleAIAnalysis = async () => {
    setIsAnalyzing(true)
    
    try {
      // Prepare form data for API call
      const formData = new FormData()
      formData.append('tradingInstrument', tradeData.tradingInstrument)
      formData.append('timeframe', tradeData.timeframe)
      formData.append('direction', tradeData.direction || '')
      formData.append('entryPrice', tradeData.entryPrice?.toString() || '')
      formData.append('stopLoss', tradeData.stopLoss?.toString() || '')
      formData.append('takeProfit', tradeData.takeProfit?.toString() || '')
      formData.append('tradeReason', tradeData.tradeReason)
      formData.append('emotionalState', tradeData.emotionalState)
      formData.append('confidenceLevel', tradeData.confidenceLevel.toString())
      formData.append('marketConditions', tradeData.marketConditions)
      formData.append('riskPercentage', tradeData.riskPercentage?.toString() || '')
      formData.append('positionSize', tradeData.positionSize?.toString() || '')
      
      if (tradeData.screenshot) {
        formData.append('screenshot', tradeData.screenshot)
      }

      const response = await fetch('/api/trade-builder/analyze', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysisResult(result.analysis)
      } else {
        throw new Error('Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Failed to analyze trade. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trade Builder</h1>
          <p className="text-muted-foreground mt-2">Build the perfect trade with AI-powered analysis</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Trade
        </Button>
      </div>

      <Tabs defaultValue="builder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="builder">Trade Plan</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Trade Analysis</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          currentStep >= step.id
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "border-gray-300 text-gray-500"
                        }`}
                      >
                        <StepIcon className="h-4 w-4" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <ul className="list-disc list-inside">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Step 1: Trade Setup */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Trading Instrument *</Label>
                      <Select 
                        value={tradeData.tradingInstrument} 
                        onValueChange={(value) => setTradeData(prev => ({...prev, tradingInstrument: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select instrument" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EURUSD">EUR/USD</SelectItem>
                          <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                          <SelectItem value="USDJPY">USD/JPY</SelectItem>
                          <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                          <SelectItem value="USDCAD">USD/CAD</SelectItem>
                          <SelectItem value="USDCHF">USD/CHF</SelectItem>
                          <SelectItem value="NZDUSD">NZD/USD</SelectItem>
                          <SelectItem value="XAUUSD">XAU/USD (Gold)</SelectItem>
                          <SelectItem value="BTCUSD">BTC/USD</SelectItem>
                          <SelectItem value="ETHUSD">ETH/USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Timeframe *</Label>
                      <Select 
                        value={tradeData.timeframe} 
                        onValueChange={(value) => setTradeData(prev => ({...prev, timeframe: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1 Minute</SelectItem>
                          <SelectItem value="5m">5 Minutes</SelectItem>
                          <SelectItem value="15m">15 Minutes</SelectItem>
                          <SelectItem value="30m">30 Minutes</SelectItem>
                          <SelectItem value="1h">1 Hour</SelectItem>
                          <SelectItem value="4h">4 Hours</SelectItem>
                          <SelectItem value="1d">1 Day</SelectItem>
                          <SelectItem value="1w">1 Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Direction *</Label>
                      <Select 
                        value={tradeData.direction || ''} 
                        onValueChange={(value) => setTradeData(prev => ({...prev, direction: value as 'long' | 'short'}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="long">Long (Buy)</SelectItem>
                          <SelectItem value="short">Short (Sell)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Entry Price *</Label>
                      <Input 
                        type="number" 
                        step="0.00001"
                        placeholder="1.08500" 
                        value={tradeData.entryPrice || ''}
                        onChange={(e) => setTradeData(prev => ({...prev, entryPrice: parseFloat(e.target.value) || null}))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Stop Loss *</Label>
                      <Input 
                        type="number" 
                        step="0.00001"
                        placeholder="1.08000" 
                        value={tradeData.stopLoss || ''}
                        onChange={(e) => setTradeData(prev => ({...prev, stopLoss: parseFloat(e.target.value) || null}))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Take Profit *</Label>
                      <Input 
                        type="number" 
                        step="0.00001"
                        placeholder="1.09500" 
                        value={tradeData.takeProfit || ''}
                        onChange={(e) => setTradeData(prev => ({...prev, takeProfit: parseFloat(e.target.value) || null}))}
                      />
                    </div>
                  </div>

                  {/* Risk-Reward Display */}
                  {tradeData.riskRewardRatio && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Risk:Reward Ratio</p>
                          <p className="text-2xl font-bold text-blue-600">1:{tradeData.riskRewardRatio}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-700">
                            Risk: {tradeData.potentialLoss?.toFixed(5)} | 
                            Reward: {tradeData.potentialProfit?.toFixed(5)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Screenshot Upload */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">TradingView Chart Screenshot *</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a screenshot of your TradingView chart showing the trade setup with projection tool
                    </p>
                    
                    {!tradeData.screenshotPreview ? (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-600">Click to upload screenshot</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={tradeData.screenshotPreview} 
                          alt="Trade setup screenshot" 
                          className="w-full max-h-96 object-contain rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeScreenshot}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="mt-2 flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm">Screenshot uploaded successfully</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Trade Context */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Trade Reason *</Label>
                    <Textarea 
                      placeholder="Explain your reasoning for this trade setup. Include technical analysis, market conditions, and any other factors influencing your decision..."
                      rows={4}
                      value={tradeData.tradeReason}
                      onChange={(e) => setTradeData(prev => ({...prev, tradeReason: e.target.value}))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Emotional State</Label>
                      <Select 
                        value={tradeData.emotionalState} 
                        onValueChange={(value) => setTradeData(prev => ({...prev, emotionalState: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How are you feeling?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calm">Calm & Focused</SelectItem>
                          <SelectItem value="confident">Confident</SelectItem>
                          <SelectItem value="excited">Excited</SelectItem>
                          <SelectItem value="anxious">Anxious</SelectItem>
                          <SelectItem value="frustrated">Frustrated</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Market Conditions</Label>
                      <Select 
                        value={tradeData.marketConditions} 
                        onValueChange={(value) => setTradeData(prev => ({...prev, marketConditions: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Current market state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trending">Strong Trend</SelectItem>
                          <SelectItem value="ranging">Range-bound</SelectItem>
                          <SelectItem value="volatile">High Volatility</SelectItem>
                          <SelectItem value="quiet">Low Volatility</SelectItem>
                          <SelectItem value="news">News Event</SelectItem>
                          <SelectItem value="session">Session Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Confidence Level: {tradeData.confidenceLevel}%</Label>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={tradeData.confidenceLevel}
                        onChange={(e) => setTradeData(prev => ({...prev, confidenceLevel: parseInt(e.target.value)}))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Risk Management */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Position Size (lots)</Label>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.10" 
                        value={tradeData.positionSize || ''}
                        onChange={(e) => setTradeData(prev => ({...prev, positionSize: parseFloat(e.target.value) || null}))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Risk Percentage</Label>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="2.0" 
                        value={tradeData.riskPercentage || ''}
                        onChange={(e) => setTradeData(prev => ({...prev, riskPercentage: parseFloat(e.target.value) || null}))}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Trade Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Instrument:</strong> {tradeData.tradingInstrument}</p>
                        <p><strong>Direction:</strong> {tradeData.direction?.toUpperCase()}</p>
                        <p><strong>Entry:</strong> {tradeData.entryPrice}</p>
                      </div>
                      <div>
                        <p><strong>Stop Loss:</strong> {tradeData.stopLoss}</p>
                        <p><strong>Take Profit:</strong> {tradeData.takeProfit}</p>
                        <p><strong>R:R Ratio:</strong> 1:{tradeData.riskRewardRatio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: AI Analysis */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  {!analysisResult ? (
                    <div className="text-center py-8">
                      <Brain className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready for AI Analysis</h3>
                      <p className="text-muted-foreground mb-6">
                        Our AI will analyze your trade setup, screenshot, and context to provide comprehensive feedback
                      </p>
                      <Button 
                        size="lg" 
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="min-w-32"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Analyze Trade
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Target className="h-5 w-5 mr-2" />
                            Overall Trade Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
                            <div className="text-4xl font-bold text-blue-600">
                              {analysisResult.overallScore}/100
                            </div>
                            <Progress value={analysisResult.overallScore} className="flex-1" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Analysis Results */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-green-600">Strengths</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysisResult.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* AI Coaching Feedback */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Brain className="h-5 w-5 mr-2" />
                            AI Coach Feedback
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{analysisResult.aiCoachingFeedback}</p>
                        </CardContent>
                      </Card>

                      {/* Recommendations */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="outline">
                      Save Trade
                    </Button>
                    <Button>
                      Start New Analysis
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>
                Your previous trade analyses and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trade history coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Performance Analytics</span>
              </CardTitle>
              <CardDescription>
                Insights and trends from your trading decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics dashboard coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

