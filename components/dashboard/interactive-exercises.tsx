"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Brain, Heart, Target, TrendingUp, Clock, Star, Play, RotateCcw, CheckCircle, X, ArrowLeft, ArrowRight, Timer, Lightbulb, MessageCircle } from "lucide-react"

// Data Models
interface ExerciseStep {
  id: string
  type: "instruction" | "question" | "input" | "reflection" | "summary"
  content: string
  options?: { value: string; label: string }[]
  inputType?: "text" | "number" | "textarea" | "radio"
  placeholder?: string
  expectedAnswer?: string | number | RegExp
  minDuration?: number // in seconds
}

interface Exercise {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  icon: React.ElementType
  steps: ExerciseStep[]
  outcomeMetrics: string[]
  feedbackGenerator: string
}

interface UserExerciseProgress {
  exerciseId: string
  lastAttemptDate: Date
  completionStatus: "not_started" | "in_progress" | "completed"
  currentStepId: string
  score?: number
  timeSpent?: number
  answers: { stepId: string; value: any; timestamp: Date }[]
  feedbackReceived?: string
}

// Exercise Definitions
const exerciseDefinitions: Exercise[] = [
  {
    id: "emotional-checkin",
    title: "Emotional Check-in",
    description: "Assess your current emotional state before trading",
    category: "emotional-control",
    difficulty: "beginner",
    duration: 5,
    icon: Heart,
    outcomeMetrics: ["score"],
    feedbackGenerator: "generateEmotionalCheckinFeedback",
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Welcome to the Emotional Check-in. This exercise helps you become aware of your emotional state before you start trading. Take a deep breath and proceed when you're ready."
      },
      {
        id: "q1_stress_level",
        type: "question",
        content: "On a scale of 1 to 10, how stressed do you feel right now?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(Not stressed)' : i === 9 ? '(Extremely stressed)' : ''}` 
        }))
      },
      {
        id: "q2_focus_level",
        type: "question",
        content: "How focused do you feel on your trading plan right now?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(Very distracted)' : i === 9 ? '(Fully focused)' : ''}` 
        }))
      },
      {
        id: "q3_confidence",
        type: "question",
        content: "How confident do you feel about your trading decisions today?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(Not confident)' : i === 9 ? '(Very confident)' : ''}` 
        }))
      },
      {
        id: "reflection_1",
        type: "reflection",
        content: "Take a moment to reflect on your responses. What factors are contributing to your current emotional state? Consider recent events, market conditions, or personal circumstances.",
        minDuration: 60
      },
      {
        id: "input_journal",
        type: "input",
        content: "Write down any thoughts or feelings that came up during your reflection. This will help you track patterns over time.",
        inputType: "textarea",
        placeholder: "e.g., I feel anxious about recent market volatility, but I'm confident in my risk management plan..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Thank you for completing the Emotional Check-in. Your responses help us understand your trading mindset and provide personalized coaching. You'll receive detailed feedback based on your input."
      }
    ]
  },
  {
    id: "risk-visualization",
    title: "Risk Visualization",
    description: "Visualize and mentally prepare for potential trading risks",
    category: "risk-management",
    difficulty: "intermediate",
    duration: 15,
    icon: Target,
    outcomeMetrics: ["score", "completionTime"],
    feedbackGenerator: "generateRiskVisualizationFeedback",
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "This exercise will help you mentally prepare for potential risks in your trading. Visualization is a powerful tool used by professional traders to build confidence and reduce anxiety."
      },
      {
        id: "q1_trade_setup",
        type: "input",
        content: "Describe a trade setup you're currently considering or recently took:",
        inputType: "textarea",
        placeholder: "e.g., Long EURUSD at 1.0850, targeting 1.0950, stop loss at 1.0800..."
      },
      {
        id: "q2_risk_amount",
        type: "question",
        content: "What percentage of your account are you risking on this trade?",
        inputType: "radio",
        options: [
          { value: "0.5", label: "0.5% or less" },
          { value: "1", label: "1%" },
          { value: "2", label: "2%" },
          { value: "3", label: "3%" },
          { value: "5", label: "5%" },
          { value: "more", label: "More than 5%" }
        ]
      },
      {
        id: "visualization_1",
        type: "reflection",
        content: "Close your eyes and visualize your trade going against you. Imagine the price moving to your stop loss. How do you feel? What thoughts come up? Sit with these feelings for a moment.",
        minDuration: 90
      },
      {
        id: "q3_loss_reaction",
        type: "input",
        content: "How would you react if this trade hits your stop loss? Describe your emotional and practical response:",
        inputType: "textarea",
        placeholder: "e.g., I would feel disappointed but stick to my plan. I would review what went wrong and look for the next opportunity..."
      },
      {
        id: "visualization_2",
        type: "reflection",
        content: "Now visualize your trade going in your favor. See the price moving toward your target. Feel the satisfaction of a well-executed trade. Notice how preparation affects your confidence.",
        minDuration: 90
      },
      {
        id: "q4_success_plan",
        type: "input",
        content: "If this trade reaches your target, how will you manage your success? What's your plan for the next trade?",
        inputType: "textarea",
        placeholder: "e.g., I'll take partial profits at my first target, move my stop to breakeven, and look for similar setups..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Excellent work! You've mentally rehearsed both scenarios. This preparation helps you trade with greater emotional control and confidence. Regular visualization builds resilience and improves decision-making under pressure."
      }
    ]
  },
  {
    id: "mindful-trading",
    title: "Mindful Trading Meditation",
    description: "Center your mind and reduce trading anxiety through guided meditation",
    category: "mindfulness",
    difficulty: "beginner",
    duration: 10,
    icon: Brain,
    outcomeMetrics: ["completionTime"],
    feedbackGenerator: "generateMindfulnessFeedback",
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "This guided meditation will help you center your mind and approach trading with clarity and calm. Find a comfortable position and prepare to focus on your breath."
      },
      {
        id: "breathing_1",
        type: "reflection",
        content: "Close your eyes and take three deep breaths. Inhale slowly for 4 counts, hold for 4 counts, then exhale for 6 counts. Feel your body relaxing with each breath.",
        minDuration: 60
      },
      {
        id: "body_scan",
        type: "reflection",
        content: "Now scan your body from head to toe. Notice any tension in your shoulders, jaw, or hands. Consciously relax these areas. Trading requires a relaxed body and alert mind.",
        minDuration: 90
      },
      {
        id: "market_visualization",
        type: "reflection",
        content: "Visualize yourself approaching the markets with complete calm and clarity. See yourself making decisions based on your plan, not emotions. Feel the confidence that comes from preparation.",
        minDuration: 120
      },
      {
        id: "intention_setting",
        type: "input",
        content: "Set an intention for your trading session today. What mindset do you want to maintain?",
        inputType: "textarea",
        placeholder: "e.g., I will trade with patience and discipline, following my plan regardless of market noise..."
      },
      {
        id: "summary",
        type: "summary",
        content: "You've completed the mindful trading meditation. Carry this sense of calm and clarity into your trading session. Remember, you can return to this centered state whenever you feel overwhelmed."
      }
    ]
  }
]

