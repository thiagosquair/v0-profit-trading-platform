"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  Unlock,
  Plus,
  Edit,
  Eye,
  FileText,
  Calculator,
  PieChart,
  LineChart
} from "lucide-react"

// Import sub-components (these should exist in your project)
import { AccountManager } from "./account-manager"
import { PerformanceTracker } from "./performance-tracker"
import { AssessmentTools } from "./assessment-tools"
import { ProjectionTools } from "./projection-tools"

// Sample data - replace with real data from your backend
const sampleCareerStages = [
  {
    id: "novice",
    name: "Novice Trader",
    description: "Learning the fundamentals of trading",
    progress: 85,
    requirements: ["Complete basic education", "Pass foundation quiz", "Demo trading for 30 days"],
    benefits: ["Access to basic courses", "Demo account", "Community access"],
    unlocked: true,
    current: true
  },
  {
    id: "developing",
    name: "Developing Trader", 
    description: "Building consistent strategies",
    progress: 45,
    requirements: ["3 months profitable demo", "Pass intermediate assessment", "Risk management certification"],
    benefits: ["Advanced courses", "Strategy backtesting", "Mentor access"],
    unlocked: true,
    current: false
  },
  {
    id: "competent",
    name: "Competent Trader",
    description: "Ready for funded challenges",
    progress: 0,
    requirements: ["Pass funded challenge", "6 months consistency", "Psychology certification"],
    benefits: ["Challenge preparation", "Live account access", "Advanced analytics"],
    unlocked: false,
    current: false
  },
  {
    id: "proficient",
    name: "Proficient Trader",
    description: "Managing funded accounts",
    progress: 0,
    requirements: ["Scale to $100k+", "Maintain 6+ months", "Mentor others"],
    benefits: ["Multiple accounts", "Scaling programs", "Revenue sharing"],
    unlocked: false,
    current: false
  },
  {
    id: "master",
    name: "Master Trader",
    description: "Professional trading career",
    progress: 0,
    requirements: ["Consistent 6-figure income", "Community leadership", "Business development"],
    benefits: ["Unlimited scaling", "Partnership opportunities", "Teaching programs"],
    unlocked: false,
    current: false
  }
]

const sampleAccounts = [
  {
    id: "1",
    provider: "FTMO",
    size: 10000,
    status: "Challenge" as const,
    profit: 850,
    winRate: 68,
    riskScore: 85,
    daysLeft: 12
  },
  {
    id: "2",
    provider: "MyForexFunds", 
    size: 25000,
    status: "Funded" as const,
    profit: 2340,
    winRate: 72,
    riskScore: 92,
    daysLeft: null
  }
]

const sampleAchievements = [
  {
    id: "1",
    title: "First Profit",
    description: "Made your first profitable trade",
    icon: "💰",
    unlocked: true,
    date: "2024-06-15",
    points: 100
  },
  {
    id: "2", 
    title: "Risk Master",
    description: "Completed risk management with 90%+ score",
    icon: "🛡️",
    unlocked: true,
    date: "2024-06-20", 
    points: 250
  },
  {
    id: "3",
    title: "Consistent Week",
    description: "7 days of profitable trading",
    icon: "📅",
    unlocked: false,
    date: null,
    points: 300
  }
]

