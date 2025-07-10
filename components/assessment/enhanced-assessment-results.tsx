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

  const formatAnalysisSection = (text: string, sectionTitle: string) => {
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

  const strengths = formatAnalysisSection(analysisResult.aiAnalysis, 'strengths')
  const growthAreas = formatAnalysisSection(analysisResult.aiAnalysis, 'growth areas')
  const recommendations = formatAnalysisSection(analysisResult.aiAnalysis, 'recommendations')

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
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-green-100 text-green-800">
              Assessment #{analysisResult.retakeNumber}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              {new Date(analysisResult.assessmentDate).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Overall Psychology Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl font-bold text-gray-900">{analysisResult.scores.overall}/100</span>
            <Badge className={`text-lg px-4 py-2 ${
              analysisResult.scores.overall >= 80 ? 'bg-green-100 text-green-800' :
              analysisResult.scores.overall >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {analysisResult.scores.overall >= 80 ? 'Excellent Foundation' :
               analysisResult.scores.overall >= 60 ? 'Good Foundation' :
               'Building Foundation'}
            </Badge>
          </div>
          <Progress value={analysisResult.scores.overall} className="h-4 mb-4" />
          <p className="text-gray-600">
            Your psychological foundation for trading success. This score reflects your current mindset, habits, and emotional control.
          </p>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(analysisResult.scores).filter(([key]) => key !== 'overall').map(([category, score]) => (
          <Card key={category} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 text-sm">
                  {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <span className="font-bold text-xl">{score}</span>
              </div>
              <Progress value={score} className="h-2 mb-2" />
              <div className="text-xs text-gray-500">
                {score >= 80 ? 'Strong' : score >= 60 ? 'Good' : 'Developing'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personality Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Your Trading Personality
          </CardTitle>
          <CardDescription>
            Based on your responses, here's your unique psychological profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Risk Profile</h4>
              <Badge className="bg-blue-100 text-blue-800 capitalize text-sm px-3 py-1">
                {analysisResult.personalityProfile.riskProfile}
              </Badge>
              <p className="text-xs text-blue-700 mt-2">
                {analysisResult.personalityProfile.riskProfile === 'conservative' ? 'Prefers lower risk' :
                 analysisResult.personalityProfile.riskProfile === 'moderate' ? 'Balanced approach' :
                 'Comfortable with higher risk'}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Trading Style</h4>
              <Badge className="bg-green-100 text-green-800 capitalize text-sm px-3 py-1">
                {analysisResult.personalityProfile.tradingStyle}
              </Badge>
              <p className="text-xs text-green-700 mt-2">{analysisResult.personalityProfile.tradingStyleDescription}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">Emotional Control</h4>
              <Badge className="bg-purple-100 text-purple-800 capitalize text-sm px-3 py-1">
                {analysisResult.personalityProfile.emotionalControl}
              </Badge>
              <p className="text-xs text-purple-700 mt-2">{analysisResult.personalityProfile.emotionalControlDescription}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">Motivation</h4>
              <Badge className="bg-yellow-100 text-yellow-800 capitalize text-sm px-3 py-1">
                {analysisResult.personalityProfile.motivation}
              </Badge>
              <p className="text-xs text-yellow-700 mt-2">{analysisResult.personalityProfile.motivationDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Growth Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Star className="h-5 w-5" /> Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                {strengths.map((strength, i) => <li key={i}>{strength}</li>)}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No strengths detected in AI analysis.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <TrendingUp className="h-5 w-5" /> Growth Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {growthAreas.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                {growthAreas.map((growth, i) => <li key={i}>{growth}</li>)}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No growth areas detected in AI analysis.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="h-5 w-5" /> Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <ol className="list-decimal list-inside space-y-2 text-gray-800">
              {recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ol>
          ) : (
            <p className="text-gray-600 italic">No recommendations found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
