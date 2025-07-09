"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  MessageSquare,
  BookOpen,
  Activity,
  Zap,
  Award,
  Eye,
  Archive
} from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

interface CoachingInsight {
  id: string
  title: string
  content: string
  type: string
  category: string
  priority: number
  isRead: boolean
  isArchived: boolean
  createdAt: Date
  assessmentId?: string
}

interface AssessmentProgress {
  id: string
  assessmentDate: Date
  overallScore: number
  categoryScores: {
    tradingPsychology: number
    behavioralPatterns: number
    marketMindset: number
    tradingHabits: number
    goalOrientation: number
  }
  personalityProfile: {
    riskProfile: string
    tradingStyle: string
    emotionalType: string
    learningStyle: string
  }
  retakeNumber: number
}

export function EnhancedCoachingInsights() {
  const { user } = useUser()
  const [insights, setInsights] = useState<CoachingInsight[]>([])
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('insights')

  // Mock data for demonstration - replace with real API calls
  useEffect(() => {
    const mockInsights: CoachingInsight[] = [
      {
        id: '1',
        title: 'Strengthen Your Trading Psychology Foundation',
        content: 'Your recent assessment reveals opportunities to build stronger psychological foundations for trading. Focus on developing emotional control and decision-making frameworks through daily mindfulness practices.',
        type: 'assessment_result',
        category: 'trading_psychology',
        priority: 1,
        isRead: false,
        isArchived: false,
        createdAt: new Date(),
        assessmentId: 'assessment-1'
      },
      {
        id: '2',
        title: 'Leverage Your Analytical Strength',
        content: 'Your analytical trading style is a significant advantage. Consider developing systematic approaches to market analysis and creating detailed trading plans that leverage this strength.',
        type: 'strength_leverage',
        category: 'market_mindset',
        priority: 2,
        isRead: false,
        isArchived: false,
        createdAt: new Date(Date.now() - 86400000),
        assessmentId: 'assessment-1'
      },
      {
        id: '3',
        title: 'Weekly Progress Check-in',
        content: 'It\'s been a week since your assessment. How are you progressing with the recommended mindfulness exercises? Consider tracking your emotional responses during trading sessions.',
        type: 'progress_update',
        category: 'behavioral_patterns',
        priority: 2,
        isRead: true,
        isArchived: false,
        createdAt: new Date(Date.now() - 172800000)
      }
    ]

    const mockAssessmentHistory: AssessmentProgress[] = [
      {
        id: 'assessment-1',
        assessmentDate: new Date(),
        overallScore: 78,
        categoryScores: {
          tradingPsychology: 82,
          behavioralPatterns: 75,
          marketMindset: 80,
          tradingHabits: 73,
          goalOrientation: 85
        },
        personalityProfile: {
          riskProfile: 'moderate',
          tradingStyle: 'analytical',
          emotionalType: 'adaptive',
          learningStyle: 'practical'
        },
        retakeNumber: 1
      }
    ]

    setInsights(mockInsights)
    setAssessmentHistory(mockAssessmentHistory)
    setLoading(false)
  }, [])

  const markAsRead = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, isRead: true } : insight
    ))
  }

  const archiveInsight = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, isArchived: true } : insight
    ))
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800 border-red-200'
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 3: return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'High Priority'
      case 2: return 'Medium Priority'
      case 3: return 'Low Priority'
      default: return 'Normal'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assessment_result': return Brain
      case 'strength_leverage': return Star
      case 'progress_update': return TrendingUp
      case 'recommendation': return Lightbulb
      default: return MessageSquare
    }
  }

  const activeInsights = insights.filter(insight => !insight.isArchived)
  const unreadCount = activeInsights.filter(insight => !insight.isRead).length

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coaching Insights</h1>
          <p className="text-gray-600 mt-1">
            Personalized guidance based on your trading psychology assessment
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge className="bg-blue-100 text-blue-800">
              {unreadCount} new insight{unreadCount !== 1 ? 's' : ''}
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Check-in
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Insights ({activeInsights.length})
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Actions
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {activeInsights.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No insights yet</h3>
                <p className="text-gray-600 mb-4">
                  Complete your trader assessment to receive personalized coaching insights.
                </p>
                <Button>
                  <Brain className="mr-2 h-4 w-4" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeInsights.map((insight) => {
                const IconComponent = getTypeIcon(insight.type)
                return (
                  <Card key={insight.id} className={`transition-all hover:shadow-md ${
                    !insight.isRead ? 'border-blue-200 bg-blue-50' : ''
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            insight.priority === 1 ? 'bg-red-100' :
                            insight.priority === 2 ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            <IconComponent className={`h-5 w-5 ${
                              insight.priority === 1 ? 'text-red-600' :
                              insight.priority === 2 ? 'text-yellow-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{insight.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                                {getPriorityLabel(insight.priority)}
                              </Badge>
                              <Badge variant="outline">
                                {insight.category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {insight.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {!insight.isRead && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{insight.content}</p>
                      <div className="flex items-center gap-2">
                        {!insight.isRead && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsRead(insight.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Learn More
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => archiveInsight(insight.id)}
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {assessmentHistory.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data yet</h3>
                <p className="text-gray-600 mb-4">
                  Take multiple assessments to track your psychological development over time.
                </p>
                <Button>
                  <Brain className="mr-2 h-4 w-4" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Latest Assessment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Latest Assessment Results
                  </CardTitle>
                  <CardDescription>
                    Completed on {assessmentHistory[0].assessmentDate.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Overall Score</h4>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold">{assessmentHistory[0].overallScore}/100</span>
                        <Badge className="bg-green-100 text-green-800">
                          Strong Foundation
                        </Badge>
                      </div>
                      <Progress value={assessmentHistory[0].overallScore} className="h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Personality Profile</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-center">
                          {assessmentHistory[0].personalityProfile.riskProfile} risk
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          {assessmentHistory[0].personalityProfile.tradingStyle} style
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          {assessmentHistory[0].personalityProfile.emotionalType} emotional
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          {assessmentHistory[0].personalityProfile.learningStyle} learning
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(assessmentHistory[0].categoryScores).map(([category, score]) => (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">
                            {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="font-bold">{score}/100</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Assessment */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">Next Assessment</h3>
                  </div>
                  <p className="text-blue-800 mb-4">
                    Track your progress by retaking the assessment in 30 days. Compare your growth and see how your psychological profile evolves.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      Available in 29 days
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Recommended Actions
              </CardTitle>
              <CardDescription>
                Based on your assessment results, here are specific actions to improve your trading psychology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-900 mb-1">Develop a Pre-Market Routine</h4>
                    <p className="text-yellow-800 text-sm mb-3">
                      Create a structured 15-30 minute routine before each trading session to center yourself and review your plan.
                    </p>
                    <Button size="sm" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Exercise
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-1">Practice Mindfulness Techniques</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Incorporate 5-10 minutes of mindfulness or breathing exercises into your daily routine to improve emotional control.
                    </p>
                    <Button size="sm" variant="outline">
                      <Activity className="mr-2 h-4 w-4" />
                      Start Exercise
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900 mb-1">Maintain a Trading Journal</h4>
                    <p className="text-green-800 text-sm mb-3">
                      Document not just your trades, but your emotional state and decision-making process for each trade.
                    </p>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Open Journal
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
              <CardDescription>
                Track your psychological development over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assessmentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No assessment history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assessmentHistory.map((assessment, index) => (
                    <div key={assessment.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold">
                        #{assessment.retakeNumber}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Assessment #{assessment.retakeNumber}</span>
                          <Badge variant="outline">
                            {assessment.assessmentDate.toLocaleDateString()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Overall Score: <span className="font-medium">{assessment.overallScore}/100</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Profile: {assessment.personalityProfile.riskProfile} • {assessment.personalityProfile.tradingStyle}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
