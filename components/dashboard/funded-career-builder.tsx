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
import { FeatureGate } from "@/components/FeatureGate"
import { useUser } from "@/contexts/UserContext"

// Import sub-components (these should exist in your project)
import { AccountManager } from "./account-manager"
import { PerformanceTracker } from "./performance-tracker"
import { AssessmentTools } from "./assessment-tools"
import { ProjectionTools } from "./projection-tools"

// Sample data - replace with real data from your backend
const sampleCareerStages = [
  {
    id: 1,
    name: "Novice Trader",
    description: "Learning the fundamentals of prop firm trading",
    requirements: ["Complete basic trading course", "Pass demo account challenge", "Understand risk management"],
    benefits: ["Access to $10K demo accounts", "Basic educational resources", "Community support"],
    progress: 100,
    isUnlocked: true,
    isCompleted: true
  },
  {
    id: 2,
    name: "Challenge Candidate",
    description: "Ready to take on prop firm challenges",
    requirements: ["Maintain 80%+ win rate for 30 days", "Complete psychology assessment", "Demonstrate consistent strategy"],
    benefits: ["Access to $25K-$50K challenges", "Advanced risk tools", "Mentor guidance"],
    progress: 75,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 3,
    name: "Funded Trader",
    description: "Successfully passed challenges and received funding",
    requirements: ["Pass prop firm challenge", "Meet profit targets", "Maintain drawdown limits"],
    benefits: ["Live funded accounts", "Profit sharing", "Scaling opportunities"],
    progress: 30,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 4,
    name: "Scaling Trader",
    description: "Growing account sizes and maximizing profits",
    requirements: ["Consistent profitability", "Multiple account management", "Advanced risk control"],
    benefits: ["$100K+ accounts", "Higher profit splits", "VIP support"],
    progress: 0,
    isUnlocked: false,
    isCompleted: false
  },
  {
    id: 5,
    name: "Master Trader",
    description: "Elite level with maximum funding and benefits",
    requirements: ["Proven track record", "Mentor other traders", "Exceptional performance"],
    benefits: ["$500K+ accounts", "90% profit splits", "Partnership opportunities"],
    progress: 0,
    isUnlocked: false,
    isCompleted: false
  }
]

const sampleAccounts = [
  {
    id: 1,
    firm: "FTMO",
    accountSize: "$100,000",
    status: "Challenge",
    progress: 65,
    currentBalance: "$104,500",
    profitTarget: "$110,000",
    maxDrawdown: "$90,000",
    tradingDays: 12,
    daysRemaining: 18
  },
  {
    id: 2,
    firm: "MyForexFunds",
    accountSize: "$25,000",
    status: "Funded",
    progress: 85,
    currentBalance: "$27,800",
    profitTarget: "$26,250",
    maxDrawdown: "$22,500",
    tradingDays: 45,
    monthlyPayout: "$1,200"
  },
  {
    id: 3,
    firm: "The5ers",
    accountSize: "$50,000",
    status: "Failed",
    progress: 0,
    currentBalance: "$44,200",
    profitTarget: "$54,000",
    maxDrawdown: "$47,500",
    tradingDays: 8,
    failureReason: "Max drawdown exceeded"
  }
]

const sampleAchievements = [
  { id: 1, title: "First Challenge", description: "Completed your first prop firm challenge", icon: Trophy, earned: true, date: "2024-01-15" },
  { id: 2, title: "Consistent Trader", description: "30 consecutive profitable days", icon: Calendar, earned: true, date: "2024-02-01" },
  { id: 3, title: "Risk Master", description: "Never exceeded 2% daily loss for 60 days", icon: Shield, earned: true, date: "2024-02-15" },
  { id: 4, title: "Profit Hunter", description: "Achieved 10% profit in a single month", icon: Target, earned: false, date: null },
  { id: 5, title: "Multi-Account Manager", description: "Successfully manage 3+ funded accounts", icon: Users, earned: false, date: null },
  { id: 6, title: "Scaling Success", description: "Scaled to $100K+ account size", icon: TrendingUp, earned: false, date: null }
]

