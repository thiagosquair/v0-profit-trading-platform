// Types for the enhanced screenshot analysis system with trade data

export interface TradeData {
  instrument: string;
  tradeDirection: 'long' | 'short';
  entryPrice: string;
  stopLossPrice: string;
  takeProfitPrice: string;
  riskRewardRatio: string;
  percentageAchieved: string;
}

export interface TradeContext {
  tradingStrategy?: string;
  timeframe?: string;
  marketConditions?: string;
  specificQuestions?: string;
  experienceLevel?: string;
  tradeDirection?: string;
  entryReason?: string;
  // New trade data fields
  instrument?: string;
  entryPrice?: string;
  stopLossPrice?: string;
  takeProfitPrice?: string;
  riskRewardRatio?: string;
  percentageAchieved?: string;
}

export interface AnalysisFormData {
  image: File | null;
  tradingStrategy: string;
  timeframe: string;
  tradeDirection: string;
  entryReason: string;
  marketConditions: string;
  specificQuestions: string;
  experienceLevel: string;
  // New trade data fields
  instrument: string;
  entryPrice: string;
  stopLossPrice: string;
  takeProfitPrice: string;
  riskRewardRatio: string;
  percentageAchieved: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis?: string;
  error?: string;
  context?: TradeContext;
  imageUrl?: string;
  timestamp?: string;
  tokensUsed?: number;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    total_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
  };
}

export interface AnalysisAPIResponse {
  success: boolean;
  analysis?: string;
  context?: TradeContext;
  imageUrl?: string;
  timestamp?: string;
  tokensUsed?: number;
  error?: string;
}

// Enums for better type safety
export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  PROFESSIONAL = 'professional'
}

export enum TradingStrategy {
  SCALPING = 'scalping',
  DAY_TRADING = 'day-trading',
  SWING_TRADING = 'swing-trading',
  POSITION_TRADING = 'position-trading',
  BREAKOUT = 'breakout',
  TREND_FOLLOWING = 'trend-following',
  MEAN_REVERSION = 'mean-reversion',
  SUPPORT_RESISTANCE = 'support-resistance',
  OTHER = 'other'
}

export enum Timeframe {
  ONE_MINUTE = '1m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  FOUR_HOURS = '4h',
  DAILY = '1d',
  WEEKLY = '1w'
}

export enum TradeDirection {
  LONG = 'long',
  SHORT = 'short'
}

// Validation schemas
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ANALYSIS_CONSTRAINTS = {
  MAX_TOKENS: 3000, // Increased for more comprehensive coaching
  TEMPERATURE: 0.7,
  MODEL: 'gpt-4o'
} as const;

