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
    if (tradeData.entryPrice !== null && tradeData.stopLoss !== null && tradeData.takeProfit !== null && tradeData.direction) {
      const entry = tradeData.entryPrice
      const sl = tradeData.stopLoss
      const tp = tradeData.takeProfit
      
      let risk: number, reward: number
      
      if (tradeData.direction === 'long') {
        risk = Math.abs(entry - sl)
        reward = Math.abs(tp - entry)
      } else {
        risk = Math.abs(sl - entry)
        reward = Math.abs(entry - tp)
      }
      
      if (risk === 0) {
        setTradeData(prev => ({
          ...prev,
          riskRewardRatio: null,
          potentialLoss: 0,
          potentialProfit: reward
        }))
        return // Avoid division by zero
      }

      const rrRatio = reward / risk
      
      setTradeData(prev => ({
        ...prev,
        riskRewardRatio: parseFloat(rrRatio.toFixed(2)),
        potentialLoss: parseFloat(risk.toFixed(2)),
        potentialProfit: parseFloat(reward.toFixed(2))
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
        if (tradeData[field as keyof EnhancedTrade] === null || isNaN(Number(tradeData[field as keyof EnhancedTrade]))) {
          errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required and must be a number`)
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
                          <SelectItem value="EURAUD">EUR/AUD</SelectItem>
<SelectItem value="EURCAD">EUR/CAD</SelectItem>
<SelectItem value="EURCHF">EUR/CHF</SelectItem>
<SelectItem value="EURGBP">EUR/GBP</SelectItem>
<SelectItem value="EURJPY">EUR/JPY</SelectItem>
<SelectItem value="EURNZD">EUR/NZD</SelectItem>
<SelectItem value="EURUSD">EUR/USD</SelectItem>
<SelectItem value="GBPAUD">GBP/AUD</SelectItem>
<SelectItem value="GBPCAD">GBP/CAD</SelectItem>
<SelectItem value="GBPCHF">GBP/CHF</SelectItem>
<SelectItem value="GBPJPY">GBP/JPY</SelectItem>
<SelectItem value="GBPNZD">GBP/NZD</SelectItem>
<SelectItem value="GBPUSD">GBP/USD</SelectItem>
<SelectItem value="USDAUD">USD/AUD</SelectItem>
<SelectItem value="USDCAD">USD/CAD</SelectItem>
<SelectItem value="USDCHF">USD/CHF</SelectItem>
<SelectItem value="USDJPY">USD/JPY</SelectItem>
<SelectItem value="USDNZD">USD/NZD</SelectItem>
<SelectItem value="AUDCAD">AUD/CAD</SelectItem>
<SelectItem value="AUDCHF">AUD/CHF</SelectItem>
<SelectItem value="AUDJPY">AUD/JPY</SelectItem>
<SelectItem value="AUDNZD">AUD/NZD</SelectItem>
<SelectItem value="CADCHF">CAD/CHF</SelectItem>
<SelectItem value="CADJPY">CAD/JPY</SelectItem>
<SelectItem value="CHFJPY">CHF/JPY</SelectItem>
<SelectItem value="NZDCAD">NZD/CAD</SelectItem>
<SelectItem value="NZDCHF">NZD/CHF</SelectItem>
<SelectItem value="NZDJPY">NZD/JPY</SelectItem>
<SelectItem value="XAGUSD">Silver (XAG/USD)</SelectItem>
<SelectItem value="XAUUSD">XAU/USD (Gold)</SelectItem>
<SelectItem value="USOIL">US Oil</SelectItem>
<SelectItem value="SPX500">S&P 500</SelectItem>
<SelectItem value="NAS100">Nasdaq 100</SelectItem>
<SelectItem value="US30">Dow Jones (US30)</SelectItem>
<SelectItem value="GER40">DAX (GER40)</SelectItem>
<SelectItem value="UK100">FTSE 100 (UK100)</SelectItem>
<SelectItem value="JPN225">Nikkei 225 (JPN225)</SelectItem>
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
                          <SelectItem value="M1">1 Minute</SelectItem>
                          <SelectItem value="M5">5 Minute</SelectItem>
                          <SelectItem value="M15">15 Minute</SelectItem>
                          <SelectItem value="M30">30 Minute</SelectItem>
                          <SelectItem value="H1">1 Hour</SelectItem>
                          <SelectItem value="H4">4 Hour</SelectItem>
                          <SelectItem value="D1">1 Day</SelectItem>
                          <SelectItem value="W1">1 Week</SelectItem>
                          <SelectItem value="MN1">1 Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Trade Direction *</Label>
                      <Select 
                        value={tradeData.direction || ''} 
                        onValueChange={(value: 'long' | 'short') => setTradeData(prev => ({...prev, direction: value}))}
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
                      <Label htmlFor="entryPrice" className="text-sm font-medium">Entry Price *</Label>
                      <Input 
                        id="entryPrice" 
                        type="number" 
                        step="any" 
                        placeholder="e.g., 1.07500" 
                        value={tradeData.entryPrice !== null ? tradeData.entryPrice : ''}
                        onChange={(e) => setTradeData(prev => ({...prev, entryPrice: parseFloat(e.target.value)}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stopLoss" className="text-sm font-medium">Stop Loss *</Label>
                      <Input 
                        id="stopLoss" 
                        type="number" 
                        step="any" 
                        placeholder="e.g., 1.07400" 
                        value={tradeData.stopLoss !== null ? tradeData.stopLoss : ''}
                        onChange={(e) => setTradeData(prev => ({...prev, stopLoss: parseFloat(e.target.value)}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="takeProfit" className="text-sm font-medium">Take Profit *</Label>
                      <Input 
                        id="takeProfit" 
                        type="number" 
                        step="any" 
                        placeholder="e.g., 1.07700" 
                        value={tradeData.takeProfit !== null ? tradeData.takeProfit : ''}
                        onChange={(e) => setTradeData(prev => ({...prev, takeProfit: parseFloat(e.target.value)}))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Calculated Risk:Reward Ratio</Label>
                      <Input 
                        type="text" 
                        readOnly 
                        value={tradeData.riskRewardRatio !== null ? `1:${tradeData.riskRewardRatio.toFixed(2)}` : 'N/A'}
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Potential Profit / Loss (Units)</Label>
                      <Input 
                        type="text" 
                        readOnly 
                        value={tradeData.potentialProfit !== null && tradeData.potentialLoss !== null 
                          ? `+${tradeData.potentialProfit.toFixed(2)} / -${tradeData.potentialLoss.toFixed(2)}` 
                          : 'N/A'}
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Screenshot Upload */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Upload TradingView Chart Screenshot *</Label>
                  <div 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const file = e.dataTransfer.files?.[0]
                      if (file) handleScreenshotUpload({ target: { files: [file] } } as React.ChangeEvent<HTMLInputElement>)
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {tradeData.screenshotPreview ? (
                      <div className="relative w-full h-full">
                        <img src={tradeData.screenshotPreview} alt="Screenshot Preview" className="object-contain w-full h-full" />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-2 right-2 rounded-full"
                          onClick={(e) => { e.stopPropagation(); removeScreenshot() }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                      </div>
                    )}
                    <Input 
                      id="screenshot-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleScreenshotUpload}
                      ref={fileInputRef}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Trade Context */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tradeReason" className="text-sm font-medium">Trade Reason *</Label>
                    <Textarea 
                      id="tradeReason" 
                      placeholder="Explain your reasoning for taking this trade..."
                      value={tradeData.tradeReason}
                      onChange={(e) => setTradeData(prev => ({...prev, tradeReason: e.target.value}))}
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emotionalState" className="text-sm font-medium">Emotional State</Label>
                    <Textarea 
                      id="emotionalState" 
                      placeholder="Describe your emotional state before and during the trade..."
                      value={tradeData.emotionalState}
                      onChange={(e) => setTradeData(prev => ({...prev, emotionalState: e.target.value}))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketConditions" className="text-sm font-medium">Market Conditions</Label>
                    <Textarea 
                      id="marketConditions" 
                      placeholder="Describe the overall market conditions at the time of the trade..."
                      value={tradeData.marketConditions}
                      onChange={(e) => setTradeData(prev => ({...prev, marketConditions: e.target.value}))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confidenceLevel" className="text-sm font-medium">Confidence Level (0-100)</Label>
                    <Input 
                      id="confidenceLevel" 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={tradeData.confidenceLevel}
                      onChange={(e) => setTradeData(prev => ({...prev, confidenceLevel: parseInt(e.target.value)}))}
                    />
                    <div className="text-center text-sm text-muted-foreground">{tradeData.confidenceLevel}</div>
                  </div>
                </div>
              )}

              {/* Step 4: Risk Management */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="riskPercentage" className="text-sm font-medium">Risk Percentage (%)</Label>
                    <Input 
                      id="riskPercentage" 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      max="100" 
                      placeholder="e.g., 1 (for 1% risk)"
                      value={tradeData.riskPercentage !== null ? tradeData.riskPercentage : ''}
                      onChange={(e) => setTradeData(prev => ({...prev, riskPercentage: parseFloat(e.target.value)}))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Percentage of your total capital you are willing to risk on this trade.</p>
                  </div>
                  <div>
                    <Label htmlFor="positionSize" className="text-sm font-medium">Position Size (Units/Lots)</Label>
                    <Input 
                      id="positionSize" 
                      type="number" 
                      step="any" 
                      min="0" 
                      placeholder="e.g., 10000 (for 0.1 lots EUR/USD)"
                      value={tradeData.positionSize !== null ? tradeData.positionSize : ''}
                      onChange={(e) => setTradeData(prev => ({...prev, positionSize: parseFloat(e.target.value)}))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">The number of units or lots you plan to trade.</p>
                  </div>
                </div>
              )}

              {/* Step 5: AI Analysis Result */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {!analysisResult ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-10">
                      <Brain className="w-16 h-16 text-blue-500 animate-pulse" />
                      <p className="text-lg font-medium">Analyzing your trade...</p>
                      <p className="text-sm text-muted-foreground">This may take a few moments as AI processes your data and screenshot.</p>
                      <Button onClick={handleAIAnalysis} disabled={isAnalyzing}>
                        {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Analysis Results</h2>
                        <Badge variant={getScoreBadgeVariant(analysisResult.overallScore)} className="text-lg px-4 py-2">
                          Score: {analysisResult.overallScore}
                        </Badge>
                      </div>

                      <Card className="bg-blue-50/50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-700 flex items-center"><Lightbulb className="h-5 w-5 mr-2" />AI Coaching Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-blue-800 whitespace-pre-wrap">{analysisResult.aiCoachingFeedback}</p>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-green-50/50 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-green-700 flex items-center"><CheckCircle className="h-5 w-5 mr-2" />Strengths</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside text-green-800 space-y-1">
                              {analysisResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-red-50/50 border-red-200">
                          <CardHeader>
                            <CardTitle className="text-red-700 flex items-center"><AlertTriangle className="h-5 w-5 mr-2" />Areas for Improvement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside text-red-800 space-y-1">
                              {analysisResult.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2" />Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-decimal list-inside space-y-2">
                            {analysisResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                          </ul>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center"><BarChart3 className="h-5 w-5 mr-2" />Technical Analysis</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div>
                              <h3 className="font-semibold">Entry Quality:</h3>
                              <p>{analysisResult.technicalAnalysis.entryQuality}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Trend Analysis:</h3>
                              <p>{analysisResult.technicalAnalysis.trendAnalysis}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Patterns Identified:</h3>
                              <ul className="list-disc list-inside ml-4">
                                {analysisResult.technicalAnalysis.patterns.map((p, i) => <li key={i}>{p}</li>)}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold">Support/Resistance:</h3>
                              <ul className="list-disc list-inside ml-4">
                                {analysisResult.technicalAnalysis.supportResistance.map((sr, i) => <li key={i}>{sr}</li>)}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center"><Shield className="h-5 w-5 mr-2" />Risk Management</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div>
                              <h3 className="font-semibold">Position Sizing:</h3>
                              <p>{analysisResult.riskManagement.positionSizing}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Risk:Reward Ratio:</h3>
                              <p>{analysisResult.riskManagement.riskRewardRatio}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Stop Loss Placement:</h3>
                              <p>{analysisResult.riskManagement.stopLossPlacement}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Take Profit Placement:</h3>
                              <p>{analysisResult.riskManagement.takeProfitPlacement}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center"><Activity className="h-5 w-5 mr-2" />Psychology Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-wrap">{analysisResult.psychologyInsights}</p>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end space-x-2">
                        <Button onClick={saveTrade} disabled={isSaving}>
                          {isSaving ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Save Analysis</>}
                        </Button>
                        <Button variant="outline" onClick={startNewAnalysis}>
                          <RefreshCw className="h-4 w-4 mr-2" />Start New Trade
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length && (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                )}
                {currentStep === steps.length && !analysisResult && (
                  <Button onClick={handleAIAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>Review your past trade analyses.</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTrades.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No trades saved yet. Start a new trade analysis to build your history!</p>
              ) : (
                <div className="space-y-4">
                  {savedTrades.map((trade) => (
                    <Card key={trade.id} className="border-l-4 border-blue-500">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg">{trade.tradeData.tradingInstrument} - {trade.tradeData.timeframe} ({trade.tradeData.direction === 'long' ? 'Long' : 'Short'})</CardTitle>
                        <Badge variant={getScoreBadgeVariant(trade.analysis.overallScore)}>{trade.analysis.overallScore}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">{trade.timestamp.toLocaleString()}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p><strong>Entry:</strong> {trade.tradeData.entryPrice}</p>
                          <p><strong>SL:</strong> {trade.tradeData.stopLoss}</p>
                          <p><strong>TP:</strong> {trade.tradeData.takeProfit}</p>
                          <p><strong>R:R:</strong> {trade.tradeData.riskRewardRatio !== null ? `1:${trade.tradeData.riskRewardRatio.toFixed(2)}` : 'N/A'}</p>
                        </div>
                        <p className="text-sm whitespace-pre-wrap mt-2"><strong>AI Feedback:</strong> {trade.analysis.aiCoachingFeedback.substring(0, 200)}...</p>
                        <Button variant="outline" size="sm" onClick={() => setAnalysisResult(trade.analysis)}>
                          View Full Analysis
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade Analytics</CardTitle>
              <CardDescription>Insights into your trading performance.</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTrades.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">Analyze more trades to see your analytics!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Trades Analyzed</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{savedTrades.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average R:R</CardTitle>
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {savedTrades.filter(t => t.tradeData.riskRewardRatio !== null).length > 0
                          ? `1:${(savedTrades.reduce((sum, t) => sum + (t.tradeData.riskRewardRatio || 0), 0) / savedTrades.filter(t => t.tradeData.riskRewardRatio !== null).length).toFixed(2)}`
                          : 'N/A'}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Overall Score</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(savedTrades.reduce((sum, t) => sum + t.analysis.overallScore, 0) / savedTrades.length).toFixed(0)}%
                      </div>
                    </CardContent>
                  </Card>
                  {/* Add more analytics cards here */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

