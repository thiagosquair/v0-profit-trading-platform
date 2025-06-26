"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Heart, Target, TrendingUp, Clock, Star, Play, RotateCcw, CheckCircle, X, ArrowLeft, ArrowRight, Timer, Lightbulb, MessageCircle, Award, Sparkles, TrendingDown, BarChart3, Zap, Shield } from "lucide-react"

// Data Models
interface ExerciseStep {
  id: string
  type: "instruction" | "question" | "input" | "reflection" | "summary" | "feedback"
  content: string
  options?: { value: string; label: string }[]
  inputType?: "text" | "number" | "textarea" | "radio"
  placeholder?: string
  expectedAnswer?: string | number | RegExp
  minDuration?: number // in seconds
  tips?: string[] // Coaching tips for this step
}

interface Exercise {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  icon: React.ElementType
  steps: ExerciseStep[]
  outcomeMetrics: string[]
  feedbackGenerator: string
  learningObjectives: string[]
  coachingInsights: string[]
}

interface UserExerciseProgress {
  exerciseId: string
  lastAttemptDate: Date
  completionStatus: "not_started" | "in_progress" | "completed"
  currentStepId: string
  score?: number
  timeSpent?: number
  answers: { stepId: string; value: any; timestamp: Date }[]
  feedbackReceived?: string
  streakCount?: number
  improvementAreas?: string[]
}

