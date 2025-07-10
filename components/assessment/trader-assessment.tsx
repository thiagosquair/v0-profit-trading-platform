"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Coffee, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Pause, 
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Heart,
  Zap
} from 'lucide-react'
import { AssessmentQuestion, AssessmentProgress, AssessmentResponse } from '@/types/assessment'
import { assessmentQuestions, categoryInfo, coachingMessages } from '@/lib/assessmentData'
import { AssessmentWelcome } from './assessment-welcome'
import { EnhancedAssessmentWelcome } from './enhanced-assessment-welcome'
import { AssessmentQuestion as QuestionComponent } from './assessment-question'
import { AssessmentResults } from './assessment-results'
import { EnhancedAssessmentResults } from './enhanced-assessment-results'

type AssessmentState = 'welcome' | 'in_progress' | 'paused' | 'completed' | 'results'

export function TraderAssessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('welcome')
  const [progress, setProgress] = useState<AssessmentProgress>({
    currentQuestionIndex: 0,
    totalQuestions: assessmentQuestions.length,
    completedCategories: [],
    currentCategory: assessmentQuestions[0]?.category || 'trading_psychology',
    responses: [],
    startedAt: new Date(),
    lastSavedAt: new Date()
  })
  const [showCoachingMessage, setShowCoachingMessage] = useState(false)
  const [currentCoachingMessage, setCurrentCoachingMessage] = useState('')

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('trader-assessment-progress')
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        setProgress({
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          lastSavedAt: new Date(parsed.lastSavedAt)
        })
        if (parsed.currentQuestionIndex > 0) {
          setAssessmentState('paused')
        }
      } catch (error) {
        console.error('Error loading saved progress:', error)
      }
    }
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    if (assessmentState === 'in_progress' || assessmentState === 'paused') {
      localStorage.setItem('trader-assessment-progress', JSON.stringify({
        ...progress,
        lastSavedAt: new Date()
      }))
    }
  }, [progress, assessmentState])

  const startAssessment = () => {
    setAssessmentState('in_progress')
    setProgress(prev => ({
      ...prev,
      startedAt: new Date(),
      lastSavedAt: new Date()
    }))
  }

  const resumeAssessment = () => {
    setAssessmentState('in_progress')
  }

  const pauseAssessment = () => {
    setAssessmentState('paused')
  }

  const restartAssessment = () => {
    localStorage.removeItem('trader-assessment-progress')
    setProgress({
      currentQuestionIndex: 0,
      totalQuestions: assessmentQuestions.length,
      completedCategories: [],
      currentCategory: assessmentQuestions[0]?.category || 'trading_psychology',
      responses: [],
      startedAt: new Date(),
      lastSavedAt: new Date()
    })
    setAssessmentState('welcome')
  }

  const handleQuestionAnswer = (questionId: string, answer: string | number | string[]) => {
    const newResponse: AssessmentResponse = {
      questionId,
      answer,
      timestamp: new Date()
    }

    setProgress(prev => {
      const updatedResponses = [...prev.responses.filter(r => r.questionId !== questionId), newResponse]
      const nextIndex = prev.currentQuestionIndex + 1
      const currentQuestion = assessmentQuestions[prev.currentQuestionIndex]
      const nextQuestion = assessmentQuestions[nextIndex]
      
      // Check if we're moving to a new category
      const isNewCategory = nextQuestion && nextQuestion.category !== currentQuestion?.category
      
      if (isNewCategory && nextQuestion) {
        // Show coaching message for category transition
        const message = coachingMessages.category_transitions[nextQuestion.category]
        setCurrentCoachingMessage(message)
        setShowCoachingMessage(true)
        
        setTimeout(() => {
          setShowCoachingMessage(false)
        }, 3000)
      }

      // Check if assessment is complete
      if (nextIndex >= assessmentQuestions.length) {
        setAssessmentState('completed')
        localStorage.removeItem('trader-assessment-progress')
        return {
          ...prev,
          responses: updatedResponses,
          currentQuestionIndex: nextIndex
        }
      }

      return {
        ...prev,
        responses: updatedResponses,
        currentQuestionIndex: nextIndex,
        currentCategory: nextQuestion?.category || prev.currentCategory,
        completedCategories: isNewCategory && currentQuestion 
          ? [...new Set([...prev.completedCategories, currentQuestion.category])]
          : prev.completedCategories
      }
    })
  }

  const progressPercentage = (progress.currentQuestionIndex / progress.totalQuestions) * 100
  const currentQuestion = assessmentQuestions[progress.currentQuestionIndex]
  const currentCategoryInfo = currentQuestion ? categoryInfo[currentQuestion.category] : null

  if (assessmentState === 'welcome') {
    return <EnhancedAssessmentWelcome onStartAssessment={startAssessment} />
  }
        hasProgress={progress.currentQuestionIndex > 0}
        onResume={resumeAssessment}
        progressPercentage={progressPercentage}
      />
    )
  }

  if (assessmentState === 'paused') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Pause className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-900">Assessment Paused</CardTitle>
            <CardDescription className="text-blue-700">
              No worries! Your progress has been saved. You can continue whenever you're ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-blue-700">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}% complete</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-blue-600 text-center">
                {progress.currentQuestionIndex} of {progress.totalQuestions} questions completed
              </p>
            </div>

            {currentCategoryInfo && (
              <div className="text-center">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Current: {currentCategoryInfo.name}
                </Badge>
              }

            <div className="flex gap-3 justify-center">
              <Button onClick={resumeAssessment} className="bg-blue-600 hover:bg-blue-700">
                <Play className="mr-2 h-4 w-4" />
                Continue Assessment
              </Button>
              <Button variant="outline" onClick={restartAssessment}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </div>

            <div className="text-center text-sm text-blue-600">
              <p>💡 Tip: Take your time and answer honestly for the best insights!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (assessmentState === 'completed') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-900">
              {coachingMessages.completion.title}
            </CardTitle>
            <CardDescription className="text-green-700">
              {coachingMessages.completion.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Assessment Complete!</span>
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">{progress.totalQuestions}</div>
                  <div className="text-sm text-green-600">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">5</div>
                  <div className="text-sm text-green-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">
                    {Math.round((Date.now() - progress.startedAt.getTime()) / 60000)}
                  </div>
                  <div className="text-sm text-green-600">Minutes</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-green-800 font-medium mb-2">What happens next?</p>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>AI analyzes your responses (2-3 minutes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Personalized insights generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Results appear in coaching insights</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setAssessmentState('results')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Zap className="mr-2 h-4 w-4" />
                View My Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (assessmentState === 'results') {
    return <EnhancedAssessmentResults responses={progress.responses} />
  }

  // In progress state
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Coaching Message Overlay */}
      {showCoachingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-blue-800 font-medium">{currentCoachingMessage}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Trading Psychology Assessment</h1>
              <p className="text-sm text-gray-600">
                Question {progress.currentQuestionIndex + 1} of {progress.totalQuestions}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={pauseAssessment} size="sm">
            <Pause className="mr-2 h-4 w-4" />
            Save & Continue Later
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {currentCategoryInfo && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-2xl">{currentCategoryInfo.icon}</span>
            <div>
              <Badge variant="outline" className="mb-1">
                {currentCategoryInfo.name}
              </Badge>
              <p className="text-sm text-gray-600">{currentCategoryInfo.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          onAnswer={handleQuestionAnswer}
          currentAnswer={progress.responses.find(r => r.questionId === currentQuestion.id)?.answer}
        />
      )}

      {/* Encouragement Messages */}
      {progress.currentQuestionIndex > 0 && progress.currentQuestionIndex % 5 === 0 && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">
                {coachingMessages.encouragement[Math.floor(Math.random() * coachingMessages.encouragement.length)]}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

