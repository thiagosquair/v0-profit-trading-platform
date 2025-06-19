"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { t } from "@/lib/simple-translations"
import { Brain, Target, Award, BarChart3, Camera, PenTool, ArrowRight, Clock } from "lucide-react"

export function DashboardOverview() {
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
      description: "Get personalized coaching insights",
      icon: Brain,
      href: "/dashboard/coach",
      color: "bg-blue-500",
    },
    {
      title: t("screenshotAnalysis"),
      description: "Upload and analyze your trading screenshots",
      icon: Camera,
      href: "/dashboard/analysis",
      color: "bg-purple-500",
    },
    {
      title: t("interactiveExercises"),
      description: "Complete psychology exercises and assessments",
      icon: Target,
      href: "/dashboard/exercises",
      color: "bg-green-500",
    },
    {
      title: t("reflectionJournal"),
      description: "Reflect on your trading experiences",
      icon: PenTool,
      href: "/dashboard/journal",
      color: "bg-orange-500",
    },
  ]

  const recentActivities = [
    {
      type: "exercise",
      title: "Completed Emotional Control Assessment",
      time: "2 hours ago",
      score: 85,
    },
    {
      type: "coaching",
      title: "AI Coaching Session on Risk Management",
      time: "1 day ago",
      duration: "15 min",
    },
    {
      type: "analysis",
      title: "Screenshot Analysis - EUR/USD Trade",
      time: "2 days ago",
      result: "Positive",
    },
  ]

  const currentGoals = [
    {
      title: "Improve Emotional Control",
      progress: 75,
      target: "Score 85+",
    },
    {
      title: "Complete 20 Exercises",
      progress: 60,
      target: "12/20 completed",
    },
    {
      title: "Weekly Coaching Sessions",
      progress: 80,
      target: "4/5 sessions",
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
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exercisesCompleted}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coachingSessions}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.achievements}</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your training</CardDescription>
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest activities</CardDescription>
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
                        Score: {activity.score}
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
          <CardTitle>Current Goals</CardTitle>
          <CardDescription>Your development objectives</CardDescription>
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
