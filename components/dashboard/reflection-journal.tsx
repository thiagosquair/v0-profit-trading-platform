"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Plus, Search, TrendingUp, Heart, Brain, Target, Edit, Trash2, Eye } from "lucide-react"
import { format } from "date-fns"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: Date
  moodRating: number
  emotionalState: string[]
  tradingSession: boolean
  tags: string[]
  reflectionType: "daily" | "trade" | "weekly" | "milestone"
  insights: string[]
  actionItems: string[]
}

export function ReflectionJournal() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [moodFilter, setMoodFilter] = useState("all")

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    moodRating: [7],
    emotionalState: [] as string[],
    tradingSession: false,
    tags: [] as string[],
    reflectionType: "daily" as const,
    insights: [] as string[],
    actionItems: [] as string[],
  })

  const journalEntries: JournalEntry[] = [
    {
      id: "1",
      title: "Successful EURUSD Trade Analysis",
      content:
        "Today I executed a perfect EURUSD trade following my strategy. I waited for the confirmation signal and entered at the right moment. My emotions were well-controlled throughout the trade. I felt confident but not overconfident. The key was sticking to my predetermined stop loss and take profit levels.",
      date: new Date(Date.now() - 86400000),
      moodRating: 8,
      emotionalState: ["Confident", "Focused", "Calm"],
      tradingSession: true,
      tags: ["EURUSD", "Strategy", "Success"],
      reflectionType: "trade",
      insights: [
        "Patience in waiting for setup paid off",
        "Pre-planned levels helped avoid emotional decisions",
        "Confidence without overconfidence is key",
      ],
      actionItems: [
        "Continue using this strategy setup",
        "Document the exact entry criteria",
        "Practice more patience exercises",
      ],
    },
    {
      id: "2",
      title: "Weekly Psychology Review",
      content:
        "This week was challenging emotionally. I had 3 losing trades in a row which triggered some revenge trading thoughts. However, I managed to step away from the charts and do some breathing exercises. I'm proud that I didn't increase my position sizes despite the urge to 'get back' at the market.",
      date: new Date(Date.now() - 86400000 * 3),
      moodRating: 6,
      emotionalState: ["Frustrated", "Proud", "Reflective"],
      tradingSession: false,
      tags: ["Weekly Review", "Emotional Control", "Discipline"],
      reflectionType: "weekly",
      insights: [
        "Breathing exercises are effective for emotional regulation",
        "Stepping away from charts prevents impulsive decisions",
        "Revenge trading urges are still present but manageable",
      ],
      actionItems: [
        "Schedule mandatory breaks after 2 consecutive losses",
        "Practice more breathing exercises daily",
        "Review revenge trading prevention strategies",
      ],
    },
    {
      id: "3",
      title: "FOMO Episode - Learning Experience",
      content:
        "I experienced strong FOMO today when I saw Bitcoin pumping and I wasn't in a position. My heart rate increased and I felt the urge to jump in immediately. Instead of acting on impulse, I wrote down my feelings and analyzed why I was feeling this way. This helped me realize that FOMO often comes from comparing myself to others on social media.",
      date: new Date(Date.now() - 86400000 * 5),
      moodRating: 4,
      emotionalState: ["Anxious", "FOMO", "Reflective"],
      tradingSession: false,
      tags: ["FOMO", "Emotional Awareness", "Bitcoin"],
      reflectionType: "daily",
      insights: [
        "Writing down emotions helps process them",
        "Social media triggers FOMO responses",
        "Physical symptoms (heart rate) are early FOMO indicators",
      ],
      actionItems: [
        "Limit social media during trading hours",
        "Create a FOMO response checklist",
        "Practice mindfulness when feeling urgency",
      ],
    },
  ]

  const emotionalStates = [
    "Confident",
    "Anxious",
    "Focused",
    "Frustrated",
    "Calm",
    "Excited",
    "Overwhelmed",
    "Proud",
    "Doubtful",
    "Optimistic",
    "FOMO",
    "Reflective",
  ]

  const commonTags = [
    "Strategy",
    "Emotional Control",
    "FOMO",
    "Discipline",
    "Success",
    "Learning",
    "Patience",
    "Risk Management",
    "Weekly Review",
    "Breakthrough",
  ]

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === "all" || entry.reflectionType === filterType

    const matchesMood =
      moodFilter === "all" ||
      (moodFilter === "positive" && entry.moodRating >= 7) ||
      (moodFilter === "neutral" && entry.moodRating >= 4 && entry.moodRating < 7) ||
      (moodFilter === "negative" && entry.moodRating < 4)

    return matchesSearch && matchesType && matchesMood
  })

  const getMoodColor = (rating: number) => {
    if (rating >= 8) return "text-green-600"
    if (rating >= 6) return "text-yellow-600"
    if (rating >= 4) return "text-orange-600"
    return "text-red-600"
  }

  const getMoodEmoji = (rating: number) => {
    if (rating >= 8) return "😊"
    if (rating >= 6) return "😐"
    if (rating >= 4) return "😕"
    return "😞"
  }

  const handleCreateEntry = () => {
    // Here you would typically save to database
    console.log("Creating entry:", newEntry)
    setIsCreating(false)
    // Reset form
    setNewEntry({
      title: "",
      content: "",
      moodRating: [7],
      emotionalState: [],
      tradingSession: false,
      tags: [],
      reflectionType: "daily",
      insights: [],
      actionItems: [],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reflection Journal</h1>
          <p className="text-gray-600 mt-1">Document your trading psychology journey and insights</p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Journal Entry</CardTitle>
            <CardDescription>Reflect on your trading psychology and emotional state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Entry Title</Label>
                <Input
                  id="title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="e.g., Today's Trading Session Reflection"
                />
              </div>
              <div>
                <Label>Reflection Type</Label>
                <Select
                  value={newEntry.reflectionType}
                  onValueChange={(value: any) => setNewEntry({ ...newEntry, reflectionType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Reflection</SelectItem>
                    <SelectItem value="trade">Trade Analysis</SelectItem>
                    <SelectItem value="weekly">Weekly Review</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Mood Rating (1-10)</Label>
              <div className="mt-2">
                <Slider
                  value={newEntry.moodRating}
                  onValueChange={(value) => setNewEntry({ ...newEntry, moodRating: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Very Low</span>
                  <span className="font-medium">
                    Rating: {newEntry.moodRating[0]} {getMoodEmoji(newEntry.moodRating[0])}
                  </span>
                  <span>Very High</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Reflection Content</Label>
              <Textarea
                id="content"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="Write about your trading experience, emotions, decisions, and learnings..."
                rows={6}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Emotional State (Select all that apply)</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {emotionalStates.map((emotion) => (
                  <Button
                    key={emotion}
                    variant={newEntry.emotionalState.includes(emotion) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const updated = newEntry.emotionalState.includes(emotion)
                        ? newEntry.emotionalState.filter((e) => e !== emotion)
                        : [...newEntry.emotionalState, emotion]
                      setNewEntry({ ...newEntry, emotionalState: updated })
                    }}
                  >
                    {emotion}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {commonTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={newEntry.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const updated = newEntry.tags.includes(tag)
                        ? newEntry.tags.filter((t) => t !== tag)
                        : [...newEntry.tags, tag]
                      setNewEntry({ ...newEntry, tags: updated })
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateEntry}
                disabled={!newEntry.title || !newEntry.content}
                className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
              >
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="entries" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="daily">Daily Reflections</SelectItem>
                <SelectItem value="trade">Trade Analysis</SelectItem>
                <SelectItem value="weekly">Weekly Reviews</SelectItem>
                <SelectItem value="milestone">Milestones</SelectItem>
              </SelectContent>
            </Select>
            <Select value={moodFilter} onValueChange={setMoodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Moods</SelectItem>
                <SelectItem value="positive">Positive (7-10)</SelectItem>
                <SelectItem value="neutral">Neutral (4-6)</SelectItem>
                <SelectItem value="negative">Negative (1-3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Journal Entries */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={`capitalize ${
                            entry.reflectionType === "trade"
                              ? "border-green-200 text-green-700"
                              : entry.reflectionType === "weekly"
                                ? "border-blue-200 text-blue-700"
                                : entry.reflectionType === "milestone"
                                  ? "border-purple-200 text-purple-700"
                                  : "border-gray-200 text-gray-700"
                          }`}
                        >
                          {entry.reflectionType}
                        </Badge>
                        <span className="text-sm text-gray-500">{format(entry.date, "MMM dd, yyyy")}</span>
                      </div>
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className={`text-2xl ${getMoodColor(entry.moodRating)}`}>
                          {getMoodEmoji(entry.moodRating)}
                        </div>
                        <div className="text-sm text-gray-600">{entry.moodRating}/10</div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{entry.content}</p>

                    {entry.emotionalState.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Emotional State:</h4>
                        <div className="flex flex-wrap gap-1">
                          {entry.emotionalState.map((emotion, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.tags.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.insights.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Brain className="h-4 w-4 text-royal-blue-500" />
                          Key Insights:
                        </h4>
                        <ul className="space-y-1">
                          {entry.insights.map((insight, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-royal-blue-500 mt-1">•</span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.actionItems.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Target className="h-4 w-4 text-green-500" />
                          Action Items:
                        </h4>
                        <ul className="space-y-1">
                          {entry.actionItems.map((action, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-500 mt-1">→</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredEntries.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterType !== "all" || moodFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Start your reflection journey by creating your first entry"}
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Entry
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-royal-blue-500" />
                  Most Common Insights
                </CardTitle>
                <CardDescription>Recurring patterns in your reflections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Patience leads to better entries</span>
                    <Badge variant="secondary">3 times</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emotional regulation prevents mistakes</span>
                    <Badge variant="secondary">2 times</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pre-planned levels reduce stress</span>
                    <Badge variant="secondary">2 times</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Action Items Progress
                </CardTitle>
                <CardDescription>Track your commitment to improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Practice breathing exercises</span>
                      <span className="text-xs text-gray-500">5/7 days</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Limit social media during trading</span>
                      <span className="text-xs text-gray-500">3/7 days</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Document entry criteria</span>
                      <span className="text-xs text-gray-500">Completed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reflection Themes</CardTitle>
              <CardDescription>Common topics and areas of focus in your journal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-royal-blue-600">8</div>
                  <div className="text-sm text-gray-600">Emotional Control</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-sm text-gray-600">Strategy Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-gray-600">FOMO Management</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Discipline</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-royal-blue-500" />
                  Total Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal-blue-600 mb-2">{journalEntries.length}</div>
                <p className="text-sm text-gray-600">Reflection sessions completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Average Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {(journalEntries.reduce((acc, entry) => acc + entry.moodRating, 0) / journalEntries.length).toFixed(
                    1,
                  )}
                </div>
                <p className="text-sm text-gray-600">Out of 10</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Mood Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">+0.8</div>
                <p className="text-sm text-gray-600">Improvement this month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reflection Frequency</CardTitle>
              <CardDescription>Your journaling consistency over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => {
                  const hasEntry = Math.random() > 0.3 // Mock data
                  return (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded ${hasEntry ? "bg-royal-blue-500" : "bg-gray-200"}`}
                      title={`Day ${i + 1}`}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>4 weeks ago</span>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emotional State Distribution</CardTitle>
              <CardDescription>Most frequent emotional states in your entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { emotion: "Confident", count: 8, percentage: 35 },
                  { emotion: "Focused", count: 6, percentage: 26 },
                  { emotion: "Calm", count: 5, percentage: 22 },
                  { emotion: "Anxious", count: 4, percentage: 17 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{item.emotion}</span>
                      <span className="text-sm text-gray-600">{item.count} times</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
