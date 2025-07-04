// lib/planConfig.ts
export interface PlanFeatures {
  ai_psychology_coach: boolean;
  advanced_ai_psychology_coach: boolean;
  trade_analyses: {
    enabled: boolean;
    limit: number | 'unlimited';
  };
  progress_tracking: boolean;
  advanced_progress_tracking: boolean;
  interactive_exercises: boolean;
  psychology_courses: boolean;
  reflection_journal: boolean;
  screenshot_analysis: boolean;
  trade_builder: {
    enabled: boolean;
    limit: number | 'unlimited';
  };
  coaching_insights: boolean;
  behavioral_patterns: boolean;
  funded_career_builder: boolean;
}

export const PLAN_FEATURES: Record<string, PlanFeatures> = {
  free: {
    ai_psychology_coach: true,
    advanced_ai_psychology_coach: false,
    trade_analyses: { enabled: true, limit: 5 },
    progress_tracking: true,
    advanced_progress_tracking: false,
    interactive_exercises: true,
    psychology_courses: true,
    reflection_journal: false,
    screenshot_analysis: false,
    trade_builder: { enabled: false, limit: 0 },
    coaching_insights: false,
    behavioral_patterns: false,
    funded_career_builder: false,
  },
  pro: {
    ai_psychology_coach: true,
    advanced_ai_psychology_coach: true,
    trade_analyses: { enabled: true, limit: 25 },
    progress_tracking: true,
    advanced_progress_tracking: true,
    interactive_exercises: true,
    psychology_courses: true,
    reflection_journal: true,
    screenshot_analysis: true,
    trade_builder: { enabled: true, limit: 10 },
    coaching_insights: false,
    behavioral_patterns: false,
    funded_career_builder: false,
  },
  premium: {
    ai_psychology_coach: true,
    advanced_ai_psychology_coach: true,
    trade_analyses: { enabled: true, limit: 'unlimited' },
    progress_tracking: true,
    advanced_progress_tracking: true,
    interactive_exercises: true,
    psychology_courses: true,
    reflection_journal: true,
    screenshot_analysis: true,
    trade_builder: { enabled: true, limit: 30 },
    coaching_insights: true,
    behavioral_patterns: true,
    funded_career_builder: false,
  },
  elite: {
    ai_psychology_coach: true,
    advanced_ai_psychology_coach: true,
    trade_analyses: { enabled: true, limit: 'unlimited' },
    progress_tracking: true,
    advanced_progress_tracking: true,
    interactive_exercises: true,
    psychology_courses: true,
    reflection_journal: true,
    screenshot_analysis: true,
    trade_builder: { enabled: true, limit: 'unlimited' },
    coaching_insights: true,
    behavioral_patterns: true,
    funded_career_builder: true,
  },
};

// Helper function to get features for a plan
export const getPlanFeatures = (plan: string): PlanFeatures => {
  return PLAN_FEATURES[plan] || PLAN_FEATURES.free;
};

// Helper function to check if user has access to a feature
export const hasFeatureAccess = (plan: string, feature: keyof PlanFeatures): boolean => {
  const planFeatures = getPlanFeatures(plan);
  const featureConfig = planFeatures[feature];
  
  if (typeof featureConfig === 'boolean') {
    return featureConfig;
  }
  
  if (typeof featureConfig === 'object' && 'enabled' in featureConfig) {
    return featureConfig.enabled;
  }
  
  return false;
};

// Helper function to get remaining usage for limited features
export const getRemainingUsage = (
  plan: string, 
  feature: 'trade_analyses' | 'trade_builder', 
  currentUsage: number
): number | 'unlimited' => {
  const planFeatures = getPlanFeatures(plan);
  const featureConfig = planFeatures[feature];
  
  if (typeof featureConfig === 'object' && 'limit' in featureConfig) {
    if (featureConfig.limit === 'unlimited') {
      return 'unlimited';
    }
    return Math.max(0, featureConfig.limit - currentUsage);
  }
  
  return 0;
};
