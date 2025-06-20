"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/simple-translations"
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle, Clock, Send, Heart, Zap } from "lucide-react"

export function AdvancedAICoach() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai" as const,
      message: "Hello! I'm your AI Trading Psychology Coach. How can I help you improve your trading mindset today?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
  ])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      type: "user" as const,
      message: message.trim(),
      timestamp: new Date(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: "ai" as const,
        message:
          "I understand your concern about emotional trading. Let me help you develop better emotional control strategies. Would you like to try a quick mindfulness exercise?",
        timestamp: new Date(),
      }
      setChatHistory((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const coachingInsights = [
    {
      title: t("emotionalControl"),
      score: 78,
      trend: "up",
      description: "Your emotional regulation has improved by 12% this week",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: t("riskManagement"),
      score: 85,
      trend: "up",
      description: "Excellent progress in position sizing discipline",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Decision Making",
      score: 72,
      trend: "down",
      description: "Consider slowing down your entry decisions",
      icon: Brain,
      color: "text-purple-500",
    },
    {
      title: "Stress Management",
      score: 80,
      trend: "up",
      description: "Great improvement in handling market volatility",
      icon: Zap,
      color: "text-yellow-500",
    },
  ]

  const quickExercises = [
    {
      title: "5-Minute Breathing",
      description: "Calm your mind before trading",
      duration: "5 min",
      type: "mindfulness",
    },
    {
      title: "Risk Assessment",
      description: "Evaluate your risk tolerance",
      duration: "10 min",
      type: "analysis",
    },
    {
      title: "Emotion Check-in",
      description: "Identify current emotional state",
      duration: "3 min",
      type: "reflection",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("aiCoach")}</h1>
        <p className="text-gray-600 mt-2">{t("personalAICoach")}</p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">{t("aiChat")}</TabsTrigger>
          <TabsTrigger value="insights">{t("insights")}</TabsTrigger>
          <TabsTrigger value="exercises">{t("quickExercises")}</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    {t("aiChat")}
                  </CardTitle>
                  <CardDescription>{t("getPersonalizedCoachingAdvice")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            chat.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">{chat.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            <span className="text-sm text-gray-600">{t("aiIsThinking")}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("askYourAICoach")}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isLoading}
                    />
                    <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("todaysFocus")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t("emotionalControl")}</p>
                      <p className="text-sm text-gray-600">{t("practiceMindfulTrading")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t("riskManagement")}</p>
                      <p className="text-sm text-gray-600">{t("stickToPositionSizes")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t("patience")}</p>
                      <p className="text-sm text-gray-600">{t("waitForQualitySetups")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("sessionStats")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("messagesToday")}</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("insightsReceived")}</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("exercisesSuggested")}</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachingInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    {insight.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{insight.score}</span>
                    <TrendingUp className={`h-4 w-4 ${insight.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={insight.score} className="mb-2" />
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickExercises.map((exercise, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{exercise.duration}</span>
                    </div>
                    <Badge variant="outline">{exercise.type}</Badge>
                  </div>
                  <Button className="w-full">{t("start")} Exercise</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
