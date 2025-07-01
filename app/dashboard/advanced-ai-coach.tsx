"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Lightbulb,
  Send,
  History,
  BookOpen,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"

export function AdvancedAICoach() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  // Sample conversation history
  const conversationHistory = [
    {
      id: 1,
      type: "user",
      message: "I keep overtrading when I see multiple setups. How can I control this?",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "ai",
      message: "Overtrading is a common psychological challenge. Here are three strategies to help you: 1) Set a maximum number of trades per day (start with 3-5), 2) Use a 'cooling off' period between trades (15-30 minutes), 3) Keep a trading journal to identify emotional triggers. Would you like me to help you create a personalized trading plan?",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      type: "user",
      message: "Yes, that would be helpful. I usually trade EUR/USD and GBP/USD.",
      timestamp: "1 hour ago"
    }
  ]

  // Sample coaching insights
  const coachingInsights = [
    {
      title: "Risk Management Focus",
      description: "Your recent trades show good entry timing but inconsistent position sizing",
      type: "improvement",
      priority: "high"
    },
    {
      title: "Emotional Control",
      description: "You've maintained discipline during the last 5 trading sessions",
      type: "strength",
      priority: "medium"
    },
    {
      title: "Market Analysis",
      description: "Consider incorporating more fundamental analysis for longer-term trades",
      type: "suggestion",
      priority: "low"
    }
  ]

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    setIsLoading(true)
    // Simulate AI response delay
    setTimeout(() => {
      setIsLoading(false)
      setMessage("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Trading Coach</h1>
          <p className="text-muted-foreground">
            Get personalized coaching and insights to improve your trading psychology
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Powered
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Coaching Session
                  </CardTitle>
                  <CardDescription>
                    Ask questions about trading psychology, strategy, or get personalized advice
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Chat History */}
                  <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                    {conversationHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span className="text-sm">AI Coach is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask your AI coach anything about trading psychology..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={isLoading || !message.trim()}
                      size="sm"
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Analyze My Trading
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Risk Assessment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Strategy Review
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learning Plan
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Messages Today</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Insights Generated</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Session Time</span>
                    <span className="font-medium">45 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coachingInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <Badge 
                      variant={
                        insight.type === 'strength' ? 'default' : 
                        insight.type === 'improvement' ? 'destructive' : 'secondary'
                      }
                    >
                      {insight.type === 'strength' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {insight.type === 'improvement' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {insight.type === 'suggestion' && <Lightbulb className="h-3 w-3 mr-1" />}
                      {insight.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <div className="mt-3">
                    <Badge variant="outline" size="sm">
                      {insight.priority} priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Win Rate</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk/Reward Ratio</span>
                    <span className="font-medium">1:2.3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emotional Control Score</span>
                    <span className="font-medium">7.5/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consistency Rating</span>
                    <span className="font-medium">Good</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Completed risk assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Reviewed trading journal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Updated trading plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Practiced mindfulness exercise</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Psychology Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Managing Trading Emotions</li>
                  <li>• Building Discipline</li>
                  <li>• Overcoming FOMO</li>
                  <li>• Risk Management Psychology</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Mindful Trading Techniques</li>
                  <li>• Stress Management</li>
                  <li>• Building Confidence</li>
                  <li>• Decision Making Under Pressure</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interactive Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Emotion Tracker</li>
                  <li>• Risk Calculator</li>
                  <li>• Performance Analyzer</li>
                  <li>• Goal Setting Wizard</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

