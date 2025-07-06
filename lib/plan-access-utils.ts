import { PlanType, PlanConfig } from './planConfig';

// Enhanced plan access utilities
export class PlanAccessManager {
  private static planHierarchy: PlanType[] = ['free', 'pro', 'premium', 'elite'];
  
  // Feature to minimum required plan mapping
  private static featureRequirements: Record<string, PlanType> = {
    // Free plan features
    'ai-psychology-coach': 'free',
    'trade-analysis': 'free',
    'progress-tracking': 'free',
    'interactive-exercises': 'free',
    'psychology-courses': 'free',
    'dashboard-overview': 'free',
    
    // Pro plan features
    'advanced-ai-coach': 'pro',
    'reflection-journal': 'pro',
    'screenshot-analysis': 'pro',
    'trade-builder': 'pro',
    'advanced-progress-tracking': 'pro',
    
    // Premium plan features
    'coaching-insights': 'premium',
    'behavioral-patterns': 'premium',
    'unlimited-trade-analysis': 'premium',
    'advanced-trade-builder': 'premium',
    
    // Elite plan features
    'funded-career-builder': 'elite',
    'unlimited-trade-builder': 'elite',
    'priority-support': 'elite'
  };

  /**
   * Check if user has access to a specific feature
   */
  static hasFeatureAccess(userPlan: PlanType, feature: string): boolean {
    const requiredPlan = this.featureRequirements[feature];
    if (!requiredPlan) return false;
    
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    const requiredPlanIndex = this.planHierarchy.indexOf(requiredPlan);
    
    return userPlanIndex >= requiredPlanIndex;
  }

  /**
   * Get the minimum plan required for a feature
   */
  static getRequiredPlan(feature: string): PlanType | null {
    return this.featureRequirements[feature] || null;
  }

  /**
   * Check if user has reached usage limits for a feature
   */
  static hasReachedLimit(userPlan: PlanType, feature: string, currentUsage: number): boolean {
    const planConfig = PlanConfig[userPlan];
    if (!planConfig) return true;

    switch (feature) {
      case 'trade-analysis':
        if (planConfig.tradeAnalyses === 'unlimited') return false;
        return currentUsage >= planConfig.tradeAnalyses;
      
      case 'trade-builder':
        if (planConfig.tradeBuilder === 'unlimited') return false;
        return currentUsage >= planConfig.tradeBuilder;
      
      default:
        return false;
    }
  }

  /**
   * Get remaining usage for a feature
   */
  static getRemainingUsage(userPlan: PlanType, feature: string, currentUsage: number): number | 'unlimited' {
    const planConfig = PlanConfig[userPlan];
    if (!planConfig) return 0;

    switch (feature) {
      case 'trade-analysis':
        if (planConfig.tradeAnalyses === 'unlimited') return 'unlimited';
        return Math.max(0, planConfig.tradeAnalyses - currentUsage);
      
      case 'trade-builder':
        if (planConfig.tradeBuilder === 'unlimited') return 'unlimited';
        return Math.max(0, planConfig.tradeBuilder - currentUsage);
      
      default:
        return 0;
    }
  }

  /**
   * Get all features available for a plan
   */
  static getAvailableFeatures(userPlan: PlanType): string[] {
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    
    return Object.entries(this.featureRequirements)
      .filter(([_, requiredPlan]) => {
        const requiredPlanIndex = this.planHierarchy.indexOf(requiredPlan);
        return userPlanIndex >= requiredPlanIndex;
      })
      .map(([feature, _]) => feature);
  }

  /**
   * Get all locked features for a plan
   */
  static getLockedFeatures(userPlan: PlanType): Array<{feature: string, requiredPlan: PlanType}> {
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    
    return Object.entries(this.featureRequirements)
      .filter(([_, requiredPlan]) => {
        const requiredPlanIndex = this.planHierarchy.indexOf(requiredPlan);
        return userPlanIndex < requiredPlanIndex;
      })
      .map(([feature, requiredPlan]) => ({ feature, requiredPlan }));
  }

  /**
   * Get next plan that would unlock a feature
   */
  static getNextPlanForFeature(userPlan: PlanType, feature: string): PlanType | null {
    const requiredPlan = this.getRequiredPlan(feature);
    if (!requiredPlan) return null;
    
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    const requiredPlanIndex = this.planHierarchy.indexOf(requiredPlan);
    
    if (userPlanIndex >= requiredPlanIndex) return null;
    
    return requiredPlan;
  }

  /**
   * Check if plan can be upgraded
   */
  static canUpgrade(userPlan: PlanType): boolean {
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    return userPlanIndex < this.planHierarchy.length - 1;
  }

  /**
   * Get next available plan for upgrade
   */
  static getNextPlan(userPlan: PlanType): PlanType | null {
    const userPlanIndex = this.planHierarchy.indexOf(userPlan);
    if (userPlanIndex >= this.planHierarchy.length - 1) return null;
    
    return this.planHierarchy[userPlanIndex + 1];
  }

  /**
   * Get plan display information
   */
  static getPlanDisplayInfo(plan: PlanType) {
    const planConfig = PlanConfig[plan];
    const colors = {
      free: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
      pro: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      premium: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      elite: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' }
    };

    return {
      name: planConfig.name,
      price: planConfig.price,
      colors: colors[plan],
      features: planConfig.features
    };
  }
}

// React hook for plan access
export function usePlanAccess() {
  return {
    hasFeatureAccess: PlanAccessManager.hasFeatureAccess,
    getRequiredPlan: PlanAccessManager.getRequiredPlan,
    hasReachedLimit: PlanAccessManager.hasReachedLimit,
    getRemainingUsage: PlanAccessManager.getRemainingUsage,
    getAvailableFeatures: PlanAccessManager.getAvailableFeatures,
    getLockedFeatures: PlanAccessManager.getLockedFeatures,
    getNextPlanForFeature: PlanAccessManager.getNextPlanForFeature,
    canUpgrade: PlanAccessManager.canUpgrade,
    getNextPlan: PlanAccessManager.getNextPlan,
    getPlanDisplayInfo: PlanAccessManager.getPlanDisplayInfo
  };
}

// Usage tracking utilities
export class UsageTracker {
  private static storageKey = 'user_usage_tracking';

  /**
   * Get current usage for a feature
   */
  static getCurrentUsage(userId: string, feature: string): number {
    if (typeof window === 'undefined') return 0;
    
    const usage = localStorage.getItem(`${this.storageKey}_${userId}_${feature}`);
    return usage ? parseInt(usage, 10) : 0;
  }

  /**
   * Increment usage for a feature
   */
  static incrementUsage(userId: string, feature: string): number {
    if (typeof window === 'undefined') return 0;
    
    const currentUsage = this.getCurrentUsage(userId, feature);
    const newUsage = currentUsage + 1;
    localStorage.setItem(`${this.storageKey}_${userId}_${feature}`, newUsage.toString());
    return newUsage;
  }

  /**
   * Reset usage for a feature (useful for monthly resets)
   */
  static resetUsage(userId: string, feature: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(`${this.storageKey}_${userId}_${feature}`);
  }

  /**
   * Get all usage data for a user
   */
  static getAllUsage(userId: string): Record<string, number> {
    if (typeof window === 'undefined') return {};
    
    const usage: Record<string, number> = {};
    const prefix = `${this.storageKey}_${userId}_`;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const feature = key.replace(prefix, '');
        const value = localStorage.getItem(key);
        if (value) {
          usage[feature] = parseInt(value, 10);
        }
      }
    }
    
    return usage;
  }
}

