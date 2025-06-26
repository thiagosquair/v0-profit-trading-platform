"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Target,
  Brain,
  Shield,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  TrendingUp,
  Zap,
  BookOpen,
  Users
} from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple_choice" | "scale" | "text"
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

interface Assessment {
  id: string
  title: string
  description: string
  icon: string
  category: "readiness" | "risk_management" | "psychology" | "strategy"
  duration: string
  questions: Question[]
  lastCompleted?: string
  lastScore?: number
  maxScore: number
}

const assessments: Assessment[] = [
  {
    id: "trading_readiness",
    title: "Trading Readiness Assessment",
    description: "Evaluate your overall readiness for prop firm challenges",
    icon: "Target",
    category: "readiness",
    duration: "15 minutes",
    maxScore: 100,
    lastCompleted: "2024-12-01",
    lastScore: 85,
    questions: [
      {
        id: "experience",
        question: "How long have you been trading consistently?",
        type: "multiple_choice",
        options: [
          "Less than 6 months",
          "6 months - 1 year",
          "1-2 years",
          "2-5 years",
          "More than 5 years"
        ]
      },
      {
        id: "strategy_confidence",
        question: "How confident are you in your trading strategy?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Not confident", "Very confident"]
      },
      {
        id: "backtesting",
        question: "Have you thoroughly backtested your strategy?",
        type: "multiple_choice",
        options: [
          "No backtesting done",
          "Basic backtesting",
          "Comprehensive backtesting",
          "Live testing for 3+ months",
          "Live testing for 6+ months"
        ]
      },
      {
        id: "risk_management",
        question: "Describe your risk management approach",
        type: "text"
      }
    ]
  },
  {
    id: "risk_management",
    title: "Risk Management Assessment",
    description: "Test your risk management knowledge and application",
    icon: "Shield",
    category: "risk_management",
    duration: "20 minutes",
    maxScore: 100,
    lastCompleted: "2024-11-15",
    lastScore: 72,
    questions: [
      {
        id: "position_sizing",
        question: "What percentage of your account do you typically risk per trade?",
        type: "multiple_choice",
        options: [
          "Less than 1%",
          "1-2%",
          "2-3%",
          "3-5%",
          "More than 5%"
        ]
      },
      {
        id: "stop_loss",
        question: "How do you determine your stop loss levels?",
        type: "multiple_choice",
        options: [
          "Fixed percentage",
          "Technical levels",
          "ATR-based",
          "Combination of methods",
          "No consistent method"
        ]
      },
      {
        id: "drawdown_comfort",
        question: "What's the maximum drawdown you're comfortable with?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Very low tolerance", "High tolerance"]
      }
    ]
  },
  {
    id: "psychology",
    title: "Trading Psychology Assessment",
    description: "Analyze your emotional control and mental discipline",
    icon: "Brain",
    category: "psychology",
    duration: "25 minutes",
    maxScore: 100,
    questions: [
      {
        id: "emotional_control",
        question: "How well do you control emotions during losing streaks?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Poor control", "Excellent control"]
      },
      {
        id: "fomo_handling",
        question: "How often do you experience FOMO (Fear of Missing Out)?",
        type: "multiple_choice",
        options: [
          "Never",
          "Rarely",
          "Sometimes",
          "Often",
          "Always"
        ]
      },
      {
        id: "revenge_trading",
        question: "Have you ever engaged in revenge trading after losses?",
        type: "multiple_choice",
        options: [
          "Never",
          "Once or twice",
          "Occasionally",
          "Frequently",
          "It's a regular problem"
        ]
      }
    ]
  },
  {
    id: "strategy",
    title: "Strategy Assessment",
    description: "Validate the effectiveness of your trading approach",
    icon: "BarChart3",
    category: "strategy",
    duration: "30 minutes",
    maxScore: 100,
    questions: [
      {
        id: "strategy_type",
        question: "What type of trading strategy do you primarily use?",
        type: "multiple_choice",
        options: [
          "Trend following",
          "Mean reversion",
          "Breakout trading",
          "Scalping",
          "Multiple strategies"
        ]
      },
      {
        id: "win_rate",
        question: "What's your typical win rate?",
        type: "multiple_choice",
        options: [
          "Below 40%",
          "40-50%",
          "50-60%",
          "60-70%",
          "Above 70%"
        ]
      },
      {
        id: "profit_factor",
        question: "What's your profit factor (gross profit / gross loss)?",
        type: "multiple_choice",
        options: [
          "Below 1.0",
          "1.0-1.2",
          "1.2-1.5",
          "1.5-2.0",
          "Above 2.0"
        ]
      }
    ]
  }
]

const iconMap = {
  Target,
  Shield,
  Brain,
  BarChart3
}