export function FundedCareerBuilder() {
  const [activeTab, setActiveTab] = useState("overview")
  const [programStarted, setProgramStarted] = useState(false)

  // Calculate key metrics
  const totalFunding = sampleAccounts.reduce((sum, acc) => sum + acc.size, 0)
  const totalProfit = sampleAccounts.reduce((sum, acc) => sum + acc.profit, 0)
  const avgWinRate = Math.round(sampleAccounts.reduce((sum, acc) => sum + acc.winRate, 0) / sampleAccounts.length)
  const avgRiskScore = Math.round(sampleAccounts.reduce((sum, acc) => sum + acc.riskScore, 0) / sampleAccounts.length)
  const totalPoints = sampleAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)

  const currentStage = sampleCareerStages.find(stage => stage.current)
  const nextStage = sampleCareerStages[sampleCareerStages.findIndex(stage => stage.current) + 1]

  const handleStartProgram = () => {
    setProgramStarted(true)
    // Add logic to initialize user's career program
    // This could involve API calls to set up user progress, etc.
  }

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
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Career Points</div>
          </div>
          <Button className="gap-2">
            <Brain className="h-4 w-4" />
            AI Coach
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Program Introduction */}
          {!programStarted && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Funded Career Builder Program</CardTitle>
                <CardDescription className="text-base">
                  Your path to becoming a professional funded trader. Follow the steps below to achieve your goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This program is designed to guide you through the necessary stages to acquire a funded trading account. 
                  Each step is crucial for developing the skills and discipline required for professional trading.
                </p>
                <Button onClick={handleStartProgram} size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  Start Program
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Current Stage Progress */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{currentStage?.name}</CardTitle>
                  <CardDescription className="text-base">
                    {currentStage?.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Current Stage
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
                    <h4 className="font-medium mb-2">Stage Benefits:</h4>
                    <ul className="space-y-1">
                      {currentStage?.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={() => setActiveTab("assessments")} className="gap-2">
                    <Target className="h-4 w-4" />
                    Take Assessment
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("progression")} className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Journey
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {sampleAccounts.length} accounts
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
                  +${totalProfit.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgWinRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Average across accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{avgRiskScore}</div>
                <p className="text-xs text-muted-foreground">
                  Excellent management
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to advance your trading career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2" onClick={() => setActiveTab("accounts")}>
                  <Plus className="h-5 w-5" />
                  <span className="text-sm">Add Account</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2" onClick={() => setActiveTab("assessments")}>
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Take Assessment</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2" onClick={() => setActiveTab("projections")}>
                  <Calculator className="h-5 w-5" />
                  <span className="text-sm">Plan Career</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">AI Coaching</span>
                </Button>
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
                {sampleAchievements.filter(a => a.unlocked).map((achievement) => (
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

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <AccountManager />
        </TabsContent>

        {/* Progression Tab */}
        <TabsContent value="progression" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Progression Path</CardTitle>
              <CardDescription>
                Your journey through the 5 stages of funded trading mastery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleCareerStages.map((stage, index) => {
                  const isCurrent = stage.current
                  const isUnlocked = stage.unlocked
                  const isCompleted = stage.progress === 100

                  return (
                    <div key={stage.id} className="relative">
                      {/* Connection line */}
                      {index < sampleCareerStages.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-16 bg-border" />
                      )}
                      
                      <div className={`flex gap-4 p-6 rounded-lg border ${
                        isCurrent 
                          ? 'border-primary bg-primary/5' 
                          : isCompleted 
                          ? 'border-green-200 bg-green-50 dark:bg-green-950/20'
                          : !isUnlocked
                          ? 'border-muted bg-muted/20'
                          : 'border-border'
                      }`}>
                        {/* Stage Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          isCurrent 
                            ? 'bg-primary text-primary-foreground' 
                            : isCompleted 
                            ? 'bg-green-500 text-white'
                            : !isUnlocked
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-background border-2 border-border'
                        }`}>
                          {!isUnlocked ? <Lock className="h-5 w-5" /> : index + 1}
                        </div>

                        {/* Stage Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-xl">{stage.name}</h3>
                              <p className="text-muted-foreground">{stage.description}</p>
                            </div>
                            <Badge variant={isCurrent ? 'default' : isCompleted ? 'secondary' : 'outline'}>
                              {isCurrent ? 'Current' : isCompleted ? 'Completed' : !isUnlocked ? 'Locked' : 'Available'}
                            </Badge>
                          </div>

                          {/* Progress Bar */}
                          {isUnlocked && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{stage.progress}%</span>
                              </div>
                              <Progress value={stage.progress} className="h-2" />
                            </div>
                          )}

                          {/* Requirements and Benefits */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                              <ul className="space-y-1">
                                {stage.requirements.map((req, reqIndex) => (
                                  <li key={reqIndex} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className={`h-3 w-3 ${
                                      isCompleted ? 'text-green-500' : 'text-muted-foreground'
                                    }`} />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                              <ul className="space-y-1">
                                {stage.benefits.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {isCurrent && (
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" onClick={() => setActiveTab("assessments")}>
                                Take Assessment
                              </Button>
                              <Button size="sm" variant="outline">
                                View Requirements
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

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <AssessmentTools />
        </TabsContent>

        {/* Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <ProjectionTools />
        </TabsContent>
      </Tabs>
    </div>
  )
}

