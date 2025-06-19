"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Send,
  Loader2,
  Heart,
  AlertTriangle,
  Target,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Clock,
  BarChart3,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  Calendar,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  emotionalAnalysis?: EmotionalAnalysis
  sessionType?: string
}

interface EmotionalAnalysis {
  primaryEmotion: string
  intensity: number
  secondaryEmotions: string[]
  cognitiveBiases: string[]
  stressLevel: number
  riskFactors: string[]
  recommendations: string[]
  urgencyLevel: "low" | "medium" | "high"
}

interface CoachingPlan {
  immediatePriorities: string[]
  shortTermGoals: string[]
  longTermObjectives: string[]
  weeklyFocus: string[]
  milestones: string[]
  exercises: string[]
}

export function AdvancedAICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your advanced AI Psychology Coach. I can provide specialized coaching sessions, real-time emotional analysis, and personalized coaching plans. How are you feeling about your trading today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentMood, setCurrentMood] = useState([7])
  const [stressLevel, setStressLevel] = useState([5])
  const [sessionType, setSessionType] = useState("general")
  const [emotionalAnalysis, setEmotionalAnalysis] = useState<EmotionalAnalysis | null>(null)
  const [coachingPlan, setCoachingPlan] = useState<CoachingPlan | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const sessionTypes = [
    { id: "general", name: "General Coaching", icon: MessageSquare, description: "Open conversation and guidance" },
    {
      id: "crisis-intervention",
      name: "Crisis Support",
      icon: AlertTriangle,
      description: "Immediate emotional support",
    },
    { id: "pre-trading-prep", name: "Pre-Trading Prep", icon: Target, description: "Mental preparation for trading" },
    {
      id: "post-trading-review",
      name: "Post-Trading Review",
      icon: BarChart3,
      description: "Session analysis and learning",
    },
    { id: "behavioral-intervention", name: "Behavioral Change", icon: Brain, description: "Address specific patterns" },
    {
      id: "confidence-building",
      name: "Confidence Building",
      icon: TrendingUp,
      description: "Build trading confidence",
    },
    { id: "stress-management", name: "Stress Management", icon: Shield, description: "Stress reduction techniques" },
  ]

  const userProfile = {
    tradingExperience: "intermediate",
    tradingStyle: "day-trading",
    riskTolerance: "moderate",
    psychologicalChallenges: ["FOMO", "Emotional Decision Making", "Overconfidence"],
    goals: ["Improve emotional control", "Develop better discipline", "Reduce impulsive decisions"],
  }

  const behavioralPatterns = [
    { name: "FOMO Trading", severity: "high" },
    { name: "Revenge Trading", severity: "medium" },
    { name: "Emotional Stop Moving", severity: "high" },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const analyzeEmotion = async (messageContent: string) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/ai-coach/analyze-emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          userProfile,
          sessionHistory: messages.slice(-5),
        }),
      })

      const data = await response.json()
      if (data.analysis) {
        setEmotionalAnalysis(data.analysis)
        return data.analysis
      }
    } catch (error) {
      console.error("Error analyzing emotion:", error)
    } finally {
      setIsAnalyzing(false)
    }
    return null
  }

  const generateCoachingPlan = async () => {
    try {
      const response = await fetch("/api/ai-coach/coaching-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile,
          behavioralPatterns,
          recentSessions: messages.slice(-10).map((m) => ({ theme: m.sessionType || "general" })),
          goals: userProfile.goals,
        }),
      })

      const data = await response.json()
      if (data.plan) {
        // Parse the plan text into structured data (simplified for demo)
        const planData: CoachingPlan = {
          immediatePriorities: [
            "Focus on emotional stop moving pattern",
            "Practice pre-trade emotional check-ins",
            "Implement 5-minute cooling-off rule",
          ],
          shortTermGoals: [
            "Reduce FOMO trading incidents by 50%",
            "Complete daily emotional awareness exercises",
            "Establish consistent pre-trading routine",
          ],
          longTermObjectives: [
            "Achieve consistent emotional regulation",
            "Develop advanced pattern recognition",
            "Master risk psychology principles",
          ],
          weeklyFocus: [
            "Week 1: Emotional awareness building",
            "Week 2: FOMO management techniques",
            "Week 3: Discipline strengthening",
            "Week 4: Integration and review",
          ],
          milestones: [
            "Complete 7 days without emotional stop moving",
            "Achieve average stress level below 5",
            "Complete advanced psychology course",
          ],
          exercises: [
            "Daily mood tracking and reflection",
            "Pre-trade visualization exercises",
            "Post-trade emotional analysis",
            "Weekly pattern review sessions",
          ],
        }
        setCoachingPlan(planData)
      }
    } catch (error) {
      console.error("Error generating coaching plan:", error)
    }
  }

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return

    // Analyze emotion first
    const analysis = await analyzeEmotion(messageContent)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      emotionalAnalysis: analysis,
      sessionType,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const endpoint = sessionType === "general" ? "/api/ai-coach" : "/api/ai-coach/specialized-session"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          sessionType,
          userProfile,
          context: `Current mood: ${currentMood[0]}/10, Stress level: ${stressLevel[0]}/10`,
          currentState: analysis ? `${analysis.primaryEmotion} (intensity: ${analysis.intensity})` : undefined,
        }),
      })

      const data = await response.json()

      if (data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          sessionType,
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      fear: "text-red-600",
      anxiety: "text-orange-600",
      confidence: "text-green-600",
      excitement: "text-blue-600",
      frustration: "text-purple-600",
      calm: "text-teal-600",
      neutral: "text-gray-600",
    }
    return colors[emotion.toLowerCase()] || "text-gray-600"
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
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
          <h1 className="text-3xl font-bold text-gray-900">Advanced AI Psychology Coach</h1>
          <p className="text-gray-600 mt-1">Sophisticated AI coaching with real-time emotional analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Analysis Active
          </Badge>
          <Button onClick={generateCoachingPlan} variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Generate Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Session Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Type</CardTitle>
              <CardDescription>Choose your coaching focus</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-600 mt-2">
                {sessionTypes.find((t) => t.id === sessionType)?.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current State</CardTitle>
              <CardDescription>Help the AI understand your current state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Mood Level</Label>
                <Slider value={currentMood} onValueChange={setCurrentMood} max={10} min={1} step={1} className="mt-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>{currentMood[0]}/10</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Stress Level</Label>
                <Slider value={stressLevel} onValueChange={setStressLevel} max={10} min={1} step={1} className="mt-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Calm</span>
                  <span>{stressLevel[0]}/10</span>
                  <span>Stressed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {emotionalAnalysis && (
            <Card className={`border-2 ${getUrgencyColor(emotionalAnalysis.urgencyLevel)}`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Emotional Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Primary Emotion</span>
                    <Badge className={getEmotionColor(emotionalAnalysis.primaryEmotion)}>
                      {emotionalAnalysis.primaryEmotion}
                    </Badge>
                  </div>
                  <Progress value={emotionalAnalysis.intensity * 10} className="mt-1 h-2" />
                </div>

                <div>
                  <span className="text-sm font-medium">Stress Level</span>
                  <Progress value={emotionalAnalysis.stressLevel * 10} className="mt-1 h-2" />
                </div>

                {emotionalAnalysis.riskFactors.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-red-600">Risk Factors</span>
                    <ul className="text-xs text-red-700 mt-1">
                      {emotionalAnalysis.riskFactors.map((factor, index) => (
                        <li key={index}>• {factor}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Badge
                  variant="outline"
                  className={`w-full justify-center ${
                    emotionalAnalysis.urgencyLevel === "high"
                      ? "border-red-500 text-red-700"
                      : emotionalAnalysis.urgencyLevel === "medium"
                        ? "border-yellow-500 text-yellow-700"
                        : "border-green-500 text-green-700"
                  }`}
                >
                  {emotionalAnalysis.urgencyLevel.toUpperCase()} URGENCY
                </Badge>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">AI Coaching Chat</TabsTrigger>
              <TabsTrigger value="plan">Coaching Plan</TabsTrigger>
              <TabsTrigger value="insights">Session Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          <Brain className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Advanced AI Coach</CardTitle>
                        <CardDescription>
                          {sessionTypes.find((t) => t.id === sessionType)?.name} Session
                        </CardDescription>
                      </div>
                    </div>
                    {isAnalyzing && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Analyzing...
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="space-y-2">
                          <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-navy-600 to-royal-blue-500 text-white"
                                  : "bg-gray-100 text-gray-900 border"
                              }`}
                            >
                              {message.sessionType && message.role === "user" && (
                                <div className="text-xs opacity-75 mb-2">
                                  Session: {sessionTypes.find((t) => t.id === message.sessionType)?.name}
                                </div>
                              )}
                              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                              <div
                                className={`text-xs mt-2 ${
                                  message.role === "user" ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>

                          {message.emotionalAnalysis && message.role === "user" && (
                            <div className="flex justify-end">
                              <div className="max-w-[80%] bg-blue-50 border border-blue-200 rounded-lg p-2">
                                <div className="text-xs font-medium text-blue-800 mb-1">AI Analysis</div>
                                <div className="text-xs text-blue-700">
                                  <span className={getEmotionColor(message.emotionalAnalysis.primaryEmotion)}>
                                    {message.emotionalAnalysis.primaryEmotion}
                                  </span>
                                  {message.emotionalAnalysis.secondaryEmotions.length > 0 && (
                                    <span className="text-gray-600">
                                      , {message.emotionalAnalysis.secondaryEmotions.join(", ")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3 border">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm text-gray-600">AI Coach is analyzing and responding...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="border-t p-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      sendMessage(input)
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Share your thoughts, concerns, or ask for guidance..."
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

            <TabsContent value="plan">
              {coachingPlan ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-royal-blue-500" />
                        Immediate Priorities (1-2 weeks)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {coachingPlan.immediatePriorities.map((priority, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{priority}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-500" />
                          Short-term Goals (1-3 months)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {coachingPlan.shortTermGoals.map((goal, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-500" />
                          Long-term Objectives (3-12 months)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {coachingPlan.longTermObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-500" />
                        Weekly Focus Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {coachingPlan.weeklyFocus.map((focus, index) => (
                          <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="text-sm font-medium text-purple-800">{focus}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-pink-500" />
                          Key Milestones
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {coachingPlan.milestones.map((milestone, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-2 w-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-orange-500" />
                          Recommended Exercises
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {coachingPlan.exercises.map((exercise, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{exercise}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Coaching Plan Generated</h3>
                    <p className="text-gray-600 mb-4">
                      Generate a personalized coaching plan based on your profile and goals.
                    </p>
                    <Button onClick={generateCoachingPlan}>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Generate Coaching Plan
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-royal-blue-500" />
                        Session Count
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-royal-blue-600 mb-2">{messages.length - 1}</div>
                      <p className="text-sm text-gray-600">Messages exchanged</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Emotional Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {emotionalAnalysis ? emotionalAnalysis.intensity : "N/A"}
                      </div>
                      <p className="text-sm text-gray-600">Current intensity</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        Risk Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {emotionalAnalysis ? emotionalAnalysis.urgencyLevel.toUpperCase() : "LOW"}
                      </div>
                      <p className="text-sm text-gray-600">Current assessment</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Summary</CardTitle>
                    <CardDescription>Key insights from your coaching sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Primary Focus:</strong> Your sessions show a pattern of emotional regulation
                          challenges, particularly around FOMO and impulsive decision-making. The AI coach recommends
                          focusing on pre-trading preparation and stress management techniques.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Most Discussed Topics</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Emotional control strategies</li>
                            <li>• FOMO management techniques</li>
                            <li>• Pre-trading preparation</li>
                            <li>• Risk psychology principles</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommended Actions</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Daily emotional check-ins</li>
                            <li>• Implement cooling-off periods</li>
                            <li>• Practice mindfulness exercises</li>
                            <li>• Review trading journal weekly</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
