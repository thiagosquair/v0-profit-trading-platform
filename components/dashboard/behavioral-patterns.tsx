"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { t } from "@/lib/simple-translations"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Brain,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react"

interface BehavioralPattern {
  id: string
  name: string
  description: string
  severity: "low" | "medium" | "high"
  frequency: number
  lastOccurrence: Date
  trend: "improving" | "stable" | "worsening"
  category: string
  impact: number
  recommendations: string[]
}

export function BehavioralPatterns() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const patterns: BehavioralPattern[] = [
    {
      id: "fomo-trading",
      name: t("fomoTrading"),
      description: t("fomoTradingDesc"),
      severity: "high",
      frequency: 8,
      lastOccurrence: new Date(Date.now() - 86400000 * 2),
      trend: "improving",
      category: t("emotional"),
      impact: 85,
      recommendations: [t("setSpecificEntryCriteria"), t("useLimitOrders"), t("practice5MinuteRule")],
    },
    {
      id: "revenge-trading",
      name: t("revengeTrading"),
      description: t("revengeTradingDesc"),
      severity: "high",
      frequency: 5,
      lastOccurrence: new Date(Date.now() - 86400000 * 5),
      trend: "improving",
      category: t("emotional"),
      impact: 92,
      recommendations: [
        "Implement mandatory cooling-off periods after losses",
        "Set daily loss limits",
        "Practice acceptance meditation exercises",
      ],
    },
    {
      id: "overconfidence",
      name: t("overconfidenceBias"),
      description: t("overconfidenceBiasDesc"),
      severity: "medium",
      frequency: 6,
      lastOccurrence: new Date(Date.now() - 86400000 * 7),
      trend: "stable",
      category: t("cognitive"),
      impact: 68,
      recommendations: [
        "Maintain consistent position sizing",
        "Keep a trading journal to track confidence levels",
        "Review past overconfident trades weekly",
      ],
    },
    {
      id: "analysis-paralysis",
      name: t("analysisParalysis"),
      description: t("analysisParalysisDesc"),
      severity: "low",
      frequency: 3,
      lastOccurrence: new Date(Date.now() - 86400000 * 10),
      trend: "improving",
      category: t("cognitive"),
      impact: 45,
      recommendations: [
        "Set time limits for trade analysis",
        "Create a simple decision framework",
        "Practice quick decision-making exercises",
      ],
    },
    {
      id: "emotional-stops",
      name: t("emotionalStopMoving"),
      description: t("emotionalStopMovingDesc"),
      severity: "high",
      frequency: 7,
      lastOccurrence: new Date(Date.now() - 86400000 * 1),
      trend: "worsening",
      category: "discipline",
      impact: 88,
      recommendations: [
        "Use hard stops that cannot be modified",
        "Write down stop loss reasons before entering",
        "Practice stop loss acceptance exercises",
      ],
    },
  ]

  const patternTrendData = [
    { date: t("week") + " 1", fomo: 12, revenge: 8, overconfidence: 6, paralysis: 4, emotionalStops: 10 },
    { date: t("week") + " 2", fomo: 10, revenge: 6, overconfidence: 7, paralysis: 3, emotionalStops: 9 },
    { date: t("week") + " 3", fomo: 8, revenge: 5, overconfidence: 6, paralysis: 3, emotionalStops: 8 },
    { date: t("week") + " 4", fomo: 6, revenge: 4, overconfidence: 5, paralysis: 2, emotionalStops: 7 },
  ]

  const severityDistribution = [
    { name: t("high") + " Severity", value: 3, color: "#ef4444" },
    { name: t("medium") + " Severity", value: 1, color: "#f97316" },
    { name: t("low") + " Severity", value: 1, color: "#22c55e" },
  ]

  const categoryData = [
    { category: t("emotional"), count: 2, improvement: 15 },
    { category: t("cognitive"), count: 2, improvement: 8 },
    { category: "Discipline", count: 1, improvement: -5 },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      case "worsening":
        return <TrendingUp className="h-4 w-4 text-red-600" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "worsening":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredPatterns =
    selectedCategory === "all" ? patterns : patterns.filter((p) => p.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("behavioralPatternsTitle")}</h1>
          <p className="text-gray-600 mt-1">{t("identifyAndTrackPatterns")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            {t("aiDetection")}
          </Badge>
        </div>
      </div>

      {/* Alert for High Severity Patterns */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>{t("highSeverityPatternsDetected")}</strong> {t("focusOnEmotionalStop")}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="patterns">{t("patterns")}</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-royal-blue-500" />
                  {t("patternsDetected")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal-blue-600 mb-2">{patterns.length}</div>
                <p className="text-sm text-gray-600">{t("activeBehavioralPatterns")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-500" />
                  {t("improving")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {patterns.filter((p) => p.trend === "improving").length}
                </div>
                <p className="text-sm text-gray-600">{t("patternsShowingImprovement")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  {t("highPriority")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {patterns.filter((p) => p.severity === "high").length}
                </div>
                <p className="text-sm text-gray-600">{t("highSeverityPatternsRequiring")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("patternSeverityDistribution")}</CardTitle>
                <CardDescription>{t("breakdownPatternsBySeverity")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={severityDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {severityDistribution.map((entry, index) => (
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
                <CardTitle>{t("categoryPerformance")}</CardTitle>
                <CardDescription>{t("improvementByPatternCategory")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {category.count} {t("patterns")}
                          </span>
                          <span className={`text-sm ${category.improvement > 0 ? "text-green-600" : "text-red-600"}`}>
                            {category.improvement > 0 ? "+" : ""}
                            {category.improvement}%
                          </span>
                        </div>
                      </div>
                      <Progress value={Math.abs(category.improvement) * 2} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")} Categories</SelectItem>
                <SelectItem value={t("emotional")}>{t("emotional")}</SelectItem>
                <SelectItem value={t("cognitive")}>{t("cognitive")}</SelectItem>
                <SelectItem value="discipline">Discipline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPatterns.map((pattern) => (
              <Card key={pattern.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(pattern.severity)}>{t(pattern.severity as any)}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {pattern.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(pattern.trend)}
                        <span className={`text-sm ${getTrendColor(pattern.trend)}`}>{t(pattern.trend as any)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {t("impact")} {t("score")}
                      </div>
                      <div className="text-2xl font-bold text-royal-blue-600">{pattern.impact}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{pattern.name}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{t("frequency")}:</strong> {pattern.frequency} {t("times")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{t("lastSeen")}:</strong> {pattern.lastOccurrence.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>{t("category")}:</strong> {pattern.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{t("recommendations")}:</h4>
                    <ul className="space-y-1">
                      {pattern.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="mr-2">
                      {t("viewDetails")}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                    >
                      {t("startExercise")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Frequency Trends</CardTitle>
              <CardDescription>Track how your behavioral patterns change over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={patternTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="fomo" stroke="#ef4444" name="FOMO Trading" />
                  <Line type="monotone" dataKey="revenge" stroke="#f97316" name="Revenge Trading" />
                  <Line type="monotone" dataKey="overconfidence" stroke="#eab308" name="Overconfidence" />
                  <Line type="monotone" dataKey="paralysis" stroke="#22c55e" name="Analysis Paralysis" />
                  <Line type="monotone" dataKey="emotionalStops" stroke="#3b82f6" name="Emotional Stops" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Action Plan</CardTitle>
              <CardDescription>AI-generated recommendations based on your pattern analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-red-800 mb-2">🚨 Immediate Priority</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Focus on <strong>Emotional Stop Moving</strong> - this pattern has the highest impact (88) and is
                    worsening.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="mr-2">
                      Start Stop Loss Exercise
                    </Button>
                    <Button size="sm" variant="outline">
                      Read Guide
                    </Button>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Medium Priority</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Work on <strong>FOMO Trading</strong> - showing improvement but still high frequency.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="mr-2">
                      FOMO Management Course
                    </Button>
                    <Button size="sm" variant="outline">
                      Practice Patience
                    </Button>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Maintenance</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Continue progress on <strong>Analysis Paralysis</strong> - low severity and improving.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="mr-2">
                      Quick Decision Drills
                    </Button>
                    <Button size="sm" variant="outline">
                      Weekly Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
              <CardDescription>Specific targets for pattern improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Reduce emotional stop moving</h4>
                    <p className="text-sm text-gray-600">Target: 0 occurrences this week</p>
                  </div>
                  <Badge variant="outline">0/7 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Complete FOMO exercises</h4>
                    <p className="text-sm text-gray-600">Target: 3 exercises this week</p>
                  </div>
                  <Badge variant="outline">1/3 completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Practice decision-making drills</h4>
                    <p className="text-sm text-gray-600">Target: 5 minutes daily</p>
                  </div>
                  <Badge variant="outline">3/7 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
