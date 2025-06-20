"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { t } from "@/lib/simple-translations"
import { Plus, Search, Calendar, TrendingUp, BookOpen, BarChart3, Smile, Meh, Frown } from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  type: "daily" | "trade" | "weekly" | "milestone"
  date: string
  mood: number
  content: string
  emotions: string[]
  tags: string[]
}

export function ReflectionJournal() {
  const [activeTab, setActiveTab] = useState("entries")
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterMood, setFilterMood] = useState("all")

  const [newEntry, setNewEntry] = useState({
    title: "",
    type: "daily",
    mood: [7],
    content: "",
    emotions: [],
    tags: "",
  })

  const journalEntries: JournalEntry[] = [
    {
      id: "1",
      title: "Successful EUR/USD Trade Analysis",
      type: "trade",
      date: "2024-01-15",
      mood: 8,
      content:
        "Today I executed a perfect EUR/USD trade following my strategy exactly. I waited for the right setup, managed my emotions well, and took profits at the planned level. This shows my discipline is improving.",
      emotions: ["confident", "satisfied", "focused"],
      tags: ["discipline", "strategy", "profit"],
    },
    {
      id: "2",
      title: "Weekly Trading Review",
      type: "weekly",
      date: "2024-01-14",
      mood: 6,
      content:
        "This week was challenging with mixed results. I had 3 winning trades and 2 losses. The losses were due to FOMO - I need to work on patience and waiting for quality setups.",
      emotions: ["reflective", "determined", "slightly frustrated"],
      tags: ["fomo", "patience", "review"],
    },
    {
      id: "3",
      title: "Emotional Control Breakthrough",
      type: "milestone",
      date: "2024-01-13",
      mood: 9,
      content:
        "Major breakthrough today! I was able to stick to my stop loss even when the trade moved against me initially. Previously, I would have moved my stop loss and taken a bigger loss. This shows real progress in emotional control.",
      emotions: ["proud", "confident", "relieved"],
      tags: ["breakthrough", "stop-loss", "emotional-control"],
    },
    {
      id: "4",
      title: "Daily Reflection - Market Volatility",
      type: "daily",
      date: "2024-01-12",
      mood: 5,
      content:
        "High volatility day due to news events. I felt anxious and made some impulsive decisions. Closed positions too early due to fear. Need to work on staying calm during volatile periods.",
      emotions: ["anxious", "impulsive", "fearful"],
      tags: ["volatility", "news", "anxiety"],
    },
  ]

  const emotionOptions = [
    "confident",
    "anxious",
    "excited",
    "frustrated",
    "calm",
    "overwhelmed",
    "focused",
    "distracted",
    "optimistic",
    "pessimistic",
    "patient",
    "impulsive",
  ]

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || entry.type === filterType
    const matchesMood =
      filterMood === "all" ||
      (filterMood === "positive" && entry.mood >= 7) ||
      (filterMood === "neutral" && entry.mood >= 4 && entry.mood < 7) ||
      (filterMood === "negative" && entry.mood < 4)

    return matchesSearch && matchesType && matchesMood
  })

  const averageMood = journalEntries.reduce((sum, entry) => sum + entry.mood, 0) / journalEntries.length

  const getMoodIcon = (mood: number) => {
    if (mood >= 7) return <Smile className="h-4 w-4 text-green-500" />
    if (mood >= 4) return <Meh className="h-4 w-4 text-yellow-500" />
    return <Frown className="h-4 w-4 text-red-500" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "text-green-600"
    if (mood >= 4) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSaveEntry = () => {
    // Save logic here
    setIsNewEntryOpen(false)
    setNewEntry({
      title: "",
      type: "daily",
      mood: [7],
      content: "",
      emotions: [],
      tags: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("reflectionJournalTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("documentTradingPsychologyJourney")}</p>
        </div>
        <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              {t("newEntry")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("createNewJournalEntry")}</DialogTitle>
              <DialogDescription>{t("reflectOnTradingPsychology")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">{t("entryTitle")}</Label>
                  <Input
                    id="title"
                    placeholder={t("todaysTradingSessionReflection")}
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">{t("reflectionType")}</Label>
                  <Select onValueChange={(value) => setNewEntry({ ...newEntry, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("dailyReflection")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{t("dailyReflection")}</SelectItem>
                      <SelectItem value="trade">{t("tradeAnalysis")}</SelectItem>
                      <SelectItem value="weekly">{t("weeklyReview")}</SelectItem>
                      <SelectItem value="milestone">{t("milestone")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>{t("moodRating")}</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-muted-foreground">{t("veryLow")}</span>
                  <Slider
                    value={newEntry.mood}
                    onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">{t("veryHigh")}</span>
                  <Badge variant="outline" className="min-w-[60px] justify-center">
                    {newEntry.mood[0]}/10
                  </Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="content">{t("reflectionContent")}</Label>
                <Textarea
                  id="content"
                  placeholder={t("writeAboutTradingExperience")}
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={6}
                />
              </div>

              <div>
                <Label>{t("emotionalStateSelectAll")}</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {emotionOptions.map((emotion) => (
                    <div key={emotion} className="flex items-center space-x-2">
                      <Checkbox
                        id={emotion}
                        checked={newEntry.emotions.includes(emotion)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewEntry({ ...newEntry, emotions: [...newEntry.emotions, emotion] })
                          } else {
                            setNewEntry({ ...newEntry, emotions: newEntry.emotions.filter((e) => e !== emotion) })
                          }
                        }}
                      />
                      <Label htmlFor={emotion} className="text-sm capitalize">
                        {emotion}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="tags">{t("tags")}</Label>
                <Input
                  id="tags"
                  placeholder="discipline, strategy, emotions (comma separated)"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleSaveEntry}>{t("saveEntry")}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entries">{t("journalEntries")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchEntries")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("filterByType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allTypes")}</SelectItem>
                <SelectItem value="daily">{t("dailyReflections")}</SelectItem>
                <SelectItem value="trade">{t("tradeAnalysisPlural")}</SelectItem>
                <SelectItem value="weekly">{t("weeklyReviews")}</SelectItem>
                <SelectItem value="milestone">{t("milestones")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMood} onValueChange={setFilterMood}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("filterByMood")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allMoods")}</SelectItem>
                <SelectItem value="positive">{t("positiveRange")}</SelectItem>
                <SelectItem value="neutral">{t("neutralRange")}</SelectItem>
                <SelectItem value="negative">{t("negativeRange")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Journal Entries */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="capitalize">
                          {t(entry.type as any)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getMoodIcon(entry.mood)}
                          <span className={`text-sm font-medium ${getMoodColor(entry.mood)}`}>{entry.mood}/10</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{entry.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{entry.content}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {entry.emotions.map((emotion) => (
                        <Badge key={emotion} variant="secondary" className="text-xs">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>{t("totalEntries")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{journalEntries.length}</div>
                <p className="text-sm text-muted-foreground">{t("reflectionSessionsCompleted")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smile className="h-5 w-5 text-green-500" />
                  <span>{t("averageMood")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{averageMood.toFixed(1)}/10</div>
                <p className="text-sm text-muted-foreground">{t("outOf10")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <span>{t("moodTrend")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">+0.8</div>
                <p className="text-sm text-muted-foreground">{t("improvementThisMonth")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Mood Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>{t("moodTrend")} Over Time</CardTitle>
              <CardDescription>Track your emotional journey through trading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Mood trend chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
