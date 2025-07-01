"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Award,
  Calendar,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Brain,
  BookOpen,
  Play,
  Star,
  Zap,
  Shield,
  TrendingDown,
  ArrowRight,
  MessageSquare,
  Settings,
  Lock,
  Unlock
} from "lucide-react"

// Types
interface CareerStage {
  id: string
  name: string
  icon: string
  description: string
  duration: string
  requirements: string[]
  skills: string[]
  unlocked: boolean
  completed: boolean
  progress: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  points: number
}

interface TradingAccount {
  id: string
  provider: string
  size: number
  status: 'active' | 'challenge' | 'failed' | 'passed'
  profit: number
  winRate: number
  riskScore: number
}

interface UserProgress {
  currentStage: string
  totalPoints: number
  completedModules: string[]
  achievements: Achievement[]
  accounts: TradingAccount[]
  assessmentScores: Record<string, number>
  lastActivity: string
}

export function FundedCareerBuilder() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentStage: "foundation",
    totalPoints: 1250,
    completedModules: ["risk-basics", "chart-analysis", "psychology-intro"],
    achievements: [],
    accounts: [
      {
        id: "1",
        provider: "FTMO",
        size: 10000,
        status: "challenge",
        profit: 850,
        winRate: 68,
        riskScore: 85
      },
      {
        id: "2", 
        provider: "MyForexFunds",
        size: 25000,
        status: "active",
        profit: 2340,
        winRate: 72,
        riskScore: 92
      }
    ],
    assessmentScores: {
      "risk-management": 85,
      "technical-analysis": 78,
      "psychology": 82
    },
    lastActivity: new Date().toISOString()
  })

  // Career stages data
  const careerStages: CareerStage[] = [
    {
      id: "foundation",
      name: "Foundation Builder",
      icon: "🎯",
      description: "Master Trading Fundamentals and Risk Management",
      duration: "0-3 months",
      requirements: [
        "Complete risk management course",
        "Pass foundation assessment (80%+)",
        "Complete 50 demo trades",
        "Maintain 2:1 risk-reward ratio"
      ],
      skills: ["Risk Management", "Chart Analysis", "Trading Psychology"],
      unlocked: true,
      completed: false,
      progress: 75
    },
    {
      id: "skill-developer",
      name: "Skill Developer", 
      icon: "📈",
      description: "Develop consistent trading strategy and discipline",
      duration: "3-6 months",
      requirements: [
        "3 months consistent profitability",
        "Develop personal trading strategy",
        "Complete advanced modules",
        "Pass skill assessment (85%+)"
      ],
      skills: ["Strategy Development", "Backtesting", "Market Analysis"],
      unlocked: true,
      completed: false,
      progress: 25
    },
    {
      id: "challenge-conqueror",
      name: "Challenge Conqueror",
      icon: "🏆",
      description: "Successfully pass funded account challenges",
      duration: "6-9 months",
      requirements: [
        "Pass funded account challenge",
        "Demonstrate risk management",
        "Show consistent performance",
        "Complete psychology modules"
      ],
      skills: ["Challenge Strategy", "Pressure Management", "Consistency"],
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      id: "funded-trader",
      name: "Funded Trader",
      icon: "💰",
      description: "Scale funded accounts and build track record",
      duration: "9-18 months", 
      requirements: [
        "Scale to $100k+ capital",
        "Maintain 6+ months profitability",
        "Complete advanced psychology",
        "Mentor junior traders"
      ],
      skills: ["Account Scaling", "Advanced Psychology", "Mentorship"],
      unlocked: false,
      completed: false,
      progress: 0
    },
    {
      id: "professional",
      name: "Professional Trader",
      icon: "👑",
      description: "Achieve financial independence through trading",
      duration: "18+ months",
      requirements: [
        "Consistent 6-figure income",
        "Multiple funded accounts",
        "Community leadership",
        "Business development"
      ],
      skills: ["Business Development", "Leadership", "Advanced Markets"],
      unlocked: false,
      completed: false,
      progress: 0
    }
  ]

  // Sample achievements
  const availableAchievements: Achievement[] = [
    {
      id: "first-profit",
      title: "First Profit",
      description: "Made your first profitable trade",
      icon: "💰",
      unlocked: true,
      unlockedDate: "2024-06-15",
      points: 100
    },
    {
      id: "risk-master",
      title: "Risk Master",
      description: "Completed risk management course with 90%+ score",
      icon: "🛡️",
      unlocked: true,
      unlockedDate: "2024-06-20",
      points: 250
    },
    {
      id: "consistent-week",
      title: "Consistent Week",
      description: "7 days of profitable trading",
      icon: "📅",
      unlocked: false,
      points: 300
    }
  ]

  const currentStage = careerStages.find(stage => stage.id === userProgress.currentStage)
  const nextStage = careerStages[careerStages.findIndex(stage => stage.id === userProgress.currentStage) + 1]

  // AI Coaching suggestions (placeholder for OpenAI integration)
  const aiSuggestions = [
    {
      type: "improvement",
      title: "Improve Risk Management",
      description: "Your recent trades show position sizes above 2% risk. Consider reducing to 1% for better consistency.",
      priority: "high",
      action: "Review position sizing calculator"
    },
    {
      type: "opportunity", 
      title: "Scale Your FTMO Challenge",
      description: "You're performing well on your $10k challenge. Consider attempting a $25k challenge next.",
      priority: "medium",
      action: "Start $25k challenge preparation"
    },
    {
      type: "learning",
      title: "Advanced Chart Patterns",
      description: "Based on your trading style, learning advanced chart patterns could improve your win rate by 15%.",
      priority: "low",
      action: "Enroll in advanced patterns course"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funded Career Builder</h1>
          <p className="text-muted-foreground mt-2">
            Your personalized journey to becoming a professional funded trader
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{userProgress.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Career Points</div>
          </div>
          <Button className="gap-2">
            <Brain className="h-4 w-4" />
            AI Coach
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">My Journey</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Current Stage Card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentStage?.icon}</div>
                  <div>
                    <CardTitle className="text-xl">{currentStage?.name}</CardTitle>
                    <CardDescription className="text-base">
                      {currentStage?.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {currentStage?.duration}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stage Progress</span>
                    <span>{currentStage?.progress}%</span>
                  </div>
                  <Progress value={currentStage?.progress} className="h-3" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Next Requirements:</h4>
                    <ul className="space-y-1">
                      {currentStage?.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Skills to Master:</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentStage?.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={() => setActiveTab("assessment")} className="gap-2">
                    <Target className="h-4 w-4" />
                    Take Assessment
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("learning")} className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Continue Learning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProgress.accounts.filter(acc => acc.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  {userProgress.accounts.length} total accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +${userProgress.accounts.reduce((sum, acc) => sum + acc.profit, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(userProgress.accounts.reduce((sum, acc) => sum + acc.winRate, 0) / userProgress.accounts.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(userProgress.accounts.reduce((sum, acc) => sum + acc.riskScore, 0) / userProgress.accounts.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Excellent risk management
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Coaching Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Coaching Suggestions
              </CardTitle>
              <CardDescription>
                Personalized recommendations to accelerate your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      suggestion.priority === 'high' 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                        : suggestion.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                      <Badge 
                        variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                        className="ml-2"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 gap-2">
                      <ArrowRight className="h-3 w-3" />
                      {suggestion.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableAchievements.filter(a => a.unlocked).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">+{achievement.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journey Tab */}
        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Trading Career Journey</CardTitle>
              <CardDescription>
                Progress through 5 stages to become a professional funded trader
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {careerStages.map((stage, index) => {
                  const isCurrent = stage.id === userProgress.currentStage
                  const isCompleted = stage.completed
                  const isLocked = !stage.unlocked

                  return (
                    <div key={stage.id} className="relative">
                      {/* Connection line */}
                      {index < careerStages.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                      )}
                      
                      <div className={`flex gap-4 p-4 rounded-lg border ${
                        isCurrent 
                          ? 'border-primary bg-primary/5' 
                          : isCompleted 
                          ? 'border-green-200 bg-green-50 dark:bg-green-950/20'
                          : isLocked
                          ? 'border-muted bg-muted/20'
                          : 'border-border'
                      }`}>
                        {/* Stage Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                          isCurrent 
                            ? 'bg-primary text-primary-foreground' 
                            : isCompleted 
                            ? 'bg-green-500 text-white'
                            : isLocked
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-background border-2 border-border'
                        }`}>
                          {isLocked ? <Lock className="h-5 w-5" /> : stage.icon}
                        </div>

                        {/* Stage Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{stage.name}</h3>
                              <p className="text-muted-foreground">{stage.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={isCurrent ? 'default' : isCompleted ? 'secondary' : 'outline'}>
                                {isCurrent ? 'Current' : isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                              </Badge>
                              <Badge variant="outline">{stage.duration}</Badge>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {!isLocked && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{stage.progress}%</span>
                              </div>
                              <Progress value={stage.progress} className="h-2" />
                            </div>
                          )}

                          {/* Requirements */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                              <ul className="space-y-1">
                                {stage.requirements.map((req, reqIndex) => (
                                  <li key={reqIndex} className="flex items-center gap-2 text-xs">
                                    <CheckCircle className={`h-3 w-3 ${
                                      isCompleted ? 'text-green-500' : 'text-muted-foreground'
                                    }`} />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Skills:</h4>
                              <div className="flex flex-wrap gap-1">
                                {stage.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {isCurrent && (
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" onClick={() => setActiveTab("learning")}>
                                Continue Learning
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setActiveTab("assessment")}>
                                Take Assessment
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Trading Skills Assessment
              </CardTitle>
              <CardDescription>
                Evaluate your current skills and get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(userProgress.assessmentScores).map(([skill, score]) => (
                  <Card key={skill}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base capitalize">
                        {skill.replace('-', ' ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current Score</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                        <Button size="sm" variant="outline" className="w-full">
                          Retake Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      AI-Powered Assessment Available
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Take our comprehensive AI assessment to get personalized learning recommendations 
                      and identify your trading strengths and weaknesses.
                    </p>
                    <Button className="mt-3" size="sm">
                      <Brain className="h-4 w-4 mr-2" />
                      Start AI Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Tab */}
        <TabsContent value="learning" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Current Learning Path
                </CardTitle>
                <CardDescription>
                  Personalized curriculum based on your stage and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Advanced Risk Management", progress: 85, status: "in-progress" },
                    { title: "Chart Pattern Recognition", progress: 100, status: "completed" },
                    { title: "Trading Psychology Mastery", progress: 60, status: "in-progress" },
                    { title: "Market Structure Analysis", progress: 0, status: "locked" }
                  ].map((module, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        module.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : module.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {module.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : 
                         module.status === 'locked' ? <Lock className="h-4 w-4" /> : 
                         <Play className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{module.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={module.progress} className="h-1 flex-1" />
                          <span className="text-xs text-muted-foreground">{module.progress}%</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={module.status === 'locked' ? 'ghost' : 'outline'}
                        disabled={module.status === 'locked'}
                      >
                        {module.status === 'completed' ? 'Review' : 
                         module.status === 'locked' ? 'Locked' : 'Continue'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Learning
                </CardTitle>
                <CardDescription>
                  Bite-sized lessons you can complete in 5-10 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Position Sizing Calculator", duration: "5 min", type: "Tool" },
                    { title: "Reading Market Sentiment", duration: "8 min", type: "Lesson" },
                    { title: "Managing Drawdowns", duration: "6 min", type: "Strategy" },
                    { title: "News Trading Basics", duration: "10 min", type: "Lesson" }
                  ].map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-medium text-sm">{lesson.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{lesson.type}</Badge>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Trading Accounts
                </CardTitle>
                <CardDescription>
                  Manage your demo and funded trading accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress.accounts.map((account) => (
                    <div key={account.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{account.provider}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${account.size.toLocaleString()} Account
                          </p>
                        </div>
                        <Badge variant={
                          account.status === 'active' ? 'default' :
                          account.status === 'challenge' ? 'secondary' :
                          account.status === 'passed' ? 'default' : 'destructive'
                        }>
                          {account.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className={`text-lg font-bold ${account.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {account.profit >= 0 ? '+' : ''}${account.profit}
                          </div>
                          <div className="text-xs text-muted-foreground">Profit</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{account.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">{account.riskScore}</div>
                          <div className="text-xs text-muted-foreground">Risk Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add New Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Practice Challenges
                </CardTitle>
                <CardDescription>
                  Simulate real trading challenges to prepare for funded accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "FTMO $10k Challenge", difficulty: "Beginner", duration: "30 days", reward: "250 points" },
                    { name: "MyForexFunds $25k", difficulty: "Intermediate", duration: "Unlimited", reward: "500 points" },
                    { name: "The5ers $50k Challenge", difficulty: "Advanced", duration: "60 days", reward: "1000 points" }
                  ].map((challenge, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{challenge.name}</h4>
                        <Badge variant="outline">{challenge.difficulty}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{challenge.duration}</span>
                        <span>Reward: {challenge.reward}</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Start Challenge
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Trading Community
                </CardTitle>
                <CardDescription>
                  Connect with other traders on their funded journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-sm text-muted-foreground">Active Traders</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-muted-foreground">Funded This Month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Success Stories</h4>
                    {[
                      { name: "Alex M.", achievement: "Passed FTMO $100k Challenge", time: "2 hours ago" },
                      { name: "Sarah K.", achievement: "Scaled to $200k funding", time: "1 day ago" },
                      { name: "Mike R.", achievement: "First month profitable", time: "3 days ago" }
                    ].map((story, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{story.name} {story.achievement}</p>
                          <p className="text-xs text-muted-foreground">{story.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Community Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Leaderboard
                </CardTitle>
                <CardDescription>
                  See how you rank among other traders this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "TraderPro", points: 2850, badge: "🥇" },
                    { rank: 2, name: "FXMaster", points: 2640, badge: "🥈" },
                    { rank: 3, name: "ChartWiz", points: 2420, badge: "🥉" },
                    { rank: 4, name: "You", points: userProgress.totalPoints, badge: "👤", isUser: true },
                    { rank: 5, name: "RiskManager", points: 1180, badge: "" }
                  ].map((trader) => (
                    <div 
                      key={trader.rank} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        trader.isUser ? 'border-2 border-primary bg-primary/5' : 'border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {trader.badge || trader.rank}
                        </div>
                        <div>
                          <p className="font-medium">{trader.name}</p>
                          <p className="text-sm text-muted-foreground">#{trader.rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{trader.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

