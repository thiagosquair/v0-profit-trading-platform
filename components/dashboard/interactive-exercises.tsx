"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Target,
  Brain,
  Heart,
  Zap,
  TrendingUp,
  CheckCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Star,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { t } from "@/lib/simple-translations"

type ExerciseType = "assessment" | "meditation" | "visualization" | "cognitive" | "simulation"
type ExerciseDifficulty = "beginner" | "intermediate" | "advanced"

interface Exercise {
  id: string
  title: string
  description: string
  type: ExerciseType
  difficulty: ExerciseDifficulty
  duration: number
  completed: boolean
  score?: number
  category: string
}

interface ExerciseSession {
  exerciseId: string
  currentStep: number
  responses: Record<string, unknown>
  startTime: Date
  isActive: boolean
}

export function InteractiveExercises() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeSession, setActiveSession] = useState<ExerciseSession | null>(null)

  // meditation timer state
  const [selectedDuration, setSelectedDuration] = useState<"5" | "10" | "15">("10")
  const [meditationSeconds, setMeditationSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // emotional-checkin state
  const [stressLevel, setStressLevel] = useState([5])
  const [emotions, setEmotions] = useState<string[]>([])
  const [physicalSensations, setPhysicalSensations] = useState("")
  const [intention, setIntention] = useState("")

  const exercises: Exercise[] = [
    {
      id: "emotional-checkin",
      title: t("emotionalCheckin"),
      description: t("emotionalCheckinDesc"),
      type: "assessment",
      difficulty: "beginner",
      duration: 5,
      completed: true,
      score: 85,
      category: "emotional-control",
    },
    {
      id: "mindful-trading",
      title: t("mindfulTrading"),
      description: t("mindfulTradingDesc"),
      type: "meditation",
      difficulty: "beginner",
      duration: 10,
      completed: true,
      score: 92,
      category: "mindfulness",
    },
    {
      id: "risk-visualization",
      title: t("riskVisualization"),
      description: t("riskVisualizationDesc"),
      type: "visualization",
      difficulty: "intermediate",
      duration: 15,
      completed: false,
      category: "risk-management",
    },
    {
      id: "fomo-training",
      title: t("fomoTraining"),
      description: t("fomoTrainingDesc"),
      type: "simulation",
      difficulty: "intermediate",
      duration: 20,
      completed: false,
      category: "behavioral-patterns",
    },
    {
      id: "loss-acceptance",
      title: t("lossAcceptance"),
      description: t("lossAcceptanceDesc"),
      type: "cognitive",
      difficulty: "advanced",
      duration: 25,
      completed: false,
      category: "emotional-control",
    },
    {
      id: "confidence-building",
      title: t("confidenceBuilding"),
      description: t("confidenceBuildingDesc"),
      type: "visualization",
      difficulty: "intermediate",
      duration: 12,
      completed: false,
      category: "confidence",
    },
  ]

  const categories = [
    { id: "all", name: t("all"), count: exercises.length },
    { id: "emotional-control", name: t("emotionalControlCategory"), count: 2 },
    { id: "risk-management", name: t("riskManagementCategory"), count: 1 },
    { id: "behavioral-patterns", name: t("behavioralPatternsCategory"), count: 1 },
    { id: "mindfulness", name: t("mindfulness"), count: 1 },
    { id: "confidence", name: t("confidence"), count: 1 },
  ]

  const filteredExercises =
    selectedCategory === "all" ? exercises : exercises.filter((ex) => ex.category === selectedCategory)

  const difficultyColour = (d: ExerciseDifficulty) =>
    ({
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    })[d]

  const typeIcon = (type: ExerciseType) =>
    ({
      assessment: Brain,
      meditation: Heart,
      visualization: Target,
      cognitive: Zap,
      simulation: TrendingUp,
    })[type]

  const startExercise = (exercise: Exercise) =>
    setActiveSession({
      exerciseId: exercise.id,
      currentStep: 0,
      responses: {},
      startTime: new Date(),
      isActive: true,
    })

  const exitExercise = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsTimerRunning(false)
    setMeditationSeconds(0)
    setActiveSession(null)
  }

  useEffect(() => {
    if (!isTimerRunning) return
    intervalRef.current = setInterval(() => {
      setMeditationSeconds((s) => {
        if (s <= 1) {
          setIsTimerRunning(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isTimerRunning])

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

  const renderEmotionalCheckin = () => {
    const emotionOpts = ["Confident", "Anxious", "Focused", "Frustrated", "Calm", "Excited"]

    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium">Stress Level</Label>
          <Slider value={stressLevel} onValueChange={setStressLevel} min={1} max={10} step={1} className="mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Very Calm</span>
            <span className="font-medium">Level {stressLevel[0]}</span>
            <span>Very Stressed</span>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Current Emotions</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {emotionOpts.map((emotion) => (
              <div key={emotion} className="flex items-center space-x-2">
                <Checkbox
                  id={emotion}
                  checked={emotions.includes(emotion)}
                  onCheckedChange={(checked) =>
                    setEmotions((prev) => (checked ? [...prev, emotion] : prev.filter((e) => e !== emotion)))
                  }
                />
                <Label htmlFor={emotion} className="text-sm">
                  {emotion}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="sensations" className="text-base font-medium">
            Physical Sensations
          </Label>
          <Textarea
            id="sensations"
            value={physicalSensations}
            onChange={(e) => setPhysicalSensations(e.target.value)}
            placeholder="Describe any physical sensations you're experiencing..."
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="intention" className="text-base font-medium">
            Trading Intention
          </Label>
          <Textarea
            id="intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="What is your intention for today's trading session?"
            className="mt-2"
          />
        </div>

        <Button className="w-full" disabled={!intention.trim()} onClick={exitExercise}>
          {t("complete")}
        </Button>
      </div>
    )
  }

  const renderMeditation = () => {
    const startTimer = () => {
      setMeditationSeconds(Number.parseInt(selectedDuration, 10) * 60)
      setIsTimerRunning(true)
    }

    const pauseTimer = () => setIsTimerRunning(false)
    const resetTimer = () => {
      setIsTimerRunning(false)
      setMeditationSeconds(0)
    }

    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Mindful Trading Meditation</h3>
          <p className="text-muted-foreground">Focus on your breath and center your mind before trading</p>
        </div>

        {meditationSeconds === 0 ? (
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Duration</Label>
            <RadioGroup value={selectedDuration} onValueChange={(v) => setSelectedDuration(v as "5" | "10" | "15")}>
              {(["5", "10", "15"] as const).map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={`${val}min`} />
                  <Label htmlFor={`${val}min`}>
                    {val} {t("minutes")}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button className="w-full" onClick={startTimer}>
              <Play className="w-4 h-4 mr-2" />
              Start Meditation
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-6xl font-mono font-bold text-primary">{formatTime(meditationSeconds)}</div>
            <p className="text-muted-foreground">Focus on your breath and let go of trading stress</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={isTimerRunning ? pauseTimer : () => setIsTimerRunning(true)}>
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button variant="outline" onClick={resetTimer}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderExerciseBody = () => {
    if (!activeSession) return null
    const exercise = exercises.find((e) => e.id === activeSession.exerciseId)
    if (!exercise) return null

    switch (exercise.id) {
      case "emotional-checkin":
        return renderEmotionalCheckin()
      case "mindful-trading":
        return renderMeditation()
      default:
        return (
          <div className="space-y-4 text-center">
            <p>This exercise is under construction</p>
            <Link href="#" className="text-primary underline" onClick={exitExercise}>
              {t("back")}
            </Link>
          </div>
        )
    }
  }

  if (activeSession) {
    const exercise = exercises.find((e) => e.id === activeSession.exerciseId)!
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{exercise.title}</h1>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>
          <Button variant="outline" onClick={exitExercise}>
            {t("exit")}
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">{renderExerciseBody()}</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("interactiveExercisesTitle")}</h1>
          <p className="text-muted-foreground">{t("structuredExercisesForMastery")}</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          {exercises.filter((e) => e.completed).length}/{exercises.length} {t("completed")}
        </Badge>
      </div>

      {/* Category tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-6 w-full">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
              {cat.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {cat.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((ex) => {
              const Icon = typeIcon(ex.type)
              return (
                <Card key={ex.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <Badge className={difficultyColour(ex.difficulty)}>{t(ex.difficulty)}</Badge>
                      </div>
                      {ex.completed && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {ex.score && <span className="text-sm font-medium text-green-600">{ex.score}%</span>}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{ex.title}</CardTitle>
                    <CardDescription>{ex.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {ex.duration} {t("min")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span className="capitalize">{t(ex.type)}</span>
                      </div>
                    </div>

                    {ex.completed && ex.score && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{t("lastScore")}</span>
                          <span className="text-sm">{ex.score}%</span>
                        </div>
                        <Progress value={ex.score} className="h-2" />
                      </div>
                    )}

                    <Button
                      onClick={() => startExercise(ex)}
                      variant={ex.completed ? "outline" : "default"}
                      className="w-full"
                    >
                      {ex.completed ? (
                        <>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {t("retry")}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {t("start")}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredExercises.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center space-y-2">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">{t("noneFound")}</h3>
                <p className="text-muted-foreground">{t("tryAnotherCategory")}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Progress summary */}
      <Card>
        <CardHeader>
          <CardTitle>{t("exercisesSummary")}</CardTitle>
          <CardDescription>{t("progressOverview")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Completed */}
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{exercises.filter((e) => e.completed).length}</div>
              <div className="text-sm">{t("completed")}</div>
              <Progress
                value={(exercises.filter((e) => e.completed).length / exercises.length) * 100}
                className="mt-2"
              />
            </div>

            {/* Average score */}
            <div>
              {(() => {
                const scores = exercises.filter((e) => e.completed && e.score).map((e) => e.score!)
                const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
                return (
                  <>
                    <div className="text-3xl font-bold text-green-600 mb-2">{avg}%</div>
                    <div className="text-sm">{t("avgScore")}</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-4 h-4 ${
                            n <= Math.round(avg / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>

            {/* Total minutes */}
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {exercises.reduce((acc, e) => acc + e.duration, 0)}
              </div>
              <div className="text-sm">{t("totalMinutes")}</div>
              <div className="text-xs text-muted-foreground mt-2">
                {exercises.filter((e) => e.completed).reduce((a, e) => a + e.duration, 0)} {t("completed")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
