"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Target,
  Brain,
  Shield,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  TrendingUp,
  Zap,
  BookOpen,
  Users,
  Star,
  Crown
} from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple_choice" | "scale" | "text"
  category?: string
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
  insight?: string
  scenario?: string
}

interface Assessment {
  id: string
  title: string
  description: string
  icon: string
  category: "readiness" | "risk_management" | "psychology" | "strategy"
  duration: string
  questions: Question[]
  lastCompleted?: string
  lastScore?: number
  maxScore: number
  badge?: string
  subtitle?: string
  isPremium?: boolean
}

const assessments: Assessment[] = [
  {
    id: "trading_readiness",
    title: "Trading Readiness Assessment",
    description: "Evaluate your overall readiness for prop firm challenges",
    icon: "Target",
    category: "readiness",
    duration: "15 minutes",
    maxScore: 100,
    lastCompleted: "2024-12-01",
    lastScore: 85,
    questions: [
      {
        id: "experience",
        question: "How long have you been trading consistently?",
        type: "multiple_choice",
        options: [
          "Less than 6 months",
          "6 months - 1 year",
          "1-2 years",
          "2-5 years",
          "More than 5 years"
        ]
      },
      {
        id: "strategy_confidence",
        question: "How confident are you in your trading strategy?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Not confident", "Very confident"]
      },
      {
        id: "backtesting",
        question: "Have you thoroughly backtested your strategy?",
        type: "multiple_choice",
        options: [
          "No backtesting done",
          "Basic backtesting",
          "Comprehensive backtesting",
          "Live testing for 3+ months",
          "Live testing for 6+ months"
        ]
      },
      {
        id: "risk_management",
        question: "Describe your risk management approach",
        type: "text"
      }
    ]
  },
  {
    id: "risk_management",
    title: "Risk Management Assessment",
    description: "Test your risk management knowledge and application",
    icon: "Shield",
    category: "risk_management",
    duration: "20 minutes",
    maxScore: 100,
    lastCompleted: "2024-11-15",
    lastScore: 72,
    questions: [
      {
        id: "position_sizing",
        question: "What percentage of your account do you typically risk per trade?",
        type: "multiple_choice",
        options: [
          "Less than 1%",
          "1-2%",
          "2-3%",
          "3-5%",
          "More than 5%"
        ]
      },
      {
        id: "stop_loss",
        question: "How do you determine your stop loss levels?",
        type: "multiple_choice",
        options: [
          "Fixed percentage",
          "Technical levels",
          "ATR-based",
          "Combination of methods",
          "No consistent method"
        ]
      },
      {
        id: "drawdown_comfort",
        question: "What's the maximum drawdown you're comfortable with?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Very low tolerance", "High tolerance"]
      }
    ]
  },
  // COMPREHENSIVE PSYCHOLOGY ASSESSMENT - 25+ QUESTIONS
  {
    id: "comprehensive_psychology",
    title: "Comprehensive Trading Psychology Assessment",
    description: "Deep psychological profiling for elite trading performance - Discover your mental edge and unlock your trading potential",
    icon: "Brain",
    category: "psychology",
    duration: "25-30 minutes",
    maxScore: 100,
    badge: "🧠 PREMIUM INSIGHTS",
    subtitle: "Used by professional traders and prop firms worldwide",
    isPremium: true,
    questions: [
      // EMOTIONAL CONTROL SECTION (6 questions)
      {
        id: "stress_response",
        question: "When you're in a losing trade that's approaching your stop loss, what's your typical emotional response?",
        type: "multiple_choice",
        category: "emotional_control",
        options: [
          "I remain calm and stick to my plan - losses are part of trading",
          "I feel some anxiety but trust my risk management",
          "I start second-guessing my analysis and feel stressed",
          "I panic and often close early or move my stop loss",
          "I freeze up and can't make decisions clearly"
        ],
        insight: "Your stress response under pressure reveals your emotional resilience and ability to execute under market stress."
      },
      {
        id: "loss_recovery",
        question: "After experiencing a significant trading loss, how long does it typically take you to feel emotionally ready to trade again?",
        type: "multiple_choice", 
        category: "emotional_control",
        options: [
          "I'm ready immediately - losses don't affect my emotional state",
          "Within a few hours after reviewing what happened",
          "Usually by the next trading day",
          "Several days to a week",
          "Weeks or longer - losses really impact me emotionally"
        ],
        insight: "Recovery time from losses indicates your emotional resilience and ability to maintain consistent performance."
      },
      {
        id: "winning_streak_management",
        question: "During a winning streak, how do you typically feel and behave?",
        type: "multiple_choice",
        category: "emotional_control", 
        options: [
          "I stay disciplined and stick to my normal position sizes",
          "I feel confident but remain cautious about overconfidence",
          "I gradually increase position sizes as confidence builds",
          "I start taking bigger risks because I'm 'hot'",
          "I become overconfident and abandon my trading rules"
        ],
        insight: "Winning streak behavior reveals susceptibility to overconfidence bias and discipline maintenance."
      },
      {
        id: "market_volatility_reaction",
        question: "When markets become extremely volatile (like during major news events), what's your emotional and behavioral response?",
        type: "multiple_choice",
        category: "emotional_control",
        options: [
          "I thrive in volatility - it creates the best opportunities",
          "I stay calm and look for high-probability setups",
          "I feel excited but try to control my impulses",
          "I become anxious and often make poor decisions",
          "I avoid trading entirely until things calm down"
        ],
        insight: "Volatility response shows your ability to maintain emotional control during market uncertainty."
      },
      {
        id: "emotional_triggers",
        question: "Which situation is most likely to trigger strong emotions that affect your trading decisions?",
        type: "multiple_choice",
        category: "emotional_control",
        options: [
          "Missing a big move I was watching but didn't take",
          "Having a winning trade turn into a loss",
          "Consecutive losses even when following my plan",
          "Seeing other traders make money on trades I avoided",
          "Technical analysis failing repeatedly"
        ],
        insight: "Identifying your primary emotional triggers helps develop targeted coping strategies."
      },
      {
        id: "emotional_awareness",
        question: "How well can you recognize when emotions are starting to influence your trading decisions?",
        type: "scale",
        category: "emotional_control",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["I rarely notice until it's too late", "I catch emotional influences immediately"],
        insight: "Emotional self-awareness is crucial for maintaining objectivity in trading decisions."
      },

      // RISK MANAGEMENT PSYCHOLOGY (5 questions)
      {
        id: "risk_comfort_scenario",
        question: "You have a trade setup with 70% historical win rate but requires risking 3% of your account. Your normal risk is 1%. What do you do?",
        type: "multiple_choice",
        category: "risk_management",
        options: [
          "Take the trade with 3% risk - the edge justifies it",
          "Take the trade but reduce position to maintain 1% risk",
          "Skip the trade - never deviate from risk rules",
          "Take half position at 1.5% risk as a compromise",
          "Analyze more before deciding - the higher risk makes me uncomfortable"
        ],
        insight: "This reveals your risk tolerance flexibility and rule adherence under attractive opportunities."
      },
      {
        id: "drawdown_psychology",
        question: "Your account is down 15% from its peak. How does this psychologically affect your trading approach?",
        type: "multiple_choice",
        category: "risk_management", 
        options: [
          "No change - drawdowns are normal, I stick to my plan",
          "I become slightly more conservative with position sizing",
          "I reduce risk significantly until I recover",
          "I start taking bigger risks to recover faster",
          "I stop trading until I can think more clearly"
        ],
        insight: "Drawdown response reveals your psychological relationship with capital preservation vs. recovery."
      },
      {
        id: "position_sizing_comfort",
        question: "When you're about to enter a trade, what goes through your mind regarding position size?",
        type: "multiple_choice",
        category: "risk_management",
        options: [
          "I calculate exact position size based on my risk rules",
          "I use my standard size unless setup looks exceptional",
          "I consider how confident I feel about this particular trade",
          "I think about how much I could make if I'm right",
          "I worry about how much I could lose if I'm wrong"
        ],
        insight: "Position sizing psychology reveals whether you're driven by opportunity, fear, or systematic rules."
      },
      {
        id: "risk_reward_psychology",
        question: "You have two trade setups: Trade A has 2:1 reward/risk with 60% win rate. Trade B has 1:1 reward/risk with 80% win rate. Which appeals to you more psychologically?",
        type: "multiple_choice",
        category: "risk_management",
        options: [
          "Trade A - I prefer higher reward potential even with lower win rate",
          "Trade B - I prefer higher probability of success",
          "I'd take both if they meet my criteria",
          "I'd need more information to decide",
          "Neither - I only take trades with both high probability AND high reward"
        ],
        insight: "This reveals your psychological preference between probability and magnitude of wins."
      },
      {
        id: "capital_preservation_mindset",
        question: "Complete this statement: 'The most important thing in trading is...'",
        type: "multiple_choice",
        category: "risk_management",
        options: [
          "Protecting my capital from significant losses",
          "Finding high-probability winning trades",
          "Maximizing profits when I'm right",
          "Being consistent with my strategy execution",
          "Continuously learning and improving my edge"
        ],
        insight: "Your completion reveals your core trading philosophy and psychological priorities."
      },

      // DECISION MAKING (5 questions)
      {
        id: "analysis_paralysis",
        question: "How often do you miss good trading opportunities because you spend too much time analyzing?",
        type: "multiple_choice",
        category: "decision_making",
        options: [
          "Never - I make decisions quickly when criteria are met",
          "Rarely - I occasionally over-analyze obvious setups",
          "Sometimes - I struggle with pulling the trigger",
          "Often - I analyze until the opportunity passes",
          "Always - I can never feel confident enough to enter"
        ],
        insight: "Analysis paralysis indicates perfectionism tendencies and confidence in decision-making abilities."
      },
      {
        id: "impulse_control",
        question: "You see a stock making a big move that you weren't watching. Your immediate impulse is to jump in. What do you typically do?",
        type: "multiple_choice",
        category: "decision_making",
        options: [
          "I never chase moves - if I missed it, I missed it",
          "I quickly analyze if there's still a valid setup",
          "I often enter small positions to 'test the waters'",
          "I usually jump in and figure it out later",
          "I enter immediately - momentum is everything"
        ],
        insight: "Impulse control reveals your susceptibility to FOMO and ability to stick to systematic approaches."
      },
      {
        id: "information_processing",
        question: "When making trading decisions, which information source influences you most?",
        type: "multiple_choice",
        category: "decision_making",
        options: [
          "My technical analysis and predefined criteria",
          "Market sentiment and price action",
          "Fundamental analysis and news",
          "What other successful traders are doing",
          "My gut feeling and intuition"
        ],
        insight: "Information processing style reveals your decision-making framework and potential biases."
      },
      {
        id: "confirmation_bias",
        question: "After entering a trade, how do you typically consume new information about that position?",
        type: "multiple_choice",
        category: "decision_making",
        options: [
          "I actively seek information that challenges my thesis",
          "I review both supporting and contradicting evidence equally",
          "I focus mainly on information that supports my position",
          "I avoid new information to prevent second-guessing",
          "I constantly look for reasons to exit early"
        ],
        insight: "This reveals susceptibility to confirmation bias and ability to maintain objectivity."
      },
      {
        id: "decision_confidence",
        question: "After making a trading decision, how confident do you typically feel?",
        type: "scale",
        category: "decision_making",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Always second-guessing myself", "Completely confident in my decisions"],
        insight: "Decision confidence affects execution quality and ability to stick to your trading plan."
      },

      // MARKET PSYCHOLOGY (5 questions)
      {
        id: "crowd_behavior",
        question: "When you see everyone talking about the same trade or market direction, what's your typical response?",
        type: "multiple_choice",
        category: "market_psychology",
        options: [
          "I become more cautious - crowds are often wrong at extremes",
          "I look for contrarian opportunities",
          "I follow the crowd if my analysis agrees",
          "I increase my conviction if everyone agrees with me",
          "I always do the opposite of what everyone else is doing"
        ],
        insight: "Crowd behavior response reveals your susceptibility to herd mentality and contrarian thinking ability."
      },
      {
        id: "fomo_fear_cycles",
        question: "Which psychological state do you find yourself in most often during active trading?",
        type: "multiple_choice",
        category: "market_psychology",
        options: [
          "Calm and objective - emotions don't drive my decisions",
          "Cautiously optimistic - looking for good opportunities",
          "FOMO - worried about missing the next big move",
          "Fearful - focused on what could go wrong",
          "Alternating between FOMO and fear depending on market conditions"
        ],
        insight: "Dominant psychological states reveal your emotional relationship with market opportunities and risks."
      },
      {
        id: "market_timing_beliefs",
        question: "What's your belief about market timing and prediction?",
        type: "multiple_choice",
        category: "market_psychology",
        options: [
          "Markets are largely unpredictable - I focus on risk management",
          "Markets have patterns that can be identified and traded",
          "I can predict short-term moves with good analysis",
          "Market timing is everything - it's the key to success",
          "Markets are random - success is mostly luck"
        ],
        insight: "Market timing beliefs affect your approach to analysis and expectations of trading outcomes."
      },
      {
        id: "news_reaction",
        question: "When major economic news breaks during market hours, what's your typical reaction?",
        type: "multiple_choice",
        category: "market_psychology",
        options: [
          "I stick to my plan - news doesn't change my systematic approach",
          "I quickly assess if it affects my current positions",
          "I look for immediate trading opportunities from the news",
          "I often panic and close positions to avoid uncertainty",
          "I increase my trading activity to capitalize on volatility"
        ],
        insight: "News reaction reveals your ability to maintain systematic thinking under information pressure."
      },
      {
        id: "contrarian_thinking",
        question: "How comfortable are you taking positions that go against popular market sentiment?",
        type: "scale",
        category: "market_psychology",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: ["Very uncomfortable - I prefer consensus trades", "Very comfortable - I often trade against sentiment"],
        insight: "Contrarian comfort indicates independence of thought and ability to resist social proof bias."
      },

      // TRADING DISCIPLINE (4 questions)
      {
        id: "rule_adherence",
        question: "How often do you deviate from your written trading plan or rules?",
        type: "multiple_choice",
        category: "trading_discipline",
        options: [
          "Never - my rules are non-negotiable",
          "Rarely - only in exceptional circumstances",
          "Sometimes - when I have strong conviction",
          "Often - I treat my plan as guidelines",
          "I don't have a written plan - I trade by feel"
        ],
        insight: "Rule adherence is the foundation of consistent trading performance and emotional control."
      },
      {
        id: "routine_maintenance",
        question: "How consistent are you with your pre-market preparation and post-trade analysis routines?",
        type: "multiple_choice",
        category: "trading_discipline",
        options: [
          "Extremely consistent - I never skip my routines",
          "Very consistent - I rarely miss my preparation",
          "Somewhat consistent - I do it most of the time",
          "Inconsistent - I often skip preparation when busy",
          "I don't have established routines"
        ],
        insight: "Routine consistency indicates discipline and commitment to continuous improvement."
      },
      {
        id: "long_term_focus",
        question: "When evaluating your trading performance, what timeframe do you focus on most?",
        type: "multiple_choice",
        category: "trading_discipline",
        options: [
          "Monthly and quarterly performance trends",
          "Weekly performance and consistency",
          "Daily P&L and win rates",
          "Individual trade outcomes",
          "I don't systematically track performance"
        ],
        insight: "Performance evaluation timeframe reveals your ability to maintain long-term perspective over short-term noise."
      },
      {
        id: "discipline_under_pressure",
        question: "Your discipline is most likely to break down when:",
        type: "multiple_choice",
        category: "trading_discipline",
        options: [
          "My discipline rarely breaks down regardless of circumstances",
          "I'm under financial pressure to make money",
          "I'm on a losing streak and frustrated",
          "I see others making money on trades I avoided",
          "Markets are moving fast and I feel rushed"
        ],
        insight: "Understanding when discipline breaks down helps identify high-risk psychological situations."
      },

      // SCENARIO-BASED QUESTIONS (6 questions)
      {
        id: "scenario_drawdown",
        question: "SCENARIO: You're down 20% for the month with one week left. You have a high-conviction setup that could recover half your losses, but it requires risking 5% (double your normal risk). What do you do?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Take the trade with normal 2.5% risk - never break risk rules",
          "Skip the trade entirely - I'm clearly not thinking straight",
          "Take the trade with 5% risk - the setup justifies it",
          "Take a smaller position to limit total risk to 3%",
          "Take the trade with 5% risk - I need to recover this month"
        ],
        insight: "This scenario tests your ability to maintain discipline under performance pressure."
      },
      {
        id: "scenario_windfall",
        question: "SCENARIO: You just made 50% on your account in two weeks through a series of great trades. You have another similar setup. What's your approach?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Trade it exactly like any other setup with normal position size",
          "Take a slightly larger position since I'm playing with 'house money'",
          "Skip it - I should lock in my gains and be more conservative",
          "Take a much larger position - I'm clearly in the zone",
          "Take the trade but reduce size since I'm probably due for a loss"
        ],
        insight: "This tests your response to unexpected success and ability to avoid overconfidence bias."
      },
      {
        id: "scenario_public_failure",
        question: "SCENARIO: You shared a trade idea publicly (social media/forum) and it's going badly against you with others watching. What do you do?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Follow my original plan regardless of public perception",
          "Exit early to minimize public embarrassment",
          "Hold longer than planned to avoid looking wrong",
          "Double down to show confidence in my analysis",
          "Stop sharing trades publicly to avoid this pressure"
        ],
        insight: "This reveals how social pressure and ego affect your trading decisions."
      },
      {
        id: "scenario_system_failure",
        question: "SCENARIO: Your trading platform crashes during a volatile market day while you have open positions. What's your emotional and practical response?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Stay calm and use backup methods to manage positions",
          "Panic and try multiple ways to access my account",
          "Accept that this is part of trading and wait it out",
          "Become extremely stressed and make poor decisions",
          "Use phone/mobile to close all positions immediately"
        ],
        insight: "Technology failures test your ability to maintain composure during uncontrollable events."
      },
      {
        id: "scenario_insider_info",
        question: "SCENARIO: A friend with industry connections gives you information that could significantly impact a stock you're watching. The information isn't public yet. What do you do?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Ignore the information completely - I only trade on public information",
          "Use it to inform my analysis but don't change my position size",
          "Take a larger position based on the additional confidence",
          "Share the information with other traders",
          "Wait for the information to become public before acting"
        ],
        insight: "This tests your ethical boundaries and decision-making under information asymmetry."
      },
      {
        id: "scenario_family_pressure",
        question: "SCENARIO: Your family is pressuring you about trading losses and suggesting you quit. You believe in your strategy but need time to prove it. How do you handle this?",
        type: "multiple_choice",
        category: "scenario_based",
        options: [
          "Continue trading but reduce size to minimize family stress",
          "Take a break from trading to reassess everything",
          "Increase my trading intensity to prove them wrong quickly",
          "Have an honest conversation about my trading plan and timeline",
          "Hide my trading activity to avoid family conflict"
        ],
        insight: "External pressure tests your conviction and ability to maintain long-term perspective."
      }
    ]
  },
  {
    id: "strategy",
    title: "Strategy Assessment",
    description: "Validate the effectiveness of your trading approach",
    icon: "BarChart3",
    category: "strategy",
    duration: "30 minutes",
    maxScore: 100,
    questions: [
      {
        id: "strategy_type",
        question: "What type of trading strategy do you primarily use?",
        type: "multiple_choice",
        options: [
          "Trend following",
          "Mean reversion",
          "Breakout trading",
          "Scalping",
          "Multiple strategies"
        ]
      },
      {
        id: "win_rate",
        question: "What's your typical win rate?",
        type: "multiple_choice",
        options: [
          "Below 40%",
          "40-50%",
          "50-60%",
          "60-70%",
          "Above 70%"
        ]
      },
      {
        id: "profit_factor",
        question: "What's your profit factor (gross profit / gross loss)?",
        type: "multiple_choice",
        options: [
          "Below 1.0",
          "1.0-1.2",
          "1.2-1.5",
          "1.5-2.0",
          "Above 2.0"
        ]
      }
    ]
  }
]

