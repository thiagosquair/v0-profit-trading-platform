"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Coffee, 
  Clock, 
  Target, 
  CheckCircle, 
  Calendar,
  Bell,
  Award,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Timer,
  BookOpen
} from 'lucide-react'
import { useAssessmentEligibility } from '@/hooks/useAssessmentEligibility'
import { useUser } from '@/contexts/UserContext'

interface EnhancedAssessmentWelcomeProps {
  onStartAssessment: () => void
}

export function EnhancedAssessmentWelcome({ onStartAssessment }: EnhancedAssessmentWelcomeProps) {
  const { user } = useUser()
  const { eligibility, isLoading, setReminder } = useAssessmentEligibility(user?.id || '')
  const [reminderSet, setReminderSet] = useState(false)

  const handleSetReminder = async () => {
    const success = await setReminder()
    if (success) {
      setReminderSet(true)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!eligibility) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-2">Unable to Load Assessment</h2>
            <p className="text-red-700">
              We're having trouble checking your assessment eligibility. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If not eligible for retake
  if (!eligibility.eligible) {
    const nextDate = eligibility.nextEligibleDate ? new Date(eligibility.nextEligibleDate) : null
    
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Timer className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-blue-900">Assessment Cooldown Period</CardTitle>
            <CardDescription className="text-lg text-blue-700">
              Your next assessment will be available soon
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{eligibility.retakeNumber - 1}</div>
                <div className="text-sm text-blue-700">Assessments Completed</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{eligibility.daysSinceLastAssessment}</div>
                <div className="text-sm text-blue-700">Days Since Last</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{eligibility.daysUntilEligible}</div>
                <div className="text-sm text-blue-700">Days Remaining</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-blue-700 mb-2">
                  <span>Progress to next assessment</span>
                  <span>{Math.round((eligibility.daysSinceLastAssessment / 30) * 100)}%</span>
                </div>
                <Progress 
                  value={(eligibility.daysSinceLastAssessment / 30) * 100} 
                  className="h-3"
                />
              </div>

              {nextDate && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Next Assessment Available</span>
                  </div>
                  <div className="text-lg font-bold text-green-900">
                    {nextDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!reminderSet ? (
                <Button 
                  onClick={handleSetReminder}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Set Reminder for Next Assessment
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Reminder set! We'll notify you when it's time.</span>
                </div>
              )}
              
              <div className="flex gap-2 justify-center">
                <Button variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress
                </Button>
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              </div>
            </div>

            <div className="text-sm text-blue-600 bg-blue-100 p-4 rounded-lg">
              <p className="font-medium mb-2">Why the 30-day wait?</p>
              <p>
                This cooldown period allows time for psychological development and ensures meaningful 
                progress comparison between assessments. Use this time to practice the recommended 
                exercises and implement insights from your previous assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If eligible for assessment
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white">
            <Brain className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {eligibility.isFirstAssessment ? 'Welcome to Your Trading Psychology Journey' : `Assessment #${eligibility.retakeNumber} Ready`}
          </CardTitle>
          <CardDescription className="text-lg text-gray-700">
            {eligibility.isFirstAssessment 
              ? 'Discover your psychological strengths and unlock your trading potential'
              : 'Track your psychological development and compare your progress'
            }
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            {!eligibility.isFirstAssessment && (
              <Badge className="bg-green-100 text-green-800">
                <Award className="mr-1 h-3 w-3" />
                Assessment #{eligibility.retakeNumber}
              </Badge>
            )}
            <Badge className="bg-blue-100 text-blue-800">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Analysis
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            What You'll Discover
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Trading Psychology Profile</h4>
                  <p className="text-sm text-gray-600">Your risk tolerance, emotional patterns, and decision-making style</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Behavioral Insights</h4>
                  <p className="text-sm text-gray-600">Your habits, discipline patterns, and learning preferences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Personalized Recommendations</h4>
                  <p className="text-sm text-gray-600">AI-generated strategies tailored to your psychological profile</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Strength & Growth Areas</h4>
                  <p className="text-sm text-gray-600">Your psychological advantages and development opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-800 font-bold text-sm">
                  5
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Trading Style Optimization</h4>
                  <p className="text-sm text-gray-600">How to align your trading approach with your psychology</p>
                </div>
              </div>
              {!eligibility.isFirstAssessment && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm">
                    6
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Progress Comparison</h4>
                    <p className="text-sm text-gray-600">See how you've grown since your last assessment</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preparation Guide */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Coffee className="h-5 w-5" />
            Before You Begin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-900 mb-3">Take Your Time</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    Grab a coffee or your favorite drink
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    Find a quiet, comfortable space
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    Turn off distractions and notifications
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-900 mb-3">Assessment Details</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    Approximately 15-20 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-orange-600" />
                    90 thoughtful questions
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-orange-600" />
                    AI analysis included
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                <strong>Remember:</strong> There are no right or wrong answers. Be honest and authentic 
                in your responses to get the most accurate psychological profile and personalized recommendations.
                You can save your progress and continue later if needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Ready to Begin?</h3>
          <p className="text-blue-800 mb-6">
            {eligibility.isFirstAssessment 
              ? 'Start your journey toward trading psychology mastery'
              : 'Continue your Psychological development journey'
            }
          </p>
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            {eligibility.isFirstAssessment ? 'Start My First Assessment' : `Begin Assessment #${eligibility.retakeNumber}`}
          </Button>
          <p className="text-xs text-blue-600 mt-3">
            Your progress will be automatically saved
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
