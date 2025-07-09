// lib/assessmentData.ts
import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Trading Psychology (25 questions)
  {
    id: 'tp_001',
    category: 'trading_psychology',
    subcategory: 'risk_tolerance',
    questionText: 'When entering a trade, what percentage of your account are you typically comfortable risking?',
    questionType: 'multiple_choice',
    options: [
      'Less than 1% - I prefer very small risks',
      '1-2% - Conservative but reasonable',
      '3-5% - Moderate risk for good opportunities',
      '5-10% - Higher risk for higher rewards',
      'More than 10% - I go big when I\'m confident'
    ],
    orderIndex: 1
  },
  {
    id: 'tp_002',
    category: 'trading_psychology',
    subcategory: 'emotional_control',
    questionText: 'How confident do you feel in your ability to stay calm during volatile market conditions?',
    questionType: 'likert',
    likertLabels: {
      min: 'Not confident at all',
      max: 'Extremely confident',
      scale: 5
    },
    orderIndex: 2
  },
  {
    id: 'tp_003',
    category: 'trading_psychology',
    subcategory: 'decision_making',
    questionText: 'You\'ve planned a trade, but just before executing, you see conflicting news. What do you do?',
    questionType: 'scenario',
    options: [
      'Execute the trade as planned - stick to the strategy',
      'Cancel the trade - better safe than sorry',
      'Reduce position size - compromise approach',
      'Wait for more clarity - patience is key',
      'Analyze the news impact first - informed decisions'
    ],
    orderIndex: 3
  },
  {
    id: 'tp_004',
    category: 'trading_psychology',
    subcategory: 'stress_response',
    questionText: 'Rate how well you handle the stress of having multiple open positions',
    questionType: 'likert',
    likertLabels: {
      min: 'Very poorly - it overwhelms me',
      max: 'Very well - I thrive under pressure',
      scale: 5
    },
    orderIndex: 4
  },
  {
    id: 'tp_005',
    category: 'trading_psychology',
    subcategory: 'confidence',
    questionText: 'After a series of winning trades, how do you typically feel about your next trade?',
    questionType: 'multiple_choice',
    options: [
      'Overconfident - I feel like I can\'t lose',
      'Cautiously optimistic - good streak but stay humble',
      'Nervous - worried the streak will end',
      'Analytical - each trade is independent',
      'Motivated - building on momentum'
    ],
    orderIndex: 5
  },

  // Behavioral Patterns (20 questions)
  {
    id: 'bp_001',
    category: 'behavioral_patterns',
    subcategory: 'impulse_control',
    questionText: 'How often do you find yourself taking trades that weren\'t part of your original plan?',
    questionType: 'multiple_choice',
    options: [
      'Never - I stick strictly to my plan',
      'Rarely - only in exceptional circumstances',
      'Sometimes - when I see good opportunities',
      'Often - I adapt to market conditions',
      'Very often - I trade on instinct'
    ],
    orderIndex: 6
  },
  {
    id: 'bp_002',
    category: 'behavioral_patterns',
    subcategory: 'patience',
    questionText: 'Rate your patience when waiting for the perfect trade setup',
    questionType: 'likert',
    likertLabels: {
      min: 'Very impatient - I need action',
      max: 'Very patient - I can wait for days',
      scale: 5
    },
    orderIndex: 7
  },
  {
    id: 'bp_003',
    category: 'behavioral_patterns',
    subcategory: 'learning',
    questionText: 'When you make a trading mistake, what\'s your typical response?',
    questionType: 'scenario',
    options: [
      'Analyze what went wrong and document it',
      'Feel frustrated but move on quickly',
      'Blame external factors (news, market makers, etc.)',
      'Take a break from trading to clear my head',
      'Immediately try to make back the loss'
    ],
    orderIndex: 8
  },

  // Market Mindset (20 questions)
  {
    id: 'mm_001',
    category: 'market_mindset',
    subcategory: 'market_perception',
    questionText: 'How do you primarily view the financial markets?',
    questionType: 'multiple_choice',
    options: [
      'A logical system that can be analyzed and predicted',
      'A chaotic environment requiring adaptability',
      'A psychological battlefield of emotions',
      'An opportunity machine for those who understand it',
      'A rigged game favoring institutions'
    ],
    orderIndex: 9
  },
  {
    id: 'mm_002',
    category: 'market_mindset',
    subcategory: 'analytical_approach',
    questionText: 'Rate how much you rely on technical analysis versus fundamental analysis',
    questionType: 'likert',
    likertLabels: {
      min: 'Pure fundamental analysis',
      max: 'Pure technical analysis',
      scale: 5
    },
    orderIndex: 10
  },

  // Trading Habits (15 questions)
  {
    id: 'th_001',
    category: 'trading_habits',
    subcategory: 'preparation',
    questionText: 'How much time do you typically spend preparing for each trading session?',
    questionType: 'multiple_choice',
    options: [
      'Less than 15 minutes - I jump right in',
      '15-30 minutes - Quick market overview',
      '30-60 minutes - Thorough preparation',
      '1-2 hours - Comprehensive analysis',
      'More than 2 hours - Extensive research'
    ],
    orderIndex: 11
  },
  {
    id: 'th_002',
    category: 'trading_habits',
    subcategory: 'execution',
    questionText: 'Rate how consistently you follow your predetermined stop-loss levels',
    questionType: 'likert',
    likertLabels: {
      min: 'Never follow them',
      max: 'Always follow them religiously',
      scale: 5
    },
    orderIndex: 12
  },

  // Goal Orientation (10 questions)
  {
    id: 'go_001',
    category: 'goal_orientation',
    subcategory: 'career_aspirations',
    questionText: 'What\'s your primary goal in trading?',
    questionType: 'multiple_choice',
    options: [
      'Supplement my income with extra money',
      'Replace my job and trade full-time',
      'Build long-term wealth for retirement',
      'Achieve financial freedom and independence',
      'Master the craft and become an expert trader'
    ],
    orderIndex: 13
  },
  {
    id: 'go_002',
    category: 'goal_orientation',
    subcategory: 'success_definition',
    questionText: 'How do you define success in trading?',
    questionType: 'ranking',
    options: [
      'Consistent profitability',
      'Large winning trades',
      'Low drawdowns',
      'Emotional control',
      'Continuous learning and improvement'
    ],
    orderIndex: 14
  }
];

