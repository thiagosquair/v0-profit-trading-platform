"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  Cell
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Download,
  Edit,
  Trash2,
  Plus,
  Eye,
  BarChart3,
  Target,
  Award,
  Settings
} from "lucide-react"
import { PropFirmAccount, TradeRecord, TradingSummary } from "@/types/career-builder"
import { sampleAccounts } from "@/lib/careerBuilderData"

const statusColors = {
  active: "bg-green-100 text-green-800",
  passed: "bg-blue-100 text-blue-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  breached: "bg-red-100 text-red-800"
}

const accountTypeColors = {
  challenge: "bg-orange-100 text-orange-800",
  funded: "bg-green-100 text-green-800",
  scaled: "bg-purple-100 text-purple-800"
}

// Sample performance data for charts
const performanceData = [
  { date: "2024-12-01", balance: 10000, profit: 0 },
  { date: "2024-12-05", balance: 10180, profit: 180 },
  { date: "2024-12-10", balance: 10320, profit: 320 },
  { date: "2024-12-15", balance: 10450, profit: 450 },
  { date: "2024-12-20", balance: 10380, profit: 380 },
  { date: "2024-12-25", balance: 10520, profit: 520 },
]

const dailyPnLData = [
  { date: "Mon", pnl: 120 },
  { date: "Tue", pnl: -80 },
  { date: "Wed", pnl: 200 },
  { date: "Thu", pnl: 150 },
  { date: "Fri", pnl: -60 },
  { date: "Sat", pnl: 0 },
  { date: "Sun", pnl: 0 },
]

const riskMetricsData = [
  { name: "Used", value: 30, color: "#ef4444" },
  { name: "Available", value: 70, color: "#22c55e" },
]

interface AccountManagerProps {
  accountId?: string
}

