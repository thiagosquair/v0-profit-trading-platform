// types/assessment.ts
export interface AssessmentQuestion {
  id: string;
  category: 'trading_psychology' | 'behavioral_patterns' | 'market_mindset' | 'trading_habits' | 'goal_orientation';
  subcategory?: string;
  questionText: string;
  questionType: 'multiple_choice' | 'likert' | 'scenario' | 'ranking';
  options?: string[];
  likertLabels?: {
    min: string;
    max: string;
    scale: number;
  };
  orderIndex: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number | string[];
  timestamp: Date;
}

export interface AssessmentProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  completedCategories: string[];
  currentCategory: string;
  responses: AssessmentResponse[];
  startedAt: Date;
  lastSavedAt: Date;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentDate: Date;
  scores: {
    overall: number;
    tradingPsychology: number;
    behavioralPatterns: number;
    marketMindset: number;
    tradingHabits: number;
    goalOrientation: number;
  };
  personalityProfile: {
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    tradingStyle: 'analytical' | 'intuitive' | 'hybrid';
    emotionalType: 'calm' | 'reactive' | 'adaptive';
    learningStyle: 'visual' | 'practical' | 'theoretical';
  };
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
  aiAnalysis: string;
  retakeNumber: number;
  previousAssessmentId?: string;
}

export interface AssessmentSettings {
  nextAvailableDate: Date | null;
  totalAssessmentsTaken: number;
  averageScore: number;
  bestScore: number;
  improvementStreak: number;
  reminderEnabled: boolean;
}
