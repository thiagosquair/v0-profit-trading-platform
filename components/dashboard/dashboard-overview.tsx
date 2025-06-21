"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Trophy, MessageSquare, Camera, BookOpen, PenTool } from "lucide-react"
import { t } from "@/lib/translations-complete"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.welcome")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.psychologyScore")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.fromLastWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.coachingSessions")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.achievements")}</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.badgesEarned")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.quickActions")}</CardTitle>
          <CardDescription>{t("dashboard.jumpInto")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm text-center">{t("dashboard.getPersonalizedCoaching")}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
            <Camera className="h-6 w-6" />
            <span className="text-sm text-center">{t("dashboard.uploadAndAnalyze")}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm text-center">{t("dashboard.completePsychology")}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col space-y-2 p-4">
            <PenTool className="h-6 w-6" />
            <span className="text-sm text-center">{t("dashboard.reflectOnTrading")}</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity & Current Goals */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
            <CardDescription>{t("dashboard.latestActivities")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("dashboard.completedEmotionalControl")}</p>
                <p className="text-xs text-muted-foreground">{t("dashboard.hoursAgo")}</p>
              </div>
              <Badge variant="secondary">{t("dashboard.score")}: 85</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("dashboard.aiCoachingSession")}</p>
                <p className="text-xs text-muted-foreground">{t("dashboard.dayAgo")}</p>
              </div>
              <Badge variant="outline">{t("dashboard.positive")}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t("dashboard.screenshotAnalysisEUR")}</p>
                <p className="text-xs text-muted-foreground">{t("dashboard.daysAgo")}</p>
              </div>
              <Badge variant="outline">{t("dashboard.minutes")}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.currentGoals")}</CardTitle>
            <CardDescription>{t("dashboard.developmentObjectives")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t("dashboard.improveEmotionalControl")}</p>
                <span className="text-sm text-muted-foreground">{t("dashboard.scoreTarget")}</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t("dashboard.complete20Exercises")}</p>
                <span className="text-sm text-muted-foreground">{t("dashboard.exercisesProgress")}</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t("dashboard.weeklyCoachingSessions")}</p>
                <span className="text-sm text-muted-foreground">{t("dashboard.sessionsProgress")}</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
