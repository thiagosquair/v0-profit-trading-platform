"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function BehavioralPatterns() {
  const patterns = [
    {
      id: "fomo",
      name: t("fomoPattern"),
      severity: t("high"),
      frequency: 8,
      trend: t("improving"),
      impact: 85,
    },
    {
      id: "revenge",
      name: t("revengeTrading"),
      severity: t("high"),
      frequency: 5,
      trend: t("improving"),
      impact: 92,
    },
    {
      id: "overconfidence",
      name: t("overconfidence"),
      severity: t("medium"),
      frequency: 6,
      trend: t("stable"),
      impact: 68,
    },
    {
      id: "analysis-paralysis",
      name: t("analysisParalysis"),
      severity: t("low"),
      frequency: 3,
      trend: t("improving"),
      impact: 45,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("behavioralPatternsTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("behavioralPatternsSubtitle")}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="analysis">{t("patternAnalysis")}</TabsTrigger>
          <TabsTrigger value="trends">{t("trendAnalysis")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>{t("identifiedPatterns")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patterns.length}</div>
                <p className="text-sm text-muted-foreground">{t("patternAnalysis")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-green-500" />
                  <span>{t("improving")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {patterns.filter((p) => p.trend === t("improving")).length}
                </div>
                <p className="text-sm text-muted-foreground">{t("improvementSuggestions")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>
                    {t("high")} {t("patternSeverity")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {patterns.filter((p) => p.severity === t("high")).length}
                </div>
                <p className="text-sm text-muted-foreground">{t("patternImpact")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {patterns.map((pattern) => (
              <Card key={pattern.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{pattern.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          pattern.severity === t("high")
                            ? "bg-red-100 text-red-800"
                            : pattern.severity === t("medium")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {pattern.severity}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {pattern.trend === t("improving") ? (
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">{pattern.trend}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("patternFrequency")}</p>
                      <p className="text-lg font-semibold">{pattern.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("patternImpact")}</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={pattern.impact} className="flex-1" />
                        <span className="text-sm font-medium">{pattern.impact}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("patternSeverity")}</p>
                      <p className="text-lg font-semibold">{pattern.severity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>{t("patternAnalysis")}</CardTitle>
              <CardDescription>{t("improvementSuggestions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("patternAnalysis")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>{t("trendAnalysis")}</CardTitle>
              <CardDescription>
                {t("patternFrequency")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("trendAnalysis")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
