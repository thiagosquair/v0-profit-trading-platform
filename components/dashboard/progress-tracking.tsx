"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, TrendingDown, Brain, Target, Award, Calendar, BarChart3, Activity } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function ProgressTracking() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data for charts
  const psychologyScoreData = [
    { date: "2024-01-01", score: 45, emotionalControl: 40, discipline: 50, riskManagement: 45 },
    { date: "2024-01-08", score: 52, emotionalControl: 48, discipline: 55, riskManagement: 53 },
    { date: "2024-01-15", score: 58, emotionalControl: 55, discipline: 60, riskManagement: 59 },
    { date: "2024-01-22", score: 65, emotionalControl: 62, discipline: 68, riskManagement: 65 },
    { date: "2024-01-29", score: 72, emotionalControl: 70, discipline: 75, riskManagement: 71 },
    { date: "2024-02-05", score: 78, emotionalControl: 76, discipline: 80, riskManagement: 78 },
  ]

  const exerciseCompletionData = [
    { week: "Week 1", completed: 3, target: 5 },
    { week: "Week 2", completed: 4, target: 5 },
    { week: "Week 3", completed: 5, target: 5 },
    { week: "Week 4", completed: 6, target: 5 },
    { week: "Week 5", completed: 4, target: 5 },
    { week: "Week 6", completed: 7, target: 5 },
  ]

  const behaviorPatternsData = [
    { name: "FOMO Trading", value: 25, color: "#ef4444" },
    { name: "Revenge Trading", value: 15, color: "#f97316" },
    { name: "Overconfidence", value: 20, color: "#eab308" },
    { name: "Analysis Paralysis", value: 10, color: "#22c55e" },
    { name: "Emotional Stops", value: 30, color: "#3b82f6" },
  ]

  const radarData = [
    { subject: t("progressTracking.skills.emotionalControl"), current: 78, target: 90 },
    { subject: t("progressTracking.skills.discipline"), target: 85, current: 82 },
    { subject: t("progressTracking.skills.riskManagement"), target: 88, current: 75 },
    { subject: t("progressTracking.skills.patternRecognition"), target: 80, current: 85 },
    { subject: t("progressTracking.skills.consistency"), target: 90, current: 70 },
    { subject: t("progressTracking.skills.confidence"), target: 85, current: 88 },
  ]

  const milestones = [
    {
      title: t("progressTracking.milestones.firstAssessment"),
      date: "2024-01-01",
      status: "completed",
      description: t("progressTracking.milestones.firstAssessmentDesc"),
    },
    {
      title: t("progressTracking.milestones.tenExercises"),
      date: "2024-01-15",
      status: "completed",
      description: t("progressTracking.milestones.tenExercisesDesc"),
    },
    {
      title: t("progressTracking.milestones.score70"),
      date: "2024-01-29",
      status: "completed",
      description: t("progressTracking.milestones.score70Desc"),
    },
    {
      title: t("progressTracking.milestones.firstCourse"),
      date: "2024-02-10",
      status: "in-progress",
      description: t("progressTracking.milestones.firstCourseDesc"),
    },
    {
      title: t("progressTracking.milestones.score85"),
      date: "2024-02-20",
      status: "upcoming",
      description: t("progressTracking.milestones.score85Desc"),
    },
  ]

  const weeklyStats = [
    { metric: t("progressTracking.psychologyScore"), current: 78, previous: 72, change: 6 },
    { metric: t("progressTracking.exercisesCompleted"), current: 7, previous: 4, change: 3 },
    { metric: t("progressTracking.coachSessions"), current: 3, previous: 2, change: 1 },
    { metric: t("progressTracking.reflectionEntries"), current: 5, previous: 3, change: 2 },
  ]

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : change < 0 ? (
      <TrendingDown className="h-4 w-4 text-red-600" />
    ) : (
      <Activity className="h-4 w-4 text-gray-600" />
    )
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("progressTracking.title")}</h1>
          <p className="text-gray-600 mt-1">{t("progressTracking.subtitle")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t("progressTracking.analytics")}
          </Badge>
        </div>
      </div>

      {/* Weekly Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weeklyStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
              {getChangeIcon(stat.change)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.current}</div>
              <p className="text-xs text-muted-foreground">
                <span className={getChangeColor(stat.change)}>
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}
                </span>{" "}
                {t("progressTracking.fromLastWeek")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">{t("progressTracking.tabs.overview")}</TabsTrigger>
          <TabsTrigger value="psychology">{t("progressTracking.tabs.psychology")}</TabsTrigger>
          <TabsTrigger value="exercises">{t("progressTracking.tabs.exercises")}</TabsTrigger>
          <TabsTrigger value="patterns">{t("progressTracking.tabs.patterns")}</TabsTrigger>
          <TabsTrigger value="milestones">{t("progressTracking.tabs.milestones")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("progressTracking.charts.psychologyTrend")}</CardTitle>
                <CardDescription>{t("progressTracking.charts.psychologyTrendDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={psychologyScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value) => [`${value}%`, t("progressTracking.psychologyScore")]}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--royal-blue-500))"
                      fill="hsl(var(--royal-blue-500))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("progressTracking.charts.skillsRadar")}</CardTitle>
                <CardDescription>{t("progressTracking.charts.skillsRadarDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="target" stroke="#ef4444" fill="transparent" strokeDasharray="5 5" />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("progressTracking.charts.psychologyComponents")}</CardTitle>
              <CardDescription>{t("progressTracking.charts.psychologyComponentsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={psychologyScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <Line
                    type="monotone"
                    dataKey="emotionalControl"
                    stroke="hsl(var(--navy-600))"
                    name={t("progressTracking.skills.emotionalControl")}
                  />
                  <Line
                    type="monotone"
                    dataKey="discipline"
                    stroke="hsl(var(--royal-blue-500))"
                    name={t("progressTracking.skills.discipline")}
                  />
                  <Line
                    type="monotone"
                    dataKey="riskManagement"
                    stroke="#3b82f6"
                    name={t("progressTracking.skills.riskManagement")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  {t("progressTracking.skills.emotionalControl")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">76%</div>
                <Progress value={76} className="mb-4" />
                <p className="text-sm text-gray-600">{t("progressTracking.improvements.significantImprovement")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  {t("progressTracking.skills.discipline")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                <Progress value={80} className="mb-4" />
                <p className="text-sm text-gray-600">{t("progressTracking.improvements.excellentAdherence")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  {t("progressTracking.skills.riskManagement")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                <Progress value={78} className="mb-4" />
                <p className="text-sm text-gray-600">{t("progressTracking.improvements.goodProgress")}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("progressTracking.charts.exerciseCompletion")}</CardTitle>
              <CardDescription>{t("progressTracking.charts.exerciseCompletionDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exerciseCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("progressTracking.charts.patternDistribution")}</CardTitle>
                <CardDescription>{t("progressTracking.charts.patternDistributionDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={behaviorPatternsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {behaviorPatternsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("progressTracking.charts.patternImprovement")}</CardTitle>
                <CardDescription>{t("progressTracking.charts.patternImprovementDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behaviorPatternsData.map((pattern, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{pattern.name}</span>
                      <span className="text-sm text-gray-600">{pattern.value}%</span>
                    </div>
                    <Progress value={100 - pattern.value} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {pattern.value < 20
                        ? t("progressTracking.improvements.greatProgress")
                        : pattern.value < 30
                          ? t("progressTracking.improvements.goodImprovement")
                          : t("progressTracking.improvements.needsFocus")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("progressTracking.milestones.title")}</CardTitle>
              <CardDescription>{t("progressTracking.milestones.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {milestone.status === "completed" ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                      ) : milestone.status === "in-progress" ? (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <Badge
                          variant={
                            milestone.status === "completed"
                              ? "default"
                              : milestone.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {t(`progressTracking.milestones.status.${milestone.status.replace("-", "")}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
