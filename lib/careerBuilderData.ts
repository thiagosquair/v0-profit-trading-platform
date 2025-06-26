import { 
  PropFirmAccount, 
  CareerStage, 
  CareerProgression, 
  Achievement, 
  TradingSummary,
  ProjectionScenario 
} from "@/types/career-builder"

// Career stages definition
export const careerStages: CareerStage[] = [
  {
    id: "novice-challenger",
    name: "Novice Challenger",
    description: "Starting your funded trading journey with basic knowledge and first challenges",
    icon: "🌱",
    requirements: [
      "Complete trading education basics",
      "Develop initial trading strategy",
      "Understand prop firm rules",
      "Complete risk management course"
    ],
    benefits: [
      "Access to educational resources",
      "Community support",
      "Basic strategy templates",
      "Risk management tools"
    ],
    estimatedDuration: "1-3 months"
  },
  {
    id: "skilled-challenger",
    name: "Skilled Challenger",
    description: "Consistently passing challenges and demonstrating trading competency",
    icon: "🎯",
    requirements: [
      "Pass at least one prop firm challenge",
      "Demonstrate 3+ months consistency",
      "Maintain proper risk management",
      "Complete advanced psychology course"
    ],
    benefits: [
      "Advanced risk management tools",
      "Mentorship opportunities",
      "Strategy optimization guidance",
      "Priority support"
    ],
    estimatedDuration: "3-6 months"
  },
  {
    id: "funded-trader",
    name: "Funded Trader",
    description: "Successfully funded and earning consistent profits from prop firm accounts",
    icon: "💰",
    requirements: [
      "Receive first funding",
      "Maintain account for 30+ days",
      "Achieve first payout",
      "Demonstrate emotional control"
    ],
    benefits: [
      "Scaling opportunities",
      "Performance bonuses",
      "Advanced analytics",
      "Tax optimization guidance"
    ],
    estimatedDuration: "6-12 months"
  },
  {
    id: "scaling-professional",
    name: "Scaling Professional",
    description: "Managing multiple funded accounts and scaling capital efficiently",
    icon: "📈",
    requirements: [
      "Manage 2+ funded accounts",
      "Consistent monthly profits",
      "Scale to $100K+ in funding",
      "Mentor other traders"
    ],
    benefits: [
      "Higher funding limits",
      "Reduced restrictions",
      "Revenue sharing opportunities",
      "Advanced tools access"
    ],
    estimatedDuration: "12-24 months"
  },
  {
    id: "master-trader",
    name: "Master Trader",
    description: "Elite trader with proven track record and leadership in the community",
    icon: "👑",
    requirements: [
      "Manage $500K+ in funding",
      "2+ years consistent profitability",
      "Train successful traders",
      "Contribute to community"
    ],
    benefits: [
      "Teaching opportunities",
      "Partnership programs",
      "Exclusive events access",
      "Legacy building"
    ],
    estimatedDuration: "24+ months"
  }
]

// Sample prop firm accounts
export const sampleAccounts: PropFirmAccount[] = [
  {
    id: "acc-001",
    firmName: "FTMO",
    accountType: "challenge",
    accountSize: 10000,
    currentBalance: 10850,
    initialBalance: 10000,
    currentProfit: 850,
    profitTarget: 1000,
    maxDrawdown: 1000,
    dailyDrawdown: 500,
    startDate: "2024-01-15",
    status: "active",
    tradingDays: 12,
    requiredTradingDays: 10,
    payoutReceived: 0,
    performance: {
      winRate: 68,
      profitFactor: 1.85,
      averageWin: 125,
      averageLoss: -68,
      sharpeRatio: 1.42,
      bestDay: 285,
      worstDay: -145
    },
    rules: {
      maxDailyLoss: 500,
      maxTotalLoss: 1000,
      profitTarget: 1000,
      minTradingDays: 10,
      weekendHolding: false,
      newsTrading: true
    }
  },
  {
    id: "acc-002",
    firmName: "MyForexFunds",
    accountType: "funded",
    accountSize: 25000,
    currentBalance: 26750,
    initialBalance: 25000,
    currentProfit: 1750,
    profitTarget: 2000,
    maxDrawdown: 2500,
    dailyDrawdown: 1250,
    startDate: "2023-11-20",
    status: "active",
    tradingDays: 45,
    requiredTradingDays: 5,
    nextPayoutDate: "2024-02-15",
    payoutReceived: 1200,
    performance: {
      winRate: 72,
      profitFactor: 2.15,
      averageWin: 180,
      averageLoss: -85,
      sharpeRatio: 1.68,
      bestDay: 420,
      worstDay: -180
    },
    rules: {
      maxDailyLoss: 1250,
      maxTotalLoss: 2500,
      profitTarget: 2000,
      minTradingDays: 5,
      weekendHolding: true,
      newsTrading: true
    }
  },
  {
    id: "acc-003",
    firmName: "The5%ers",
    accountType: "challenge",
    accountSize: 50000,
    currentBalance: 48200,
    initialBalance: 50000,
    currentProfit: -1800,
    profitTarget: 4000,
    maxDrawdown: 2500,
    dailyDrawdown: 2500,
    startDate: "2024-01-08",
    status: "failed",
    tradingDays: 8,
    requiredTradingDays: 15,
    payoutReceived: 0,
    performance: {
      winRate: 45,
      profitFactor: 0.82,
      averageWin: 220,
      averageLoss: -180,
      sharpeRatio: -0.35,
      bestDay: 380,
      worstDay: -650
    },
    rules: {
      maxDailyLoss: 2500,
      maxTotalLoss: 2500,
      profitTarget: 4000,
      minTradingDays: 15,
      weekendHolding: false,
      newsTrading: false
    }
  }
]

