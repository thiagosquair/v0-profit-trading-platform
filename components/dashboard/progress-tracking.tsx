"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Brain, BarChart3, CheckCircle } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function ProgressTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("nav.progress")}</h1>
        <p className="text-muted-foreground mt-2">{t("progressOverview")}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("psychologyScore")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("fromLastWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/20</div>
            <Progress value={60} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/5</div>
            <Progress value={80} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">{t("badgesEarned")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("nav.overview")}</TabsTrigger>
          <TabsTrigger value="exercises">{t("nav.exercises")}</TabsTrigger>
          <TabsTrigger value="goals">{t("currentGoals")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>{t("recentActivity")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("completedEmotionalControl")}</p>
                    <p className="text-xs text-muted-foreground">{t("hoursAgo")}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{t("score")}: 85</Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("aiCoachingSession")}</p>
                    <p className="text-xs text-muted-foreground">{t("dayAgo")}</p>
                  </div>
                  <Badge variant="outline">{t("positive")}</Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("screenshotAnalysisEUR")}</p>
                    <p className="text-xs text-muted-foreground">{t("daysAgo")}</p>
                  </div>
                  <Badge variant="outline">{t("minutes")}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>{t("currentGoals")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t("improveEmotionalControl")}</span>
                    <span className="text-sm text-muted-foreground">{t("scoreTarget")}</span>
                  </div>
                  <Progress value={78} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t("complete20Exercises")}</span>
                    <span className="text-sm text-muted-foreground">{t("exercisesProgress")}</span>
                  </div>
                  <Progress value={60} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{t("weeklyCoachingSessions")}</span>
                    <span className="text-sm text-muted-foreground">{t("sessionsProgress")}</span>
                  </div>
                  <Progress value={80} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>{t("exercisesSummary")}</CardTitle>
              <CardDescription>{t("progressOverview")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("exercisesSummary")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>{t("currentGoals")}</CardTitle>
              <CardDescription>{t("developmentObjectives")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("currentGoals")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
