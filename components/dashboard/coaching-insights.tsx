"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/simple-translations"
import { Brain, TrendingUp, Target, Award, BarChart3, MessageSquare, Clock } from "lucide-react"

export function CoachingInsights() {
  const coachingStats = {
    totalSessions: 47,
    improvementRate: 78,
    emotionalStability: 85,
    goalsAchieved: 12,
  }

  const emotionalTrends = [
    { emotion: "Confidence", current: 82, trend: "improving", change: "+15%" },
    { emotion: "Patience", current: 76, trend: "stable", change: "+2%" },
    { emotion: "Discipline", current: 89, trend: "improving", change: "+12%" },
    { emotion: "Stress Management", current: 71, trend: "improving", change: "+8%" },
    { emotion: "Focus", current: 84, trend: "stable", change: "+1%" },
  ]

  const sessionTypes = [
    { type: "Pre-Trading Preparation", effectiveness: 95, sessions: 18, color: "bg-green-500" },
    { type: "Post-Trade Analysis", effectiveness: 87, sessions: 15, color: "bg-blue-500" },
    { type: "Emotional Regulation", effectiveness: 82, sessions: 12, color: "bg-purple-500" },
    { type: "Confidence Building", effectiveness: 74, sessions: 8, color: "bg-yellow-500" },
  ]

  const recentInsights = [
    {
      date: "2 days ago",
      type: "Pattern Recognition",
      insight:
        "You show consistent improvement in emotional regulation during high-volatility periods. Your stress response has decreased by 23% over the past month.",
      impact: "High",
    },
    {
      date: "5 days ago",
      type: "Behavioral Analysis",
      insight:
        "Pre-trading preparation sessions are your most effective coaching type, with 95% success rate in improving trade outcomes.",
      impact: "High",
    },
    {
      date: "1 week ago",
      type: "Progress Milestone",
      insight: "You've successfully maintained discipline in 89% of your recent trades, up from 67% last month.",
      impact: "Medium",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "stable":
        return <div className="h-4 w-4 rounded-full bg-blue-500" />
      case "worsening":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return null
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "stable":
        return "text-blue-600"
      case "worsening":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("coachingInsightsTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("aiPoweredAnalysisCoaching")}</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          {t("aiAnalytics")}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="trends">{t("emotionalTrendAnalysis")}</TabsTrigger>
          <TabsTrigger value="effectiveness">{t("sessionEffectiveness")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <span>{t("totalSessions")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{coachingStats.totalSessions}</div>
                <p className="text-sm text-muted-foreground">{t("coachingInteractions")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>{t("improvementRate")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{coachingStats.improvementRate}%</div>
                <p className="text-sm text-muted-foreground">{t("overallProgress")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>{t("emotionalStability")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">{coachingStats.emotionalStability}%</div>
                <p className="text-sm text-muted-foreground">{t("currentLevel")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>{t("goalsAchieved")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600 mb-2">{coachingStats.goalsAchieved}</div>
                <p className="text-sm text-muted-foreground">{t("milestonesReached")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>{t("aiCoachingSummary")}</CardTitle>
              <CardDescription>{t("keyInsightsFromCoaching")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{insight.type}</Badge>
                        <Badge
                          variant="outline"
                          className={
                            insight.impact === "High"
                              ? "text-red-600 border-red-600"
                              : insight.impact === "Medium"
                                ? "text-yellow-600 border-yellow-600"
                                : "text-green-600 border-green-600"
                          }
                        >
                          {insight.impact} {t("impact")}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{insight.date}</span>
                    </div>
                    <p className="text-sm">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insight Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>{t("keyInsight")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{t("progressShowsSignificant")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("emotionalTrendAnalysis")}</CardTitle>
              <CardDescription>{t("trackEmotionalStatesOverTime")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emotionalTrends.map((trend) => (
                  <div key={trend.emotion} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{trend.emotion}</span>
                        {getTrendIcon(trend.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{trend.current}%</span>
                        <span className={`text-sm ${getTrendColor(trend.trend)}`}>{trend.change}</span>
                      </div>
                    </div>
                    <Progress value={trend.current} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="capitalize">{t(trend.trend as any)}</span>
                      <span>100%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional Stability Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Emotional Stability Over Time</CardTitle>
              <CardDescription>30-day trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Emotional stability chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effectiveness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("sessionEffectiveness")}</CardTitle>
              <CardDescription>{t("howEffectiveDifferentCoaching")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sessionTypes.map((session) => (
                  <div key={session.type} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${session.color}`} />
                        <span className="font-medium">{session.type}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          {session.sessions} {t("sessions")}
                        </span>
                        <span className="font-semibold">{session.effectiveness}%</span>
                      </div>
                    </div>
                    <Progress value={session.effectiveness} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Session {t("frequency")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This {t("week")}</span>
                    <span className="font-semibold">5 {t("sessions")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("lastSeen")}</span>
                    <span className="font-semibold">Yesterday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per {t("week")}</span>
                    <span className="font-semibold">4.2 {t("sessions")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <span>Success Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Goals {t("completed")}</span>
                    <span className="font-semibold">12/15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consistency Score</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