export const categoryInfo = {
  trading_psychology: {
    name: 'Trading Psychology',
    description: 'Understanding your mental approach to risk, emotions, and decision-making',
    icon: '🧠',
    color: 'blue'
  },
  behavioral_patterns: {
    name: 'Behavioral Patterns',
    description: 'Identifying your habits, impulses, and learning patterns',
    icon: '🔄',
    color: 'green'
  },
  market_mindset: {
    name: 'Market Mindset',
    description: 'Your beliefs and approach to market analysis and opportunities',
    icon: '📈',
    color: 'purple'
  },
  trading_habits: {
    name: 'Trading Habits',
    description: 'Your preparation, execution, and post-trade analysis routines',
    icon: '⚡',
    color: 'orange'
  },
  goal_orientation: {
    name: 'Goal Orientation',
    description: 'Your aspirations, motivations, and definition of success',
    icon: '🎯',
    color: 'red'
  }
};

export const coachingMessages = {
  welcome: {
    title: "Welcome to Your Trading Psychology Assessment! ☕",
    message: "Take a moment to get comfortable. Grab a coffee, find a quiet space, and let's embark on a journey of self-discovery together. This isn't a test - it's a conversation about your trading mindset.",
    timeEstimate: "15-20 minutes"
  },
  category_transitions: {
    trading_psychology: "Great start! Now let's dive deeper into how your mind works when you're in the markets...",
    behavioral_patterns: "Excellent! Next, we'll explore your natural trading behaviors and patterns...",
    market_mindset: "Wonderful progress! Let's understand how you view and approach the markets...",
    trading_habits: "You're doing amazing! Now let's look at your trading routines and habits...",
    goal_orientation: "Almost there! Finally, let's explore your goals and what drives you..."
  },
  encouragement: [
    "You're doing great! Your honest answers are helping us understand your unique trading personality.",
    "Excellent self-awareness! These insights will be valuable for your trading journey.",
    "Keep going! Each answer brings us closer to unlocking your trading potential.",
    "Fantastic! Your thoughtful responses show real commitment to improvement.",
    "You're almost there! These final questions will complete your psychological profile."
  ],
  completion: {
    title: "Congratulations! 🎉",
    message: "You've completed your Trading Psychology Assessment! Our AI is now analyzing your responses to create personalized insights and recommendations just for you.",
    nextSteps: "Your results will appear in your Coaching Insights within the next few minutes."
  }
};
