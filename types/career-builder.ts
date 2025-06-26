// Types for Funded Career Builder feature

export interface PropFirmAccount {
  id: string
  firmName: string
  accountType: "challenge" | "funded" | "scaled"
  accountSize: number
  currentBalance: number
  initialBalance: number
  currentProfit: number
  profitTarget: number
  maxDrawdown: number
  dailyDrawdown: number
  startDate: string
  status: "active" | "passed" | "failed" | "pending" | "breached"
  tradingDays: number
  requiredTradingDays: number
  nextPayoutDate?: string
  payoutReceived: number
  performance: {
    winRate: number
    profitFactor: number
    averageWin: number
    averageLoss: number
    sharpeRatio: number
    bestDay: number
    worstDay: number
  }
  rules: {
    maxDailyLoss: number
    maxTotalLoss: number
    profitTarget: number
    minTradingDays: number
    weekendHolding: boolean
    newsTrading: boolean
  }
}

export interface CareerStage {
  id: string
  name: string
  description: string
  icon: string
  requirements: string[]
  benefits: string[]
  estimatedDuration: string
}

export interface CareerProgression {
  userId: string
  currentStage: string
  completedStages: string[]
  achievements: Achievement[]
  startDate: string
  lastUpdated: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: "milestone" | "performance" | "consistency" | "growth"
  unlockedDate?: string
  progress?: number
  target?: number
}

export interface TradeRecord {
  id: string
  accountId: string
  symbol: string
  direction: "long" | "short"
  entryPrice: number
  exitPrice: number
  quantity: number
  entryTime: string
  exitTime: string
  profit: number
  commission: number
  tags?: string[]
}

export interface TradingSummary {
  accountId: string
  period: "daily" | "weekly" | "monthly"
  startDate: string
  endDate: string
  totalTrades: number
  winningTrades: number
  losingTrades: number
  grossProfit: number
  grossLoss: number
  netProfit: number
  winRate: number
  profitFactor: number
  averageWin: number
  averageLoss: number
  largestWin: number
  largestLoss: number
  maxConsecutiveWins: number
  maxConsecutiveLosses: number
  maxDrawdown: number
}

export interface AssessmentResult {
  assessmentId: string
  userId: string
  score: number
  maxScore: number
  completedAt: string
  answers: Record<string, any>
  recommendations: string[]
}

export interface ProjectionScenario {
  name: "conservative" | "realistic" | "optimistic"
  monthlyGrowthRate: number
  successProbability: number
  timeToTarget: number
  projectedIncome: number[]
  projectedFunding: number[]
  riskFactors: string[]
}