export function AccountManager({ accountId }: AccountManagerProps) {
  const [selectedAccount, setSelectedAccount] = useState<PropFirmAccount | null>(
    accountId ? sampleAccounts.find(acc => acc.id === accountId) || null : sampleAccounts[0]
  )
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isUploadTradesOpen, setIsUploadTradesOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!selectedAccount) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Account Selected</h3>
          <p className="text-gray-600 mb-4">Select an account to view detailed information</p>
        </CardContent>
      </Card>
    )
  }

  const progressToTarget = selectedAccount.accountType === "challenge" 
    ? (selectedAccount.currentProfit / selectedAccount.profitTarget) * 100
    : 0

  const drawdownUsed = ((selectedAccount.initialBalance - selectedAccount.currentBalance) / selectedAccount.maxDrawdown) * 100

  return (
    <div className="space-y-6">
      {/* Account Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedAccount.id} onValueChange={(value) => {
            const account = sampleAccounts.find(acc => acc.id === value)
            if (account) setSelectedAccount(account)
          }}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sampleAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.firmName} - ${account.accountSize.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge className={accountTypeColors[selectedAccount.accountType]}>
            {selectedAccount.accountType}
          </Badge>
          <Badge className={statusColors[selectedAccount.status]}>
            {selectedAccount.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadTradesOpen} onOpenChange={setIsUploadTradesOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Trades
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Trading Data</DialogTitle>
                <DialogDescription>
                  Upload your trading results to track performance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Trading Report File</Label>
                  <Input id="file" type="file" accept=".csv,.xlsx,.json" />
                </div>
                <div>
                  <Label htmlFor="period">Trading Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Add any notes about this trading period..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadTradesOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadTradesOpen(false)}>
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${selectedAccount.currentBalance.toLocaleString()}</div>
            <p className={`text-xs ${selectedAccount.currentProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {selectedAccount.currentProfit >= 0 ? '+' : ''}${selectedAccount.currentProfit} from start
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {selectedAccount.accountType === "challenge" ? "Progress to Target" : "Total Profit"}
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {selectedAccount.accountType === "challenge" ? (
              <>
                <div className="text-2xl font-bold">{progressToTarget.toFixed(1)}%</div>
                <Progress value={progressToTarget} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  ${selectedAccount.currentProfit} / ${selectedAccount.profitTarget}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">${selectedAccount.currentProfit}</div>
                <p className="text-xs text-muted-foreground">
                  Since funding: {new Date(selectedAccount.startDate).toLocaleDateString()}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drawdown Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(0, drawdownUsed).toFixed(1)}%</div>
            <Progress value={Math.max(0, drawdownUsed)} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Max: ${selectedAccount.maxDrawdown}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trading Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedAccount.tradingDays}</div>
            {selectedAccount.accountType === "challenge" && (
              <p className="text-xs text-muted-foreground">
                Min required: {selectedAccount.requiredTradingDays}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Balance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Account Balance Progression</CardTitle>
                <CardDescription>Daily balance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Utilization</CardTitle>
                <CardDescription>Current drawdown vs maximum allowed</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskMetricsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskMetricsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm">Used Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Complete account information and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Firm Name</Label>
                  <p className="text-sm">{selectedAccount.firmName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Size</Label>
                  <p className="text-sm">${selectedAccount.accountSize.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <p className="text-sm">{new Date(selectedAccount.startDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Current Balance</Label>
                  <p className="text-sm">${selectedAccount.currentBalance.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Max Drawdown</Label>
                  <p className="text-sm">${selectedAccount.maxDrawdown.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Daily Drawdown</Label>
                  <p className="text-sm">${selectedAccount.dailyDrawdown.toLocaleString()}</p>
                </div>
                {selectedAccount.accountType === "funded" && selectedAccount.nextPayoutDate && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Next Payout</Label>
                      <p className="text-sm">{new Date(selectedAccount.nextPayoutDate).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Total Payouts</Label>
                      <p className="text-sm">${selectedAccount.payoutReceived.toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily P&L Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily P&L</CardTitle>
                <CardDescription>Profit and loss by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyPnLData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="pnl" 
                      fill={(entry: any) => entry.pnl >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key trading statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Win Rate</span>
                    <span className="font-medium">{selectedAccount.performance.winRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit Factor</span>
                    <span className="font-medium">{selectedAccount.performance.profitFactor.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average Win</span>
                    <span className="font-medium text-green-600">${selectedAccount.performance.averageWin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average Loss</span>
                    <span className="font-medium text-red-600">${selectedAccount.performance.averageLoss.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sharpe Ratio</span>
                    <span className="font-medium">{selectedAccount.performance.sharpeRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Best Day</span>
                    <span className="font-medium text-green-600">${selectedAccount.performance.bestDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Worst Day</span>
                    <span className="font-medium text-red-600">${selectedAccount.performance.worstDay}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trades Tab */}
        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Trades Data</h3>
                <p className="text-gray-600 mb-4">Upload your trading data to see detailed trade analysis</p>
                <Button onClick={() => setIsUploadTradesOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Trades
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Rules & Requirements</CardTitle>
              <CardDescription>Prop firm rules and compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Risk Management Rules</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Max Daily Loss</p>
                          <p className="text-sm text-gray-600">${selectedAccount.rules.maxDailyLoss}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Max Total Loss</p>
                          <p className="text-sm text-gray-600">${selectedAccount.rules.maxTotalLoss}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Profit Target</p>
                          <p className="text-sm text-gray-600">${selectedAccount.rules.profitTarget}</p>
                        </div>
                        {selectedAccount.currentProfit >= selectedAccount.rules.profitTarget ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Trading Rules</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Min Trading Days</p>
                          <p className="text-sm text-gray-600">{selectedAccount.rules.minTradingDays} days</p>
                        </div>
                        {selectedAccount.tradingDays >= selectedAccount.rules.minTradingDays ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Weekend Holding</p>
                          <p className="text-sm text-gray-600">{selectedAccount.rules.weekendHolding ? 'Allowed' : 'Not Allowed'}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">News Trading</p>
                          <p className="text-sm text-gray-600">{selectedAccount.rules.newsTrading ? 'Allowed' : 'Not Allowed'}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Deep dive into your trading performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Advanced analytics and insights will be available once you upload trading data
                </p>
                <Button onClick={() => setIsUploadTradesOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Trading Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