export function AssessmentTools() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsCompleted(false)
    setScore(null)
    setIsAssessmentOpen(true)
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      completeAssessment()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const completeAssessment = () => {
    // Simple scoring logic - in real app this would be more sophisticated
    const totalQuestions = selectedAssessment?.questions.length || 1
    const answeredQuestions = Object.keys(answers).length
    const completionRate = answeredQuestions / totalQuestions
    const calculatedScore = Math.round(completionRate * 85 + Math.random() * 15) // Mock scoring
    
    setScore(calculatedScore)
    setIsCompleted(true)
  }

  const closeAssessment = () => {
    setIsAssessmentOpen(false)
    setSelectedAssessment(null)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsCompleted(false)
    setScore(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const currentQuestion = selectedAssessment?.questions[currentQuestionIndex]
  const progress = selectedAssessment ? ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Assessment Tools
          </h1>
          <p className="text-gray-600 mt-2">
            Evaluate your trading readiness and identify areas for improvement
          </p>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              out of {assessments.length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5</div>
            <p className="text-xs text-muted-foreground">
              Across completed assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Readiness Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              Ready for challenges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Assessment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Psychology</div>
            <p className="text-xs text-muted-foreground">
              Recommended next step
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment) => {
          const IconComponent = iconMap[assessment.icon as keyof typeof iconMap] || Target
          
          return (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.duration}</CardDescription>
                    </div>
                  </div>
                  {assessment.lastScore && (
                    <Badge className={getScoreBadgeColor(assessment.lastScore)}>
                      {assessment.lastScore}/100
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{assessment.description}</p>
                
                {assessment.lastCompleted && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last completed</span>
                      <span className="text-sm font-medium">
                        {new Date(assessment.lastCompleted).toLocaleDateString()}
                      </span>
                    </div>
                    {assessment.lastScore && (
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className={`text-sm font-medium ${getScoreColor(assessment.lastScore)}`}>
                          {assessment.lastScore}/100
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={() => startAssessment(assessment)}
                  variant={assessment.lastCompleted ? "outline" : "default"}
                >
                  {assessment.lastCompleted ? "Retake Assessment" : "Take Assessment"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>Based on your assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Complete Psychology Assessment</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your trading readiness is good, but understanding your psychological profile will help optimize your performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Improve Risk Management</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your risk management score could be improved. Consider taking additional courses on position sizing and drawdown management.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Ready for Community</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your overall readiness suggests you're ready to engage with other traders and share experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Dialog */}
      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAssessment?.title}</DialogTitle>
            <DialogDescription>
              {isCompleted ? "Assessment completed!" : `Question ${currentQuestionIndex + 1} of ${selectedAssessment?.questions.length}`}
            </DialogDescription>
          </DialogHeader>

          {!isCompleted && currentQuestion && (
            <div className="space-y-6">
              <Progress value={progress} className="w-full" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                
                {currentQuestion.type === "multiple_choice" && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === "scale" && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{currentQuestion.scaleLabels?.[0]}</span>
                      <span>{currentQuestion.scaleLabels?.[1]}</span>
                    </div>
                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                      className="flex justify-between"
                    >
                      {Array.from({ length: (currentQuestion.scaleMax || 10) - (currentQuestion.scaleMin || 1) + 1 }, (_, i) => {
                        const value = (currentQuestion.scaleMin || 1) + i
                        return (
                          <div key={value} className="flex flex-col items-center space-y-2">
                            <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                            <Label htmlFor={`scale-${value}`} className="text-sm">{value}</Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>
                )}

                {currentQuestion.type === "text" && (
                  <Textarea
                    placeholder="Enter your response..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    rows={4}
                  />
                )}
              </div>
            </div>
          )}

          {isCompleted && score !== null && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                {score}
              </div>
              <h3 className="text-xl font-semibold">Assessment Complete!</h3>
              <p className="text-gray-600">
                You scored {score} out of {selectedAssessment?.maxScore}
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {score >= 80 && <li>• Excellent performance! You're ready for prop firm challenges.</li>}
                  {score >= 60 && score < 80 && <li>• Good foundation. Focus on areas where you scored lower.</li>}
                  {score < 60 && <li>• Consider additional study and practice before taking challenges.</li>}
                  <li>• Review the detailed feedback for specific improvement areas.</li>
                  <li>• Retake this assessment in 2-4 weeks to track progress.</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            {!isCompleted && (
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!currentQuestion || !answers[currentQuestion.id]}
                >
                  {currentQuestionIndex === (selectedAssessment?.questions.length || 1) - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            )}
            {isCompleted && (
              <Button onClick={closeAssessment} className="w-full">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

