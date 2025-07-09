"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  Target,
  Award,
  Brain,
  Zap,
  Activity,
  Users,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { useAssessmentHistory } from '@/hooks/useAssessmentHistory'
import { useUser } from '@/contexts/UserContext'

interface AssessmentAnalyticsProps {
  showComparison?: boolean
}

export function AssessmentAnalytics({ showComparison = true }: AssessmentAnalyticsProps) {
  const { user } = useUser()
  const { 
    assessmentHistory, 
    latestAssessment, 
    progressComparison,
    isLoading 
  } = useAssessmentHistory(user?.id || '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!latestAssessment) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessment Data</h3>
          <p className="text-gray-600">
            Complete your first assessment to see detailed analytics and progress tracking.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Developing'
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return ArrowUp
    if (change < 0) return ArrowDown
    return Minus
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // Calculate average completion time
  const avgCompletionTime = assessmentHistory.length > 0 
    ? Math.round(assessmentHistory.reduce((sum, a) => sum + a.completionTimeMinutes, 0) / assessmentHistory.length)
    : 0

  // Calculate consistency score (how consistent scores are across categories)
  const consistencyScore = latestAssessment ? (() => {
    const scores = Object.values(latestAssessment.categoryScores)
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)
    return Math.max(0, 100 - (standardDeviation * 2)) // Convert to 0-100 scale
  })() : 0

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(latestAssessment.overallScore)}`}>
                      {latestAssessment.overallScore}
                    </p>
                  </div>
                  <Target className={`h-8 w-8 ${getScoreColor(latestAssessment.overallScore)}`} />
                </div>
                <Badge className={`mt-2 ${getScoreBadgeColor(latestAssessment.overallScore)}`}>
                  {getScoreLabel(latestAssessment.overallScore)}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Assessments</p>
                    <p className="text-2xl font-bold text-blue-600">{assessmentHistory.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <Badge variant="outline" className="mt-2">
                  #{latestAssessment.retakeNumber} Latest
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consistency</p>
                    <p className={`text-2xl font-bold ${getScoreColor(consistencyScore)}`}>
                      {Math.round(consistencyScore)}%
                    </p>
                  </div>
                  <Activity className={`h-8 w-8 ${getScoreColor(consistencyScore)}`} />
                </div>
                <Badge className={`mt-2 ${getScoreBadgeColor(consistencyScore)}`}>
                  {consistencyScore >= 80 ? 'Balanced' : consistencyScore >= 60 ? 'Moderate' : 'Variable'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Time</p>
                    <p className="text-2xl font-bold text-purple-600">{avgCompletionTime}m</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <Badge variant="outline" className="mt-2">
                  {avgCompletionTime <= 15 ? 'Quick' : avgCompletionTime <= 25 ? 'Thoughtful' : 'Thorough'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Progress Comparison */}
          {showComparison && progressComparison && progressComparison.previousAssessment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Progress Since Last Assessment
                </CardTitle>
                <CardDescription>
                  Comparing Assessment #{progressComparison.currentAssessment.retakeNumber} with Assessment #{progressComparison.previousAssessment.retakeNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getTrendColor(progressComparison.scoreChange)}`}>
                      {progressComparison.scoreChange > 0 ? '+' : ''}{progressComparison.scoreChange}
                    </div>
                    <div className="text-sm text-gray-600">Overall Change</div>
                    <Badge className={`mt-2 ${
                      progressComparison.overallTrend === 'improving' ? 'bg-green-100 text-green-800' :
                      progressComparison.overallTrend === 'declining' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {progressComparison.overallTrend === 'improving' ? 'Improving' :
                       progressComparison.overallTrend === 'declining' ? 'Declining' : 'Stable'}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Improvements</h4>
                    {progressComparison.improvements.length > 0 ? (
                      <div className="space-y-1">
                        {progressComparison.improvements.map((area, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 mr-1 mb-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No significant improvements</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-red-900 mb-2">Focus Areas</h4>
                    {progressComparison.declines.length > 0 ? (
                      <div className="space-y-1">
                        {progressComparison.declines.map((area, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800 mr-1 mb-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No areas of concern</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {assessmentHistory.length < 2 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Trends Coming Soon</h3>
                <p className="text-gray-600">
                  Complete more assessments to see your psychological development trends over time.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Assessment Timeline</CardTitle>
                <CardDescription>
                  Your psychological development journey over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentHistory.map((assessment, index) => {
                    const isLatest = index === 0
                    const previousAssessment = assessmentHistory[index + 1]
                    const scoreChange = previousAssessment 
                      ? assessment.overallScore - previousAssessment.overallScore 
                      : 0

                    return (
                      <div key={assessment.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                        isLatest ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                          isLatest ? 'bg-blue-600' : 'bg-gray-400'
                        }`}>
                          #{assessment.retakeNumber}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {assessment.assessmentDate.toLocaleDateString()}
                            </span>
                            {isLatest && (
                              <Badge className="bg-blue-100 text-blue-800">Latest</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Score: <span className="font-medium">{assessment.overallScore}/100</span></span>
                            <span>Time: {assessment.completionTimeMinutes}min</span>
                            {scoreChange !== 0 && (
                              <div className={`flex items-center gap-1 ${getTrendColor(scoreChange)}`}>
                                {React.createElement(getTrendIcon(scoreChange), { className: "h-3 w-3" })}
                                <span>{scoreChange > 0 ? '+' : ''}{scoreChange}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(assessment.overallScore)}`}>
                            {assessment.overallScore}
                          </div>
                          <Badge className={`${getScoreBadgeColor(assessment.overallScore)} text-xs`}>
                            {getScoreLabel(assessment.overallScore)}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of your psychological strengths and development areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(latestAssessment.categoryScores).map(([category, score]) => {
                  const previousScore = progressComparison?.previousAssessment?.categoryScores[category as keyof typeof progressComparison.previousAssessment.categoryScores]
                  const change = previousScore ? score - previousScore : 0
                  
                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h4>
                        <div className="flex items-center gap-3">
                          {change !== 0 && (
                            <div className={`flex items-center gap-1 ${getTrendColor(change)}`}>
                              {React.createElement(getTrendIcon(change), { className: "h-4 w-4" })}
                              <span className="text-sm font-medium">
                                {change > 0 ? '+' : ''}{change}
                              </span>
                            </div>
                          )}
                          <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                            {score}/100
                          </span>
                        </div>
                      </div>
                      <Progress value={score} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <Badge className={getScoreBadgeColor(score)}>
                          {getScoreLabel(score)}
                        </Badge>
                        <span className="text-gray-500">
                          {score >= 80 ? 'Strong foundation for trading success' :
                           score >= 60 ? 'Good progress with room for growth' :
                           'Key development opportunity'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Personality Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900 mb-1">Risk Profile</div>
                    <Badge className="bg-blue-100 text-blue-800 capitalize">
                      {latestAssessment.personalityProfile.riskProfile}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900 mb-1">Trading Style</div>
                    <Badge className="bg-green-100 text-green-800 capitalize">
                      {latestAssessment.personalityProfile.tradingStyle}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-900 mb-1">Emotional Type</div>
                    <Badge className="bg-purple-100 text-purple-800 capitalize">
                      {latestAssessment.personalityProfile.emotionalType}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-900 mb-1">Learning Style</div>
                    <Badge className="bg-orange-100 text-orange-800 capitalize">
                      {latestAssessment.personalityProfile.learningStyle}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Strongest Area</span>
                    <span className="font-medium">
                      {Object.entries(latestAssessment.categoryScores)
                        .reduce((max, [category, score]) => score > max.score ? { category, score } : max, { category: '', score: 0 })
                        .category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Focus</span>
                    <span className="font-medium">
                      {Object.entries(latestAssessment.categoryScores)
                        .reduce((min, [category, score]) => score < min.score ? { category, score } : min, { category: '', score: 100 })
                        .category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assessment Date</span>
                    <span className="font-medium">
                      {latestAssessment.assessmentDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion Time</span>
                    <span className="font-medium">{latestAssessment.completionTimeMinutes} minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
