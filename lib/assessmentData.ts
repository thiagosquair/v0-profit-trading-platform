import { AssessmentQuestion, CoachingMessage, AssessmentCategory } from '@/types/assessment';

// Sample Assessment Questions (14 questions for testing)
export const assessmentQuestions: AssessmentQuestion[] = [
  // Trading Psychology (5 questions)
  {
    id: 'tp_001',
    category: 'trading_psychology',
    type: 'multiple_choice',
    question: 'When you experience a significant trading loss, what is your typical emotional response?',
    options: [
      'I remain calm and analyze what went wrong',
      'I feel frustrated but quickly refocus',
      'I become anxious and doubt my strategy',
      'I feel angry and want to trade immediately to recover',
      'I take a break to process the emotions'
    ],
    weight: 1.2
  },
  {
    id: 'tp_002',
    category: 'trading_psychology',
    type: 'likert_scale',
    question: 'How confident are you in your ability to stick to your trading plan during volatile market conditions?',
    weight: 1.0
  },
  {
    id: 'tp_003',
    category: 'trading_psychology',
    type: 'scenario',
    question: 'You\'re in a winning trade that has reached your profit target, but the market continues to move in your favor. What do you do?',
    scenario: 'Your EUR/USD long position has hit your 50-pip profit target, but strong bullish momentum suggests it could go higher.',
    options: [
      'Close the entire position as planned',
      'Close half and let the rest run with a trailing stop',
      'Move stop to breakeven and hold the full position',
      'Cancel the profit target and hold for bigger gains',
      'Add to the position to maximize profits'
    ],
    weight: 1.1
  },
  {
    id: 'tp_004',
    category: 'trading_psychology',
    type: 'multiple_choice',
    question: 'How do you typically handle fear of missing out (FOMO) in trading?',
    options: [
      'I stick to my plan and wait for proper setups',
      'I sometimes enter trades impulsively',
      'I increase my position size to compensate',
      'I analyze why I feel FOMO and address it',
      'I take a break from trading when FOMO is strong'
    ],
    weight: 1.0
  },
  {
    id: 'tp_005',
    category: 'trading_psychology',
    type: 'likert_scale',
    question: 'How well do you manage stress during high-pressure trading situations?',
    weight: 1.1
  },

  // Behavioral Patterns (3 questions)
  {
    id: 'bp_001',
    category: 'behavioral_patterns',
    type: 'multiple_choice',
    question: 'When you make a trading mistake, how do you typically respond?',
    options: [
      'I immediately analyze what went wrong and learn from it',
      'I feel disappointed but move on quickly',
      'I dwell on it and it affects my next trades',
      'I try to make up for it with the next trade',
      'I take a break to clear my head'
    ],
    weight: 1.2
  },
  {
    id: 'bp_002',
    category: 'behavioral_patterns',
    type: 'scenario',
    question: 'You notice you\'ve been overtrading lately. How do you address this pattern?',
    scenario: 'You realize you\'ve been taking more trades than usual, often without proper analysis.',
    options: [
      'Immediately reduce trading frequency and stick to best setups only',
      'Set daily trade limits and use alerts to enforce them',
      'Take a complete break from trading for a few days',
      'Analyze what\'s driving the overtrading behavior',
      'Continue but with smaller position sizes'
    ],
    weight: 1.1
  },
  {
    id: 'bp_003',
    category: 'behavioral_patterns',
    type: 'likert_scale',
    question: 'How consistent are you in following your pre-defined trading rules?',
    weight: 1.3
  },

  // Market Mindset (3 questions)
  {
    id: 'mm_001',
    category: 'market_mindset',
    type: 'multiple_choice',
    question: 'How do you view market volatility?',
    options: [
      'As an opportunity to profit from price movements',
      'As a risk to be carefully managed',
      'As an unpredictable force to avoid',
      'As a natural part of market cycles',
      'As a challenge that tests my skills'
    ],
    weight: 1.0
  },
  {
    id: 'mm_002',
    category: 'market_mindset',
    type: 'scenario',
    question: 'The market moves against your analysis and hits your stop loss. How do you interpret this?',
    scenario: 'Your technical analysis suggested a bullish breakout, but the market reversed and stopped you out.',
    options: [
      'My analysis was wrong, I need to improve my skills',
      'The market was unpredictable, it happens sometimes',
      'I should have used a wider stop loss',
      'External factors influenced the market that I couldn\'t predict',
      'I need to review my analysis methodology'
    ],
    weight: 1.1
  },
  {
    id: 'mm_003',
    category: 'market_mindset',
    type: 'likert_scale',
    question: 'How much do you believe that consistent profits in trading are achievable with the right approach?',
    weight: 1.2
  },

  // Trading Habits (2 questions)
  {
    id: 'th_001',
    category: 'trading_habits',
    type: 'multiple_choice',
    question: 'How do you typically prepare for a trading session?',
    options: [
      'I review market news, check economic calendar, and analyze charts',
      'I quickly scan the markets and look for obvious opportunities',
      'I follow my watchlist and wait for setups',
      'I check what other traders are saying and follow their ideas',
      'I don\'t have a specific preparation routine'
    ],
    weight: 1.2
  },
  {
    id: 'th_002',
    category: 'trading_habits',
    type: 'likert_scale',
    question: 'How disciplined are you about keeping a trading journal?',
    weight: 1.1
  },

  // Goal Orientation (1 question)
  {
    id: 'go_001',
    category: 'goal_orientation',
    type: 'ranking',
    question: 'Rank these trading goals in order of importance to you (1 = most important):',
    options: [
      'Consistent monthly profits',
      'Learning and skill development',
      'Building long-term wealth',
      'Achieving financial independence',
      'Proving my trading abilities'
    ],
    weight: 1.0
  }
];

