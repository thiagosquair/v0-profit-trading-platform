"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Globe, Brain, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pt", label: "Português (Brasil)", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
]

const QUESTIONS = {
  en: [
    {
      id: "experience",
      question: "How long have you been trading?",
      options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
    },
    {
      id: "emotion",
      question: "What's your biggest emotional challenge while trading?",
      options: ["Impulsiveness", "Fear of loss", "Lack of focus", "Hesitation"],
    },
    {
      id: "routine",
      question: "Do you use a routine before trading?",
      options: ["Yes, always", "Sometimes", "Never"],
    },
    {
      id: "journal",
      question: "How often do you journal your trades?",
      options: ["Daily", "Occasionally", "Never"],
    },
    {
      id: "risk_management",
      question: "How do you handle losing trades?",
      options: ["Accept and move on", "Get frustrated", "Analyze what went wrong", "Take a break"],
    },
    {
      id: "decision_making",
      question: "When do you typically make your best trading decisions?",
      options: ["When calm and focused", "Under pressure", "After market analysis", "Following gut feeling"],
    },
  ],
  pt: [
    {
      id: "experience",
      question: "Há quanto tempo você negocia?",
      options: ["Menos de 1 ano", "1–3 anos", "3–5 anos", "5+ anos"],
    },
    {
      id: "emotion",
      question: "Qual é o seu maior desafio emocional ao negociar?",
      options: ["Impulsividade", "Medo de perda", "Falta de foco", "Hesitação"],
    },
    {
      id: "routine",
      question: "Você usa uma rotina antes de negociar?",
      options: ["Sim, sempre", "Às vezes", "Nunca"],
    },
    {
      id: "journal",
      question: "Com que frequência você registra suas negociações?",
      options: ["Diariamente", "Ocasionalmente", "Nunca"],
    },
    {
      id: "risk_management",
      question: "Como você lida com negociações perdedoras?",
      options: ["Aceito e sigo em frente", "Fico frustrado", "Analiso o que deu errado", "Faço uma pausa"],
    },
    {
      id: "decision_making",
      question: "Quando você normalmente toma suas melhores decisões de negociação?",
      options: ["Quando calmo e focado", "Sob pressão", "Após análise de mercado", "Seguindo intuição"],
    },
  ],
  es: [
    {
      id: "experience",
      question: "¿Cuánto tiempo llevas operando?",
      options: ["Menos de 1 año", "1–3 años", "3–5 años", "5+ años"],
    },
    {
      id: "emotion",
      question: "¿Cuál es tu mayor desafío emocional al operar?",
      options: ["Impulsividad", "Miedo a la pérdida", "Falta de concentración", "Vacilación"],
    },
    {
      id: "routine",
      question: "¿Usas una rutina antes de operar?",
      options: ["Sí, siempre", "A veces", "Nunca"],
    },
    {
      id: "journal",
      question: "¿Con qué frecuencia registras tus operaciones?",
      options: ["Diariamente", "Ocasionalmente", "Nunca"],
    },
    {
      id: "risk_management",
      question: "¿Cómo manejas las operaciones perdedoras?",
      options: ["Acepto y sigo adelante", "Me frustro", "Analizo qué salió mal", "Tomo un descanso"],
    },
    {
      id: "decision_making",
      question: "¿Cuándo tomas típicamente tus mejores decisiones de trading?",
      options: [
        "Cuando estoy calmado y enfocado",
        "Bajo presión",
        "Después del análisis de mercado",
        "Siguiendo la intuición",
      ],
    },
  ],
  fr: [
    {
      id: "experience",
      question: "Depuis combien de temps tradez-vous ?",
      options: ["Moins d'1 an", "1–3 ans", "3–5 ans", "5+ ans"],
    },
    {
      id: "emotion",
      question: "Quel est votre plus grand défi émotionnel en trading ?",
      options: ["Impulsivité", "Peur de la perte", "Manque de concentration", "Hésitation"],
    },
    {
      id: "routine",
      question: "Utilisez-vous une routine avant de trader ?",
      options: ["Oui, toujours", "Parfois", "Jamais"],
    },
    {
      id: "journal",
      question: "À quelle fréquence tenez-vous un journal de vos trades ?",
      options: ["Quotidiennement", "Occasionnellement", "Jamais"],
    },
    {
      id: "risk_management",
      question: "Comment gérez-vous les trades perdants ?",
      options: [
        "J'accepte et je passe à autre chose",
        "Je me frustre",
        "J'analyse ce qui a mal tourné",
        "Je fais une pause",
      ],
    },
    {
      id: "decision_making",
      question: "Quand prenez-vous généralement vos meilleures décisions de trading ?",
      options: [
        "Quand je suis calme et concentré",
        "Sous pression",
        "Après analyse du marché",
        "En suivant mon instinct",
      ],
    },
  ],
}

