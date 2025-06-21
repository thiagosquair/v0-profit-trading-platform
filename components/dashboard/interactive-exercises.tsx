"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, Target, TrendingUp, Clock, Star, Play, RotateCcw, CheckCircle, X } from "lucide-react"
import { t } from "@/lib/simple-translations"

const exercises = [
  {
    id: "emotional-checkin",
    title: "emotionalCheckin",
    description: "emotionalCheckinDesc",
    category: "emotionalControlCategory",
    difficulty: "beginner",
    duration: 5,
    type: "assessment",
    completed: true,
    lastScore: 85,
    icon: Heart,
  },
  {
    id: "mindful-trading",
    title: "mindfulTrading",
    description: "mindfulTradingDesc",
    category: "mindfulness",
    difficulty: "beginner",
    duration: 10,
    type: "meditation",
    completed: false,
    icon: Brain,
  },
  {
    id: "risk-visualization",
    title: "riskVisualization",
    description: "riskVisualizationDesc",
    category: "riskManagementCategory",
    difficulty: "intermediate",
    duration: 15,
    type: "visualization",
    completed: true,
    lastScore: 78,
    icon: Target,
  },
  {
    id: "fomo-training",
    title: "fomoTraining",
    description: "fomoTrainingDesc",
    category: "behavioralPatternsCategory",
    difficulty: "advanced",
    duration: 20,
    type: "cognitive",
    completed: false,
    icon: TrendingUp,
  },
  {
    id: "loss-acceptance",
    title: "lossAcceptance",
    description: "lossAcceptanceDesc",
    category: "emotionalControlCategory",
    difficulty: "intermediate",
    duration: 12,
    type: "simulation",
    completed: true,
    lastScore: 92,
    icon: Heart,
  },
  {
    id: "confidence-building",
    title: "confidenceBuilding",
    description: "confidenceBuildingDesc",
    category: "confidence",
    difficulty: "advanced",
    duration: 25,
    type: "cognitive",
    completed: false,
    icon: Star,
  },
]

const categories = [
  { id: "all", name: "all" },
  { id: "emotional-control", name: "emotionalControlCategory" },
  { id: "risk-management", name: "riskManagementCategory" },
  { id: "behavioral-patterns", name: "behavioralPatternsCategory" },
  { id: "mindfulness", name: "mindfulness" },
  { id: "confidence", name: "confidence" },
]

const difficulties = [
  { id: "beginner", name: "beginner", color: "bg-green-100 text-green-800" },
  { id: "intermediate", name: "intermediate", color: "bg-yellow-100 text-yellow-800" },
  { id: "advanced", name: "advanced", color: "bg-red-100 text-red-800" },
]

const types = [
  { id: "assessment", name: "assessment" },
  { id: "meditation", name: "meditation" },
  { id: "visualization", name: "visualization" },
  { id: "cognitive", name: "cognitive" },
  { id: "simulation", name: "simulation" },
]

export function InteractiveExercises() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  const filteredExercises = exercises.filter(
    (exercise) => selectedCategory === "all" || exercise.category === selectedCategory,
  )

  const completedCount = exercises.filter((ex) => ex.completed).length
  const totalMinutes = exercises.reduce((sum, ex) => sum + ex.duration, 0)
  const avgScore = Math.round(
    exercises.filter((ex) => ex.lastScore).reduce((sum, ex) => sum + (ex.lastScore || 0), 0) /
      exercises.filter((ex) => ex.lastScore).length,
  )

  if (selectedExercise) {
    const exercise = exercises.find((ex) => ex.id === selectedExercise)
    if (!exercise) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setSelectedExercise(null)} className="flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>{t("exit")}</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{t(exercise.title)}</h1>
              <p className="text-muted-foreground">{t(exercise.description)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={difficulties.find((d) => d.id === exercise.difficulty)?.color}>
              {t(exercise.difficulty)}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {exercise.duration} {t("min")}
            </Badge>
          </div>
        </div>

        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <exercise.icon className="h-10 w-10 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">{t(exercise.title)}</h2>
              <p className="text-muted-foreground max-w-md mx-auto">{t(exercise.description)}</p>
            </div>

            {exercise.lastScore && (
              <div className="bg-muted rounded-lg p-4 max-w-sm mx-auto">
                <div className="text-sm text-muted-foreground">{t("lastScore")}</div>
                <div className="text-2xl font-bold text-green-600">{exercise.lastScore}%</div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {exercise.completed ? (
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t("retry")}
                </Button>
              ) : (
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Play className="h-4 w-4 mr-2" />
                  {t("start")}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("interactiveExercisesTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("structuredExercisesForMastery")}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesSummary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount}/{exercises.length}
            </div>
            <p className="text-xs text-muted-foreground">{t("progressOverview")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("avgScore")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <Progress value={avgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("totalMinutes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMinutes}</div>
            <p className="text-xs text-muted-foreground">{t("minutes")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {t(category.name)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredExercises.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">{t("noneFound")}</h3>
                <p>{t("tryAnotherCategory")}</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => {
                const IconComponent = exercise.icon
                const difficulty = difficulties.find((d) => d.id === exercise.difficulty)

                return (
                  <Card key={exercise.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{t(exercise.title)}</CardTitle>
                            {exercise.completed && (
                              <div className="flex items-center space-x-1 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">{t("completed")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{t(exercise.description)}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={difficulty?.color}>{t(exercise.difficulty)}</Badge>
                          <Badge variant="outline">{t(exercise.type)}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration} {t("min")}
                        </div>
                      </div>

                      {exercise.lastScore && (
                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{t("lastScore")}</span>
                            <span className="font-semibold text-green-600">{exercise.lastScore}%</span>
                          </div>
                        </div>
                      )}

                      <Button className="w-full" onClick={() => setSelectedExercise(exercise.id)}>
                        {exercise.completed ? t("retry") : t("start")}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
