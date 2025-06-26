"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  AreaChart,
  Area
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  Calculator,
  Zap,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download
} from "lucide-react"

interface ProjectionInputs {
  currentFunding: number
  monthlyGrowthRate: number
  targetMonthlyIncome: number
  riskLevel: "conservative" | "moderate" | "aggressive"
  timeframe: "6_months" | "1_year" | "2_years" | "5_years"
  averageWinRate: number
  averageRiskReward: number
  tradingDaysPerMonth: number
}

interface ProjectionResult {
  month: number
  accounts: number
  totalFunding: number
  monthlyIncome: number
  cumulativeProfit: number
  probability: number
}

interface Scenario {
  name: "conservative" | "realistic" | "optimistic"
  label: string
  color: string
  multiplier: number
  description: string
}

const scenarios: Scenario[] = [
  {
    name: "conservative",
    label: "Conservative",
    color: "#ef4444",
    multiplier: 0.7,
    description: "Lower growth, higher probability of success"
  },
  {
    name: "realistic",
    label: "Realistic",
    color: "#3b82f6",
    multiplier: 1.0,
    description: "Balanced growth based on current performance"
  },
  {
    name: "optimistic",
    label: "Optimistic",
    color: "#22c55e",
    multiplier: 1.4,
    description: "Higher growth, requires consistent performance"
  }
]

