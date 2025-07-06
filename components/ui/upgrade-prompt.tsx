"use client";

import React from 'react';
import { Lock, Crown, Zap, Star } from 'lucide-react';

interface UpgradePromptProps {
  feature: string;
  currentPlan: string;
  requiredPlan: string;
  onUpgrade?: () => void;
  variant?: 'modal' | 'inline' | 'sidebar';
  className?: string;
}

const planIcons = {
  free: Lock,
  pro: Zap,
  premium: Crown,
  elite: Star
};

const planColors = {
  free: 'text-gray-500',
  pro: 'text-blue-500',
  premium: 'text-purple-500',
  elite: 'text-yellow-500'
};

const planGradients = {
  free: 'from-gray-400 to-gray-600',
  pro: 'from-blue-400 to-blue-600',
  premium: 'from-purple-400 to-purple-600',
  elite: 'from-yellow-400 to-yellow-600'
};

export function UpgradePrompt({ 
  feature, 
  currentPlan, 
  requiredPlan, 
  onUpgrade,
  variant = 'modal',
  className = ''
}: UpgradePromptProps) {
  const RequiredIcon = planIcons[requiredPlan.toLowerCase() as keyof typeof planIcons] || Crown;
  const requiredPlanColor = planColors[requiredPlan.toLowerCase() as keyof typeof planColors];
  const requiredPlanGradient = planGradients[requiredPlan.toLowerCase() as keyof typeof planGradients];

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Lock className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-400 font-medium">
          {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} Required
        </span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r ${requiredPlanGradient} p-4 rounded-lg text-white ${className}`}>
        <div className="flex items-center gap-3">
          <RequiredIcon className="w-6 h-6" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Upgrade Required</h4>
            <p className="text-xs opacity-90">
              {feature} requires {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan
            </p>
          </div>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Upgrade
            </button>
          )}
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${requiredPlanGradient} flex items-center justify-center`}>
            <RequiredIcon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Upgrade to {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
          </h3>
          
          <p className="text-gray-600 mb-6">
            <strong>{feature}</strong> is available with the {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan. 
            Upgrade now to unlock this feature and many more!
          </p>

          <div className="space-y-3">
            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className={`w-full bg-gradient-to-r ${requiredPlanGradient} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
              >
                Upgrade to {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
              </button>
            )}
            
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for easy access control
export function useFeatureAccess() {
  // This would integrate with your UserContext
  const checkFeatureAccess = (feature: string, userPlan: string): boolean => {
    const planHierarchy = ['free', 'pro', 'premium', 'elite'];
    const featureRequirements = {
      'ai-psychology-coach': 'free',
      'trade-analysis': 'free',
      'progress-tracking': 'free',
      'interactive-exercises': 'free',
      'psychology-courses': 'free',
      'advanced-ai-coach': 'pro',
      'reflection-journal': 'pro',
      'screenshot-analysis': 'pro',
      'trade-builder': 'pro',
      'coaching-insights': 'premium',
      'behavioral-patterns': 'premium',
      'unlimited-trade-analysis': 'premium',
      'funded-career-builder': 'elite',
      'unlimited-trade-builder': 'elite'
    };

    const requiredPlan = featureRequirements[feature as keyof typeof featureRequirements] || 'elite';
    const userPlanIndex = planHierarchy.indexOf(userPlan.toLowerCase());
    const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);

    return userPlanIndex >= requiredPlanIndex;
  };

  const getRequiredPlan = (feature: string): string => {
    const featureRequirements = {
      'ai-psychology-coach': 'free',
      'trade-analysis': 'free',
      'progress-tracking': 'free',
      'interactive-exercises': 'free',
      'psychology-courses': 'free',
      'advanced-ai-coach': 'pro',
      'reflection-journal': 'pro',
      'screenshot-analysis': 'pro',
      'trade-builder': 'pro',
      'coaching-insights': 'premium',
      'behavioral-patterns': 'premium',
      'unlimited-trade-analysis': 'premium',
      'funded-career-builder': 'elite',
      'unlimited-trade-builder': 'elite'
    };

    return featureRequirements[feature as keyof typeof featureRequirements] || 'elite';
  };

  return { checkFeatureAccess, getRequiredPlan };
}

