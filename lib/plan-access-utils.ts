/* ------------------------------------------------------------------
   PLAN / FEATURE ACCESS – 2025‑07 update
------------------------------------------------------------------- */

export type PlanType = 'free' | 'pro' | 'premium' | 'elite';

/* ---------- per‑plan configuration (single source of truth) ---------- */
const PlanConfig: Record<
  PlanType,
  {
    name: string;
    price: number;
    /* list of headline features to show in the sidebar footer */
    features: string[];
    /* monthly quotas (number | 'unlimited') */
    screenshotAnalysis: number | 'unlimited';
    tradeBuilder: number | 'unlimited';
  }
> = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'AI Coach',
      '5 Screenshot Analyses / mo',
      'Progress Tracking',
      'Interactive Exercises',
      'Psychology Courses',
    ],
    screenshotAnalysis: 5,
    tradeBuilder: 0,
  },
  pro: {
    name: 'Pro',
    price: 19,
    features: [
      'AI Coach',
      '25 Screenshot Analyses / mo',
      'Progress Tracking',
      'Interactive Exercises',
      'Psychology Courses',
      'Reflection Journal',
      '10 Trade Builder runs / mo',
      'Behavioral Patterns',
      'Coaching Insights',
    ],
    screenshotAnalysis: 25,
    tradeBuilder: 10,
  },
  premium: {
    name: 'Premium',
    price: 49,
    features: [
      'AI Coach',
      'Unlimited Screenshot Analysis',
      'Progress Tracking',
      'Interactive Exercises',
      'Psychology Courses',
      'Reflection Journal',
      '30 Trade Builder runs / mo',
      'Behavioral Patterns',
      'Coaching Insights',
    ],
    screenshotAnalysis: 'unlimited',
    tradeBuilder: 30,
  },
  elite: {
    name: 'Elite',
    price: 99,
    features: [
      'AI Coach',
      'Unlimited Screenshot Analysis',
      'Progress Tracking',
      'Interactive Exercises',
      'Psychology Courses',
      'Reflection Journal',
      'Unlimited Trade Builder',
      'Behavioral Patterns',
      'Coaching Insights',
      'Funded Career Builder',
    ],
    screenshotAnalysis: 'unlimited',
    tradeBuilder: 'unlimited',
  },
};

/* ---------- visual colour tokens ---------- */
const planColors = {
  free: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  pro: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  premium: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
  },
  elite: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
  },
} as const;

/* ---------- minimum‑plan matrix ---------- */
const featureRequirements: Record<string, PlanType> = {
  // Free
  'ai-psychology-coach': 'free',
  'screenshot-analysis': 'free',
  'progress-tracking': 'free',
  'interactive-exercises': 'free',
  'psychology-courses': 'free',
  'dashboard-overview': 'free',

  // Pro
  'reflection-journal': 'pro',
  'trade-builder': 'pro',
  'behavioral-patterns': 'pro',
  'coaching-insights': 'pro',

  // Elite
  'funded-career-builder': 'elite',
};

const planRank: Record<PlanType, number> = {
  free: 0,
  pro: 1,
  premium: 2,
  elite: 3,
};

/* ------------------------------------------------------------------
   PLAN ACCESS MANAGER
------------------------------------------------------------------- */
export class PlanAccessManager {
  private static hierarchy: PlanType[] = ['free', 'pro', 'premium', 'elite'];

  static hasFeatureAccess(plan: PlanType, feature: string) {
    const req = featureRequirements[feature];
    return planRank[plan] >= planRank[req];
  }

  static getRequiredPlan(feature: string): PlanType | null {
    return featureRequirements[feature] ?? null;
  }

  /* feature‑specific quota helpers */
  static hasReachedLimit(
    plan: PlanType,
    feature: string,
    current: number,
  ): boolean {
    const cfg = PlanConfig[plan];
    switch (feature) {
      case 'screenshot-analysis':
        return cfg.screenshotAnalysis !== 'unlimited' &&
          current >= cfg.screenshotAnalysis;
      case 'trade-builder':
        return cfg.tradeBuilder !== 'unlimited' && current >= cfg.tradeBuilder;
      default:
        return false;
    }
  }

