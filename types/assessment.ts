// Assessment Types
export type AssessmentState = 'welcome' | 'in_progress' | 'paused' | 'completed' | 'results';

export type QuestionType = 'multiple_choice' | 'likert_scale' | 'scenario' | 'ranking';

export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  type: QuestionType;
  question: string;
  options?: string[];
  scenario?: string;
  context?: string;
  weight?: number;
}

export type AssessmentCategory = 
  | 'trading_psychology' 
  | 'behavioral_patterns' 
  | 'market_mindset' 
  | 'trading_habits' 
  | 'goal_orientation';

export interface AssessmentResponse {
  questionId: string;
  answer: string | number | string[];
  timestamp: Date;
  category: AssessmentCategory;
}

export interface AssessmentProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  currentCategory: AssessmentCategory;
  completedCategories: AssessmentCategory[];
  responses: AssessmentResponse[];
  startedAt: Date;
  lastUpdated: Date;
  isPaused: boolean;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  responses: AssessmentResponse[];
  scores: CategoryScores;
  overallScore: number;
  personalityProfile: PersonalityProfile;
  completedAt: Date;
  analysisId?: string;
}

export interface CategoryScores {
  trading_psychology: number;
  behavioral_patterns: number;
  market_mindset: number;
  trading_habits: number;
  goal_orientation: number;
}

export interface PersonalityProfile {
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  tradingStyle: 'Analytical' | 'Intuitive' | 'Hybrid';
  emotionalType: 'Calm' | 'Reactive' | 'Adaptive';
  learningStyle: 'Visual' | 'Practical' | 'Theoretical';
}

export interface AssessmentAnalysis {
  id: string;
  assessmentId: string;
  userId: string;
  scores: CategoryScores;
  overallScore: number;
  personalityProfile: PersonalityProfile;
  psychologicalProfile: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
  createdAt: Date;
}

export interface CoachingMessage {
  category: AssessmentCategory;
  message: string;
  encouragement: string;
  tip?: string;
}

export interface AssessmentEligibility {
  canTakeAssessment: boolean;
  lastAssessmentDate?: Date;
  daysUntilNextAssessment?: number;
  assessmentCount: number;
  nextAvailableDate?: Date;
}

export interface AssessmentHistory {
  assessments: AssessmentResult[];
  totalCompleted: number;
  averageScore: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
  lastCompletedDate?: Date;
}

// Question option interface for multiple choice questions
export interface QuestionOption {
  value: string;
  label: string;
  weight?: number;
}

// Scenario-based question interface
export interface ScenarioQuestion extends AssessmentQuestion {
  scenario: string;
  context: string;
  options: QuestionOption[];
}

// Likert scale question interface
export interface LikertQuestion extends AssessmentQuestion {
  statement: string;
  scale: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

// Ranking question interface
export interface RankingQuestion extends AssessmentQuestion {
  items: string[];
  instruction: string;
}