// Storage utilities
const STORAGE_KEY = 'profitz_exercise_progress'

const saveProgressToStorage = (progress: UserExerciseProgress[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  } catch (error) {
    console.error('Failed to save exercise progress:', error)
  }
}

const loadProgressFromStorage = (): UserExerciseProgress[] => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.map((progress: any) => ({
          ...progress,
          lastAttemptDate: new Date(progress.lastAttemptDate),
          answers: progress.answers.map((answer: any) => ({
            ...answer,
            timestamp: new Date(answer.timestamp)
          }))
        }))
      }
    }
  } catch (error) {
    console.error('Failed to load exercise progress:', error)
  }
  return []
}

// Categories and filters
const categories = [
  { id: "all", name: "All" },
  { id: "emotional-control", name: "Emotional Control" },
  { id: "risk-management", name: "Risk Management" },
  { id: "behavioral-patterns", name: "Behavioral Patterns" },
  { id: "mindfulness", name: "Mindfulness" },
  { id: "confidence", name: "Confidence" },
]

const difficulties = [
  { id: "beginner", name: "Beginner", color: "bg-green-100 text-green-800" },
  { id: "intermediate", name: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
  { id: "advanced", name: "Advanced", color: "bg-red-100 text-red-800" },
]

export function InteractiveExercises() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [userProgress, setUserProgress] = useState<UserExerciseProgress[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const [reflectionTimer, setReflectionTimer] = useState<number>(0)
  const [isReflectionActive, setIsReflectionActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load progress on component mount
  useEffect(() => {
    const storedProgress = loadProgressFromStorage()
    setUserProgress(storedProgress)
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    saveProgressToStorage(userProgress)
  }, [userProgress])

  // Timer effect for reflection steps
  useEffect(() => {
    if (isReflectionActive && reflectionTimer > 0) {
      timerRef.current = setTimeout(() => {
        setReflectionTimer(prev => prev - 1)
      }, 1000)
    } else if (reflectionTimer === 0 && isReflectionActive) {
      setIsReflectionActive(false)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [reflectionTimer, isReflectionActive])

  const getCurrentExercise = () => {
    return exerciseDefinitions.find(ex => ex.id === selectedExercise)
  }

  const getCurrentProgress = () => {
    return userProgress.find(p => p.exerciseId === selectedExercise)
  }

  const startExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId)
    setCurrentStepIndex(0)
    setCurrentAnswer("")
    
    // Create or update progress
    const existingProgress = userProgress.find(p => p.exerciseId === exerciseId)
    if (!existingProgress) {
      const newProgress: UserExerciseProgress = {
        exerciseId,
        lastAttemptDate: new Date(),
        completionStatus: "in_progress",
        currentStepId: exerciseDefinitions.find(ex => ex.id === exerciseId)?.steps[0]?.id || "",
        answers: []
      }
      setUserProgress(prev => [...prev, newProgress])
    } else {
      setUserProgress(prev => prev.map(p => 
        p.exerciseId === exerciseId 
          ? { ...p, completionStatus: "in_progress", lastAttemptDate: new Date() }
          : p
      ))
    }
  }

  const saveAnswer = (stepId: string, value: any) => {
    setUserProgress(prev => prev.map(p => 
      p.exerciseId === selectedExercise
        ? {
            ...p,
            answers: [
              ...p.answers.filter(a => a.stepId !== stepId),
              { stepId, value, timestamp: new Date() }
            ]
          }
        : p
    ))
  }

  const nextStep = () => {
    const exercise = getCurrentExercise()
    if (!exercise) return

    const currentStep = exercise.steps[currentStepIndex]
    
    // Save current answer if there is one
    if (currentAnswer.trim()) {
      saveAnswer(currentStep.id, currentAnswer)
    }

    // Move to next step or complete exercise
    if (currentStepIndex < exercise.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
      setCurrentAnswer("")
    } else {
      // Complete exercise
      setUserProgress(prev => prev.map(p => 
        p.exerciseId === selectedExercise
          ? { ...p, completionStatus: "completed" }
          : p
      ))
      setSelectedExercise(null)
      setCurrentStepIndex(0)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
      setCurrentAnswer("")
    }
  }

  const startReflection = (duration: number) => {
    setReflectionTimer(duration)
    setIsReflectionActive(true)
  }

  const exitExercise = () => {
    setSelectedExercise(null)
    setCurrentStepIndex(0)
    setCurrentAnswer("")
    setIsReflectionActive(false)
    setReflectionTimer(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate summary statistics
  const completedCount = userProgress.filter(p => p.completionStatus === "completed").length
  const totalMinutes = exerciseDefinitions.reduce((sum, ex) => sum + ex.duration, 0)
  const avgScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + (p.score || 0), 0) / userProgress.length)
    : 0

  const filteredExercises = exerciseDefinitions.filter(
    (exercise) => selectedCategory === "all" || exercise.category === selectedCategory,
  )

  // Exercise execution view
  if (selectedExercise) {
    const exercise = getCurrentExercise()
    const progress = getCurrentProgress()
    
    if (!exercise) return null

    const currentStep = exercise.steps[currentStepIndex]
    const stepProgress = ((currentStepIndex + 1) / exercise.steps.length) * 100

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={exitExercise} className="flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>Exit</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{exercise.title}</h1>
              <p className="text-muted-foreground">{exercise.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={difficulties.find((d) => d.id === exercise.difficulty)?.color}>
              {exercise.difficulty}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {exercise.duration} min
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStepIndex + 1} of {exercise.steps.length}</span>
            <span>{Math.round(stepProgress)}% Complete</span>
          </div>
          <Progress value={stepProgress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="min-h-[400px]">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Step Icon and Type */}
              <div className="flex items-center space-x-3">
                {currentStep.type === "instruction" && <Lightbulb className="h-6 w-6 text-blue-500" />}
                {currentStep.type === "question" && <MessageCircle className="h-6 w-6 text-green-500" />}
                {currentStep.type === "input" && <MessageCircle className="h-6 w-6 text-purple-500" />}
                {currentStep.type === "reflection" && <Timer className="h-6 w-6 text-orange-500" />}
                {currentStep.type === "summary" && <CheckCircle className="h-6 w-6 text-green-600" />}
                <Badge variant="outline" className="capitalize">
                  {currentStep.type}
                </Badge>
              </div>

              {/* Step Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{currentStep.content}</h3>

                {/* Question with Radio Options */}
                {currentStep.type === "question" && currentStep.inputType === "radio" && currentStep.options && (
                  <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer} className="space-y-3">
                    {currentStep.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Input Fields */}
                {currentStep.type === "input" && (
                  <div className="space-y-2">
                    {currentStep.inputType === "textarea" ? (
                      <Textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder={currentStep.placeholder}
                        className="min-h-[120px]"
                      />
                    ) : (
                      <Input
                        type={currentStep.inputType || "text"}
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder={currentStep.placeholder}
                      />
                    )}
                  </div>
                )}

                {/* Reflection Timer */}
                {currentStep.type === "reflection" && (
                  <div className="text-center space-y-4">
                    {!isReflectionActive && currentStep.minDuration && (
                      <Button 
                        onClick={() => startReflection(currentStep.minDuration!)}
                        className="bg-gradient-to-r from-orange-500 to-red-500"
                      >
                        <Timer className="h-4 w-4 mr-2" />
                        Start Reflection ({formatTime(currentStep.minDuration)})
                      </Button>
                    )}
                    
                    {isReflectionActive && (
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-orange-500">
                          {formatTime(reflectionTimer)}
                        </div>
                        <p className="text-muted-foreground">Take your time to reflect deeply...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={previousStep} 
            disabled={currentStepIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button 
            onClick={nextStep}
            disabled={
              (currentStep.type === "question" && !currentAnswer) ||
              (currentStep.type === "input" && !currentAnswer.trim()) ||
              (currentStep.type === "reflection" && isReflectionActive)
            }
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <span>{currentStepIndex === exercise.steps.length - 1 ? "Complete" : "Next"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Main exercises list view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interactive Exercises</h1>
        <p className="text-muted-foreground mt-2">Structured exercises designed to build trading psychology mastery</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Exercises Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount}/{exerciseDefinitions.length}
            </div>
            <p className="text-xs text-muted-foreground">Your progress overview across all exercises</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <Progress value={avgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMinutes}</div>
            <p className="text-xs text-muted-foreground">15 min</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredExercises.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No exercises found</h3>
                <p>Try selecting another category</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => {
                const IconComponent = exercise.icon
                const difficulty = difficulties.find((d) => d.id === exercise.difficulty)
                const progress = userProgress.find(p => p.exerciseId === exercise.id)
                const isCompleted = progress?.completionStatus === "completed"

                return (
                  <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{exercise.title}</CardTitle>
                            {isCompleted && (
                              <div className="flex items-center space-x-1 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{exercise.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={difficulty?.color}>{exercise.difficulty}</Badge>
                          <Badge variant="outline">{exercise.category}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration} min
                        </div>
                      </div>

                      {progress?.score && (
                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Last Score</span>
                            <span className="font-semibold text-green-600">{progress.score}%</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        onClick={() => startExercise(exercise.id)}
                      >
                        {isCompleted ? (
                          <>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retry
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </>
                        )}
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