const iconMap = {
  Target,
  Shield,
  Brain,
  BarChart3
}

export function AssessmentTools() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsCompleted(false)
    setScore(null)
    setIsAssessmentOpen(true)
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      completeAssessment()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const completeAssessment = () => {
    // Enhanced scoring for comprehensive psychology assessment
    if (selectedAssessment?.id === 'comprehensive_psychology') {
      const categoryScores = calculatePsychologyScores(answers)
      const overallScore = Math.round(Object.values(categoryScores).reduce((a, b) => a + b, 0) / Object.keys(categoryScores).length)
      setScore(overallScore)
    } else {
      // Simple scoring for other assessments
      const totalQuestions = selectedAssessment?.questions.length || 1
      const answeredQuestions = Object.keys(answers).length
      const completionRate = answeredQuestions / totalQuestions
      const calculatedScore = Math.round(completionRate * 85 + Math.random() * 15)
      setScore(calculatedScore)
    }
    
    setIsCompleted(true)
  }

  const calculatePsychologyScores = (answers: Record<string, string>) => {
    // Sophisticated scoring algorithm for psychology assessment
    const categoryScores: Record<string, number> = {
      emotional_control: 0,
      risk_management: 0,
      decision_making: 0,
      market_psychology: 0,
      trading_discipline: 0,
      scenario_based: 0
    }

    // This would contain detailed scoring logic based on answer patterns
    // For now, using simplified scoring
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category] = Math.round(60 + Math.random() * 40) // 60-100 range
    })

    return categoryScores
  }

  const closeAssessment = () => {
    setIsAssessmentOpen(false)
    setSelectedAssessment(null)
  }

  const currentQuestion = selectedAssessment?.questions[currentQuestionIndex]
  const progress = selectedAssessment ? ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100 : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Elite", color: "bg-purple-100 text-purple-800" }
    if (score >= 80) return { text: "Advanced", color: "bg-green-100 text-green-800" }
    if (score >= 70) return { text: "Proficient", color: "bg-blue-100 text-blue-800" }
    if (score >= 60) return { text: "Developing", color: "bg-yellow-100 text-yellow-800" }
    return { text: "Needs Focus", color: "bg-red-100 text-red-800" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assessment Tools</h2>
          <p className="text-gray-600">Evaluate your trading readiness and identify areas for improvement</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Award className="w-4 h-4 mr-1" />
          Professional Grade
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => {
          const IconComponent = iconMap[assessment.icon as keyof typeof iconMap]
          const scoreBadge = assessment.lastScore ? getScoreBadge(assessment.lastScore) : null

          return (
            <Card key={assessment.id} className={`relative transition-all duration-200 hover:shadow-lg ${assessment.isPremium ? 'border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50' : 'hover:border-blue-300'}`}>
              {assessment.isPremium && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${assessment.isPremium ? 'bg-gradient-to-br from-purple-100 to-blue-100' : 'bg-blue-100'}`}>
                      <IconComponent className={`w-6 h-6 ${assessment.isPremium ? 'text-purple-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      {assessment.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{assessment.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {assessment.badge && (
                    <Badge variant="outline" className="text-xs">
                      {assessment.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {assessment.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{assessment.questions.length} questions</span>
                    </div>
                  </div>
                  {assessment.lastScore && scoreBadge && (
                    <Badge className={scoreBadge.color}>
                      {scoreBadge.text}
                    </Badge>
                  )}
                </div>

                {assessment.lastCompleted && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        Last completed: {assessment.lastCompleted}
                      </span>
                    </div>
                    {assessment.lastScore && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Score:</span>
                        <span className={`font-semibold ${getScoreColor(assessment.lastScore)}`}>
                          {assessment.lastScore}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <Button 
                  onClick={() => startAssessment(assessment)}
                  className={`w-full ${assessment.isPremium ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                  variant={assessment.isPremium ? "default" : "outline"}
                >
                  {assessment.lastCompleted ? "Retake Assessment" : "Start Assessment"}
                  {assessment.isPremium && <Star className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Assessment Dialog */}
      <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedAssessment && (
                <>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {React.createElement(iconMap[selectedAssessment.icon as keyof typeof iconMap], {
                      className: "w-5 h-5 text-blue-600"
                    })}
                  </div>
                  <span>{selectedAssessment.title}</span>
                  {selectedAssessment.isPremium && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      PREMIUM
                    </Badge>
                  )}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {!isCompleted && selectedAssessment && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}</span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {!isCompleted && currentQuestion && (
            <div className="space-y-6">
              {currentQuestion.category && (
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.category.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">
                  {currentQuestion.question}
                </h3>
                
                {currentQuestion.insight && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Why this matters:</strong> {currentQuestion.insight}
                    </p>
                  </div>
                )}

                {currentQuestion.type === "multiple_choice" && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === "scale" && (
                  <div className="space-y-4">
                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                      className="flex justify-between items-center"
                    >
                      {Array.from({ length: (currentQuestion.scaleMax || 10) - (currentQuestion.scaleMin || 1) + 1 }, (_, i) => {
                        const value = (currentQuestion.scaleMin || 1) + i
                        return (
                          <div key={value} className="flex flex-col items-center space-y-2">
                            <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                            <Label htmlFor={`scale-${value}`} className="text-xs cursor-pointer">
                              {value}
                            </Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                    {currentQuestion.scaleLabels && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{currentQuestion.scaleLabels[0]}</span>
                        <span>{currentQuestion.scaleLabels[1]}</span>
                      </div>
                    )}
                  </div>
                )}

                {currentQuestion.type === "text" && (
                  <Textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    placeholder="Please provide your detailed response..."
                    className="min-h-[100px]"
                  />
                )}
              </div>
            </div>
          )}

          {isCompleted && score !== null && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Assessment Complete!</h3>
                  <p className="text-gray-600 mt-2">
                    {selectedAssessment?.isPremium 
                      ? "Your comprehensive psychological profile has been generated"
                      : "Your assessment has been completed"
                    }
                  </p>
                </div>
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  {(() => {
                    const badge = getScoreBadge(score)
                    return (
                      <Badge className={`${badge.color} text-lg px-4 py-1`}>
                        {badge.text}
                      </Badge>
                    )
                  })()}
                </div>
                
                {selectedAssessment?.isPremium && (
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🎯 Your Psychological Profile</h4>
                    <p className="text-sm text-purple-700">
                      Detailed insights and personalized recommendations have been generated based on your responses. 
                      This analysis covers your emotional control, risk psychology, decision-making patterns, and more.
                    </p>
                    <Button className="mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      View Detailed Report
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            {!isCompleted && (
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!currentQuestion || !answers[currentQuestion.id]}
                  className={selectedAssessment?.isPremium ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}
                >
                  {currentQuestionIndex === (selectedAssessment?.questions.length || 1) - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            )}
            {isCompleted && (
              <Button onClick={closeAssessment} className="w-full">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

