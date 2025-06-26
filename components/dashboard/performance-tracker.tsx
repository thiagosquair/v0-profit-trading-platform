"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Award,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Users,
  Clock
} from "lucide-react"
import { sampleAccounts, sampleCareerProgression } from "@/lib/careerBuilderData"

// Sample data for charts
const monthlyPerformanceData = [
  { month: "Oct", profit: 800, accounts: 1, winRate: 68 },
  { month: "Nov", profit: 1200, accounts: 2, winRate: 72 },
  { month: "Dec", profit: 1800, accounts: 3, winRate: 65 },
]

const accountDistributionData = [
  { name: "Funded", value: 1, color: "#22c55e" },
  { name: "Challenge", value: 1, color: "#f59e0b" },
  { name: "Failed", value: 1, color: "#ef4444" },
]

const firmPerformanceData = [
  { firm: "FTMO", profit: 450, winRate: 67, accounts: 1 },
  { firm: "MyForexFunds", profit: 1800, winRate: 65, accounts: 1 },
  { firm: "The5ers", profit: -1800, winRate: 49, accounts: 1 },
]

const tradingStyleData = [
  { style: "Scalping", percentage: 30 },
  { style: "Day Trading", percentage: 50 },
  { style: "Swing Trading", percentage: 20 },
]

const riskMetricsData = [
  { metric: "Risk Management", score: 85 },
  { metric: "Consistency", score: 72 },
  { metric: "Discipline", score: 78 },
  { metric: "Psychology", score: 68 },
  { metric: "Strategy", score: 82 },
  { metric: "Execution", score: 75 },
]

const weeklyProgressData = [
  { week: "W1", challenges: 1, funded: 0, profit: 180 },
  { week: "W2", challenges: 1, funded: 1, profit: 320 },
  { week: "W3", challenges: 2, funded: 1, profit: 450 },
  { week: "W4", challenges: 1, funded: 1, profit: 650 },
]

export function PerformanceTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("3_months")
  const [selectedMetric, setSelectedMetric] = useState("profit")

  const totalProfit = sampleAccounts.reduce((sum, acc) => sum + acc.currentProfit, 0)
  const totalFunding = sampleAccounts
    .filter(acc => acc.accountType === "funded" && acc.status === "active")
    .reduce((sum, acc) => sum + acc.accountSize, 0)
  const averageWinRate = sampleAccounts.reduce((sum, acc) => sum + acc.performance.winRate, 0) / sampleAccounts.length
  const totalPayouts = sampleAccounts.reduce((sum, acc) => sum + acc.payoutReceived, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Performance Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive analytics of your funded trading journey
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1_month">1 Month</SelectItem>
              <SelectItem value="3_months">3 Months</SelectItem>
              <SelectItem value="6_months">6 Months</SelectItem>
              <SelectItem value="1_year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {sampleAccounts.filter(acc => acc.accountType === "funded").length} funded accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWinRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last payout: Dec 15, 2024
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="firms">Firms</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Profit progression over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Account Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Account Distribution</CardTitle>
                <CardDescription>Current account status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={accountDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {accountDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {accountDistributionData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Account growth and profit trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="profit" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trading Style Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Style Analysis</CardTitle>
                <CardDescription>Breakdown of your trading approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradingStyleData.map((style, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{style.style}</span>
                        <span>{style.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${style.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Account Performance Comparison</CardTitle>
                <CardDescription>Profit comparison across all accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sampleAccounts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="firmName" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="currentProfit" 
                      fill={(entry: any) => entry.currentProfit >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Account Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status Timeline</CardTitle>
                <CardDescription>Progress through different account stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleAccounts.map((account, index) => (
                    <div key={account.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {account.firmName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{account.firmName}</p>
                        <p className="text-sm text-gray-600">
                          ${account.accountSize.toLocaleString()} • Started {new Date(account.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          account.status === "active" ? "bg-green-100 text-green-800" :
                          account.status === "passed" ? "bg-blue-100 text-blue-800" :
                          account.status === "failed" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {account.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          ${account.currentProfit > 0 ? '+' : ''}{account.currentProfit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Firms Tab */}
        <TabsContent value="firms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Firm Performance Analysis</CardTitle>
              <CardDescription>Compare your performance across different prop firms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={firmPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="firm" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Psychology Tab */}
        <TabsContent value="psychology" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Psychology Assessment</CardTitle>
                <CardDescription>Your psychological trading profile</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={riskMetricsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Psychology Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Psychology Insights</CardTitle>
                <CardDescription>Key areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Excellent risk management discipline</li>
                      <li>• Strong strategy execution</li>
                      <li>• Good consistency in approach</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Emotional control during drawdowns</li>
                      <li>• Patience with trade setups</li>
                      <li>• Confidence in decision making</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Practice mindfulness exercises</li>
                      <li>• Review and journal trading decisions</li>
                      <li>• Take psychology assessment courses</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Career Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Career Milestones</CardTitle>
                <CardDescription>Your funded trading achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleCareerProgression.achievements.map((achievement, index) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlockedDate && (
                        <Badge className="bg-green-100 text-green-800">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Insights</CardTitle>
                <CardDescription>Personalized recommendations based on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Scaling Opportunity</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Your MyForexFunds account is performing well. Consider requesting a scale-up to increase your funding.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Consistency Improvement</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your win rate has improved by 5% this month. Keep following your current strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Challenge Timing</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Consider taking another challenge with FTMO. Your performance metrics suggest high success probability.
                        </p>
                      </div>
                    </div>
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