// AI Feedback Generator
const generatePersonalizedFeedback = (exercise: Exercise, answers: { stepId: string; value: any }[]): string => {
  const feedbackTemplates = {
    "emotional-checkin": (answers: any[]) => {
      const stressLevel = parseInt(answers.find(a => a.stepId === "q1_stress_level")?.value || "5")
      const focusLevel = parseInt(answers.find(a => a.stepId === "q2_focus_level")?.value || "5")
      const confidenceLevel = parseInt(answers.find(a => a.stepId === "q3_confidence")?.value || "5")
      const reflection = answers.find(a => a.stepId === "input_journal")?.value || ""

      let feedback = "## Your Emotional Check-in Results\n\n"
      
      if (stressLevel <= 3) {
        feedback += "🌟 **Excellent stress management!** Your low stress level indicates you're in an optimal state for trading. This calm mindset will help you make rational decisions.\n\n"
      } else if (stressLevel <= 6) {
        feedback += "⚠️ **Moderate stress detected.** Consider taking a few deep breaths or a short walk before trading. High stress can lead to impulsive decisions.\n\n"
      } else {
        feedback += "🚨 **High stress alert!** Your stress level is quite elevated. Consider postponing trading until you feel more centered. Trading while stressed often leads to poor outcomes.\n\n"
      }

      if (focusLevel >= 7) {
        feedback += "🎯 **Great focus!** Your high focus level suggests you're ready to execute your trading plan effectively.\n\n"
      } else {
        feedback += "💭 **Focus needs attention.** Try eliminating distractions and reviewing your trading plan before entering positions.\n\n"
      }

      if (confidenceLevel >= 7) {
        feedback += "💪 **Strong confidence!** This self-assurance will help you stick to your plan and avoid second-guessing.\n\n"
      } else {
        feedback += "🤔 **Building confidence.** Remember your past successes and trust in your preparation. Confidence grows with consistent execution.\n\n"
      }

      feedback += "### Personalized Recommendations:\n"
      if (stressLevel > 6) feedback += "- Practice 5-minute breathing exercises before trading\n"
      if (focusLevel < 6) feedback += "- Create a pre-trading routine to enhance focus\n"
      if (confidenceLevel < 6) feedback += "- Review your trading journal to reinforce successful strategies\n"

      if (reflection) {
        feedback += `\n### Your Reflection Insights:\n"${reflection}"\n\nYour self-awareness is a valuable trading asset. Keep journaling to track emotional patterns.`
      }

      return feedback
    },

    "risk-visualization": (answers: any[]) => {
      const riskAmount = answers.find(a => a.stepId === "q2_risk_amount")?.value || "2"
      const lossReaction = answers.find(a => a.stepId === "q3_loss_reaction")?.value || ""
      const successPlan = answers.find(a => a.stepId === "q4_success_plan")?.value || ""

      let feedback = "## Risk Visualization Assessment\n\n"

      if (riskAmount === "0.5" || riskAmount === "1") {
        feedback += "✅ **Excellent risk management!** Your conservative position sizing shows discipline and long-term thinking.\n\n"
      } else if (riskAmount === "2" || riskAmount === "3") {
        feedback += "⚠️ **Moderate risk approach.** This can work with high-probability setups, but ensure your win rate supports this risk level.\n\n"
      } else {
        feedback += "🚨 **High risk warning!** Risking more than 3% per trade can quickly deplete your account. Consider reducing position sizes.\n\n"
      }

      feedback += "### Mental Preparation Analysis:\n"
      if (lossReaction.toLowerCase().includes("stick") || lossReaction.toLowerCase().includes("plan")) {
        feedback += "🎯 **Strong loss acceptance!** Your commitment to following your plan shows emotional maturity.\n\n"
      } else {
        feedback += "💭 **Work on loss acceptance.** Developing a systematic response to losses is crucial for long-term success.\n\n"
      }

      if (successPlan.toLowerCase().includes("partial") || successPlan.toLowerCase().includes("target")) {
        feedback += "📈 **Smart profit management!** Having a clear plan for success prevents emotional decision-making.\n\n"
      }

      feedback += "### Visualization Benefits:\n"
      feedback += "- Reduces emotional shock when trades move against you\n"
      feedback += "- Builds confidence through mental rehearsal\n"
      feedback += "- Improves decision-making under pressure\n"
      feedback += "- Strengthens commitment to your trading plan\n\n"

      feedback += "**Remember:** The best traders visualize both success and failure. This mental preparation is what separates professionals from amateurs."

      return feedback
    },

    "mindful-trading": (answers: any[]) => {
      const intention = answers.find(a => a.stepId === "intention_setting")?.value || ""

      let feedback = "## Mindfulness Session Complete\n\n"
      feedback += "🧘‍♂️ **Congratulations on completing your mindfulness practice!** Regular meditation builds the mental resilience essential for successful trading.\n\n"

      feedback += "### Benefits You've Just Activated:\n"
      feedback += "- **Reduced cortisol levels** - Lower stress hormones improve decision-making\n"
      feedback += "- **Enhanced focus** - Meditation strengthens your attention span\n"
      feedback += "- **Emotional regulation** - Better control over fear and greed responses\n"
      feedback += "- **Present moment awareness** - Crucial for reading market conditions\n\n"

      if (intention) {
        feedback += `### Your Trading Intention:\n"${intention}"\n\n`
        feedback += "This intention will serve as your North Star during today's trading session. Return to it whenever you feel pulled by emotions.\n\n"
      }

      feedback += "### Carry This Forward:\n"
      feedback += "- Take three conscious breaths before each trade\n"
      feedback += "- Notice when emotions arise without judging them\n"
      feedback += "- Return to your intention when facing difficult decisions\n"
      feedback += "- Practice gratitude for both winning and losing trades\n\n"

      feedback += "**Pro Tip:** The most successful traders treat each trade as a meditation - fully present, non-attached to outcomes, and committed to the process."

      return feedback
    },

    "fomo-resistance": (answers: any[]) => {
      const fomoFrequency = answers.find(a => a.stepId === "q1_fomo_frequency")?.value || "sometimes"
      const triggerSituation = answers.find(a => a.stepId === "q2_trigger_situation")?.value || ""
      const resistanceStrategy = answers.find(a => a.stepId === "q3_resistance_strategy")?.value || ""

      let feedback = "## FOMO Resistance Training Results\n\n"

      if (fomoFrequency === "never" || fomoFrequency === "rarely") {
        feedback += "🎯 **Excellent FOMO control!** Your disciplined approach to market opportunities shows emotional maturity and strategic thinking.\n\n"
      } else if (fomoFrequency === "sometimes") {
        feedback += "⚠️ **Moderate FOMO tendency.** You're aware of the issue, which is the first step. Focus on strengthening your resistance strategies.\n\n"
      } else {
        feedback += "🚨 **High FOMO alert!** Frequent fear of missing out can lead to impulsive trades and poor risk management. This exercise will help you build resistance.\n\n"
      }

      feedback += "### FOMO Trigger Analysis:\n"
      if (triggerSituation.toLowerCase().includes("social") || triggerSituation.toLowerCase().includes("media")) {
        feedback += "📱 **Social media influence detected.** Consider limiting exposure to trading social media during market hours.\n\n"
      }
      if (triggerSituation.toLowerCase().includes("news") || triggerSituation.toLowerCase().includes("breakout")) {
        feedback += "📰 **News-driven FOMO identified.** Remember that the best opportunities often come after the initial excitement fades.\n\n"
      }

      feedback += "### Your Resistance Strategy:\n"
      if (resistanceStrategy) {
        feedback += `"${resistanceStrategy}"\n\n`
        feedback += "Having a written strategy is powerful. Practice this response until it becomes automatic.\n\n"
      }

      feedback += "### FOMO Resistance Techniques:\n"
      feedback += "- **The 5-Minute Rule**: Wait 5 minutes before acting on any impulse\n"
      feedback += "- **Opportunity Cost Thinking**: Ask 'What am I giving up by taking this trade?'\n"
      feedback += "- **Plan Review**: Always check if the opportunity fits your trading plan\n"
      feedback += "- **Journal Reflection**: Write down why you want to take the trade\n\n"

      feedback += "**Remember:** The market will always provide opportunities. Missing one trade is better than taking ten bad ones."

      return feedback
    },

    "loss-acceptance": (answers: any[]) => {
      const lossReaction = answers.find(a => a.stepId === "q1_loss_reaction")?.value || ""
      const recoveryTime = answers.find(a => a.stepId === "q2_recovery_time")?.value || ""
      const learningApproach = answers.find(a => a.stepId === "q3_learning_approach")?.value || ""

      let feedback = "## Loss Acceptance Training Assessment\n\n"

      if (lossReaction.toLowerCase().includes("accept") || lossReaction.toLowerCase().includes("plan")) {
        feedback += "✅ **Healthy loss acceptance!** Your mature approach to losses is a key characteristic of successful traders.\n\n"
      } else if (lossReaction.toLowerCase().includes("frustrated") || lossReaction.toLowerCase().includes("angry")) {
        feedback += "⚠️ **Emotional loss reaction.** It's natural to feel disappointed, but learning to accept losses quickly is crucial for long-term success.\n\n"
      } else {
        feedback += "🔄 **Developing loss acceptance.** This is one of the hardest skills in trading, but also one of the most important.\n\n"
      }

      feedback += "### Recovery Time Analysis:\n"
      if (recoveryTime === "immediately" || recoveryTime === "minutes") {
        feedback += "🚀 **Quick emotional recovery!** Your ability to bounce back quickly prevents losses from affecting subsequent decisions.\n\n"
      } else if (recoveryTime === "hours") {
        feedback += "⏰ **Moderate recovery time.** Work on techniques to process losses more quickly to maintain trading effectiveness.\n\n"
      } else {
        feedback += "🐌 **Extended recovery period.** Long emotional recovery times can significantly impact your trading performance.\n\n"
      }

      feedback += "### Learning Approach:\n"
      if (learningApproach) {
        feedback += `"${learningApproach}"\n\n`
        feedback += "Your systematic approach to learning from losses will accelerate your trading development.\n\n"
      }

      feedback += "### Loss Acceptance Framework:\n"
      feedback += "- **Immediate Acceptance**: 'This loss was planned and budgeted'\n"
      feedback += "- **Learning Extraction**: 'What can I learn from this trade?'\n"
      feedback += "- **Forward Focus**: 'What's the next high-probability opportunity?'\n"
      feedback += "- **Emotional Reset**: Use breathing or brief meditation to reset\n\n"

      feedback += "**Key Insight:** Losses are not failures - they're the cost of doing business in trading. The best traders lose money regularly but manage it systematically."

      return feedback
    },

    "confidence-building": (answers: any[]) => {
      const confidenceLevel = parseInt(answers.find(a => a.stepId === "q1_confidence_level")?.value || "5")
      const confidenceSource = answers.find(a => a.stepId === "q2_confidence_source")?.value || ""
      const doubtTriggers = answers.find(a => a.stepId === "q3_doubt_triggers")?.value || ""
      const strengthsReflection = answers.find(a => a.stepId === "q4_strengths")?.value || ""

      let feedback = "## Confidence Building Assessment\n\n"

      if (confidenceLevel >= 8) {
        feedback += "💪 **Strong trading confidence!** Your high confidence level suggests you trust your abilities and preparation.\n\n"
      } else if (confidenceLevel >= 5) {
        feedback += "🔨 **Building confidence.** You're on the right track. Consistent execution will strengthen your self-belief.\n\n"
      } else {
        feedback += "🌱 **Developing confidence.** Low confidence is common but can be systematically improved through preparation and small wins.\n\n"
      }

      feedback += "### Confidence Source Analysis:\n"
      if (confidenceSource.toLowerCase().includes("preparation") || confidenceSource.toLowerCase().includes("plan")) {
        feedback += "🎯 **Preparation-based confidence!** This is the most sustainable form of trading confidence.\n\n"
      } else if (confidenceSource.toLowerCase().includes("wins") || confidenceSource.toLowerCase().includes("profit")) {
        feedback += "⚠️ **Results-based confidence.** While wins feel good, base your confidence on process rather than outcomes.\n\n"
      }

      feedback += "### Doubt Triggers:\n"
      if (doubtTriggers) {
        feedback += `"${doubtTriggers}"\n\n`
        feedback += "Identifying your doubt triggers is the first step to managing them effectively.\n\n"
      }

      feedback += "### Your Trading Strengths:\n"
      if (strengthsReflection) {
        feedback += `"${strengthsReflection}"\n\n`
        feedback += "Recognizing your strengths builds a foundation for unshakeable confidence.\n\n"
      }

      feedback += "### Confidence Building Strategies:\n"
      feedback += "- **Preparation Ritual**: Thorough analysis builds natural confidence\n"
      feedback += "- **Small Wins**: Start with smaller position sizes to build success patterns\n"
      feedback += "- **Process Focus**: Measure success by plan execution, not just profits\n"
      feedback += "- **Strength Inventory**: Regularly review what you do well\n"
      feedback += "- **Visualization**: Mental rehearsal of successful trades\n\n"

      feedback += "**Remember:** True trading confidence comes from competence, not luck. Focus on building skills and the confidence will follow naturally."

      return feedback
    }
  }

  const generator = feedbackTemplates[exercise.id as keyof typeof feedbackTemplates]
  if (generator) {
    return generator(answers)
  }

  return "Thank you for completing this exercise. Your responses have been recorded and will contribute to your overall progress tracking."
}

