'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { UpgradePrompt } from './UpgradePrompt';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
  upgradeMessage?: string;
}

export function FeatureGate({ 
  feature, 
  children, 
  fallback, 
  showUpgradePrompt = true,
  upgradeMessage 
}: FeatureGateProps) {
  const { hasFeature, isFeatureEnabled, profile } = useUser();

  // Check if user has access to the feature
  const hasAccess = hasFeature(feature);
  const isEnabled = isFeatureEnabled(feature);

  // If user has access and feature is enabled, show the content
  if (hasAccess && isEnabled) {
    return <>{children}</>;
  }

  // If a custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If showUpgradePrompt is false, don't show anything
  if (!showUpgradePrompt) {
    return null;
  }

  // Show upgrade prompt
  return (
    <UpgradePrompt 
      feature={feature}
      currentPlan={profile?.plan || 'free'}
      message={upgradeMessage}
    />
  );
}

