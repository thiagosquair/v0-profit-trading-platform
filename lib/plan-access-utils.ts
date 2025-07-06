/* ------------------------------------------------------------------
   PLAN / FEATURE ACCESS HELPERS
   – 100 % self‑contained (no external PlanConfig required)
   – API identical to your previous PlanAccessManager + usePlanAccess hook
------------------------------------------------------------------- */

export type PlanType = 'free' | 'pro' | 'premium' | 'elite';

/* ------------------------------------------------------------------
   Basic plan metadata
------------------------------------------------------------------- */
const planPrices: Record<PlanType, number> = {
  free: 0,
  pro: 19,
  premium: 49,
  elite: 99,
};

const planNames: Record<PlanType, string> = {
  free: 'Free',
  pro: 'Pro',
  premium: 'Premium',
  elite: 'Elite',
};

const planColors: Record<
  PlanType,
  { bg: string; text: string; border: string }
> = {
  free: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-300',
  },
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
};

/* Each plan’s marquee features (for the sidebar footer) */
const planHeadlineFeatures: Record<PlanType, string[]> = {
  free: ['Dashboard overview', 'Reflection journal'],
  pro: [
    'AI psychology coach',
    'Trade analysis (50/mo)',
    'Psychology courses',
    'Interactive exercises',
  ],
  premium: ['Screenshot analysis', 'Behavioural patterns'],
  elite: ['Funded career builder', 'Priority support'],
};

/* ------------------------------------------------------------------
   Feature‑to‑plan matrix
------------------------------------------------------------------- */
const featureRequirements: Record<
  string,
  { plan: PlanType; monthlyLimit?: number }
> = {
  // Free
  'ai-psychology-coach': { plan: 'free' },
  'trade-analysis': { plan: 'free', monthlyLimit: 50 },
  'progress-tracking': { plan: 'free' },
  'interactive-exercises': { plan: 'free' },
  'psychology-courses': { plan: 'free' },
  'dashboard-overview': { plan: 'free' },

  // Pro
  'advanced-ai-coach': { plan: 'pro' },
  'reflection-journal': { plan: 'pro' },
  'screenshot-analysis': { plan: 'pro', monthlyLimit: 50 },
  'trade-builder': { plan: 'pro', monthlyLimit: 20 },

  // Premium
  'coaching-insights': { plan: 'premium' },
  'behavioral-patterns': { plan: 'premium' },
  'unlimited-trade-analysis': { plan: 'premium' },
  'advanced-trade-builder': { plan: 'premium' },

  // Elite
  'funded-career-builder': { plan: 'elite' },
  'unlimited-trade-builder': { plan: 'elite' },
  'priority-support': { plan: 'elite' },
};

/* Numeric ranking so we can compare tiers quickly */
const planRank: Record<PlanType, number> = {
  free: 0,
  pro: 1,
  premium: 2,
  elite: 3,
};

/* ------------------------------------------------------------------
   PLAN‑ACCESS MANAGER
------------------------------------------------------------------- */
export class PlanAccessManager {
  private static hierarchy: PlanType[] = ['free', 'pro', 'premium', 'elite'];

  /* ---------- feature checks ---------- */

  static hasFeatureAccess(userPlan: PlanType, feature: string): boolean {
    const req = featureRequirements[feature];
    if (!req) return false; // unknown feature
    return planRank[userPlan] >= planRank[req.plan];
  }

  static getRequiredPlan(feature: string): PlanType | null {
    return featureRequirements[feature]?.plan ?? null;
  }

  static hasReachedLimit(
    userPlan: PlanType,
    feature: string,
    currentUsage: number,
  ): boolean {
    const req = featureRequirements[feature];
    if (!req?.monthlyLimit) return false; // unlimited feature
    if (planRank[userPlan] > planRank[req.plan]) return false; // higher plans ignore limit
    return currentUsage >= req.monthlyLimit;
  }

  static getRemainingUsage(
    userPlan: PlanType,
    feature: string,
    currentUsage: number,
  ): number | 'unlimited' {
    const req = featureRequirements[feature];
    if (!req?.monthlyLimit) return 'unlimited';
    if (planRank[userPlan] > planRank[req.plan]) return 'unlimited';
    return Math.max(0, req.monthlyLimit - currentUsage);
  }