// Exercise Definitions with Enhanced Content
const exerciseDefinitions: Exercise[] = [
  {
    id: "emotional-checkin",
    title: "Emotional Check-in",
    description: "Assess your current emotional state before trading",
    category: "emotional-control",
    difficulty: "beginner",
    duration: 5,
    icon: Heart,
    outcomeMetrics: ["score", "emotionalState"],
    feedbackGenerator: "generateEmotionalCheckinFeedback",
    learningObjectives: [
      "Develop emotional self-awareness",
      "Identify optimal trading states",
      "Build pre-trading routines"
    ],
    coachingInsights: [
      "Emotional awareness is the foundation of trading psychology",
      "Most trading mistakes stem from unrecognized emotional states",
      "Consistent check-ins build emotional intelligence over time"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Welcome to the Emotional Check-in. This exercise helps you become aware of your emotional state before you start trading. Research shows that traders who regularly assess their emotions perform 23% better than those who don't.",
        tips: [
          "Be completely honest with yourself",
          "There are no right or wrong answers",
          "This data helps you identify your optimal trading states"
        ]
      },
      {
        id: "q1_stress_level",
        type: "question",
        content: "On a scale of 1 to 10, how stressed do you feel right now?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(Completely calm)' : i === 4 ? '(Moderate)' : i === 9 ? '(Extremely stressed)' : ''}` 
        })),
        tips: [
          "Stress levels above 7 often lead to impulsive trading",
          "Optimal trading typically occurs at stress levels 3-5",
          "High stress narrows your focus and reduces creativity"
        ]
      },
      {
        id: "q2_focus_level",
        type: "question",
        content: "How focused do you feel on your trading plan right now?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(Very distracted)' : i === 4 ? '(Moderate focus)' : i === 9 ? '(Laser focused)' : ''}` 
        })),
        tips: [
          "Focus levels below 6 suggest you should review your plan",
          "Distractions are the enemy of consistent execution",
          "High focus correlates with better risk management"
        ]
      },
      {
        id: "q3_confidence",
        type: "question",
        content: "How confident do you feel about your trading decisions today?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(No confidence)' : i === 4 ? '(Moderate)' : i === 9 ? '(Very confident)' : ''}` 
        })),
        tips: [
          "Confidence should be based on preparation, not hope",
          "Overconfidence (9-10) can be as dangerous as underconfidence",
          "Healthy confidence comes from following proven processes"
        ]
      },
      {
        id: "reflection_1",
        type: "reflection",
        content: "Take a moment to reflect on your responses. What factors are contributing to your current emotional state? Consider recent events, market conditions, or personal circumstances. This awareness is the first step toward emotional mastery.",
        minDuration: 60,
        tips: [
          "Notice patterns between your emotions and external events",
          "Identify what you can and cannot control",
          "Remember that emotions are temporary and changeable"
        ]
      },
      {
        id: "input_journal",
        type: "input",
        content: "Write down any thoughts or feelings that came up during your reflection. This journal entry will help you track emotional patterns over time.",
        inputType: "textarea",
        placeholder: "e.g., I feel anxious about recent market volatility, but I'm confident in my risk management plan. I notice I'm more stressed when I haven't reviewed my watchlist...",
        tips: [
          "Be specific about what you're feeling and why",
          "Include both positive and negative emotions",
          "Look for connections between emotions and trading performance"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Generating your personalized emotional assessment..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Excellent work! You've completed your emotional check-in. Regular emotional awareness is what separates professional traders from amateurs. Your responses will help us provide personalized coaching and track your emotional development over time."
      }
    ]
  },
  {
    id: "risk-visualization",
    title: "Risk Visualization",
    description: "Visualize and mentally prepare for potential trading risks",
    category: "risk-management",
    difficulty: "intermediate",
    duration: 15,
    icon: Target,
    outcomeMetrics: ["score", "completionTime", "riskAwareness"],
    feedbackGenerator: "generateRiskVisualizationFeedback",
    learningObjectives: [
      "Build mental resilience to losses",
      "Improve risk assessment skills",
      "Develop systematic response to outcomes"
    ],
    coachingInsights: [
      "Mental rehearsal reduces emotional shock during actual trading",
      "Visualization activates the same neural pathways as real experiences",
      "Prepared traders make better decisions under pressure"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "This exercise will help you mentally prepare for potential risks in your trading. Visualization is a powerful tool used by professional traders, athletes, and performers to build confidence and reduce anxiety. Studies show that mental rehearsal can improve performance by up to 16%."
      },
      {
        id: "q1_trade_setup",
        type: "input",
        content: "Describe a trade setup you're currently considering or recently took. Include the instrument, direction, entry, stop loss, and take profit levels:",
        inputType: "textarea",
        placeholder: "e.g., Long EURUSD at 1.0850, targeting 1.0950 (100 pips profit), stop loss at 1.0800 (50 pips risk), 1:2 risk-reward ratio based on daily support level..."
      },
      {
        id: "q2_risk_amount",
        type: "question",
        content: "What percentage of your account are you risking on this trade?",
        inputType: "radio",
        options: [
          { value: "0.5", label: "0.5% or less (Very conservative)" },
          { value: "1", label: "1% (Conservative)" },
          { value: "2", label: "2% (Moderate)" },
          { value: "3", label: "3% (Aggressive)" },
          { value: "5", label: "5% (Very aggressive)" },
          { value: "more", label: "More than 5% (Dangerous)" }
        ],
        tips: [
          "Professional traders typically risk 1-2% per trade",
          "Risking more than 5% can lead to account destruction",
          "Position size should be based on stop loss distance, not gut feeling"
        ]
      },
      {
        id: "visualization_1",
        type: "reflection",
        content: "Close your eyes and visualize your trade going against you. Imagine watching the price move steadily toward your stop loss. See the red numbers on your screen. Feel the disappointment and frustration. Notice any physical sensations - tension in your shoulders, tightness in your chest. Sit with these feelings without trying to change them.",
        minDuration: 90,
        tips: [
          "Don't avoid the uncomfortable feelings - experience them fully",
          "Notice how your body responds to imagined losses",
          "This mental rehearsal builds emotional resilience"
        ]
      },
      {
        id: "q3_loss_reaction",
        type: "input",
        content: "How would you react if this trade hits your stop loss? Describe both your emotional and practical response:",
        inputType: "textarea",
        placeholder: "e.g., I would feel disappointed but remind myself that losses are part of trading. I would review my analysis to see if I missed anything, then look for the next high-probability setup. I would not increase my position size to 'get back' the loss..."
      },
      {
        id: "visualization_2",
        type: "reflection",
        content: "Now visualize your trade going in your favor. See the price moving smoothly toward your target. Watch your profit grow. Feel the satisfaction of a well-executed trade. Notice the confidence that comes from following your plan. Imagine how you'll manage this success - will you get overconfident or stay disciplined?",
        minDuration: 90,
        tips: [
          "Success can be as challenging as failure to handle",
          "Visualize staying disciplined even when winning",
          "Feel the satisfaction of process execution, not just profits"
        ]
      },
      {
        id: "q4_success_plan",
        type: "input",
        content: "If this trade reaches your target, how will you manage your success? What's your plan for the next trade?",
        inputType: "textarea",
        placeholder: "e.g., I'll take partial profits at my first target, move my stop to breakeven, and let the rest run to my final target. I won't increase my risk on the next trade just because this one worked. I'll look for similar high-probability setups..."
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Analyzing your risk visualization responses..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Outstanding work! You've mentally rehearsed both success and failure scenarios. This preparation is what separates professional traders from amateurs. You're now better equipped to handle whatever the market throws at you with emotional equilibrium and clear thinking."
      }
    ]
  },
  {
    id: "mindful-trading",
    title: "Mindful Trading Meditation",
    description: "Center your mind and reduce trading anxiety through guided meditation",
    category: "mindfulness",
    difficulty: "beginner",
    duration: 10,
    icon: Brain,
    outcomeMetrics: ["completionTime", "mindfulnessLevel"],
    feedbackGenerator: "generateMindfulnessFeedback",
    learningObjectives: [
      "Develop present-moment awareness",
      "Reduce trading anxiety and stress",
      "Build emotional regulation skills"
    ],
    coachingInsights: [
      "Mindfulness meditation physically changes brain structure",
      "Regular practice improves emotional regulation by 40%",
      "Present-moment awareness is crucial for reading market conditions"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "This guided meditation will help you center your mind and approach trading with clarity and calm. Neuroscience research shows that just 10 minutes of mindfulness practice can reduce cortisol (stress hormone) levels by 25% and improve focus for up to 4 hours. Find a comfortable position and prepare to cultivate the mental state of a professional trader."
      },
      {
        id: "breathing_1",
        type: "reflection",
        content: "Close your eyes and take three deep breaths. Inhale slowly for 4 counts, hold for 4 counts, then exhale for 6 counts. Feel your nervous system shifting from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest). This is the optimal state for clear decision-making.",
        minDuration: 60,
        tips: [
          "Longer exhales activate the parasympathetic nervous system",
          "Focus on the sensation of breath entering and leaving your body",
          "If your mind wanders, gently return attention to your breath"
        ]
      },
      {
        id: "body_scan",
        type: "reflection",
        content: "Now scan your body from head to toe. Notice any tension in your forehead, jaw, shoulders, or hands. These are common areas where traders hold stress. Consciously relax each area. Remember: a tense body creates a tense mind, and tense minds make poor trading decisions.",
        minDuration: 90,
        tips: [
          "Tension often accumulates without our awareness",
          "Physical relaxation directly impacts mental clarity",
          "Notice how relaxation affects your breathing"
        ]
      },
      {
        id: "market_visualization",
        type: "reflection",
        content: "Visualize yourself approaching the markets with complete calm and clarity. See yourself sitting at your trading station, breathing deeply, feeling centered. Watch yourself analyzing charts with patience, waiting for high-probability setups. Feel the confidence that comes from being fully present and prepared.",
        minDuration: 120,
        tips: [
          "Visualization activates the same neural pathways as real experience",
          "See yourself making decisions from wisdom, not emotion",
          "Feel the peace that comes from accepting market uncertainty"
        ]
      },
      {
        id: "intention_setting",
        type: "input",
        content: "Set a clear intention for your trading session today. What mindset do you want to maintain? How do you want to respond to both profits and losses?",
        inputType: "textarea",
        placeholder: "e.g., I will trade with patience and discipline, following my plan regardless of market noise. I will treat each trade as a single event in a long series, staying emotionally neutral to outcomes while remaining fully engaged in the process...",
        tips: [
          "Intentions are more powerful than goals",
          "Focus on process rather than outcomes",
          "Make your intention specific and actionable"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Processing your mindfulness session..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Beautiful work! You've completed your mindful trading meditation. You've activated your parasympathetic nervous system, reduced stress hormones, and set a clear intention. Carry this sense of calm and clarity into your trading session. Remember: you can return to this centered state with just three conscious breaths."
      }
    ]
  },
  {
    id: "fomo-resistance",
    title: "FOMO Resistance Training",
    description: "Build resistance against Fear of Missing Out in trading decisions",
    category: "behavioral-patterns",
    difficulty: "advanced",
    duration: 20,
    icon: TrendingUp,
    outcomeMetrics: ["score", "resistanceLevel"],
    feedbackGenerator: "generateFomoResistanceFeedback",
    learningObjectives: [
      "Identify FOMO triggers and patterns",
      "Develop systematic resistance strategies",
      "Build patience and discipline"
    ],
    coachingInsights: [
      "FOMO is one of the most destructive emotions in trading",
      "Systematic resistance training can reduce impulsive trades by 60%",
      "The best opportunities often come to those who wait"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Fear of Missing Out (FOMO) is one of the most destructive emotions in trading. It leads to impulsive decisions, poor risk management, and chasing price action. This exercise will help you build systematic resistance to FOMO and develop the patience that separates professional traders from amateurs."
      },
      {
        id: "q1_fomo_frequency",
        type: "question",
        content: "How often do you experience FOMO when trading or watching the markets?",
        inputType: "radio",
        options: [
          { value: "never", label: "Never - I stick to my plan" },
          { value: "rarely", label: "Rarely - Only in extreme market moves" },
          { value: "sometimes", label: "Sometimes - When I see big moves" },
          { value: "often", label: "Often - I frequently feel like I'm missing out" },
          { value: "always", label: "Always - I constantly chase opportunities" }
        ],
        tips: [
          "Honesty is crucial for developing effective resistance strategies",
          "FOMO frequency often correlates with overtrading",
          "Awareness is the first step to building resistance"
        ]
      },
      {
        id: "q2_trigger_situation",
        type: "input",
        content: "Describe a recent situation where you experienced strong FOMO. What triggered it?",
        inputType: "textarea",
        placeholder: "e.g., I saw Bitcoin breaking to new highs on social media and felt like I had to get in immediately, even though it wasn't part of my trading plan. The trigger was seeing others posting profits...",
        tips: [
          "Common triggers include social media, news, and breakouts",
          "Identifying triggers helps you prepare resistance strategies",
          "External validation often amplifies FOMO feelings"
        ]
      },
      {
        id: "reflection_1",
        type: "reflection",
        content: "Think about the last time you acted on FOMO. What was the outcome? How did you feel afterward? Consider both the financial and emotional consequences. This reflection helps you connect FOMO actions with their real costs.",
        minDuration: 90,
        tips: [
          "FOMO trades often result in losses or suboptimal entries",
          "The emotional cost of FOMO can be higher than financial cost",
          "Learning from past FOMO experiences builds future resistance"
        ]
      },
      {
        id: "q3_resistance_strategy",
        type: "input",
        content: "When you feel FOMO in the future, what specific strategy will you use to resist it?",
        inputType: "textarea",
        placeholder: "e.g., I will take three deep breaths, close my trading platform for 5 minutes, and ask myself: 'Does this opportunity fit my trading plan?' If not, I will write down why I wanted to take the trade and look for similar setups that do fit my criteria...",
        tips: [
          "Having a written strategy makes resistance more likely",
          "Physical actions (breathing, walking) can break FOMO momentum",
          "Questioning techniques help engage rational thinking"
        ]
      },
      {
        id: "visualization_1",
        type: "reflection",
        content: "Visualize yourself in a high FOMO situation. See the market moving rapidly, feel the urgency and excitement. Now practice your resistance strategy. See yourself taking deep breaths, stepping back, and making a rational decision. Feel the satisfaction of maintaining discipline.",
        minDuration: 120,
        tips: [
          "Mental rehearsal strengthens real-world resistance",
          "Visualize both the trigger and your response",
          "Feel the pride that comes from disciplined behavior"
        ]
      },
      {
        id: "q4_opportunity_cost",
        type: "input",
        content: "What do you give up when you chase FOMO trades? Consider the opportunity cost of impulsive decisions:",
        inputType: "textarea",
        placeholder: "e.g., When I chase FOMO trades, I give up my planned setups, increase my risk beyond comfortable levels, and often miss better opportunities that fit my strategy. I also lose confidence in my systematic approach...",
        tips: [
          "Opportunity cost thinking is a powerful FOMO deterrent",
          "Consider both immediate and long-term costs",
          "Include emotional and strategic costs, not just financial"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Analyzing your FOMO patterns and resistance strategies..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Excellent work on building FOMO resistance! You've identified your triggers, developed a resistance strategy, and mentally rehearsed disciplined responses. Remember: the market will always provide opportunities. Missing one trade is infinitely better than taking ten bad ones. Your patience and discipline will compound over time."
      }
    ]
  },
  {
    id: "loss-acceptance",
    title: "Loss Acceptance Training",
    description: "Learn to accept and process trading losses in a healthy way",
    category: "behavioral-patterns",
    difficulty: "intermediate",
    duration: 12,
    icon: Heart,
    outcomeMetrics: ["score", "acceptanceLevel"],
    feedbackGenerator: "generateLossAcceptanceFeedback",
    learningObjectives: [
      "Develop healthy loss processing",
      "Reduce emotional impact of losses",
      "Build resilience and quick recovery"
    ],
    coachingInsights: [
      "Loss acceptance is crucial for long-term trading success",
      "Emotional recovery time directly impacts performance",
      "The best traders lose money regularly but systematically"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Learning to accept losses is one of the most important skills in trading. Every successful trader loses money regularly - the difference is how quickly and effectively they process these losses. This exercise will help you develop a healthy relationship with losses and build the emotional resilience needed for long-term success."
      },
      {
        id: "q1_loss_reaction",
        type: "input",
        content: "Describe how you typically react when a trade goes against you and hits your stop loss:",
        inputType: "textarea",
        placeholder: "e.g., I usually feel frustrated and disappointed. Sometimes I want to immediately enter another trade to 'get back' the loss. I might review the trade obsessively, looking for what I did wrong...",
        tips: [
          "Be honest about your emotional reactions",
          "Common reactions include anger, frustration, and revenge trading",
          "Awareness of your patterns is the first step to changing them"
        ]
      },
      {
        id: "q2_recovery_time",
        type: "question",
        content: "How long does it typically take you to emotionally recover from a losing trade?",
        inputType: "radio",
        options: [
          { value: "immediately", label: "Immediately - I accept it and move on" },
          { value: "minutes", label: "A few minutes - Quick processing" },
          { value: "hours", label: "Several hours - Need time to process" },
          { value: "days", label: "Days - Losses affect me for a while" },
          { value: "weeks", label: "Weeks or longer - Very difficult to move on" }
        ],
        tips: [
          "Faster recovery leads to better subsequent decisions",
          "Extended recovery time can create trading paralysis",
          "Professional traders typically recover within minutes"
        ]
      },
      {
        id: "reflection_1",
        type: "reflection",
        content: "Think about your worst trading loss. Remember the emotions you felt - the disappointment, frustration, maybe anger. Now imagine that same loss as simply the cost of doing business, like a restaurant paying for ingredients. Feel how this reframe changes your emotional response.",
        minDuration: 90,
        tips: [
          "Reframing losses as business costs reduces emotional impact",
          "Every business has operating expenses - losses are yours",
          "This perspective shift is used by all professional traders"
        ]
      },
      {
        id: "q3_learning_approach",
        type: "input",
        content: "How do you extract learning from your losing trades? Describe your review process:",
        inputType: "textarea",
        placeholder: "e.g., I review the trade setup to see if it met my criteria. I check if I followed my risk management rules. I look for any emotional decisions I made. I note any market conditions I might have missed...",
        tips: [
          "Systematic review turns losses into learning opportunities",
          "Focus on process, not just the outcome",
          "Look for both technical and emotional factors"
        ]
      },
      {
        id: "visualization_1",
        type: "reflection",
        content: "Visualize taking a loss on your next trade. See the red numbers, feel the initial disappointment, then watch yourself immediately accepting it. See yourself calmly reviewing what happened, extracting the lesson, and confidently looking for the next opportunity. Feel the strength that comes from this mature response.",
        minDuration: 120,
        tips: [
          "Mental rehearsal prepares you for real losses",
          "Visualize the entire process from loss to recovery",
          "Feel the confidence that comes from systematic processing"
        ]
      },
      {
        id: "q4_acceptance_affirmation",
        type: "input",
        content: "Write a personal affirmation you can use when facing losses. Make it specific to your trading:",
        inputType: "textarea",
        placeholder: "e.g., 'This loss was planned and budgeted. It's the cost of pursuing profitable opportunities. I followed my plan, managed my risk, and will learn from this experience. I am one step closer to my next winning trade.'",
        tips: [
          "Personal affirmations help reframe losses quickly",
          "Make it specific to your trading style and goals",
          "Practice saying it until it becomes automatic"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Evaluating your loss acceptance and processing strategies..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Outstanding work on developing loss acceptance! You've explored your current patterns, practiced reframing techniques, and created tools for faster recovery. Remember: losses are not failures - they're the price of admission to the game of trading. Your ability to accept and learn from losses will determine your long-term success."
      }
    ]
  },
  {
    id: "confidence-building",
    title: "Confidence Building",
    description: "Build unshakeable confidence in your trading abilities",
    category: "confidence",
    difficulty: "advanced",
    duration: 25,
    icon: Star,
    outcomeMetrics: ["score", "confidenceLevel"],
    feedbackGenerator: "generateConfidenceBuildingFeedback",
    learningObjectives: [
      "Identify sources of trading confidence",
      "Build systematic confidence practices",
      "Develop resilience against doubt"
    ],
    coachingInsights: [
      "True confidence comes from competence, not luck",
      "Systematic confidence building improves performance by 35%",
      "Confident traders execute their plans more consistently"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Trading confidence is not about being fearless or always right - it's about trusting your preparation, process, and ability to handle whatever the market presents. This exercise will help you build genuine, sustainable confidence based on competence rather than luck or recent results."
      },
      {
        id: "q1_confidence_level",
        type: "question",
        content: "On a scale of 1-10, how confident do you feel in your trading abilities right now?",
        inputType: "radio",
        options: Array.from({ length: 10 }, (_, i) => ({ 
          value: String(i + 1), 
          label: `${i + 1} ${i === 0 ? '(No confidence)' : i === 4 ? '(Moderate)' : i === 9 ? '(Very confident)' : ''}` 
        })),
        tips: [
          "Confidence should be based on preparation and process",
          "Overconfidence can be as dangerous as underconfidence",
          "Healthy confidence includes accepting uncertainty"
        ]
      },
      {
        id: "q2_confidence_source",
        type: "input",
        content: "What gives you the most confidence when trading? Describe the sources of your trading confidence:",
        inputType: "textarea",
        placeholder: "e.g., I feel most confident when I've done thorough analysis, when my risk is clearly defined, and when I'm following my proven strategy. My confidence comes from preparation rather than hoping for luck...",
        tips: [
          "Preparation-based confidence is most sustainable",
          "Process confidence is better than results-based confidence",
          "Multiple confidence sources create stability"
        ]
      },
      {
        id: "q3_doubt_triggers",
        type: "input",
        content: "What situations or thoughts trigger self-doubt in your trading?",
        inputType: "textarea",
        placeholder: "e.g., I start doubting myself after a series of losses, when I see other traders posting big wins, or when I'm in a trade that's moving against me. Market volatility also makes me question my analysis...",
        tips: [
          "Identifying doubt triggers helps you prepare responses",
          "Common triggers include losses, social comparison, and volatility",
          "Doubt is normal - managing it is what matters"
        ]
      },
      {
        id: "reflection_1",
        type: "reflection",
        content: "Reflect on your best trading period. What were you doing differently? How did you feel? What gave you confidence during that time? Connect with that feeling of competence and trust in your abilities.",
        minDuration: 90,
        tips: [
          "Past success provides evidence of your capabilities",
          "Identify the specific factors that created confidence",
          "Use these insights to recreate optimal states"
        ]
      },
      {
        id: "q4_strengths",
        type: "input",
        content: "List your top 3 trading strengths. What do you do well consistently?",
        inputType: "textarea",
        placeholder: "e.g., 1) I'm excellent at risk management and never risk more than planned. 2) I'm patient and wait for high-probability setups. 3) I keep detailed records and learn from every trade...",
        tips: [
          "Recognizing strengths builds natural confidence",
          "Focus on process strengths, not just results",
          "Strengths are the foundation for building more skills"
        ]
      },
      {
        id: "visualization_1",
        type: "reflection",
        content: "Visualize yourself trading with complete confidence. See yourself analyzing the markets calmly, entering trades with conviction, and managing positions with discipline. Feel the quiet confidence that comes from thorough preparation and proven competence.",
        minDuration: 120,
        tips: [
          "Visualization builds neural pathways for confident behavior",
          "See yourself handling both wins and losses with equanimity",
          "Feel the calm strength of true confidence"
        ]
      },
      {
        id: "q5_confidence_ritual",
        type: "input",
        content: "Design a pre-trading confidence ritual. What will you do before each session to build confidence?",
        inputType: "textarea",
        placeholder: "e.g., I will review my trading plan, remind myself of my strengths, visualize successful execution, and set a clear intention for the session. I'll also review my recent wins to reinforce my capabilities...",
        tips: [
          "Rituals create consistent confidence states",
          "Include both mental and physical elements",
          "Make it specific and repeatable"
        ]
      },
      {
        id: "q6_growth_mindset",
        type: "input",
        content: "How will you maintain confidence while continuing to learn and grow as a trader?",
        inputType: "textarea",
        placeholder: "e.g., I'll focus on process improvement rather than perfection. I'll celebrate small wins and learning milestones. I'll remember that even expert traders are always learning and adapting...",
        tips: [
          "Growth mindset maintains confidence during learning",
          "Focus on progress, not perfection",
          "Learning is a sign of strength, not weakness"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Analyzing your confidence patterns and building strategies..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Exceptional work on building trading confidence! You've identified your confidence sources, recognized your strengths, and created systems for maintaining confidence. Remember: true confidence comes from competence, preparation, and self-awareness. Your confidence will grow naturally as you continue to develop your skills and execute your plan consistently."
      }
    ]
  },
  {
    id: "performance-anxiety",
    title: "Performance Anxiety Management",
    description: "Overcome performance pressure and trade with calm focus",
    category: "confidence",
    difficulty: "intermediate",
    duration: 18,
    icon: Shield,
    outcomeMetrics: ["score", "anxietyLevel"],
    feedbackGenerator: "generatePerformanceAnxietyFeedback",
    learningObjectives: [
      "Identify performance anxiety triggers",
      "Develop calming techniques",
      "Build pressure-resistant mindset"
    ],
    coachingInsights: [
      "Performance anxiety often stems from outcome attachment",
      "Pressure-resistant traders focus on process over results",
      "Anxiety management techniques improve execution by 40%"
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        content: "Performance anxiety in trading often comes from putting too much pressure on individual trades or trading sessions. This exercise will help you develop techniques to manage pressure, stay calm under stress, and maintain optimal performance regardless of external expectations."
      },
      {
        id: "q1_anxiety_triggers",
        type: "input",
        content: "What situations in trading make you feel most anxious or pressured?",
        inputType: "textarea",
        placeholder: "e.g., When I'm in a large position, when I've had several losses in a row, when I'm trading with money I can't afford to lose, or when others are watching my performance...",
        tips: [
          "Common triggers include position size, recent losses, and social pressure",
          "Identifying triggers is the first step to managing them",
          "External pressure often amplifies internal anxiety"
        ]
      },
      {
        id: "q2_physical_symptoms",
        type: "question",
        content: "How does trading anxiety typically manifest in your body?",
        inputType: "radio",
        options: [
          { value: "tension", label: "Muscle tension (shoulders, jaw, hands)" },
          { value: "breathing", label: "Shallow or rapid breathing" },
          { value: "heart", label: "Increased heart rate" },
          { value: "stomach", label: "Stomach discomfort or nausea" },
          { value: "multiple", label: "Multiple physical symptoms" },
          { value: "none", label: "No noticeable physical symptoms" }
        ],
        tips: [
          "Physical awareness helps you catch anxiety early",
          "Body symptoms often precede mental anxiety",
          "Physical techniques can quickly reduce anxiety"
        ]
      },
      {
        id: "breathing_exercise",
        type: "reflection",
        content: "Practice the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat this cycle 4 times. This activates your parasympathetic nervous system and reduces anxiety within minutes.",
        minDuration: 120,
        tips: [
          "The 4-7-8 technique is scientifically proven to reduce anxiety",
          "Longer exhales activate the relaxation response",
          "Practice this when calm so it's available when anxious"
        ]
      },
      {
        id: "q3_pressure_source",
        type: "question",
        content: "Where does most of your trading pressure come from?",
        inputType: "radio",
        options: [
          { value: "financial", label: "Financial pressure - need to make money" },
          { value: "social", label: "Social pressure - others' expectations" },
          { value: "self", label: "Self-imposed pressure - perfectionism" },
          { value: "time", label: "Time pressure - limited opportunities" },
          { value: "performance", label: "Performance pressure - maintaining results" }
        ],
        tips: [
          "Different pressure sources require different management strategies",
          "Self-imposed pressure is often the most intense",
          "Understanding the source helps you address the root cause"
        ]
      },
      {
        id: "reframing_exercise",
        type: "input",
        content: "Rewrite a pressure-inducing thought into a process-focused statement. For example: 'I must make money today' becomes 'I will execute my plan with discipline today':",
        inputType: "textarea",
        placeholder: "Pressure thought: 'I can't afford to lose on this trade'\nReframed: 'I will manage this trade according to my risk management rules, accepting whatever outcome occurs'",
        tips: [
          "Process focus reduces outcome anxiety",
          "Reframing changes your relationship with pressure",
          "Practice reframing until it becomes automatic"
        ]
      },
      {
        id: "visualization_calm",
        type: "reflection",
        content: "Visualize yourself trading in a high-pressure situation with complete calm. See yourself breathing deeply, thinking clearly, and executing your plan flawlessly. Feel the quiet confidence that comes from focusing on process rather than outcomes.",
        minDuration: 90,
        tips: [
          "Mental rehearsal builds real-world calm",
          "Visualize specific pressure situations you face",
          "Feel the calm strength of process focus"
        ]
      },
      {
        id: "q4_calm_anchors",
        type: "input",
        content: "Create 3 'calm anchors' - specific things you can do to instantly reduce anxiety while trading:",
        inputType: "textarea",
        placeholder: "1) Take 3 deep breaths and relax my shoulders\n2) Remind myself 'This is just one trade in thousands'\n3) Look at my risk management rules to confirm I'm protected",
        tips: [
          "Anchors should be quick and practical",
          "Combine physical and mental techniques",
          "Practice anchors when calm so they're available when anxious"
        ]
      },
      {
        id: "feedback",
        type: "feedback",
        content: "Analyzing your anxiety patterns and management strategies..."
      },
      {
        id: "summary",
        type: "summary",
        content: "Excellent work on developing anxiety management skills! You've identified your triggers, learned calming techniques, and created practical tools for staying calm under pressure. Remember: anxiety is normal, but it doesn't have to control your trading. Your ability to stay calm and focused will give you a significant edge in the markets."
      }
    ]
  }
]

