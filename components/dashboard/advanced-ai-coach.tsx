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
import {
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  Lightbulb,
  Send,
  Mic,
  Settings,
} from "lucide-react"
import { t } from "@/lib/simple-translations"

export function AdvancedAICoach() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("nav.aiCoach")}</h1>
        <p className="text-muted-foreground mt-2">{t("getPersonalizedCoaching")}</p>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Lightbulb className="h-4 w-4 mr-2" />
            {t("nav.insights")}
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="h-4 w-4 mr-2" />
            {t("currentGoals")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>AI {t("nav.aiCoach")}</span>
                  </CardTitle>
                  <CardDescription>{t("getPersonalizedCoaching")}</CardDescription>
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
                          `${t("common.welcome")}! ${t("jumpInto")} 🤗`}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder={`${t("common.submit")} your question...`}
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
                          t("common.loading")
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {t("common.submit")}
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
                  <CardTitle className="text-lg">{t("quickActions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    {t("emotionalCheckin")}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    {t("riskVisualization")}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {t("uploadAndAnalyze")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t("recentActivity")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">{t("aiCoachingSession")}</div>
                    <div className="text-muted-foreground">{t("dayAgo")}</div>
                    <Badge className="mt-1 bg-green-100 text-green-800">
                      {t("positive")}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{t("completedEmotionalControl")}</div>
                    <div className="text-muted-foreground">{t("hoursAgo")}</div>
                    <Badge className="mt-1">{t("score")}: 85</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>{t("nav.insights")}</CardTitle>
              <CardDescription>{t("getPersonalizedCoaching")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("nav.insights")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>{t("currentGoals")}</CardTitle>
              <CardDescription>{t("developmentObjectives")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("currentGoals")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