export function FundedCareerBuilder() {
  const { hasFeature } = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedStage, setSelectedStage] = useState(2)

  // Check if user has access to funded career builder (Elite only)
  const hasAccess = hasFeature('funded_career_builder')

  // Calculate overall metrics
  const totalFunding = sampleAccounts
    .filter(acc => acc.status === "Funded" || acc.status === "Challenge")
    .reduce((sum, acc) => sum + parseInt(acc.accountSize.replace(/[$,]/g, "")), 0)

  const totalProfit = sampleAccounts
    .filter(acc => acc.status === "Funded")
    .reduce((sum, acc) => {
      const current = parseInt(acc.currentBalance.replace(/[$,]/g, ""))
      const initial = parseInt(acc.accountSize.replace(/[$,]/g, ""))
      return sum + (current - initial)
    }, 0)

  const activeAccounts = sampleAccounts.filter(acc => acc.status === "Funded" || acc.status === "Challenge").length
  const completedAchievements = sampleAchievements.filter(ach => ach.earned).length

  // Main component content
  const mainContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funded Career Builder</h1>
          <p className="text-gray-600 mt-1">Your complete journey to prop firm funding success</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Elite Feature
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Funding</p>
                    <p className="text-2xl font-bold text-gray-900">${totalFunding.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Profit</p>
                    <p className="text-2xl font-bold text-gray-900">${totalProfit.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                    <p className="text-2xl font-bold text-gray-900">{activeAccounts}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold text-gray-900">{completedAchievements}/{sampleAchievements.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Stage Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Stage Progress
              </CardTitle>
              <CardDescription>
                Track your progress through the funded trading career path
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{sampleCareerStages[selectedStage - 1].name}</h3>
                    <p className="text-gray-600">{sampleCareerStages[selectedStage - 1].description}</p>
                  </div>
                  <Badge variant={sampleCareerStages[selectedStage - 1].isCompleted ? "default" : "secondary"}>
                    {sampleCareerStages[selectedStage - 1].progress}% Complete
                  </Badge>
                </div>
                <Progress value={sampleCareerStages[selectedStage - 1].progress} className="w-full" />
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {sampleCareerStages[selectedStage - 1].requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {sampleCareerStages[selectedStage - 1].benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("accounts")}>
                  <Plus className="h-5 w-5" />
                  Add Account
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("assessments")}>
                  <Brain className="h-5 w-5" />
                  Take Assessment
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("projections")}>
                  <Calculator className="h-5 w-5" />
                  Plan Career
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Coaching
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
                {sampleAchievements.filter(ach => ach.earned).slice(0, 3).map((achievement) => {
                  const IconComponent = achievement.icon
                  return (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="p-2 bg-green-100 rounded-full">
                        <IconComponent className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">{achievement.title}</h4>
                        <p className="text-sm text-green-600">{achievement.description}</p>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        {achievement.date}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <AccountManager />
        </TabsContent>

        <TabsContent value="progression" className="space-y-6">
          {/* Career Path Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Career Progression Path
              </CardTitle>
              <CardDescription>
                Your journey from novice to master trader
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleCareerStages.map((stage, index) => (
                  <div key={stage.id} className="relative">
                    {index < sampleCareerStages.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedStage === stage.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : stage.isUnlocked 
                        ? 'border-gray-200 hover:border-gray-300' 
                        : 'border-gray-100 bg-gray-50'
                    }`} onClick={() => stage.isUnlocked && setSelectedStage(stage.id)}>
                      <div className={`p-3 rounded-full ${
                        stage.isCompleted 
                          ? 'bg-green-500 text-white' 
                          : stage.isUnlocked 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        {stage.isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : stage.isUnlocked ? (
                          <Unlock className="h-6 w-6" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${stage.isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {stage.name}
                          </h3>
                          <Badge variant={stage.isCompleted ? "default" : stage.isUnlocked ? "secondary" : "outline"}>
                            {stage.progress}%
                          </Badge>
                        </div>
                        <p className={`text-sm mb-3 ${stage.isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {stage.description}
                        </p>
                        {stage.isUnlocked && (
                          <Progress value={stage.progress} className="w-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievement Gallery
              </CardTitle>
              <CardDescription>
                Unlock achievements as you progress through your funded trading career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleAchievements.map((achievement) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card key={achievement.id} className={`p-4 ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          achievement.earned 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            achievement.earned ? 'text-green-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h4>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600">{achievement.date}</p>
                          )}
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <AssessmentTools />
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <ProjectionTools />
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <FeatureGate 
      feature="funded_career_builder"
      upgradeMessage="Build your complete funded trading career with our comprehensive planning system. Track challenges, manage multiple accounts, and scale to elite trader status with AI-powered guidance."
    >
      {mainContent}
    </FeatureGate>
  )
}

