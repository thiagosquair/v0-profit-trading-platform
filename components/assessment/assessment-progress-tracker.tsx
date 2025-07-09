"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  Target,
  Award,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react'
import { useAssessmentHistory, type ProgressComparison } from '@/hooks/useAssessmentHistory'
import { useUser } from '@/contexts/UserContext'

interface AssessmentProgressTrackerProps {
  showFullHistory?: boolean
}

export function AssessmentProgressTracker({ showFullHistory = false }: AssessmentProgressTrackerProps) {
  const { user } = useUser()
  const { 
    assessmentHistory, 
    latestAssessment, 
    progressComparison, 
    canRetakeAssessment, 
    daysUntilRetake,
    isLoading 
  } = useAssessmentHistory(user?.id || '')

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!latestAssessment) {
    return (
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-blue-900 mb-2">Start Your Psychology Journey</h3>
          <p className="text-blue-700 mb-4">
            Take your first trader assessment to begin tracking your psychological development.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Target className="mr-2 h-4 w-4" />
            Take Assessment
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp
      case 'declining': return TrendingDown
      default: return Minus
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600'
      case 'declining': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendBadgeColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'bg-green-100 text-green-800'
      case 'declining': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Current Assessment Status
          </CardTitle>
          <CardDescription>
            Assessment #{latestAssessment.retakeNumber} • {latestAssessment.assessmentDate.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Overall Score</h4>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold">{latestAssessment.overallScore}/100</span>
                {progressComparison && progressComparison.scoreChange !== 0 && (
                  <div className={`flex items-center gap-1 ${getTrendColor(progressComparison.overallTrend)}`}>
                    {React.createElement(getTrendIcon(progressComparison.overallTrend), { className: "h-4 w-4" })}
                    <span className="text-sm font-medium">
                      {progressComparison.scoreChange > 0 ? '+' : ''}{progressComparison.scoreChange}
                    </span>
                  </div>
                )}
              </div>
              <Progress value={latestAssessment.overallScore} className="h-3" />
            </div>

            <div>
              <h4 className="font-medium mb-2">Progress Trend</h4>
              {progressComparison ? (
                <div className="space-y-2">
                  <Badge className={getTrendBadgeColor(progressComparison.overallTrend)}>
                    {progressComparison.overallTrend === 'improving' ? 'Improving' :
                     progressComparison.overallTrend === 'declining' ? 'Needs Focus' : 'Stable'}
                  </Badge>
                  {progressComparison.improvements.length > 0 && (
                    <div className="text-sm text-green-700">
                      <span className="font-medium">Improved:</span> {progressComparison.improvements.join(', ')}
                    </div>
                  )}
                  {progressComparison.declines.length > 0 && (
                    <div className="text-sm text-red-700">
                      <span className="font-medium">Focus areas:</span> {progressComparison.declines.join(', ')}
                    </div>
                  )}
                </div>
              ) : (
                <Badge variant="outline">First Assessment</Badge>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Next Assessment</h4>
              {canRetakeAssessment ? (
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Available Now
                  </Badge>
                  <Button size="sm" className="w-full">
                    <Target className="mr-2 h-4 w-4" />
                    Retake Assessment
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {daysUntilRetake} days remaining
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Set Reminder
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>
            Your psychological strengths and development areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(latestAssessment.categoryScores).map(([category, score]) => {
              const previousScore = progressComparison?.previousAssessment?.categoryScores[category as keyof typeof progressComparison.previousAssessment.categoryScores];
              const change = previousScore ? score - previousScore : 0;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{score}/100</span>
                      {change !== 0 && (
                        <div className={`flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span className="text-xs">
                            {change > 0 ? '+' : ''}{change}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress value={score} className="h-2" />
                  <div className="text-xs text-gray-500">
                    {score >= 80 ? 'Strong foundation' : 
                     score >= 60 ? 'Good progress' : 
                     'Development opportunity'}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Assessment History */}
      {showFullHistory && assessmentHistory.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Assessment History
            </CardTitle>
            <CardDescription>
              Track your psychological development over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentHistory.map((assessment, index) => (
                <div key={assessment.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-sm">
                    #{assessment.retakeNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Assessment #{assessment.retakeNumber}</span>
                      <Badge variant="outline" className="text-xs">
                        {assessment.assessmentDate.toLocaleDateString()}
                      </Badge>
                      {index === 0 && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Latest</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Score: <span className="font-medium">{assessment.overallScore}/100</span></span>
                      <span>Time: {assessment.completionTimeMinutes}min</span>
                      <span>
                        Profile: {assessment.personalityProfile.riskProfile} • {assessment.personalityProfile.tradingStyle}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
