"use client"

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
import { AssessmentResponse, AssessmentResult } from '@/types/assessment'
import { useAssessmentAnalysis } from '@/hooks/useAssessmentAnalysis'
import { useUser } from '@/contexts/UserContext'

interface EnhancedAssessmentResultsProps {
  responses: AssessmentResponse[]
}

export function EnhancedAssessmentResults({ responses }: EnhancedAssessmentResultsProps) {
  const [analysisResult, setAnalysisResult] = useState<AssessmentResult | null>(null)
  const [analysisStage, setAnalysisStage] = useState<'analyzing' | 'complete' | 'error'>('analyzing')
  const { analyzeAssessment, isAnalyzing, error } = useAssessmentAnalysis()
  const { user } = useUser()

  useEffect(() => {
    const performAnalysis = async () => {
      console.log('Starting performAnalysis')
      if (!user?.id) {
        console.warn('No user ID, skipping analysis')
        return
      }

      console.log('User ID:', user.id)
      console.log('Responses:', responses)

      try {
        setAnalysisStage('analyzing')
        const result = await analyzeAssessment(responses, user.id)
        console.log('Analysis result:', result)

        if (result) {
          setAnalysisResult(result)
          setAnalysisStage('complete')
        } else {
          setAnalysisStage('error')
        }
      } catch (err) {
        console.error('Analysis failed:', err)
        setAnalysisStage('error')
      }
    }

    performAnalysis()
  }, [responses, user?.id, analyzeAssessment])

  // Helper function to format analysis sections
  const formatAnalysisSection = (text: string, sectionTitle: string) => {
    if (!text) return []
    
    const sections = text.split('##').filter(section => section.trim())
    const targetSection = sections.find(section => 
      section.toLowerCase().includes(sectionTitle.toLowerCase())
    )
    
    if (!targetSection) return []
    
    return targetSection
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => line.trim())
  }

  if (analysisStage === 'analyzing') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="relative">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <Loader2 className="h-6 w-6 animate-spin text-purple-600 absolute -top-1 -right-1" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">AI Analysis in Progress</h2>
              <p className="text-blue-700 text-lg">Our advanced AI is creating your personalized trading psychology profile...</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-blue-700 p-3 bg-white rounded-lg border border-blue-200">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Processing {responses.length} responses
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-blue-700 p-3 bg-white rounded-lg border border-blue-200">
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  Calculating psychological scores
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-blue-700 p-3 bg-white rounded-lg border border-blue-200">
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  Generating personality profile
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-blue-700 p-3 bg-white rounded-lg border border-blue-200">
                <span className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-600" />
                  Creating personalized recommendations
                </span>
              </div>
            </div>

            <div className="mt-8 text-sm text-blue-600">
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                This usually takes 30-60 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (analysisStage === 'error' || error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-2">Analysis Error</h2>
            <p className="text-red-700 mb-6">
              We encountered an issue analyzing your assessment. Don't worry - your responses are saved!
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
              <p className="text-sm text-red-600">
                If the problem persists, please contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!analysisResult) {
    return null
  }

  const strengths = formatAnalysisSection(analysisResult.ai_analysis || '', 'strengths')
  const growthAreas = formatAnalysisSection(analysisResult.ai_analysis || '', 'growth areas')
  const recommendations = analysisResult.recommendations || []

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white">
            <Brain className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Your Trading Psychology Profile</CardTitle>
          <CardDescription className="text-lg text-gray-700">
            AI-powered analysis of your psychological strengths and growth opportunities
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Scores Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(analysisResult.scores || {}).map(([category, score]) => (
          <Card key={category} className="text-center">
            <CardContent className="p-4">
              <div className="mb-2">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((score as number) * 100)}%
                </div>
                <Progress value={(score as number) * 100} className="h-2 mt-2" />
              </div>
              <p className="text-sm font-medium text-gray-700 capitalize">
                {category.replace('_', ' ')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personality Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Personality Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(analysisResult.personality_profile || {}).map(([trait, value]) => (
              <div key={trait} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900 capitalize mb-1">
                  {trait.replace('_', ' ')}
                </div>
                <Badge variant="outline" className="text-blue-700">
                  {value as string}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Psychological Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {analysisResult.ai_analysis || 'Analysis not available'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <ArrowRight className="h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="font-semibold">View Coaching Insights</span>
              </div>
              <span className="text-sm opacity-90">See personalized insights in your dashboard</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col items-start border-blue-300 text-blue-700 hover:bg-blue-50">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">Explore Exercises</span>
              </div>
              <span className="text-sm">Practice with interactive psychology exercises</span>
            </Button>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>Remember:</strong> You can retake this assessment in 30 days to track your psychological development and progress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