export function ProjectionTools() {
  const [inputs, setInputs] = useState<ProjectionInputs>({
    currentFunding: 25000,
    monthlyGrowthRate: 15,
    targetMonthlyIncome: 5000,
    riskLevel: "moderate",
    timeframe: "1_year",
    averageWinRate: 65,
    averageRiskReward: 1.8,
    tradingDaysPerMonth: 20
  })

  const [selectedScenario, setSelectedScenario] = useState<Scenario["name"]>("realistic")

  const updateInput = (key: keyof ProjectionInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const calculateProjections = (): ProjectionResult[] => {
    const months = inputs.timeframe === "6_months" ? 6 : 
                   inputs.timeframe === "1_year" ? 12 : 
                   inputs.timeframe === "2_years" ? 24 : 60

    const scenario = scenarios.find(s => s.name === selectedScenario)!
    const adjustedGrowthRate = (inputs.monthlyGrowthRate / 100) * scenario.multiplier

    const results: ProjectionResult[] = []
    let currentFunding = inputs.currentFunding
    let currentAccounts = 1

    for (let month = 1; month <= months; month++) {
      // Account growth logic
      if (month % 3 === 0 && currentFunding >= 10000) {
        currentAccounts += Math.floor(currentFunding / 50000) + 1
      }

      // Funding growth
      currentFunding *= (1 + adjustedGrowthRate)

      // Monthly income calculation (simplified)
      const profitSplit = 0.8
      const monthlyReturn = adjustedGrowthRate * 0.6 // Conservative monthly return
      const monthlyIncome = currentFunding * monthlyReturn * profitSplit

      // Cumulative profit
      const cumulativeProfit = currentFunding - inputs.currentFunding

      // Success probability (decreases over time for optimistic scenarios)
      const baseProbability = scenario.name === "conservative" ? 85 : 
                             scenario.name === "realistic" ? 70 : 55
      const probability = Math.max(30, baseProbability - (month * 2))

      results.push({
        month,
        accounts: currentAccounts,
        totalFunding: Math.round(currentFunding),
        monthlyIncome: Math.round(monthlyIncome),
        cumulativeProfit: Math.round(cumulativeProfit),
        probability
      })
    }

    return results
  }

  const projections = calculateProjections()
  const finalProjection = projections[projections.length - 1]

  const milestoneData = [
    {
      milestone: "First $1K/month",
      timeframe: "3-6 months",
      probability: 75,
      requirements: ["Maintain 60%+ win rate", "Pass 2+ challenges", "Consistent risk management"]
    },
    {
      milestone: "First $5K/month",
      timeframe: "6-12 months",
      probability: 60,
      requirements: ["Scale to $100K+ funding", "Multiple funded accounts", "Advanced strategy"]
    },
    {
      milestone: "First $10K/month",
      timeframe: "12-18 months",
      probability: 40,
      requirements: ["$250K+ total funding", "Elite performance metrics", "Scaling expertise"]
    },
    {
      milestone: "Financial Freedom",
      timeframe: "18-36 months",
      probability: 25,
      requirements: ["$500K+ funding", "Consistent 6-figure income", "Master trader status"]
    }
  ]

  const riskFactors = [
    {
      factor: "Market Volatility",
      impact: "High",
      mitigation: "Diversify trading strategies and timeframes"
    },
    {
      factor: "Prop Firm Changes",
      impact: "Medium",
      mitigation: "Work with multiple reputable firms"
    },
    {
      factor: "Performance Consistency",
      impact: "High",
      mitigation: "Focus on psychology and risk management"
    },
    {
      factor: "Rule Violations",
      impact: "Critical",
      mitigation: "Strict adherence to firm rules and guidelines"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Projections
          </h1>
          <p className="text-gray-600 mt-2">
            Plan your funded trading career with data-driven projections
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Projection Settings
            </CardTitle>
            <CardDescription>Adjust parameters to customize your projections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Current Total Funding</Label>
              <Input
                type="number"
                value={inputs.currentFunding}
                onChange={(e) => updateInput("currentFunding", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Target Monthly Income</Label>
              <Input
                type="number"
                value={inputs.targetMonthlyIncome}
                onChange={(e) => updateInput("targetMonthlyIncome", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Growth Rate (%)</Label>
              <Slider
                value={[inputs.monthlyGrowthRate]}
                onValueChange={(value) => updateInput("monthlyGrowthRate", value[0])}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{inputs.monthlyGrowthRate}% per month</div>
            </div>

            <div className="space-y-2">
              <Label>Average Win Rate (%)</Label>
              <Slider
                value={[inputs.averageWinRate]}
                onValueChange={(value) => updateInput("averageWinRate", value[0])}
                max={90}
                min={40}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{inputs.averageWinRate}%</div>
            </div>

            <div className="space-y-2">
              <Label>Risk-Reward Ratio</Label>
              <Slider
                value={[inputs.averageRiskReward * 10]}
                onValueChange={(value) => updateInput("averageRiskReward", value[0] / 10)}
                max={50}
                min={10}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-600">1:{inputs.averageRiskReward.toFixed(1)}</div>
            </div>

            <div className="space-y-2">
              <Label>Timeframe</Label>
              <Select value={inputs.timeframe} onValueChange={(value) => updateInput("timeframe", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="1_year">1 Year</SelectItem>
                  <SelectItem value="2_years">2 Years</SelectItem>
                  <SelectItem value="5_years">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Risk Level</Label>
              <Select value={inputs.riskLevel} onValueChange={(value) => updateInput("riskLevel", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scenario Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Projection Scenarios</CardTitle>
              <CardDescription>Select a scenario to view different outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {scenarios.map((scenario) => (
                  <Button
                    key={scenario.name}
                    variant={selectedScenario === scenario.name ? "default" : "outline"}
                    onClick={() => setSelectedScenario(scenario.name)}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <span className="font-semibold">{scenario.label}</span>
                    <span className="text-xs text-center">{scenario.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Projections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Funding</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${finalProjection?.totalFunding.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((finalProjection?.totalFunding / inputs.currentFunding - 1) * 100).toFixed(0)}% growth
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${finalProjection?.monthlyIncome.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Target: ${inputs.targetMonthlyIncome.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Probability</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{finalProjection?.probability}%</div>
                <p className="text-xs text-muted-foreground">
                  Based on {selectedScenario} scenario
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Projection Charts */}
          <Tabs defaultValue="funding" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="funding">Funding Growth</TabsTrigger>
              <TabsTrigger value="income">Monthly Income</TabsTrigger>
              <TabsTrigger value="accounts">Account Count</TabsTrigger>
            </TabsList>

            <TabsContent value="funding">
              <Card>
                <CardHeader>
                  <CardTitle>Total Funding Projection</CardTitle>
                  <CardDescription>Expected growth in total funded capital</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Funding"]} />
                      <Area 
                        type="monotone" 
                        dataKey="totalFunding" 
                        stroke={scenarios.find(s => s.name === selectedScenario)?.color}
                        fill={scenarios.find(s => s.name === selectedScenario)?.color}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Income Projection</CardTitle>
                  <CardDescription>Expected monthly trading income</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Income"]} />
                      <Line 
                        type="monotone" 
                        dataKey="monthlyIncome" 
                        stroke={scenarios.find(s => s.name === selectedScenario)?.color}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accounts">
              <Card>
                <CardHeader>
                  <CardTitle>Account Count Projection</CardTitle>
                  <CardDescription>Expected number of funded accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="accounts" 
                        fill={scenarios.find(s => s.name === selectedScenario)?.color}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Milestones and Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Career Milestones
            </CardTitle>
            <CardDescription>Key achievements on your funded trading journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestoneData.map((milestone, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{milestone.milestone}</h4>
                    <Badge variant="outline">{milestone.probability}% likely</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Expected: {milestone.timeframe}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Requirements:</p>
                    {milestone.requirements.map((req, reqIndex) => (
                      <p key={reqIndex} className="text-xs text-gray-600">• {req}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Analysis
            </CardTitle>
            <CardDescription>Potential challenges and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((risk, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{risk.factor}</h4>
                    <Badge 
                      variant="outline"
                      className={
                        risk.impact === "Critical" ? "border-red-500 text-red-700" :
                        risk.impact === "High" ? "border-orange-500 text-orange-700" :
                        "border-yellow-500 text-yellow-700"
                      }
                    >
                      {risk.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{risk.mitigation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recommended Action Plan
          </CardTitle>
          <CardDescription>Next steps to achieve your projections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Short Term (1-3 months)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Complete remaining assessments</li>
                <li>• Pass current challenge</li>
                <li>• Maintain consistent performance</li>
                <li>• Document trading strategy</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Medium Term (3-12 months)</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Scale to multiple accounts</li>
                <li>• Achieve first payout milestone</li>
                <li>• Optimize risk management</li>
                <li>• Build trading psychology</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Long Term (1+ years)</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Achieve target monthly income</li>
                <li>• Master multiple strategies</li>
                <li>• Mentor other traders</li>
                <li>• Build trading business</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

