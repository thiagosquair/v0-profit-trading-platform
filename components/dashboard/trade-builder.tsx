"use client"

import { useState, useRef, useEffect } from "react"
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
  BarChart3,
  Star,
  Award,
  Lightbulb,
  Shield,
  Activity,
  Clock,
  Save,
  RefreshCw
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
  technicalAnalysis: {
    patterns: string[]
    supportResistance: string[]
    trendAnalysis: string
    entryQuality: string
  }
  riskManagement: {
    positionSizing: string
    riskRewardRatio: string
    stopLossPlacement: string
    takeProfitPlacement: string
  }
}

// Saved Trade Interface
interface SavedTrade {
  id: string
  timestamp: Date
  tradeData: EnhancedTrade
  analysis: TradeAnalysis
  screenshotUrl?: string
}

export function TradeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<TradeAnalysis | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [savedTrades, setSavedTrades] = useState<SavedTrade[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
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

  // Load saved trades on component mount
  useEffect(() => {
    const saved = localStorage.getItem('tradeBuilderHistory')
    if (saved) {
      try {
        const trades = JSON.parse(saved)
        setSavedTrades(trades.map((trade: any) => ({
          ...trade,
          timestamp: new Date(trade.timestamp)
        })))
      } catch (error) {
        console.error('Error loading saved trades:', error)
      }
    }
  }, [])

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

  // Save trade analysis
  const saveTrade = async () => {
    if (!analysisResult) return
    
    setIsSaving(true)
    
    try {
      const savedTrade: SavedTrade = {
        id: Date.now().toString(),
        timestamp: new Date(),
        tradeData: { ...tradeData },
        analysis: { ...analysisResult }
      }
      
      const updatedTrades = [savedTrade, ...savedTrades]
      setSavedTrades(updatedTrades)
      
      // Save to localStorage
      localStorage.setItem('tradeBuilderHistory', JSON.stringify(updatedTrades))
      
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      
    } catch (error) {
      console.error('Error saving trade:', error)
      alert('Failed to save trade. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // Start new analysis
  const startNewAnalysis = () => {
    setCurrentStep(1)
    setAnalysisResult(null)
    setValidationErrors([])
    setTradeData({
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Get score badge variant
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trade Builder</h1>
          <p className="text-muted-foreground mt-2">Build the perfect trade with AI-powered analysis</p>
        </div>
        <Button onClick={startNewAnalysis}>
          <Plus className="h-4 w-4 mr-2" />
          New Trade
        </Button>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Trade analysis saved successfully! You can view it in your trade history.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="builder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="builder">Trade Plan</TabsTrigger>
          <TabsTrigger value="history">Trade History ({savedTrades.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Trade Analysis</CardTitle>
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
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          currentStep >= step.id
                            ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                            : "border-gray-300 text-gray-500 hover:border-blue-300"
                        }`}
                      >
                        <StepIcon className="h-4 w-4" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-2 transition-all ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`} />
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
                <div className="space-y-6">
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
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Risk:Reward Ratio</p>
                          <p className="text-3xl font-bold text-blue-600">1:{tradeData.riskRewardRatio}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-700">
                            Risk: {tradeData.potentialLoss?.toFixed(5)} | 
                            Reward: {tradeData.potentialProfit?.toFixed(5)}
                          </p>
                          <Badge variant={tradeData.riskRewardRatio >= 2 ? "default" : "secondary"} className="mt-1">
                            {tradeData.riskRewardRatio >= 2 ? "Excellent" : tradeData.riskRewardRatio >= 1.5 ? "Good" : "Needs Improvement"}
                          </Badge>
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
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
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
                          className="w-full max-h-96 object-contain rounded-lg border shadow-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeScreenshot}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="mt-3 flex items-center text-green-600 bg-green-50 p-2 rounded">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Screenshot uploaded successfully</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Trade Context */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Trade Reason *</Label>
                    <Textarea 
                      placeholder="Explain your reasoning for this trade setup. Include technical analysis, market conditions, and any other factors influencing your decision..."
                      rows={4}
                      value={tradeData.tradeReason}
                      onChange={(e) => setTradeData(prev => ({...prev, tradeReason: e.target.value}))}
                      className="resize-none"
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
                          <SelectItem value="calm">😌 Calm & Focused</SelectItem>
                          <SelectItem value="confident">😎 Confident</SelectItem>
                          <SelectItem value="excited">🤩 Excited</SelectItem>
                          <SelectItem value="anxious">😰 Anxious</SelectItem>
                          <SelectItem value="frustrated">😤 Frustrated</SelectItem>
                          <SelectItem value="neutral">😐 Neutral</SelectItem>
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
                          <SelectItem value="trending">📈 Strong Trend</SelectItem>
                          <SelectItem value="ranging">📊 Range-bound</SelectItem>
                          <SelectItem value="volatile">⚡ High Volatility</SelectItem>
                          <SelectItem value="quiet">😴 Low Volatility</SelectItem>
                          <SelectItem value="news">📰 News Event</SelectItem>
                          <SelectItem value="session">🌍 Session Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Confidence Level: {tradeData.confidenceLevel}%</Label>
                    <div className="mt-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={tradeData.confidenceLevel}
                        onChange={(e) => setTradeData(prev => ({...prev, confidenceLevel: parseInt(e.target.value)}))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Low Confidence</span>
                        <span className={`font-medium ${
                          tradeData.confidenceLevel >= 70 ? 'text-green-600' : 
                          tradeData.confidenceLevel >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {tradeData.confidenceLevel}%
                        </span>
                        <span>High Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Risk Management */}
              {currentStep === 4 && (
                <div className="space-y-6">
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

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-blue-600" />
                      Trade Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <p><strong>Instrument:</strong> {tradeData.tradingInstrument}</p>
                        <p><strong>Direction:</strong> 
                          <Badge variant="outline" className="ml-2">
                            {tradeData.direction?.toUpperCase()}
                          </Badge>
                        </p>
                        <p><strong>Entry:</strong> {tradeData.entryPrice}</p>
                      </div>
                      <div className="space-y-2">
                        <p><strong>Stop Loss:</strong> {tradeData.stopLoss}</p>
                        <p><strong>Take Profit:</strong> {tradeData.takeProfit}</p>
                        <p><strong>R:R Ratio:</strong> 
                          <Badge variant={tradeData.riskRewardRatio && tradeData.riskRewardRatio >= 2 ? "default" : "secondary"} className="ml-2">
                            1:{tradeData.riskRewardRatio}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: AI Analysis */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {!analysisResult ? (
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <Brain className="h-12 w-12 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Ready for AI Analysis</h3>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Our advanced AI will analyze your trade setup, screenshot, and context to provide comprehensive coaching feedback
                      </p>
                      <Button 
                        size="lg" 
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="min-w-40 h-12"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="h-5 w-5 mr-3" />
                            Analyze Trade
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardHeader>
                          <CardTitle className="flex items-center text-xl">
                            <Award className="h-6 w-6 mr-3 text-blue-600" />
                            Overall Trade Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-6">
                            <div className={`text-5xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                              {analysisResult.overallScore}/100
                            </div>
                            <div className="flex-1">
                              <Progress value={analysisResult.overallScore} className="h-3 mb-2" />
                              <Badge variant={getScoreBadgeVariant(analysisResult.overallScore)} className="text-sm">
                                {analysisResult.overallScore >= 80 ? 'Excellent' : 
                                 analysisResult.overallScore >= 60 ? 'Good' : 
                                 analysisResult.overallScore >= 40 ? 'Fair' : 'Needs Improvement'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Analysis Results Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-green-200 bg-green-50">
                          <CardHeader>
                            <CardTitle className="text-green-700 flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Strengths
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {analysisResult.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start">
                                  <Star className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-green-800">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-orange-200 bg-orange-50">
                          <CardHeader>
                            <CardTitle className="text-orange-700 flex items-center">
                              <Lightbulb className="h-5 w-5 mr-2" />
                              Areas for Improvement
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {analysisResult.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-orange-800">{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* AI Coaching Feedback */}
                      <Card className="border-purple-200 bg-purple-50">
                        <CardHeader>
                          <CardTitle className="flex items-center text-purple-700">
                            <Brain className="h-5 w-5 mr-2" />
                            AI Coach Feedback
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed text-purple-800">{analysisResult.aiCoachingFeedback}</p>
                        </CardContent>
                      </Card>

                      {/* Recommendations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Target className="h-5 w-5 mr-2" />
                            Action Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold mr-4 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Technical & Risk Analysis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Activity className="h-5 w-5 mr-2" />
                              Technical Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-sm font-medium">Entry Quality:</p>
                              <p className="text-sm text-muted-foreground">{analysisResult.technicalAnalysis.entryQuality}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Trend Analysis:</p>
                              <p className="text-sm text-muted-foreground">{analysisResult.technicalAnalysis.trendAnalysis}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Shield className="h-5 w-5 mr-2" />
                              Risk Management
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-sm font-medium">Position Sizing:</p>
                              <p className="text-sm text-muted-foreground">{analysisResult.riskManagement.positionSizing}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Stop Loss Placement:</p>
                              <p className="text-sm text-muted-foreground">{analysisResult.riskManagement.stopLossPlacement}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="min-w-24"
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="min-w-24">
                    Next
                  </Button>
                ) : (
                  <div className="space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={saveTrade}
                      disabled={!analysisResult || isSaving}
                      className="min-w-32"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Trade
                        </>
                      )}
                    </Button>
                    <Button onClick={startNewAnalysis} className="min-w-32">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New Analysis
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
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Trade History ({savedTrades.length})
              </CardTitle>
              <CardDescription>
                Your previous trade analyses and performance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedTrades.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No trade analyses yet. Complete your first analysis to see it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedTrades.map((trade) => (
                    <Card key={trade.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{trade.tradeData.tradingInstrument} - {trade.tradeData.direction?.toUpperCase()}</h4>
                            <p className="text-sm text-muted-foreground">
                              {trade.timestamp.toLocaleDateString()} at {trade.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge variant={getScoreBadgeVariant(trade.analysis.overallScore)}>
                            Score: {trade.analysis.overallScore}/100
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Entry: {trade.tradeData.entryPrice}</p>
                            <p className="text-muted-foreground">SL: {trade.tradeData.stopLoss}</p>
                          </div>
                          <div>
                            <p className="font-medium">TP: {trade.tradeData.takeProfit}</p>
                            <p className="text-muted-foreground">R:R: 1:{trade.tradeData.riskRewardRatio}</p>
                          </div>
                          <div>
                            <p className="font-medium">Risk: {trade.tradeData.riskPercentage}%</p>
                            <p className="text-muted-foreground">Size: {trade.tradeData.positionSize} lots</p>
                          </div>
                          <div>
                            <p className="font-medium">Confidence: {trade.tradeData.confidenceLevel}%</p>
                            <p className="text-muted-foreground">State: {trade.tradeData.emotionalState}</p>
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
              {savedTrades.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">Complete more trade analyses to see performance insights.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{savedTrades.length}</p>
                        <p className="text-sm text-muted-foreground">Total Analyses</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {Math.round(savedTrades.reduce((sum, trade) => sum + trade.analysis.overallScore, 0) / savedTrades.length)}
                        </p>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {Math.round(savedTrades.reduce((sum, trade) => sum + (trade.tradeData.riskRewardRatio || 0), 0) / savedTrades.length * 100) / 100}
                        </p>
                        <p className="text-sm text-muted-foreground">Avg R:R Ratio</p>
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
}

