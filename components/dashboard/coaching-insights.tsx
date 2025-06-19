"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { Brain, TrendingUp, Heart, Target, Lightbulb, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react"

export function CoachingInsights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

  // Mock data for coaching insights
  const emotionalTrendData = [
    { date: "Week 1", stress: 7, confidence: 4, focus: 5, anxiety: 6 },
    { date: "Week 2", stress: 6, confidence: 5, focus: 6, anxiety: 5 },
    { date: "Week 3", stress: 5, confidence: 6, focus: 7, anxiety: 4 },
    { date: "Week 4", stress: 4, confidence: 7, focus: 8, anxiety: 3 },
  ]

  const sessionEffectivenessData = [
    { type: "Crisis Support", effectiveness: 95, sessions: 3 },
    { type: "Pre-Trading Prep", effectiveness: 88, sessions: 12 },
    { type: "Post-Trading Review", effectiveness: 92, sessions: 8 },
    { type: "Behavioral Change", effectiveness: 85, sessions: 6 },
    { type: "Confidence Building", effectiveness: 90, sessions: 4 },
    { type: "Stress Management", effectiveness: 93, sessions: 7 },
  ]

  const coachingGoalsData = [
    { goal: "Emotional Control", current: 78, target: 90 },
    { goal: "Discipline", current: 85, target: 95 },
    { goal: "Risk Management", current: 72, target: 85 },
    { goal: "Pattern Recognition", current: 88, target: 90 },
    { goal: "Stress Management", current: 82, target: 90 },
    { goal: "Confidence", current: 75, target: 85 },
  ]

  const recentBreakthroughs = [
    {
      date: "2 days ago",
      title: "Emotional Regulation Breakthrough",
      description:
        "Successfully managed emotions during a volatile trading session without making impulsive decisions.",
      impact: "high",
      category: "emotional-control",
    },
    {
      date: "1 week ago",
      title: "FOMO Management Success",
      description: "Resisted FOMO urges and stuck to trading plan during a major market movement.",
      impact: "medium",
      category: "behavioral-patterns",
    },
    {
      date: "2 weeks ago",
      title: "Stress Response Improvement",
      description: "Implemented breathing techniques during high-stress trading situation with positive results.",
      impact: "medium",
      category: "stress-management",
    },
  ]

  const aiRecommendations = [
    {
      priority: "high",
      title: "Focus on Pre-Trading Preparation",
      description:
        "Your sessions show improved outcomes when you engage in pre-trading mental preparation. Consider making this a daily routine.",
      actionItems: [
        "Set aside 10 minutes before each trading session",
        "Complete emotional state assessment",
        "Review trading plan and goals",
        "Practice visualization exercises",
      ],
    },
    {
      priority: "medium",
      title: "Strengthen Stress Management Skills",
      description:
        "Stress levels remain elevated during volatile market conditions. Additional stress management techniques could be beneficial.",
      actionItems: [
        "Practice daily breathing exercises",
        "Implement progressive muscle relaxation",
        "Use stress monitoring tools",
        "Schedule regular breaks during trading",
      ],
    },
    {
      priority: "low",
      title: "Continue Confidence Building Work",
      description:
        "Your confidence levels are improving steadily. Maintain current practices and consider advanced confidence-building exercises.",
      actionItems: [
        "Keep a success journal",
        "Practice positive self-talk",
        "Set achievable daily goals",
        "Celebrate small wins",
      ],
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-green-500 bg-green-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coaching Insights</h1>
          <p className="text-gray-600 mt-1">AI-powered analysis of your coaching progress and effectiveness</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Analytics
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="breakthroughs">Breakthroughs</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-royal-blue-500" />
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal-blue-600 mb-2">47</div>
                <p className="text-sm text-gray-600">Coaching interactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Improvement Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">23%</div>
                <p className="text-sm text-gray-600">Overall progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Emotional Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">82%</div>
                <p className="text-sm text-gray-600">Current level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Goals Achieved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">8/12</div>
                <p className="text-sm text-gray-600">Milestones reached</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emotional Trend Analysis</CardTitle>
                <CardDescription>Track your emotional states over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emotionalTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress" />
                    <Line type="monotone" dataKey="confidence" stroke="#22c55e" name="Confidence" />
                    <Line type="monotone" dataKey="focus" stroke="#3b82f6" name="Focus" />
                    <Line type="monotone" dataKey="anxiety" stroke="#f97316" name="Anxiety" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Effectiveness</CardTitle>
                <CardDescription>How effective different coaching types are for you</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sessionEffectivenessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="effectiveness" fill="hsl(var(--royal-blue-500))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Coaching Summary</CardTitle>
              <CardDescription>Key insights from your coaching journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Insight:</strong> Your progress shows significant improvement in emotional regulation and
                  stress management. The AI coach has identified that pre-trading preparation sessions are most
                  effective for you, with a 95% success rate in improving trading performance. Continue focusing on
                  these areas while gradually introducing advanced confidence-building techniques.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coaching Goals Progress</CardTitle>
              <CardDescription>Track your progress toward coaching objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={coachingGoalsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="goal" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="target" stroke="#ef4444" fill="transparent" strokeDasharray="5 5" />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachingGoalsData.map((goal, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{goal.goal}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Progress</span>
                      <span className="text-sm text-gray-600">{goal.current}%</span>
                    </div>
                    <Progress value={goal.current} className="h-2" />
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Target: {goal.target}%</span>
                      <span>{goal.target - goal.current}% to go</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breakthroughs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Breakthroughs</CardTitle>
              <CardDescription>Significant progress moments identified by AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBreakthroughs.map((breakthrough, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 ${getImpactColor(breakthrough.impact)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{breakthrough.title}</h4>
                        <p className="text-sm text-gray-600">{breakthrough.date}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`capitalize ${
                          breakthrough.impact === "high"
                            ? "border-green-500 text-green-700"
                            : breakthrough.impact === "medium"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-blue-500 text-blue-700"
                        }`}
                      >
                        {breakthrough.impact} impact
                      </Badge>
                    </div>
                    <p className="text-sm">{breakthrough.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Breakthroughs This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <p className="text-sm text-gray-600">Significant progress moments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Improvement Velocity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">+15%</div>
                <p className="text-sm text-gray-600">Faster than average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Consistency Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                <p className="text-sm text-gray-600">Progress consistency</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-6">
            {aiRecommendations.map((recommendation, index) => (
              <Card key={index} className={`border-2 ${getPriorityColor(recommendation.priority)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {recommendation.priority === "high" ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : recommendation.priority === "medium" ? (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Lightbulb className="h-5 w-5 text-green-600" />
                        )}
                        {recommendation.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{recommendation.description}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={`capitalize ${
                        recommendation.priority === "high"
                          ? "border-red-500 text-red-700"
                          : recommendation.priority === "medium"
                            ? "border-yellow-500 text-yellow-700"
                            : "border-green-500 text-green-700"
                      }`}
                    >
                      {recommendation.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                    <ul className="space-y-1">
                      {recommendation.actionItems.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button size="sm" className="mr-2">
                      Start Action Plan
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Coaching Effectiveness</CardTitle>
              <CardDescription>How well the AI coaching is working for your specific needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Strengths Identified</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Responds well to structured preparation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Quick to implement stress management techniques
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Shows consistent engagement with coaching
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Demonstrates self-awareness in emotional states
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Areas for Enhancement</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Confidence building in volatile markets
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Advanced pattern recognition skills
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Long-term goal visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Peer learning and community engagement
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