// Coaching Messages for each category
export const coachingMessages: CoachingMessage[] = [
  {
    category: 'trading_psychology',
    message: 'Now let\'s explore your trading psychology - the mental game that separates successful traders from the rest.',
    encouragement: 'Your mindset is your most powerful trading tool. Let\'s understand how you think and feel about trading.',
    tip: 'Remember, there are no right or wrong answers - just honest insights into your trading personality.'
  },
  {
    category: 'behavioral_patterns',
    message: 'Time to examine your behavioral patterns - the habits and reactions that shape your trading decisions.',
    encouragement: 'Understanding your patterns is the first step to optimizing your trading performance.',
    tip: 'Think about your recent trading experiences as you answer these questions.'
  },
  {
    category: 'market_mindset',
    message: 'Let\'s dive into your market mindset - how you perceive and interpret market movements.',
    encouragement: 'Your beliefs about the market directly influence your trading decisions and outcomes.',
    tip: 'Consider how you typically react to different market conditions.'
  },
  {
    category: 'trading_habits',
    message: 'Now we\'ll assess your trading habits - the routines and practices that support your trading.',
    encouragement: 'Great habits are the foundation of consistent trading success.',
    tip: 'Think about your typical trading day and the processes you follow.'
  },
  {
    category: 'goal_orientation',
    message: 'Finally, let\'s understand your goals and motivations - what drives you as a trader.',
    encouragement: 'Clear goals provide direction and purpose to your trading journey.',
    tip: 'Be honest about what you truly want to achieve through trading.'
  }
];

// Progress celebration messages
export const progressMessages = [
  "Great progress! You're building valuable self-awareness.",
  "Excellent! Keep this momentum going.",
  "You're doing fantastic! These insights will be powerful.",
  "Amazing work! You're almost there.",
  "Outstanding! Your dedication to growth shows.",
  "Brilliant! You're unlocking important insights about yourself.",
  "Superb progress! Your trading psychology profile is taking shape.",
  "Incredible! You're investing in your trading success.",
  "Fantastic! These insights will transform your trading.",
  "Exceptional! You're on the path to trading mastery."
];

// Category information
export const categoryInfo = {
  trading_psychology: {
    name: 'Trading Psychology',
    description: 'Your emotional responses and mental approach to trading',
    icon: '🧠',
    color: 'blue'
  },
  behavioral_patterns: {
    name: 'Behavioral Patterns',
    description: 'Your habits, reactions, and behavioral tendencies',
    icon: '🔄',
    color: 'green'
  },
  market_mindset: {
    name: 'Market Mindset',
    description: 'Your beliefs and perceptions about market behavior',
    icon: '📈',
    color: 'purple'
  },
  trading_habits: {
    name: 'Trading Habits',
    description: 'Your routines, preparation, and execution practices',
    icon: '⚡',
    color: 'orange'
  },
  goal_orientation: {
    name: 'Goal Orientation',
    description: 'Your motivations, aspirations, and success definitions',
    icon: '🎯',
    color: 'red'
  }
};

// Helper functions
export function getQuestionsByCategory(category: AssessmentCategory): AssessmentQuestion[] {
  return assessmentQuestions.filter(q => q.category === category);
}

export function getCategoryMessage(category: AssessmentCategory): CoachingMessage | undefined {
  return coachingMessages.find(m => m.category === category);
}

export function getRandomProgressMessage(): string {
  return progressMessages[Math.floor(Math.random() * progressMessages.length)];
}

export function getTotalQuestions(): number {
  return assessmentQuestions.length;
}

export function getQuestionsByCategories(): Record<AssessmentCategory, AssessmentQuestion[]> {
  const categories: AssessmentCategory[] = [
    'trading_psychology',
    'behavioral_patterns', 
    'market_mindset',
    'trading_habits',
    'goal_orientation'
  ];
  
  return categories.reduce((acc, category) => {
    acc[category] = getQuestionsByCategory(category);
    return acc;
  }, {} as Record<AssessmentCategory, AssessmentQuestion[]>);
}
