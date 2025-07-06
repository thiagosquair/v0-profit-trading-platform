"use client";

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { PlanAccessManager, UsageTracker } from '@/lib/plan-access-utils-enhanced';
import { UpgradePrompt } from '@/components/upgrade-prompt-enhanced';

interface ProtectedRouteProps {
  children: React.ReactNode;
  feature: string;
  fallback?: React.ReactNode;
  checkUsageLimit?: boolean;
  usageFeature?: string;
}

export function ProtectedRoute({ 
  children, 
  feature, 
  fallback,
  checkUsageLimit = false,
  usageFeature
}: ProtectedRouteProps) {
  const { user } = useUser();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access this feature.</p>
        </div>
      </div>
    );
  }

  const userPlan = user.subscription?.plan || 'free';
  const hasAccess = PlanAccessManager.hasFeatureAccess(userPlan, feature);
  
  if (!hasAccess) {
    const requiredPlan = PlanAccessManager.getRequiredPlan(feature);
    
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <UpgradePrompt
        feature={feature}
        currentPlan={userPlan}
        requiredPlan={requiredPlan || 'pro'}
        onUpgrade={() => window.location.href = '/dashboard/upgrade'}
        variant="modal"
      />
    );
  }

  // Check usage limits if required
  if (checkUsageLimit && usageFeature) {
    const currentUsage = UsageTracker.getCurrentUsage(user.id, usageFeature);
    const hasReachedLimit = PlanAccessManager.hasReachedLimit(userPlan, usageFeature, currentUsage);
    
    if (hasReachedLimit) {
      const nextPlan = PlanAccessManager.getNextPlan(userPlan);
      
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Usage Limit Reached</h2>
            <p className="text-gray-600 mb-4">
              You've reached your monthly limit for {usageFeature.replace('-', ' ')}. 
              {nextPlan && ` Upgrade to ${nextPlan} for more usage.`}
            </p>
            
            {nextPlan && (
              <button
                onClick={() => window.location.href = '/dashboard/upgrade'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade to {nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}
              </button>
            )}
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Higher-order component for easy page protection
export function withProtectedRoute<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  feature: string,
  options?: {
    checkUsageLimit?: boolean;
    usageFeature?: string;
  }
) {
  const ProtectedComponent = (props: P) => {
    return (
      <ProtectedRoute 
        feature={feature}
        checkUsageLimit={options?.checkUsageLimit}
        usageFeature={options?.usageFeature}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };

  ProtectedComponent.displayName = `withProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return ProtectedComponent;
}

// Usage tracking wrapper component
export function UsageTrackingWrapper({ 
  children, 
  feature, 
  userId 
}: { 
  children: React.ReactNode; 
  feature: string; 
  userId: string; 
}) {
  React.useEffect(() => {
    // Increment usage when component mounts
    UsageTracker.incrementUsage(userId, feature);
  }, [userId, feature]);

  return <>{children}</>;
}

// Component for displaying usage information
export function UsageDisplay({ 
  feature, 
  userPlan, 
  currentUsage 
}: { 
  feature: string; 
  userPlan: string; 
  currentUsage: number; 
}) {
  const remaining = PlanAccessManager.getRemainingUsage(userPlan, feature, currentUsage);
  
  if (remaining === 'unlimited') {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Unlimited usage
      </div>
    );
  }
  
  const total = currentUsage + remaining;
  const percentage = total > 0 ? (currentUsage / total) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Usage this month</span>
        <span className="font-medium">{currentUsage} / {total}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {remaining === 0 && (
        <p className="text-xs text-red-600">
          You've reached your monthly limit. Upgrade for more usage.
        </p>
      )}
    </div>
  );
}

