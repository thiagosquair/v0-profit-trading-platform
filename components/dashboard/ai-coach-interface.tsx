"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Send, Loader2, Target, TrendingUp, Heart, Zap, AlertTriangle, Shield, Lightbulb } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AICoachInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Psychology Coach. I'm here to help you develop better trading psychology, manage emotions, and improve your decision-making. What's on your mind today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickTopics = [
    {
      id: "emotional-control",
      label: "Emotional Control",
      icon: Heart,
      prompt:
        "I'm struggling with emotional control while trading. Can you help me develop better emotional regulation strategies?",
    },
    {
      id: "risk-management",
      label: "Risk Psychology",
      icon: Shield,
      prompt: "I need help understanding the psychology behind risk management and how to stick to my risk rules.",
    },
    {
      id: "fomo-help",
      label: "FOMO Management",
      icon: AlertTriangle,
      prompt: "I often experience FOMO (Fear of Missing Out) when trading. How can I overcome this?",
    },
    {
      id: "confidence-building",
      label: "Confidence Building",
      icon: TrendingUp,
      prompt: "I lack confidence in my trading decisions. How can I build more confidence while staying realistic?",
    },
    {
      id: "discipline",
      label: "Trading Discipline",
      icon: Target,
      prompt: "I struggle with trading discipline and following my trading plan. What strategies can help?",
    },
    {
      id: "stress-management",
      label: "Stress Management",
      icon: Zap,
      prompt: "Trading stress is affecting my performance and wellbeing. Can you help me manage it better?",
    },
  ]

  const userProfile = {
    tradingExperience: "Intermediate (2-3 years)",
    tradingStyle: "Day Trading & Swing Trading",
    riskTolerance: "Moderate",
    psychologicalChallenges: ["FOMO", "Emotional Decision Making", "Overconfidence"],
    goals: ["Improve emotional control", "Develop better discipline", "Reduce impulsive decisions"],
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("Sending message to AI Coach API:", messageContent)

      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          context: selectedTopic,
          userProfile,
        }),
      })

      console.log("API Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response data:", data)

      if (data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error("No response received from AI")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I apologize, but I'm having trouble connecting right now. Error: ${error.message}. Please try again in a moment.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickTopic = (topic: (typeof quickTopics)[0]) => {
    setSelectedTopic(topic.id)
    sendMessage(topic.prompt)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Psychology Coach</h1>
          <p className="text-gray-600 mt-1">Get personalized coaching to improve your trading psychology</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Powered by OpenAI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Topics Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Topics</CardTitle>
              <CardDescription>Get instant help with common challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickTopics.map((topic) => (
                <Button
                  key={topic.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleQuickTopic(topic)}
                  disabled={isLoading}
                >
                  <topic.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{topic.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Experience</h4>
                <Badge variant="secondary">{userProfile.tradingExperience}</Badge>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Trading Style</h4>
                <p className="text-sm text-gray-600">{userProfile.tradingStyle}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Current Challenges</h4>
                <div className="space-y-1">
                  {userProfile.psychologicalChallenges.map((challenge, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      • {challenge}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Goals</h4>
                <div className="space-y-1">
                  {userProfile.goals.map((goal, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      • {goal}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">AI Coaching Chat</TabsTrigger>
              <TabsTrigger value="insights">Session Insights</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        <Brain className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">AI Psychology Coach</CardTitle>
                      <CardDescription>
                        {selectedTopic
                          ? `Topic: ${quickTopics.find((t) => t.id === selectedTopic)?.label}`
                          : "General Coaching Session"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                                : "bg-gray-100 text-gray-900 border"
                            }`}
                          >
                            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                            <div
                              className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3 border">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm text-gray-600">AI Coach is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about trading psychology..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle>Session Insights</CardTitle>
                  <CardDescription>Key insights from your coaching sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{messages.length - 1}</div>
                        <div className="text-sm text-gray-600">Messages Exchanged</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {quickTopics.filter((t) => t.id === selectedTopic).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Topics Discussed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{Math.floor(messages.length / 2)}</div>
                        <div className="text-sm text-gray-600">Coaching Responses</div>
                      </div>
                    </div>

                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Session Summary:</strong> You've been actively engaging with the AI Coach. Keep
                        practicing the strategies discussed and remember that developing trading psychology is a gradual
                        process that requires consistent effort.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>Track your development over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Emotional Control</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Trading Discipline</span>
                        <span className="text-sm text-gray-600">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Risk Management</span>
                        <span className="text-sm text-gray-600">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
