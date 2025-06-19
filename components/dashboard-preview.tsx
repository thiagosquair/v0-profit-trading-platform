"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Target, Award, MessageSquare, Camera, BarChart3, BookOpen, Clock, Menu } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-royal-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-navy-800 to-royal-blue-600 bg-clip-text text-transparent">
                ProFitz
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Help
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-royal-blue-800 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-navy-200">Ready to enhance your trading psychology today?</p>
              </div>
              <Brain className="h-16 w-16 text-royal-blue-300" />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-royal-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Psychology Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-royal-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-800">85/100</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exercises Completed</CardTitle>
                <Target className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-800">24</div>
                <p className="text-xs text-muted-foreground">This week</p>
                <Progress value={80} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coaching Sessions</CardTitle>
                <MessageSquare className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-800">8</div>
                <p className="text-xs text-muted-foreground">This month</p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navy-800">12</div>
                <p className="text-xs text-muted-foreground">Badges earned</p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-navy-800">Quick Actions</CardTitle>
                <CardDescription>Jump into your most used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-gradient-to-r from-royal-blue-600 to-royal-blue-700 hover:from-royal-blue-700 hover:to-royal-blue-800">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start AI Coaching Session
                </Button>
                <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
                  <Camera className="mr-2 h-4 w-4" />
                  Analyze Trading Screenshot
                </Button>
                <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
                  <Target className="mr-2 h-4 w-4" />
                  Practice Mindfulness Exercise
                </Button>
                <Button variant="outline" className="w-full justify-start border-royal-blue-200 hover:bg-royal-blue-50">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Behavioral Patterns
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-navy-800">Recent Activity</CardTitle>
                <CardDescription>Your latest psychology training activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="p-2 rounded-full bg-royal-blue-100">
                      <MessageSquare className="h-4 w-4 text-royal-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-800">AI Coach Session</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="p-2 rounded-full bg-royal-blue-100">
                      <Camera className="h-4 w-4 text-royal-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-800">Screenshot Analysis</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />5 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="p-2 rounded-full bg-royal-blue-100">
                      <Target className="h-4 w-4 text-royal-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-800">Mindfulness Exercise</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />1 day ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="p-2 rounded-full bg-royal-blue-100">
                      <BookOpen className="h-4 w-4 text-royal-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-800">Course Progress</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800">Current Goals</CardTitle>
              <CardDescription>Track your psychology development objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-navy-800">Improve Emotional Control</h4>
                    <p className="text-sm text-gray-600">Complete 5 mindfulness exercises this week</p>
                    <Progress value={80} className="mt-2 w-full" />
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    4/5
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-navy-800">Reduce Impulsive Trading</h4>
                    <p className="text-sm text-gray-600">Practice pre-trade analysis routine</p>
                    <Progress value={60} className="mt-2 w-full" />
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    3/5
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-navy-800">Build Trading Confidence</h4>
                    <p className="text-sm text-gray-600">Complete confidence-building course</p>
                    <Progress value={40} className="mt-2 w-full" />
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    2/5
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Psychology Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy-800 text-lg">Emotional State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Calm</div>
                  <p className="text-sm text-gray-600">Your current emotional state is stable</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Stress Level</span>
                      <span>Low</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-navy-800 text-lg">Risk Tolerance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Moderate</div>
                  <p className="text-sm text-gray-600">Balanced approach to risk management</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Risk Score</span>
                      <span>6/10</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-navy-800 text-lg">Focus Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">High</div>
                  <p className="text-sm text-gray-600">Excellent concentration today</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Focus Score</span>
                      <span>8/10</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
