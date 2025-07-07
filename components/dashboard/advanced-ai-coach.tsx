"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  Lightbulb,
  Send,
  Mic,
  Settings,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Camera,
  Heart,
  Calendar,
  Trophy,
  Clock
} from "lucide-react"

export function AdvancedAICoach() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  const handleSendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context: "chat",
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data.response)
      } else {
        setResponse(`❗ Error: ${data.error || "Unknown error"}`)
      }

      setMessage("")
    } catch (err) {
      console.error("Failed to fetch AI response", err)
      setResponse("❗ Error contacting AI Coach.")
    } finally {
      setIsLoading(false)
    }
  }

  // Quick Actions handlers
  const handleEmotionalCheckIn = () => {
    window.location.href = '/dashboard/exercises?type=emotional-checkin'
  }

  const handleRiskVisualization = () => {
    window.location.href = '/dashboard/trade-analysis?view=risk'
  }

  const handleScreenshotAnalysis = () => {
    window.location.href = '/dashboard/screenshot-analysis'
  }

  // Mock data for insights and goals
  const insights = [
    {
      id: 1,
      title: "Emotional Pattern Recognition",
      description: "You tend to make impulsive decisions during high volatility periods",
      severity: "medium",
      recommendation: "Practice mindfulness techniques before entering trades",
      progress: 65
    },
    {
      id: 2,
      title: "Risk Management Improvement",
      description: "Your position sizing has improved by 23% this month",
      severity: "positive",
      recommendation: "Continue using the 2% rule for position sizing",
      progress: 78
    },
    {
      id: 3,
      title: "FOMO Trading Patterns",
      description: "Detected 3 FOMO trades in the last week",
      severity: "high",
      recommendation: "Set strict entry criteria and stick to your trading plan",
      progress: 45
    }
  ]

  const goals = [
    {
      id: 1,
      title: "Reduce Emotional Trading",
      description: "Decrease emotion-driven trades by 50%",
      progress: 72,
      deadline: "End of month",
      status: "on-track"
    },
    {
      id: 2,
      title: "Improve Risk-Reward Ratio",
      description: "Achieve consistent 1:3 risk-reward ratio",
      progress: 58,
      deadline: "Next 2 weeks",
      status: "needs-attention"
    },
    {
      id: 3,
      title: "Daily Meditation Practice",
      description: "Complete 10 minutes of meditation daily",
      progress: 85,
      deadline: "Ongoing",
      status: "excellent"
    },
    {
      id: 4,
      title: "Trading Journal Consistency",
      description: "Log every trade with emotional state",
      progress: 92,
      deadline: "Daily",
      status: "excellent"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'positive': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'on-track': return 'bg-blue-100 text-blue-800'
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Coach</h1>
        <p className="text-muted-foreground mt-2">Get personalized coaching insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Lightbulb className="h-4 w-4 mr-2" />
            Coaching Insights
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="h-4 w-4 mr-2" />
            Current Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>AI Coach</span>
                  </CardTitle>
                  <CardDescription>Get personalized coaching insights</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 mb-4 overflow-y-auto flex flex-col space-y-6">
                    {/* User message bubble */}
                    {message && (
                      <div className="self-end max-w-[75%] bg-blue-100 text-blue-900 p-4 rounded-xl whitespace-pre-line shadow-sm">
                        <p className="font-semibold mb-1">You 🧑‍💻:</p>
                        <p>{message}</p>
                      </div>
                    )}

                    {/* AI Coach response bubble */}
                    <div className="self-start max-w-[75%] bg-green-100 text-green-900 p-4 rounded-xl whitespace-pre-line shadow-sm">
                      <p className="font-semibold mb-1">AI Coach 🤖:</p>
                      <p>
                        {response ||
                          "Welcome! I'm your AI trading psychology coach. Ask me anything about managing emotions, improving discipline, or developing better trading habits. How can I help you today? 🤗"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Ask your AI coach anything about trading psychology..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isLoading}
                      >
                        {isLoading ? (
                          "Loading..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleEmotionalCheckIn}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Emotional Check-in
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleRiskVisualization}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Risk Visualization
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleScreenshotAnalysis}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Upload and analyze your trading screenshots
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">AI Coaching Session</div>
                    <div className="text-muted-foreground">1 day ago</div>
                    <Badge className="mt-1 bg-green-100 text-green-800">
                      Positive
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Completed Emotional Control Exercise</div>
                    <div className="text-muted-foreground">3 hours ago</div>
                    <Badge className="mt-1">Score: 85</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Coaching Insights
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of your trading psychology patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                          {insight.severity === 'positive' ? 'Improvement' : insight.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{insight.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{insight.progress}%</span>
                        </div>
                        <Progress value={insight.progress} className="h-2" />
                      </div>
                      <div className="mt-3 p-3 bg-white/50 rounded border">
                        <p className="text-sm font-medium">💡 Recommendation:</p>
                        <p className="text-sm">{insight.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Current Goals
                  </CardTitle>
                  <CardDescription>
                    Track your trading psychology development objectives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold flex items-center gap-2">
                            {goal.title}
                            {goal.status === 'excellent' && <Trophy className="h-4 w-4 text-yellow-500" />}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{goal.deadline}</span>
                        </div>
                        {goal.status === 'needs-attention' && (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <AlertCircle className="h-4 w-4" />
                            <span>Needs focus</span>
                          </div>
                        )}
                        {goal.status === 'excellent' && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Excellent progress</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-4" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
