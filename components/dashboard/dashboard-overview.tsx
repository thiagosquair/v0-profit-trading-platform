"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Target, Award, MessageSquare, Camera, BarChart3, BookOpen, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock data for preview
const psychologyScoreData = [
  { date: "Mon", score: 65 },
  { date: "Tue", score: 72 },
  { date: "Wed", score: 68 },
  { date: "Thu", score: 75 },
  { date: "Fri", score: 82 },
  { date: "Sat", score: 78 },
  { date: "Sun", score: 85 },
]

const skillsData = [
  { skill: "Emotional Control", score: 85 },
  { skill: "Risk Management", score: 72 },
  { skill: "Patience", score: 68 },
  { skill: "Discipline", score: 90 },
  { skill: "Focus", score: 75 },
  { skill: "Confidence", score: 80 },
]

export function DashboardOverview() {
  const { t } = useLanguage()

  const recentActivities = [
    { type: t("nav.aiCoach"), time: "2 hours ago", icon: MessageSquare },
    { type: t("nav.analysis"), time: "5 hours ago", icon: Camera },
    { type: t("nav.exercises"), time: "1 day ago", icon: Target },
    { type: t("nav.courses"), time: "2 days ago", icon: BookOpen },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-royal-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("welcome")}, John!</h1>
            <p className="text-navy-200">{t("subtitle")}</p>
          </div>
          <Brain className="h-16 w-16 text-royal-blue-300" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-royal-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("psychologyScore")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-royal-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">85/100</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">24</div>
            <p className="text-xs text-muted-foreground">{t("thisWeek")}</p>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("coachingSessions")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">8</div>
            <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">12</div>
            <p className="text-xs text-muted-foreground">{t("badgesEarned")}</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Psychology Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy-800">{t("psychologyTrend")}</CardTitle>
            <CardDescription>{t("weeklyPerformance")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={psychologyScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy-800">{t("tradingSkills")}</CardTitle>
            <CardDescription>{t("skillLevels")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Skills"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy-800">{t("quickActions")}</CardTitle>
            <CardDescription>{t("jumpInto")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-royal-blue-600 to-royal-blue-700 hover:from-royal-blue-700 hover:to-royal-blue-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              {t("nav.aiCoach")}
            </Button>
            <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
              <Camera className="mr-2 h-4 w-4" />
              {t("nav.analysis")}
            </Button>
            <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
              <Target className="mr-2 h-4 w-4" />
              {t("nav.exercises")}
            </Button>
            <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
              <BarChart3 className="mr-2 h-4 w-4" />
              {t("nav.patterns")}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy-800">{t("recentActivity")}</CardTitle>
            <CardDescription>{t("latestActivities")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 rounded-full bg-royal-blue-100">
                    <activity.icon className="h-4 w-4 text-royal-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy-800">{activity.type}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">{t("currentGoals")}</CardTitle>
          <CardDescription>{t("developmentObjectives")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-navy-800">Improve Emotional Control</h4>
                <p className="text-sm text-gray-600">Complete 5 mindfulness exercises this week</p>
                <Progress value={80} className="mt-2 w-full" />
              </div>
              <Badge variant="secondary" className="ml-4">
                4/5
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-navy-800">Reduce Impulsive Trading</h4>
                <p className="text-sm text-gray-600">Practice pre-trade analysis routine</p>
                <Progress value={60} className="mt-2 w-full" />
              </div>
              <Badge variant="secondary" className="ml-4">
                3/5
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-navy-800">Build Trading Confidence</h4>
                <p className="text-sm text-gray-600">Complete confidence-building course</p>
                <Progress value={40} className="mt-2 w-full" />
              </div>
              <Badge variant="secondary" className="ml-4">
                2/5
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
