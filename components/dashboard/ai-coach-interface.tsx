"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, Settings, Send, Bot, User, Target, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface CoachingInsight {
  id: string
  title: string
  description: string
  category: "pattern" | "progress" | "recommendation"
  date: Date
  icon: string
}

interface Goal {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "paused"
  progress: number
  targetDate: Date
}

const AICoachInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on component mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai-coach-messages")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        } catch (e) {
          console.error("Error loading saved messages:", e)
        }
      }
    }
    return [
      {
        id: "welcome",
        content:
          "Welcome! 👋 I'm your AI Trading Psychology Coach. I'm here to help you develop mental resilience, overcome emotional barriers, and optimize your trading performance.\n\nWhat would you like to work on today? 🎯",
        role: "assistant" as const,
        timestamp: new Date(),
      },
    ]
  })

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample data for insights and goals
  const [insights] = useState<CoachingInsight[]>([
    {
      id: "1",
      title: "Emotional Pattern Recognition",
      description:
        "You've shown consistent improvement in recognizing emotional triggers before they impact your trading decisions.",
      category: "progress",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: "🧠",
    },
    {
      id: "2",
      title: "Risk Management Consistency",
      description:
        "Your position sizing has become more disciplined over the past week, showing better risk-reward awareness.",
      category: "progress",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      icon: "📊",
    },
    {
      id: "3",
      title: "FOMO Trading Pattern",
      description:
        "Detected tendency to enter trades during high volatility periods. Consider implementing a cooling-off period.",
      category: "pattern",
      date: new Date(),
      icon: "⚠️",
    },
    {
      id: "4",
      title: "Pre-Market Routine",
      description: "Establish a consistent pre-market mental preparation routine to improve focus and decision-making.",
      category: "recommendation",
      date: new Date(),
      icon: "🎯",
    },
  ])

  const [goals] = useState<Goal[]>([
    {
      id: "1",
      title: "Improve Emotional Control During Losses",
      description: "Develop strategies to maintain composure and rational thinking when facing consecutive losses.",
      status: "active",
      progress: 65,
      targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Develop Consistent Pre-Market Routine",
      description: "Create and maintain a daily routine that prepares mind and body for optimal trading performance.",
      status: "active",
      progress: 40,
      targetDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Reduce Position Sizing Anxiety",
      description: "Build confidence in position sizing decisions through systematic approach and backtesting.",
      status: "completed",
      progress: 100,
      targetDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      title: "Master Risk-Reward Ratio Discipline",
      description: "Consistently apply 1:2 minimum risk-reward ratio across all trades.",
      status: "active",
      progress: 80,
      targetDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  ])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ai-coach-messages", JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatAIResponse = (text: string) => {
    // Split by common separators and format
    return text
      .split(/(?:\d+\.\s|\*\*|###)/g)
      .filter((part) => part.trim())
      .map((part, index) => {
        const trimmed = part.trim()
        if (!trimmed) return null

        // Add emojis based on content
        let formatted = trimmed
        if (trimmed.toLowerCase().includes("emotional") || trimmed.toLowerCase().includes("feeling")) {
          formatted = `🧠 ${trimmed}`
        } else if (trimmed.toLowerCase().includes("risk") || trimmed.toLowerCase().includes("management")) {
          formatted = `⚖️ ${trimmed}`
        } else if (trimmed.toLowerCase().includes("strategy") || trimmed.toLowerCase().includes("approach")) {
          formatted = `🎯 ${trimmed}`
        } else if (trimmed.toLowerCase().includes("market") || trimmed.toLowerCase().includes("trade")) {
          formatted = `📈 ${trimmed}`
        } else if (trimmed.toLowerCase().includes("breathe") || trimmed.toLowerCase().includes("calm")) {
          formatted = `🧘 ${trimmed}`
        }

        return (
          <div key={index} className="mb-3 last:mb-0">
            <p className="text-sm leading-relaxed">{formatted}</p>
          </div>
        )
      })
      .filter(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: inputMessage.trim(),
      role: "user",
      timestamp: new Date(),
    }

    // Add user message immediately and clear input
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: "trading_psychology_coaching",
          sessionId: `session_${Date.now()}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment. 😔",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const clearHistory = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Welcome! 👋 I'm your AI Trading Psychology Coach. I'm here to help you develop mental resilience, overcome emotional barriers, and optimize your trading performance.\n\nWhat would you like to work on today? 🎯",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Coach</h1>
        <p className="text-gray-600 mt-2">Get personalized coaching insights</p>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">💬 Chat</TabsTrigger>
          <TabsTrigger value="insights">🧠 Coaching Insights</TabsTrigger>
          <TabsTrigger value="goals">🎯 Current Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <CardTitle>AI Trading Psychology Coach</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  Clear History
                </Button>
              </div>
              <p className="text-sm text-gray-600">Get personalized coaching insights</p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[400px] max-h-[500px] border rounded-lg p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600",
                      )}
                    >
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm",
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm",
                      )}
                    >
                      {message.role === "assistant" ? (
                        <div className="space-y-2">{formatAIResponse(message.content)}</div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                      <p
                        className={cn(
                          "text-xs mt-2 opacity-70",
                          message.role === "user" ? "text-blue-100" : "text-gray-500",
                        )}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 mr-auto max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Submit your question..."
                    className="min-h-[60px] resize-none pr-20"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button type="submit" disabled={!inputMessage.trim() || isLoading} className="px-6">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Coaching Insights
                </CardTitle>
                <p className="text-sm text-gray-600">
                  AI-generated insights based on your trading patterns and conversations
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div
                      key={insight.id}
                      className={cn(
                        "p-4 rounded-lg border-l-4",
                        insight.category === "progress" && "bg-green-50 border-green-500",
                        insight.category === "pattern" && "bg-yellow-50 border-yellow-500",
                        insight.category === "recommendation" && "bg-blue-50 border-blue-500",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{insight.icon}</span>
                            <h3
                              className={cn(
                                "font-semibold",
                                insight.category === "progress" && "text-green-900",
                                insight.category === "pattern" && "text-yellow-900",
                                insight.category === "recommendation" && "text-blue-900",
                              )}
                            >
                              {insight.title}
                            </h3>
                          </div>
                          <p
                            className={cn(
                              "text-sm",
                              insight.category === "progress" && "text-green-700",
                              insight.category === "pattern" && "text-yellow-700",
                              insight.category === "recommendation" && "text-blue-700",
                            )}
                          >
                            {insight.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            insight.category === "progress"
                              ? "default"
                              : insight.category === "pattern"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {insight.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {insight.date.toLocaleDateString()} at {insight.date.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Current Goals
                </CardTitle>
                <p className="text-sm text-gray-600">Track your trading psychology development goals</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <Badge
                          variant={
                            goal.status === "completed" ? "default" : goal.status === "active" ? "secondary" : "outline"
                          }
                        >
                          {goal.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Target: {goal.targetDate.toLocaleDateString()}</span>
                          <span>
                            {goal.status === "completed"
                              ? "✅ Completed"
                              : `${Math.ceil((goal.targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AICoachInterface
