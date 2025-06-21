"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function CoachingInsights() {
  const insights = [
    {
      type: t("keyInsights"),
      title: t("emotionalControl"),
      description: t("improvementAreas"),
      impact: t("high"),
      date: t("daysAgo"),
    },
    {
      type: t("strengthsIdentified"),
      title: t("discipline"),
      description: t("performanceMetrics"),
      impact: t("medium"),
      date: t("dayAgo"),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("coachingInsightsTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("coachingInsightsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("keyInsights")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("identifiedPatterns")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("improvementAreas")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("actionItems")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("overallProgress")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">{t("insightsSummary")}</TabsTrigger>
          <TabsTrigger value="trends">{t("trendAnalysis")}</TabsTrigger>
          <TabsTrigger value="recommendations">{t("followUpRecommendations")}</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{insight.type}</Badge>
                      <Badge
                        className={
                          insight.impact === t("high")
                            ? "bg-red-100 text-red-800"
                            : insight.impact === t("medium")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {insight.impact} {t("patternImpact")}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{insight.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>{t("trendAnalysis")}</span>
              </CardTitle>
              <CardDescription>
                {t("performanceMetrics")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("trendAnalysis")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>{t("followUpRecommendations")}</span>
              </CardTitle>
              <CardDescription>
                {t("actionItems")} {t("recommendations")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("followUpRecommendations")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
