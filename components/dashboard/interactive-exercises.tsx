"use client"

/**
 * InteractiveExercises
 * --------------------------------------------------
 * Multi-type trading-psychology exercises with
 * translation support (useLanguage) and a meditation
 * timer.  All strings are pulled from the i18n files
 * via t('…') so the UI localises automatically.
 */

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

import { useLanguage } from "@/hooks/use-language"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function InteractiveExercises() {
  const { t } = useLanguage()

  /* ------------------------------ local state ----------------------------- */
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeSession, setActiveSession] = useState<ExerciseSession | null>(null)

  /* ---- meditation timer state ---- */
  const [selectedDuration, setSelectedDuration] = useState<"5" | "10" | "15">("10")
  const [meditationSeconds, setMeditationSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  /* ---- emotional-checkin state ---- */
  const [stressLevel, setStressLevel] = useState([5])
  const [emotions, setEmotions] = useState<string[]>([])
  const [physicalSensations, setPhysicalSensations] = useState("")
  const [intention, setIntention] = useState("")

  /* ------------------------------------------------------------------------ */
  /* Data                                                                     */
  /* ------------------------------------------------------------------------ */

  const exercises: Exercise[] = [
    {
      id: "emotional-checkin",
      title: t("exercises.emotionalCheckin.title"),
      description: t("exercises.emotionalCheckin.desc"),
      type: "assessment",
      difficulty: "beginner",
      duration: 5,
      completed: true,
      score: 85,
      category: "emotional-control",
    },
    {
      id: "mindful-trading",
      title: t("exercises.mindfulTrading.title"),
      description: t("exercises.mindfulTrading.desc"),
      type: "meditation",
      difficulty: "beginner",
      duration: 10,
      completed: true,
      score: 92,
      category: "mindfulness",
    },
    {
      id: "risk-visualization",
      title: t("exercises.riskVisualization.title"),
      description: t("exercises.riskVisualization.desc"),
      type: "visualization",
      difficulty: "intermediate",
      duration: 15,
      completed: false,
      category: "risk-management",
    },
    {
      id: "fomo-training",
      title: t("exercises.fomoTraining.title"),
      description: t("exercises.fomoTraining.desc"),
      type: "simulation",
      difficulty: "intermediate",
      duration: 20,
      completed: false,
      category: "behavioral-patterns",
    },
    {
      id: "loss-acceptance",
      title: t("exercises.lossAcceptance.title"),
      description: t("exercises.lossAcceptance.desc"),
      type: "cognitive",
      difficulty: "advanced",
      duration: 25,
      completed: false,
      category: "emotional-control",
    },
    {
      id: "confidence-building",
      title: t("exercises.confidenceBuilding.title"),
      description: t("exercises.confidenceBuilding.desc"),
      type: "visualization",
      difficulty: "intermediate",
      duration: 12,
      completed: false,
      category: "confidence",
    },
  ]

  const categories = [
    { id: "all", name: t("exercises.categories.all"), count: exercises.length },
    { id: "emotional-control", name: t("exercises.categories.emotionalControl"), count: 2 },
    { id: "risk-management", name: t("exercises.categories.riskManagement"), count: 1 },
    { id: "behavioral-patterns", name: t("exercises.categories.behavioralPatterns"), count: 1 },
    { id: "mindfulness", name: t("exercises.categories.mindfulness"), count: 1 },
    { id: "confidence", name: t("exercises.categories.confidence"), count: 1 },
  ]

  const filteredExercises =
    selectedCategory === "all" ? exercises : exercises.filter((ex) => ex.category === selectedCategory)

  /* ------------------------------------------------------------------------ */
  /* Utility helpers                                                          */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* Session handling                                                         */
  /* ------------------------------------------------------------------------ */

  const startExercise = (exercise: Exercise) =>
    setActiveSession({
      exerciseId: exercise.id,
      currentStep: 0,
      responses: {},
      startTime: new Date(),
      isActive: true,
    })

  const exitExercise = () => {
    /* clean up meditation timer */
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsTimerRunning(false)
    setMeditationSeconds(0)
    setActiveSession(null)
  }

  /* ------------------------------------------------------------------------ */
  /* Meditation timer lifecycle                                               */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* Exercise renderers                                                       */
  /* ------------------------------------------------------------------------ */

  const renderEmotionalCheckin = () => {
    const emotionOpts = t("exercises.emotions", { returnObjects: true }) as string[]

    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium">{t("exercises.checkin.stressLevel")}</Label>
          <Slider value={stressLevel} onValueChange={setStressLevel} min={1} max={10} step={1} className="mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{t("exercises.checkin.veryCalm")}</span>
            <span className="font-medium">
              {t("exercises.checkin.level")} {stressLevel[0]}
            </span>
            <span>{t("exercises.checkin.veryStressed")}</span>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">{t("exercises.checkin.currentEmotions")}</Label>
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
            {t("exercises.checkin.physicalSensations")}
          </Label>
          <Textarea
            id="sensations"
            value={physicalSensations}
            onChange={(e) => setPhysicalSensations(e.target.value)}
            placeholder={t("exercises.checkin.physicalSensationsPlaceholder")}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="intention" className="text-base font-medium">
            {t("exercises.checkin.tradingIntention")}
          </Label>
          <Textarea
            id="intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder={t("exercises.checkin.tradingIntentionPlaceholder")}
            className="mt-2"
          />
        </div>

        <Button className="w-full" disabled={!intention.trim()} onClick={exitExercise}>
          {t("common.complete")}
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
          <h3 className="text-xl font-semibold">{t("exercises.meditation.heading")}</h3>
          <p className="text-muted-foreground">{t("exercises.meditation.desc")}</p>
        </div>

        {meditationSeconds === 0 ? (
          <div className="space-y-4">
            <Label className="text-base font-medium">{t("exercises.meditation.selectDuration")}</Label>
            <RadioGroup value={selectedDuration} onValueChange={(v) => setSelectedDuration(v as "5" | "10" | "15")}>
              {(["5", "10", "15"] as const).map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={`${val}min`} />
                  <Label htmlFor={`${val}min`}>
                    {val} {t("common.minutes")}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button className="w-full" onClick={startTimer}>
              <Play className="w-4 h-4 mr-2" />
              {t("exercises.meditation.start")}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-6xl font-mono font-bold text-primary">{formatTime(meditationSeconds)}</div>
            <p className="text-muted-foreground">{t("exercises.meditation.guidance")}</p>
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
            <p>{t("exercises.underConstruction")}</p>
            <Link href="#" className="text-primary underline" onClick={exitExercise}>
              {t("common.back")}
            </Link>
          </div>
        )
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

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
            {t("common.exit")}
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">{renderExerciseBody()}</CardContent>
        </Card>
      </div>
    )
  }

  /* ------------------------------ cards view ------------------------------ */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("exercises.heading")}</h1>
          <p className="text-muted-foreground">{t("exercises.subheading")}</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          {exercises.filter((e) => e.completed).length}/{exercises.length} {t("common.completed")}
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
                        <Badge className={difficultyColour(ex.difficulty)}>{ex.difficulty}</Badge>
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
                          {ex.duration} {t("common.min")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span className="capitalize">{ex.type}</span>
                      </div>
                    </div>

                    {ex.completed && ex.score && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{t("exercises.lastScore")}</span>
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
                          {t("exercises.retry")}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {t("exercises.start")}
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
                <h3 className="text-lg font-semibold">{t("exercises.noneFound")}</h3>
                <p className="text-muted-foreground">{t("exercises.tryAnotherCategory")}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Progress summary */}
      <Card>
        <CardHeader>
          <CardTitle>{t("exercises.summary.title")}</CardTitle>
          <CardDescription>{t("exercises.summary.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Completed */}
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{exercises.filter((e) => e.completed).length}</div>
              <div className="text-sm">{t("exercises.summary.completed")}</div>
              <Progress
                value={(exercises.filter((e) => e.completed).length / exercises.length) * 100}
                className="mt-2"
              />
            </div>

            {/* Average score */}
            <div>
              {(() => {
                const scores = exercises.filter((e) => e.completed && e.score).map((e) => e.score!) // non-null
                const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
                return (
                  <>
                    <div className="text-3xl font-bold text-green-600 mb-2">{avg}%</div>
                    <div className="text-sm">{t("exercises.summary.avgScore")}</div>
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
              <div className="text-sm">{t("exercises.summary.totalMinutes")}</div>
              <div className="text-xs text-muted-foreground mt-2">
                {exercises.filter((e) => e.completed).reduce((a, e) => a + e.duration, 0)} {t("common.completed")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
