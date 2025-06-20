"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { t } from "@/lib/simple-translations"
import { Brain, Camera, Target, PenTool, Award } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("welcome")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("psychologyScore")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">+5 {t("fromLastWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">{t("badgesEarned")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
            <CardDescription>{t("jumpInto")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button className="h-auto p-4 justify-start" variant="outline">
              <Brain className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">AI Coach</div>
                <div className="text-sm text-muted-foreground">{t("getPersonalizedCoaching")}</div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start" variant="outline">
              <Camera className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Screenshot Analysis</div>
                <div className="text-sm text-muted-foreground">{t("uploadAndAnalyze")}</div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start" variant="outline">
              <Target className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Exercises</div>
                <div className="text-sm text-muted-foreground">{t("completePsychology")}</div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start" variant="outline">
              <PenTool className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Journal</div>
                <div className="text-sm text-muted-foreground">{t("reflectOnTrading")}</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
            <CardDescription>{t("latestActivities")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("completedEmotionalControl")}</p>
                <p className="text-xs text-muted-foreground">{t("hoursAgo")}</p>
              </div>
              <Badge variant="secondary">{t("score")}: 85</Badge>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("aiCoachingSession")}</p>
                <p className="text-xs text-muted-foreground">{t("dayAgo")}</p>
              </div>
              <Badge variant="outline">{t("positive")}</Badge>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("screenshotAnalysisEUR")}</p>
                <p className="text-xs text-muted-foreground">{t("daysAgo")}</p>
              </div>
              <Badge variant="outline">{t("minutes")}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <Card>
        <CardHeader>
          <CardTitle>{t("currentGoals")}</CardTitle>
          <CardDescription>{t("developmentObjectives")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("improveEmotionalControl")}</span>
              <span className="text-sm text-muted-foreground">{t("scoreTarget")}</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("complete20Exercises")}</span>
              <span className="text-sm text-muted-foreground">{t("exercisesProgress")}</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("weeklyCoachingSessions")}</span>
              <span className="text-sm text-muted-foreground">{t("sessionsProgress")}</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