// Storage utilities
const STORAGE_KEY = 'profitz_exercise_progress'

const saveProgressToStorage = (progress: UserExerciseProgress[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  } catch (error) {
    console.error('Failed to save exercise progress:', error)
  }
}

const loadProgressFromStorage = (): UserExerciseProgress[] => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.map((progress: any) => ({
          ...progress,
          lastAttemptDate: new Date(progress.lastAttemptDate),
          answers: progress.answers.map((answer: any) => ({
            ...answer,
            timestamp: new Date(answer.timestamp)
          }))
        }))
      }
    }
  } catch (error) {
    console.error('Failed to load exercise progress:', error)
  }
  return []
}

// Categories and filters
const categories = [
  { id: "all", name: "All" },
  { id: "emotional-control", name: "Emotional Control" },
  { id: "risk-management", name: "Risk Management" },
  { id: "behavioral-patterns", name: "Behavioral Patterns" },
  { id: "mindfulness", name: "Mindfulness" },
  { id: "confidence", name: "Confidence" },
]

const difficulties = [
  { id: "beginner", name: "Beginner", color: "bg-green-100 text-green-800" },
  { id: "intermediate", name: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
  { id: "advanced", name: "Advanced", color: "bg-red-100 text-red-800" },
]

export function InteractiveExercises() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [userProgress, setUserProgress] = useState<UserExerciseProgress[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const [reflectionTimer, setReflectionTimer] = useState<number>(0)
  const [isReflectionActive, setIsReflectionActive] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [generatedFeedback, setGeneratedFeedback] = useState<string>("")
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load progress on component mount
  useEffect(() => {
    const storedProgress = loadProgressFromStorage()
    setUserProgress(storedProgress)
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    saveProgressToStorage(userProgress)
  }, [userProgress])

  // Timer effect for reflection steps
  useEffect(() => {
    if (isReflectionActive && reflectionTimer > 0) {
      timerRef.current = setTimeout(() => {
        setReflectionTimer(prev => prev - 1)
      }, 1000)
    } else if (reflectionTimer === 0 && isReflectionActive) {
      setIsReflectionActive(false)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [reflectionTimer, isReflectionActive])

  const getCurrentExercise = () => {
    return exerciseDefinitions.find(ex => ex.id === selectedExercise)
  }

  const getCurrentProgress = () => {
    return userProgress.find(p => p.exerciseId === selectedExercise)
  }

  const startExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId)
    setCurrentStepIndex(0)
    setCurrentAnswer("")
    setShowFeedback(false)
    setGeneratedFeedback("")
    
    // Create or update progress
    const existingProgress = userProgress.find(p => p.exerciseId === exerciseId)
    if (!existingProgress) {
      const newProgress: UserExerciseProgress = {
        exerciseId,
        lastAttemptDate: new Date(),
        completionStatus: "in_progress",
        currentStepId: exerciseDefinitions.find(ex => ex.id === exerciseId)?.steps[0]?.id || "",
        answers: []
      }
      setUserProgress(prev => [...prev, newProgress])
    } else {
      setUserProgress(prev => prev.map(p => 
        p.exerciseId === exerciseId 
          ? { ...p, completionStatus: "in_progress", lastAttemptDate: new Date() }
          : p
      ))
    }
  }

  const saveAnswer = (stepId: string, value: any) => {
    setUserProgress(prev => prev.map(p => 
      p.exerciseId === selectedExercise
        ? {
            ...p,
            answers: [
              ...p.answers.filter(a => a.stepId !== stepId),
              { stepId, value, timestamp: new Date() }
            ]
          }
        : p
    ))
  }

  const generateFeedback = async () => {
    const exercise = getCurrentExercise()
    const progress = getCurrentProgress()
    
    if (!exercise || !progress) return

    setIsGeneratingFeedback(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const feedback = generatePersonalizedFeedback(exercise, progress.answers)
    setGeneratedFeedback(feedback)
    setIsGeneratingFeedback(false)
    setShowFeedback(true)
    
    // Save feedback to progress
    setUserProgress(prev => prev.map(p => 
      p.exerciseId === selectedExercise
        ? { ...p, feedbackReceived: feedback }
        : p
    ))
  }

  const nextStep = async () => {
    const exercise = getCurrentExercise()
    if (!exercise) return

    const currentStep = exercise.steps[currentStepIndex]
    
    // Save current answer if there is one
    if (currentAnswer.trim()) {
      saveAnswer(currentStep.id, currentAnswer)
    }

    // Handle feedback step
    if (currentStep.type === "feedback") {
      await generateFeedback()
    }

    // Move to next step or complete exercise
    if (currentStepIndex < exercise.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
      setCurrentAnswer("")
    } else {
      // Complete exercise
      setUserProgress(prev => prev.map(p => 
        p.exerciseId === selectedExercise
          ? { ...p, completionStatus: "completed" }
          : p
      ))
      setSelectedExercise(null)
      setCurrentStepIndex(0)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
      setCurrentAnswer("")
      setShowFeedback(false)
    }
  }

  const startReflection = (duration: number) => {
    setReflectionTimer(duration)
    setIsReflectionActive(true)
  }

  const exitExercise = () => {
    setSelectedExercise(null)
    setCurrentStepIndex(0)
    setCurrentAnswer("")
    setIsReflectionActive(false)
    setReflectionTimer(0)
    setShowFeedback(false)
    setGeneratedFeedback("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate summary statistics
  const completedCount = userProgress.filter(p => p.completionStatus === "completed").length
  const totalMinutes = userProgress.reduce((sum, p) => {
    const exercise = exerciseDefinitions.find(ex => ex.id === p.exerciseId)
    return sum + (exercise?.duration || 0)
  }, 0)
  const avgScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + (p.score || 75), 0) / userProgress.length)
    : 0

  const filteredExercises = exerciseDefinitions.filter(
    (exercise) => selectedCategory === "all" || exercise.category === selectedCategory,
  )

  // Exercise execution view
  if (selectedExercise) {
    const exercise = getCurrentExercise()
    const progress = getCurrentProgress()
    
    if (!exercise) return null

    const currentStep = exercise.steps[currentStepIndex]
    const stepProgress = ((currentStepIndex + 1) / exercise.steps.length) * 100

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={exitExercise} className="flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>Exit</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{exercise.title}</h1>
              <p className="text-muted-foreground">{exercise.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={difficulties.find((d) => d.id === exercise.difficulty)?.color}>
              {exercise.difficulty}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {exercise.duration} min
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStepIndex + 1} of {exercise.steps.length}</span>
            <span>{Math.round(stepProgress)}% Complete</span>
          </div>
          <Progress value={stepProgress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="min-h-[500px]">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Step Icon and Type */}
              <div className="flex items-center space-x-3">
                {currentStep.type === "instruction" && <Lightbulb className="h-6 w-6 text-blue-500" />}
                {currentStep.type === "question" && <MessageCircle className="h-6 w-6 text-green-500" />}
                {currentStep.type === "input" && <MessageCircle className="h-6 w-6 text-purple-500" />}
                {currentStep.type === "reflection" && <Timer className="h-6 w-6 text-orange-500" />}
                {currentStep.type === "feedback" && <Sparkles className="h-6 w-6 text-yellow-500" />}
                {currentStep.type === "summary" && <CheckCircle className="h-6 w-6 text-green-600" />}
                <Badge variant="outline" className="capitalize">
                  {currentStep.type}
                </Badge>
              </div>

              {/* Step Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{currentStep.content}</h3>

                {/* Coaching Tips */}
                {currentStep.tips && currentStep.tips.length > 0 && (
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        <strong>Coaching Tips:</strong>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {currentStep.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Question with Radio Options */}
                {currentStep.type === "question" && currentStep.inputType === "radio" && currentStep.options && (
                  <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer} className="space-y-3">
                    {currentStep.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Input Fields */}
                {currentStep.type === "input" && (
                  <div className="space-y-2">
                    {currentStep.inputType === "textarea" ? (
                      <Textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder={currentStep.placeholder}
                        className="min-h-[120px]"
                      />
                    ) : (
                      <Input
                        type={currentStep.inputType || "text"}
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder={currentStep.placeholder}
                      />
                    )}
                  </div>
                )}

                {/* Reflection Timer */}
                {currentStep.type === "reflection" && (
                  <div className="text-center space-y-4">
                    {!isReflectionActive && currentStep.minDuration && (
                      <Button 
                        onClick={() => startReflection(currentStep.minDuration!)}
                        className="bg-gradient-to-r from-orange-500 to-red-500"
                      >
                        <Timer className="h-4 w-4 mr-2" />
                        Start Reflection ({formatTime(currentStep.minDuration)})
                      </Button>
                    )}
                    
                    {isReflectionActive && (
                      <div className="space-y-3">
                        <div className="text-4xl font-bold text-orange-500">
                          {formatTime(reflectionTimer)}
                        </div>
                        <p className="text-muted-foreground">Take your time to reflect deeply...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${((currentStep.minDuration! - reflectionTimer) / currentStep.minDuration!) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Feedback Generation */}
                {currentStep.type === "feedback" && (
                  <div className="text-center space-y-4">
                    {isGeneratingFeedback && (
                      <div className="space-y-3">
                        <div className="animate-spin mx-auto">
                          <Sparkles className="h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="text-muted-foreground">Analyzing your responses and generating personalized feedback...</p>
                      </div>
                    )}
                    
                    {showFeedback && generatedFeedback && (
                      <div className="text-left space-y-4 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                          <div className="flex items-center space-x-2 mb-4">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-semibold">Your Personalized Coaching Feedback</h4>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            {generatedFeedback.split('\n').map((line, index) => {
                              if (line.startsWith('##')) {
                                return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace('##', '').trim()}</h3>
                              } else if (line.startsWith('###')) {
                                return <h4 key={index} className="text-md font-medium mt-3 mb-2">{line.replace('###', '').trim()}</h4>
                              } else if (line.startsWith('-')) {
                                return <li key={index} className="ml-4">{line.replace('-', '').trim()}</li>
                              } else if (line.trim()) {
                                return <p key={index} className="mb-2">{line}</p>
                              }
                              return null
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={previousStep} 
            disabled={currentStepIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button 
            onClick={nextStep}
            disabled={
              (currentStep.type === "question" && !currentAnswer) ||
              (currentStep.type === "input" && !currentAnswer.trim()) ||
              (currentStep.type === "reflection" && isReflectionActive) ||
              (currentStep.type === "feedback" && isGeneratingFeedback)
            }
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <span>{currentStepIndex === exercise.steps.length - 1 ? "Complete" : "Next"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Main exercises list view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interactive Exercises</h1>
        <p className="text-muted-foreground mt-2">Structured exercises designed to build trading psychology mastery</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Exercises Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount}/{exerciseDefinitions.length}
            </div>
            <p className="text-xs text-muted-foreground">Your progress overview across all exercises</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <Progress value={avgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMinutes}</div>
            <p className="text-xs text-muted-foreground">Time invested in your development</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredExercises.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No exercises found</h3>
                <p>Try selecting another category</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => {
                const IconComponent = exercise.icon
                const difficulty = difficulties.find((d) => d.id === exercise.difficulty)
                const progress = userProgress.find(p => p.exerciseId === exercise.id)
                const isCompleted = progress?.completionStatus === "completed"

                return (
                  <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{exercise.title}</CardTitle>
                            {isCompleted && (
                              <div className="flex items-center space-x-1 mt-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{exercise.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={difficulty?.color}>{exercise.difficulty}</Badge>
                          <Badge variant="outline">{exercise.category.replace('-', ' ')}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {exercise.duration} min
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <h5 className="text-sm font-medium mb-2">You'll learn:</h5>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {exercise.learningObjectives.slice(0, 2).map((objective, index) => (
                            <li key={index}>• {objective}</li>
                          ))}
                        </ul>
                      </div>

                      {progress?.score && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-700">Last Score</span>
                            <span className="font-semibold text-green-600">{progress.score}%</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        onClick={() => startExercise(exercise.id)}
                      >
                        {isCompleted ? (
                          <>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retry
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

