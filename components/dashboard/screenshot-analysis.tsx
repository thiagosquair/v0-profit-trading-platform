"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { t } from "@/lib/simple-translations"
import { Upload, Camera, Brain, CheckCircle, Target, FileImage, Loader2 } from "lucide-react"

export function ScreenshotAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      setAnalysisResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        overallScore: 78,
        emotionalState: "Confident",
        riskLevel: "Medium",
        recommendations: [
          "Consider reducing position size due to high volatility",
          "Your entry timing shows good patience",
          "Stop loss placement is appropriate for this setup",
        ],
        technicalAnalysis: {
          entryQuality: 85,
          riskReward: 72,
          timing: 90,
          setup: 78,
        },
        psychologyInsights: {
          confidence: 82,
          patience: 88,
          discipline: 75,
          emotionalControl: 70,
        },
        detectedPatterns: ["Breakout setup", "Support/Resistance levels", "Volume confirmation"],
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const recentAnalyses = [
    {
      id: 1,
      pair: "EUR/USD",
      date: "2024-01-15",
      score: 85,
      result: "Profitable",
      emotion: "Confident",
    },
    {
      id: 2,
      pair: "GBP/JPY",
      date: "2024-01-14",
      score: 72,
      result: "Loss",
      emotion: "Anxious",
    },
    {
      id: 3,
      pair: "USD/CAD",
      date: "2024-01-13",
      score: 90,
      result: "Profitable",
      emotion: "Calm",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("screenshotAnalysis")}</h1>
        <p className="text-gray-600 mt-2">Upload your trading screenshots for AI-powered analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-500" />
                Upload Screenshot
              </CardTitle>
              <CardDescription>Upload a screenshot of your trading platform for comprehensive analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {selectedFile ? selectedFile.name : "Drop your screenshot here"}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedFile ? "File selected - click Analyze to continue" : "or click to browse files"}
                </p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileImage className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">{selectedFile.name}</span>
                  </div>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Screenshot"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="psychology">Psychology</TabsTrigger>
                <TabsTrigger value="recommendations">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Overview</CardTitle>
                    <CardDescription>Key insights from your trading screenshot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{analysisResult.overallScore}</div>
                        <p className="text-sm text-gray-600">Overall Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{analysisResult.emotionalState}</div>
                        <p className="text-sm text-gray-600">Emotional State</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">{analysisResult.riskLevel}</div>
                        <p className="text-sm text-gray-600">Risk Level</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Detected Patterns</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.detectedPatterns.map((pattern: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Analysis</CardTitle>
                    <CardDescription>Assessment of your trade setup and execution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analysisResult.technicalAnalysis).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-sm font-semibold">{value as number}%</span>
                        </div>
                        <Progress value={value as number} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="psychology" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Psychology Assessment</CardTitle>
                    <CardDescription>Analysis of your mental state and decision-making</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analysisResult.psychologyInsights).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-sm font-semibold">{value as number}%</span>
                        </div>
                        <Progress value={value as number} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Actionable insights to improve your trading</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <Alert key={index}>
                        <Target className="h-4 w-4" />
                        <AlertDescription>{rec}</AlertDescription>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Recent Analyses Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Analyses</CardTitle>
              <CardDescription>Your previous screenshot analyses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{analysis.pair}</span>
                    <Badge variant={analysis.result === "Profitable" ? "default" : "destructive"}>
                      {analysis.result}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{analysis.date}</span>
                    <span>Score: {analysis.score}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{analysis.emotion}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Include your full trading platform view</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Show your position size and risk management</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Capture the moment of entry or exit</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Ensure charts and indicators are visible</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
