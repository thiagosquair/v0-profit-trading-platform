"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Calendar, PenTool, BarChart3 } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function ReflectionJournal() {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)

  const entries = [
    {
      id: "1",
      title: t("screenshotAnalysisEUR"),
      date: "2024-01-15",
      mood: 8,
      content: t("completedEmotionalControl"),
      tags: [t("discipline"), t("emotionalControl")],
    },
    {
      id: "2",
      title: t("weeklyProgress"),
      date: "2024-01-14",
      mood: 6,
      content: t("aiCoachingSession"),
      tags: [t("progress"), t("analytics")],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("reflectionJournalTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("reflectionJournalSubtitle")}</p>
        </div>
        <Button onClick={() => setIsNewEntryOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("newEntry")}
        </Button>
      </div>

      {isNewEntryOpen && (
        <Card>
          <CardHeader>
            <CardTitle>{t("newEntry")}</CardTitle>
            <CardDescription>{t("entryContent")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t("entryTitle")}</label>
              <Input placeholder={t("entryTitle")} />
            </div>
            <div>
              <label className="text-sm font-medium">{t("entryContent")}</label>
              <Textarea placeholder={t("reflectOnTrading")} rows={6} />
            </div>
            <div>
              <label className="text-sm font-medium">{t("entryTags")}</label>
              <Input placeholder={`${t("emotionalControl")}, ${t("discipline")}, ${t("progress")}`} />
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setIsNewEntryOpen(false)}>{t("saveEntry")}</Button>
              <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
                {t("common.cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="entries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="entries">{t("journalEntries")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("moodAnalysis")}</TabsTrigger>
          <TabsTrigger value="insights">{t("journalInsights")}</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("searchEntries")} className="pl-10" />
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              {t("filterByDate")}
            </Button>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                        </div>
                        <Badge variant="outline">
                          {t("entryMood")}: {entry.mood}/10
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{entry.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>{t("moodAnalysis")}</span>
              </CardTitle>
              <CardDescription>
                {t("analytics")} {t("overview")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("moodAnalysis")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5" />
                <span>{t("journalInsights")}</span>
              </CardTitle>
              <CardDescription>
                {t("keyInsights")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("journalInsights")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