// Sample career progression
export const sampleCareerProgression: CareerProgression = {
  userId: "user-001",
  currentStage: "skilled-challenger",
  completedStages: ["novice-challenger"],
  achievements: [
    {
      id: "first-challenge",
      title: "First Challenge Passed",
      description: "Successfully completed your first prop firm challenge",
      category: "milestone",
      unlockedDate: "2023-12-15"
    },
    {
      id: "consistent-trader",
      title: "Consistent Trader",
      description: "Maintained positive performance for 3 consecutive months",
      category: "consistency",
      unlockedDate: "2024-01-20"
    },
    {
      id: "risk-master",
      title: "Risk Management Master",
      description: "Never exceeded 2% risk per trade for 100 trades",
      category: "performance",
      progress: 85,
      target: 100
    }
  ],
  startDate: "2023-09-01",
  lastUpdated: "2024-02-01"
}

// Sample achievements
export const availableAchievements: Achievement[] = [
  {
    id: "first-challenge",
    title: "First Challenge Passed",
    description: "Successfully completed your first prop firm challenge",
    category: "milestone"
  },
  {
    id: "first-payout",
    title: "First Payout",
    description: "Received your first payout from a funded account",
    category: "milestone"
  },
  {
    id: "consistent-trader",
    title: "Consistent Trader",
    description: "Maintained positive performance for 3 consecutive months",
    category: "consistency"
  },
  {
    id: "risk-master",
    title: "Risk Management Master",
    description: "Never exceeded 2% risk per trade for 100 trades",
    category: "performance"
  },
  {
    id: "scaling-success",
    title: "Scaling Success",
    description: "Successfully scaled to $100K+ in total funding",
    category: "growth"
  },
  {
    id: "mentor",
    title: "Community Mentor",
    description: "Helped 10+ traders pass their challenges",
    category: "milestone"
  }
]

// Sample trading summaries
export const sampleTradingSummaries: TradingSummary[] = [
  {
    accountId: "acc-001",
    period: "monthly",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    totalTrades: 45,
    winningTrades: 31,
    losingTrades: 14,
    grossProfit: 1250,
    grossLoss: -680,
    netProfit: 570,
    winRate: 68.9,
    profitFactor: 1.84,
    averageWin: 40.3,
    averageLoss: -48.6,
    largestWin: 185,
    largestLoss: -125,
    maxConsecutiveWins: 7,
    maxConsecutiveLosses: 3,
    maxDrawdown: 285
  }
]

// Projection scenarios
export const projectionScenarios: ProjectionScenario[] = [
  {
    name: "conservative",
    monthlyGrowthRate: 0.05,
    successProbability: 0.85,
    timeToTarget: 24,
    projectedIncome: [500, 750, 1000, 1250, 1500, 1750],
    projectedFunding: [25000, 35000, 50000, 75000, 100000, 150000],
    riskFactors: [
      "Market volatility",
      "Rule violations",
      "Emotional trading"
    ]
  },
  {
    name: "realistic",
    monthlyGrowthRate: 0.08,
    successProbability: 0.65,
    timeToTarget: 18,
    projectedIncome: [750, 1200, 1800, 2500, 3500, 4500],
    projectedFunding: [35000, 60000, 100000, 150000, 250000, 400000],
    riskFactors: [
      "Scaling challenges",
      "Consistency pressure",
      "Account management"
    ]
  },
  {
    name: "optimistic",
    monthlyGrowthRate: 0.12,
    successProbability: 0.35,
    timeToTarget: 12,
    projectedIncome: [1000, 2000, 3500, 5500, 8000, 12000],
    projectedFunding: [50000, 100000, 200000, 350000, 600000, 1000000],
    riskFactors: [
      "Aggressive scaling",
      "High expectations",
      "Burnout risk"
    ]
  }
]

// Utility functions
export const getAccountsByStatus = (accounts: PropFirmAccount[], status: string) => {
  return accounts.filter(account => account.status === status)
}

export const getTotalFunding = (accounts: PropFirmAccount[]) => {
  return accounts
    .filter(account => account.status === "active" || account.status === "passed")
    .reduce((total, account) => total + account.accountSize, 0)
}

export const getTotalProfit = (accounts: PropFirmAccount[]) => {
  return accounts.reduce((total, account) => total + account.currentProfit, 0)
}

export const getAverageWinRate = (accounts: PropFirmAccount[]) => {
  const activeAccounts = accounts.filter(account => account.status === "active")
  if (activeAccounts.length === 0) return 0
  
  const totalWinRate = activeAccounts.reduce((sum, account) => sum + account.performance.winRate, 0)
  return totalWinRate / activeAccounts.length
}

export const getNextCareerStage = (currentStageId: string): CareerStage | null => {
  const currentIndex = careerStages.findIndex(stage => stage.id === currentStageId)
  if (currentIndex === -1 || currentIndex === careerStages.length - 1) return null
  return careerStages[currentIndex + 1]
}

export const calculateProgressToNextStage = (
  currentStageId: string, 
  accounts: PropFirmAccount[], 
  achievements: Achievement[]
): number => {
  const nextStage = getNextCareerStage(currentStageId)
  if (!nextStage) return 100
  
  // Simple progress calculation based on requirements met
  // In a real implementation, this would be more sophisticated
  const totalRequirements = nextStage.requirements.length
  let metRequirements = 0
  
  // Example logic - this would be more detailed in production
  if (accounts.some(acc => acc.status === "active" || acc.status === "passed")) {
    metRequirements += 1
  }
  
  if (achievements.length >= 2) {
    metRequirements += 1
  }
  
  return Math.min((metRequirements / totalRequirements) * 100, 100)
}

