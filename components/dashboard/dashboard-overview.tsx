"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTranslations } from "next-intl"
import { Brain, Target, Award, BarChart3, Camera, PenTool, ArrowRight, Clock } from "lucide-react"

export function DashboardOverview() {
  const t = useTranslations("dashboard")
  
  // Mock data for demo
  const stats = {
    psychologyScore: 78,
    exercisesCompleted: 12,
    coachingSessions: 5,
    achievements: 8,
  }

  const quickActions = [
    {
      title: t("aiCoach"),
      description: t("getPersonalizedCoaching"),
      icon: Brain,
      href: "/dashboard/coach",
      color: "bg-blue-500",
    },
    {
      title: t("screenshotAnalysis"),
      description: t("uploadAndAnalyze"),
      icon: Camera,
      href: "/dashboard/analysis",
      color: "bg-purple-500",
    },
    {
      title: t("interactiveExercises"),
      description: t("completePsychology"),
      icon: Target,
      href: "/dashboard/exercises",
      color: "bg-green-500",
    },
    {
      title: t("reflectionJournal"),
      description: t("reflectOnTrading"),
      icon: PenTool,
      href: "/dashboard/journal",
      color: "bg-orange-500",
    },
  ]

  const recentActivities = [
    {
      type: "exercise",
      title: t("completedEmotionalControl"),
      time: t("hoursAgo"),
      score: 85,
    },
    {
      type: "coaching",
      title: t("aiCoachingSession"),
      time: t("dayAgo"),
      duration: t("minutes"),
    },
    {
      type: "analysis",
      title: t("screenshotAnalysisEUR"),
      time: t("daysAgo"),
      result: t("positive"),
    },
  ]

  const currentGoals = [
    {
      title: t("improveEmotionalControl"),
      progress: 75,
      target: t("scoreTarget"),
    },
    {
      title: t("complete20Exercises"),
      progress: 60,
      target: t("exercisesProgress"),
    },
    {
      title: t("weeklyCoachingSessions"),
      progress: 80,
      target: t("sessionsProgress"),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("welcome")}</h1>
        <p className="text-gray-600 mt-2">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("psychologyScore")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.psychologyScore}</div>
            <p className="text-xs text-muted-foreground">{t("fromLastWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exercisesCompleted}</div>
            <p className="text-xs text-muted-foreground">{t("thisWeek")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coachingSessions}</div>
            <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.achievements}</div>
            <p className="text-xs text-muted-foreground">{t("badgesEarned")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
            <CardDescription>{t("jumpInto")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={action.href}>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
            <CardDescription>{t("latestActivities")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === "exercise" && <Target className="h-5 w-5 text-green-500" />}
                  {activity.type === "coaching" && <Brain className="h-5 w-5 text-blue-500" />}
                  {activity.type === "analysis" && <Camera className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.score && (
                      <Badge variant="secondary" className="text-xs">
                        {t("score")}: {activity.score}
                      </Badge>
                    )}
                    {activity.duration && (
                      <Badge variant="outline" className="text-xs">
                        {activity.duration}
                      </Badge>
                    )}
                    {activity.result && (
                      <Badge variant="default" className="text-xs">
                        {activity.result}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <Card>
        <CardHeader>
          <CardTitle>{t("currentGoals")}</CardTitle>
          <CardDescription>{t("developmentObjectives")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{goal.title}</h3>
                  <span className="text-sm text-gray-500">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-gray-600">{goal.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
