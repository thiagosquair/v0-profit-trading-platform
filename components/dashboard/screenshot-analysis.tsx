"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, BarChart3, Brain, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function ScreenshotAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleUpload = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("nav.analysis")}</h1>
        <p className="text-muted-foreground mt-2">{t("uploadAndAnalyze")}</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            {t("nav.insights")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>{t("uploadAndAnalyze")}</span>
                </CardTitle>
                <CardDescription>Upload your trading screenshots for AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="text-center space-y-4">
                    <div className="animate-spin mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
                    <Progress value={65} className="w-full" />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Screenshot</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your trading screenshot or click to browse
                    </p>
                    <Button onClick={handleUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("recentActivity")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("screenshotAnalysisEUR")}</p>
                    <p className="text-xs text-muted-foreground">{t("hoursAgo")}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t("positive")}</Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Risk Analysis - GBP/JPY</p>
                    <p className="text-xs text-muted-foreground">{t("dayAgo")}</p>
                  </div>
                  <Badge variant="outline">Caution</Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pattern Recognition - USD/CAD</p>
                    <p className="text-xs text-muted-foreground">{t("daysAgo")}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Pattern Found</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Your previous screenshot analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analysis history {t("common.loading")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>{t("nav.insights")}</CardTitle>
              <CardDescription>AI-generated insights from your analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("nav.insights")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
