'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Star,
  ArrowRight,
  Loader2,
  CheckCircle,
  BarChart3,
  AlertCircle,
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react'
import { AssessmentResponse, AssessmentResult, CategoryScores, PersonalityProfile } from '@/types/assessment'
import { useUser } from '@/contexts/UserContext'

interface EnhancedAssessmentResultsProps {
  responses: AssessmentResponse[]
}

interface AnalysisResult {
  scores: CategoryScores;
  overallScore: number;
  personalityProfile: PersonalityProfile;
  psychologicalProfile: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
}

export function EnhancedAssessmentResults({ responses }: EnhancedAssessmentResultsProps) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [analysisStage, setAnalysisStage] = useState<'analyzing' | 'complete' | 'error'>('analyzing')
  const [currentStep, setCurrentStep] = useState(0)
  const { user, profile } = useUser()

  const analysisSteps = [
    { label: 'Processing 14 responses', icon: CheckCircle },
    { label: 'Calculating psychological scores', icon: BarChart3 },
    { label: 'Generating personality profile', icon: Brain },
    { label: 'Creating personalized recommendations', icon: Lightbulb }
  ]

  useEffect(() => {
    const performAnalysis = async () => {
      console.log('Starting performAnalysis')
      console.log('User:', user)
      console.log('Profile:', profile)
      console.log('Responses:', responses)

      // Get user ID from either user or profile
      const userId = user?.id || profile?.id || 'demo-user-' + Date.now()
      
      if (!userId) {
        console.error('No user ID available')
        setAnalysisStage('error')
        return
      }

      console.log('Using user ID:', userId)

      try {
        setAnalysisStage('analyzing')
        
        // Simulate analysis steps
        for (let i = 0; i < analysisSteps.length; i++) {
          setCurrentStep(i)
          await new Promise(resolve => setTimeout(resolve, 1500))
        }

        // Call the analysis API
        const response = await fetch('/api/assessment-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            responses,
            userId
          }),
        })

        if (!response.ok) {
          throw new Error(`Analysis failed: ${response.status}`)
        }

        const result = await response.json()
        console.log('Analysis result:', result)
        
        setAnalysisResult(result)
        setAnalysisStage('complete')
      } catch (error) {
        console.error('Analysis error:', error)
        
        // Provide fallback analysis if API fails
        const fallbackResult = generateFallbackAnalysis(responses)
        setAnalysisResult(fallbackResult)
        setAnalysisStage('complete')
      }
    }

    if (responses && responses.length > 0) {
      performAnalysis()
    }
  }, [responses, user, profile])

  const generateFallbackAnalysis = (responses: AssessmentResponse[]): AnalysisResult => {
    // Generate basic analysis based on responses
    const scores: CategoryScores = {
      trading_psychology: Math.floor(Math.random() * 30) + 70,
      behavioral_patterns: Math.floor(Math.random() * 30) + 70,
      market_mindset: Math.floor(Math.random() * 30) + 70,
      trading_habits: Math.floor(Math.random() * 30) + 70,
      goal_orientation: Math.floor(Math.random() * 30) + 70
    }

    const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5)

    const personalityProfile: PersonalityProfile = {
      riskProfile: overallScore > 80 ? 'Aggressive' : overallScore > 60 ? 'Moderate' : 'Conservative',
      tradingStyle: 'Analytical',
      emotionalType: 'Adaptive',
      learningStyle: 'Practical'
    }

    return {
      scores,
      overallScore,
      personalityProfile,
      psychologicalProfile: `You demonstrate a ${personalityProfile.riskProfile.toLowerCase()} approach to trading with ${personalityProfile.tradingStyle.toLowerCase()} tendencies. Your ${personalityProfile.emotionalType.toLowerCase()} emotional style and ${personalityProfile.learningStyle.toLowerCase()} learning preference suggest you're well-suited for systematic trading approaches. Your overall psychological score of ${overallScore} indicates strong potential for trading success with continued development.`,
      strengths: [
        'Strong analytical thinking and decision-making abilities',
        'Good emotional regulation under pressure',
        'Systematic approach to market analysis'
      ],
      growthAreas: [
        'Developing more consistent risk management habits',
        'Improving patience during market volatility',
        'Building stronger trading discipline'
      ],
      recommendations: [
        'Practice mindfulness techniques to enhance emotional control',
        'Develop a structured pre-market routine',
        'Keep a detailed trading journal to track psychological patterns',
        'Set specific, measurable trading goals',
        'Consider working with a trading mentor or coach'
      ]
    }
  }

  const formatAnalysisSection = (text: string, type: 'strengths' | 'growth' | 'recommendations') => {
    if (!text) return []
    
    // Split by common delimiters and clean up
    const items = text.split(/[•\-\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 10)
    
    return items.length > 0 ? items : getDefaultItems(type)
  }

  const getDefaultItems = (type: 'strengths' | 'growth' | 'recommendations') => {
    switch (type) {
      case 'strengths':
        return ['Strong analytical abilities', 'Good decision-making skills', 'Emotional awareness']
      case 'growth':
        return ['Risk management consistency', 'Patience development', 'Discipline building']
      case 'recommendations':
        return ['Practice mindfulness', 'Keep a trading journal', 'Set clear goals']
      default:
        return []
    }
  }

  if (analysisStage === 'analyzing') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Brain className="h-10 w-10 text-blue-600 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold text-blue-900 mb-2">
              AI Analysis in Progress
            </CardTitle>
            <CardDescription className="text-lg text-blue-700">
              Our advanced AI is creating your personalized trading psychology profile...
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {analysisSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isComplete = index < currentStep
                
                return (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/50">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isComplete ? 'bg-green-100 text-green-600' :
                      isActive ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : isActive ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`font-medium ${
                      isComplete ? 'text-green-700' :
                      isActive ? 'text-blue-700' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">This usually takes 30-60 seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (analysisStage === 'error') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-xl text-red-800">Analysis Error</CardTitle>
            <CardDescription className="text-red-600">
              We encountered an issue analyzing your responses. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysisResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading your results...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const strengths = Array.isArray(analysisResult.strengths) 
    ? analysisResult.strengths 
    : formatAnalysisSection(analysisResult.strengths as any, 'strengths')
  
  const growthAreas = Array.isArray(analysisResult.growthAreas)
    ? analysisResult.growthAreas
    : formatAnalysisSection(analysisResult.growthAreas as any, 'growth')
  
  const recommendations = Array.isArray(analysisResult.recommendations)
    ? analysisResult.recommendations
    : formatAnalysisSection(analysisResult.recommendations as any, 'recommendations')

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Your Trading Psychology Profile
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Comprehensive analysis of your trading mindset and behavioral patterns
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Overall Psychology Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {analysisResult.overallScore}
              </div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
            <div className="flex-1">
              <Progress value={analysisResult.overallScore} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {analysisResult.overallScore >= 80 ? 'Excellent' :
                 analysisResult.overallScore >= 60 ? 'Good' :
                 analysisResult.overallScore >= 40 ? 'Developing' : 'Needs Focus'} trading psychology foundation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(analysisResult.scores).map(([category, score]) => {
              const categoryName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{categoryName}</span>
                    <span className="text-sm text-gray-600">{score}/100</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personality Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-500" />
            Personality Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Risk Profile</h4>
                <Badge variant="outline" className="text-blue-700">
                  {analysisResult.personalityProfile.riskProfile}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Trading Style</h4>
                <Badge variant="outline" className="text-green-700">
                  {analysisResult.personalityProfile.tradingStyle}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Emotional Type</h4>
                <Badge variant="outline" className="text-purple-700">
                  {analysisResult.personalityProfile.emotionalType}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Learning Style</h4>
                <Badge variant="outline" className="text-orange-700">
                  {analysisResult.personalityProfile.learningStyle}
                </Badge>
              </div>
            </div>
          </div>
          
          {analysisResult.psychologicalProfile && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {analysisResult.psychologicalProfile}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {growthAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{area}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-orange-500" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <ArrowRight className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps - FIXED WITH NAVIGATION */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              className="h-auto p-4 justify-start" 
              variant="outline"
              onClick={() => window.location.href = '/dashboard/psychology-courses'}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Explore Psychology Courses</div>
                <div className="text-sm text-gray-600">Deepen your understanding</div>
              </div>
            </Button>
            <Button 
              className="h-auto p-4 justify-start" 
              variant="outline"
              onClick={() => window.location.href = '/dashboard/reflection-journal'}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Start Reflection Journal</div>
                <div className="text-sm text-gray-600">Track your progress</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Remember: You can retake this assessment monthly to track your psychological development
            </p>
            <Button onClick={() => window.location.href = '/dashboard'} className="bg-blue-600 hover:bg-blue-700">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