  /* ---------- convenience lists ---------- */

  static getAvailableFeatures(userPlan: PlanType): string[] {
    return Object.entries(featureRequirements)
      .filter(([, { plan }]) => planRank[userPlan] >= planRank[plan])
      .map(([feature]) => feature);
  }

  static getLockedFeatures(userPlan: PlanType) {
    return Object.entries(featureRequirements)
      .filter(([, { plan }]) => planRank[userPlan] < planRank[plan])
      .map(([feature, { plan }]) => ({ feature, requiredPlan: plan }));
  }

  /* ---------- upgrades ---------- */

  static getNextPlanForFeature(
    userPlan: PlanType,
    feature: string,
  ): PlanType | null {
    const required = this.getRequiredPlan(feature);
    if (!required) return null;
    return planRank[userPlan] >= planRank[required] ? null : required;
  }

  static canUpgrade(userPlan: PlanType) {
    return planRank[userPlan] < this.hierarchy.length - 1;
  }

  static getNextPlan(userPlan: PlanType): PlanType | null {
    const idx = planRank[userPlan];
    return idx < this.hierarchy.length - 1
      ? this.hierarchy[idx + 1]
      : null;
  }

  /* ---------- display helpers ---------- */

  static getPlanDisplayInfo(plan: PlanType | undefined) {
    const safePlan: PlanType = plan ?? 'free';
    return {
      name: planNames[safePlan],
      price: planPrices[safePlan],
      colors: planColors[safePlan],
      /* Free features are always included, then we layer on
         each subsequent tier up to the user’s plan            */
      features: this.hierarchy
        .filter((p) => planRank[p] <= planRank[safePlan])
        .flatMap((p) => planHeadlineFeatures[p]),
    };
  }
}

/* ------------------------------------------------------------------
   REACT HOOK WRAPPER
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
  const getAvailableFeatures = useCallback(
    PlanAccessManager.getAvailableFeatures.bind(PlanAccessManager),
    [],
  );
  const getLockedFeatures = useCallback(
    PlanAccessManager.getLockedFeatures.bind(PlanAccessManager),
    [],
  );
  const getNextPlanForFeature = useCallback(
    PlanAccessManager.getNextPlanForFeature.bind(PlanAccessManager),
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
  const getPlanDisplayInfo = useCallback(
    PlanAccessManager.getPlanDisplayInfo.bind(PlanAccessManager),
    [],
  );

  return {
    hasFeatureAccess,
    getRequiredPlan,
    hasReachedLimit,
    getRemainingUsage,
    getAvailableFeatures,
    getLockedFeatures,
    getNextPlanForFeature,
    canUpgrade,
    getNextPlan,
    getPlanDisplayInfo,
  };
}

/* ------------------------------------------------------------------
   USAGE TRACKER (localStorage)
------------------------------------------------------------------- */

export class UsageTracker {
  private static keyRoot = 'user_usage_tracking';

  /* Read current usage counter */
  static getCurrentUsage(userId: string, feature: string) {
    if (typeof window === 'undefined') return 0;
    const raw = localStorage.getItem(
      `${this.keyRoot}_${userId}_${feature}`,
    );
    return raw ? parseInt(raw, 10) : 0;
  }

  /* Increment and return new value */
  static incrementUsage(userId: string, feature: string) {
    if (typeof window === 'undefined') return 0;
    const next = this.getCurrentUsage(userId, feature) + 1;
    localStorage.setItem(
      `${this.keyRoot}_${userId}_${feature}`,
      String(next),
    );
    return next;
  }

  /* Clear a single counter (e.g. monthly reset) */
  static resetUsage(userId: string, feature: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.keyRoot}_${userId}_${feature}`);
  }

  /* Get all usage for a user (debugging/admin) */
  static getAllUsage(userId: string) {
    if (typeof window === 'undefined') return {};
    const out: Record<string, number> = {};
    const prefix = `${this.keyRoot}_${userId}_`;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(prefix)) {
        const feature = k.replace(prefix, '');
        out[feature] = parseInt(localStorage.getItem(k) ?? '0', 10);
      }
    }
    return out;
  }
}