interface TradingPsychologyAssessmentProps {
  onComplete?: (results: any) => void
}

export function TradingPsychologyAssessment({ onComplete }: TradingPsychologyAssessmentProps) {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState("en")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showRetakePrompt, setShowRetakePrompt] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const userId = user.id
    const newSignupKey = `new_signup_${userId}`
    const assessmentCompletedKey = `assessment_completed_${userId}`

    // Check if this user just signed up
    const isNewSignup = localStorage.getItem(newSignupKey)
    const hasCompletedAssessment = localStorage.getItem(assessmentCompletedKey)

    if (isNewSignup && !hasCompletedAssessment) {
      // Show assessment for new signups who haven't completed it
      setOpen(true)
      // Clear the new signup flag so it doesn't show again
      localStorage.removeItem(newSignupKey)
    } else if (hasCompletedAssessment) {
      // For users who have completed it, check for monthly retake
      const lastCompleted = localStorage.getItem(assessmentCompletedKey)
      const now = new Date()
      const lastCompletedDate = new Date(Number.parseInt(lastCompleted))
      const daysSinceLastAssessment = Math.floor((now.getTime() - lastCompletedDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysSinceLastAssessment >= 30) {
        setShowRetakePrompt(true)
      }
    }
  }, [user])

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step < QUESTIONS[language].length - 1) {
      setStep((prev) => prev + 1)
    }
  }

  const handleFinish = () => {
    if (!user) return

    const results = {
      answers,
      completedAt: new Date().toISOString(),
      language,
      userId: user.id,
    }

    const userId = user.id
    const assessmentCompletedKey = `assessment_completed_${userId}`

    // Store completion timestamp and results
    localStorage.setItem(assessmentCompletedKey, Date.now().toString())
    localStorage.setItem(`psychology_profile_${userId}`, JSON.stringify(results))

    setOpen(false)
    setShowRetakePrompt(false)
    onComplete?.(results)
  }

  const handleRetake = () => {
    setStep(0)
    setAnswers({})
    setShowRetakePrompt(false)
    setOpen(true)
  }

  const handleSkipRetake = () => {
    if (!user) return

    // Set a "remind me later" timestamp (7 days from now)
    const remindLaterDate = new Date()
    remindLaterDate.setDate(remindLaterDate.getDate() + 7)
    localStorage.setItem(`assessment_remind_later_${user.id}`, remindLaterDate.getTime().toString())
    setShowRetakePrompt(false)
  }

  const currentQuestion = QUESTIONS[language]?.[step]
  const isLastQuestion = step === QUESTIONS[language]?.length - 1
  const hasAnsweredCurrent = currentQuestion && answers[currentQuestion.id]

  // Don't render anything if no user
  if (!user) return null

  if (showRetakePrompt) {
    return (
      <Card className="border-l-4 border-l-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Brain className="h-5 w-5" />
            Monthly Psychology Check-in
          </CardTitle>
          <CardDescription>It's been a month since your last assessment. Ready to track your progress?</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button onClick={handleRetake} className="bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
          <Button variant="outline" onClick={handleSkipRetake}>
            Remind Me Later
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-blue-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-blue-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {step + 1} / {QUESTIONS[language]?.length || 0}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center justify-center gap-2">
              <Brain className="h-6 w-6" />
              Trading Psychology Assessment
            </h2>
            <p className="text-blue-600">
              Welcome! Help your AI Coach understand your trading mindset and create a personalized growth plan.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / (QUESTIONS[language]?.length || 1)) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {currentQuestion ? (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{currentQuestion.question}</h3>

              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-${index}`} className="text-blue-600" />
                    <Label htmlFor={`${currentQuestion.id}-${index}`} className="text-base cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {hasAnsweredCurrent && (
              <div className="flex justify-end">
                {isLastQuestion ? (
                  <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                    Complete Assessment
                  </Button>
                ) : (
                  <Button onClick={() => setStep((prev) => prev + 1)} className="bg-blue-600 hover:bg-blue-700">
                    Next Question
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-10 space-y-6">
            <div className="text-6xl">🎉</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-800">Welcome to ProFitz!</h3>
              <p className="text-gray-600">
                Your psychology profile has been created. Your AI Coach will use this to provide personalized guidance.
              </p>
              <p className="text-sm text-blue-600">You can retake this assessment monthly to track your progress.</p>
            </div>
            <Button onClick={handleFinish} className="bg-blue-600 hover:bg-blue-700">
              Enter Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