  static getRemainingUsage(
    plan: PlanType,
    feature: string,
    current: number,
  ): number | 'unlimited' {
    const cfg = PlanConfig[plan];
    switch (feature) {
      case 'screenshot-analysis':
        return cfg.screenshotAnalysis === 'unlimited'
          ? 'unlimited'
          : Math.max(0, cfg.screenshotAnalysis - current);
      case 'trade-builder':
        return cfg.tradeBuilder === 'unlimited'
          ? 'unlimited'
          : Math.max(0, cfg.tradeBuilder - current);
      default:
        return 'unlimited';
    }
  }

  /* upgrade helpers */
  static canUpgrade(plan: PlanType) {
    return plan !== 'elite';
  }

  static getNextPlan(plan: PlanType): PlanType | null {
    const idx = planRank[plan];
    return idx < this.hierarchy.length - 1 ? this.hierarchy[idx + 1] : null;
  }

  static getNextPlanForFeature(plan: PlanType, feature: string) {
    const min = this.getRequiredPlan(feature);
    if (!min) return null;
    return planRank[plan] >= planRank[min] ? null : min;
  }

  /* sidebar footer helper */
  static getPlanDisplayInfo(plan: PlanType | undefined) {
    const p: PlanType = plan ?? 'free';
    const cfg = PlanConfig[p];
    return {
      name: cfg.name,
      price: cfg.price,
      colors: planColors[p],
      features: cfg.features,
    };
  }
}

/* ------------------------------------------------------------------
   REACT HOOK FACADE
------------------------------------------------------------------- */
import { useCallback } from 'react';

export function usePlanAccess() {
  const hasFeatureAccess = useCallback(
    PlanAccessManager.hasFeatureAccess.bind(PlanAccessManager),
    [],
  );
  const getRequiredPlan = useCallback(
    PlanAccessManager.getRequiredPlan.bind(PlanAccessManager),
    [],
  );
  const hasReachedLimit = useCallback(
    PlanAccessManager.hasReachedLimit.bind(PlanAccessManager),
    [],
  );
  const getRemainingUsage = useCallback(
    PlanAccessManager.getRemainingUsage.bind(PlanAccessManager),
    [],
  );
  const canUpgrade = useCallback(
    PlanAccessManager.canUpgrade.bind(PlanAccessManager),
    [],
  );
  const getNextPlan = useCallback(
    PlanAccessManager.getNextPlan.bind(PlanAccessManager),
    [],
  );
  const getNextPlanForFeature = useCallback(
    PlanAccessManager.getNextPlanForFeature.bind(PlanAccessManager),
    [],
  );
  const getPlanDisplayInfo = useCallback(
    PlanAccessManager.getPlanDisplayInfo.bind(PlanAccessManager),
    [],
  );

  return {
    hasFeatureAccess,
    getRequiredPlan,
    hasReachedLimit,
    getRemainingUsage,
    canUpgrade,
    getNextPlan,
    getNextPlanForFeature,
    getPlanDisplayInfo,
  };
}

/* ------------------------------------------------------------------
   LOCAL‑STORAGE USAGE COUNTER (unchanged)
------------------------------------------------------------------- */
export class UsageTracker {
  private static root = 'user_usage_tracking';

  static getCurrentUsage(id: string, feature: string) {
    if (typeof window === 'undefined') return 0;
    return parseInt(
      localStorage.getItem(`${this.root}_${id}_${feature}`) || '0',
      10,
    );
  }

  static incrementUsage(id: string, feature: string) {
    if (typeof window === 'undefined') return 0;
    const next = this.getCurrentUsage(id, feature) + 1;
    localStorage.setItem(`${this.root}_${id}_${feature}`, String(next));
    return next;
  }

  static resetUsage(id: string, feature: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.root}_${id}_${feature}`);
  }
}
