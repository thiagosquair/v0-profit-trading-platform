use client"

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
  AlertCircle
} from "lucide-react"
import { AccountManager } from "./account-manager"
import { PerformanceTracker } from "./performance-tracker"
import { AssessmentTools } from "./assessment-tools"
import { ProjectionTools } from "././projection-tools"
import {
  sampleAccounts,
  sampleCareerProgression,
  careerStages,
  availableAchievements,
  getTotalFunding,
  getTotalProfit,
  getAverageWinRate,
  getNextCareerStage,
  calculateProgressToNextStage
} from "@/lib/careerBuilderData"

export function FundedCareerBuilder() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Sample data - in real app this would come from API/context
  const accounts = sampleAccounts
  const careerProgression = sampleCareerProgression
  const currentStage = careerStages.find(stage => stage.id === careerProgression.currentStage)
  const nextStage = getNextCareerStage(careerProgression.currentStage)
  
  // Calculate key metrics
  const totalFunding = getTotalFunding(accounts)
  const totalProfit = getTotalProfit(accounts)
  const averageWinRate = getAverageWinRate(accounts)
  const activeAccounts = accounts.filter(acc => acc.status === "active").length
  const progressToNext = calculateProgressToNextStage(
    careerProgression.currentStage, 
    accounts, 
    careerProgression.achievements
  )

  // Recent achievements (last 3)
  const recentAchievements = careerProgression.achievements
    .filter(achievement => achievement.unlockedDate)
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Stage</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStage?.name}</div>
                <p className="text-xs text-muted-foreground">
                  {currentStage?.icon} {currentStage?.estimatedDuration}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Across {activeAccounts} active accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${totalProfit > 0 ? "+" : ""}${totalProfit.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {averageWinRate.toFixed(1)}% average win rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeAccounts}</div>
                <p className="text-xs text-muted-foreground">
                  {accounts.length} total accounts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Career Progress Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Career Progress
                </CardTitle>
                <CardDescription>
                  Your journey through the funded trading career stages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current: {currentStage?.name}</span>
                    <Badge variant="secondary">{currentStage?.icon}</Badge>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {progressToNext.toFixed(0)}% progress to {nextStage?.name || "Master Level"}
                  </p>
                </div>

                {nextStage && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Next Stage Requirements:</h4>
                    <ul className="space-y-1">
                      {nextStage.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>
                  Your latest milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.length > 0 ? (
                    recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Award className="h-3 w-3 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          {achievement.unlockedDate && (
                            <p className="text-xs text-muted-foreground">
                              Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No achievements yet. Start trading to unlock your first milestone!
                      </p>
                    </div>
                  )}
                </div>
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
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveTab("accounts")}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">Manage Accounts</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveTab("assessments")}
                >
                  <Target className="h-5 w-5" />
                  <span className="text-sm">Take Assessment</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveTab("projections")}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">View Projections</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveTab("progression")}
                >
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm">Track Progress</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recommended Next Steps
              </CardTitle>
              <CardDescription>
                Personalized recommendations to advance your career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Complete Risk Management Assessment
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Improve your risk management skills to advance to the next career stage
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      Scale Your Funded Account
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your MyForexFunds account is performing well - consider requesting a scale-up
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      Focus on Consistency
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      Maintain your current performance for 2 more months to unlock scaling opportunities
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <AccountManager />
        </TabsContent>

        <TabsContent value="progression">
          <div className="space-y-6">
            {/* Career Stages */}
            <Card>
              <CardHeader>
                <CardTitle>Career Progression Path</CardTitle>
                <CardDescription>
                  The five stages of funded trading career development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerStages.map((stage, index) => {
                    const isCompleted = careerProgression.completedStages.includes(stage.id)
                    const isCurrent = careerProgression.currentStage === stage.id
                    
                    return (
                      <div 
                        key={stage.id} 
                        className={`relative p-4 rounded-lg border ${
                          isCurrent 
                            ? "border-primary bg-primary/5" 
                            : isCompleted 
                            ? "border-green-200 bg-green-50 dark:bg-green-950/20" 
                            : "border-muted"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCurrent 
                              ? "bg-primary text-primary-foreground" 
                              : isCompleted 
                              ? "bg-green-500 text-white" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{stage.name}</h3>
                              <span className="text-lg">{stage.icon}</span>
                              {isCurrent && <Badge>Current</Badge>}
                              {isCompleted && <Badge variant="secondary">Completed</Badge>}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                            <ul className="text-xs text-mut
(Content truncated due to size limit. Use line ranges to read in chunks)
