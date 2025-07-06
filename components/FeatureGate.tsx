'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Zap } from 'lucide-react';
import Link from 'next/link';

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

  const hasAccess = hasFeature(feature);
  const isEnabled = isFeatureEnabled(feature);

  if (hasAccess && isEnabled) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgradePrompt) {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          {hasAccess ? <Zap className="h-8 w-8 text-white" /> : <Lock className="h-8 w-8 text-white" />}
        </div>
        <CardTitle className="text-orange-800">
          {hasAccess ? `${feature} Limit Reached` : `Upgrade Required`}
        </CardTitle>
        <CardDescription className="text-orange-600">
          {upgradeMessage ||
            (hasAccess
              ? `You've used all your ${feature} for this month. Upgrade to continue using this feature.`
              : `${feature} is available on higher plans. Upgrade to unlock this feature.`)
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button asChild>
          <Link href="/dashboard/billing">
            {hasAccess ? 'Upgrade Plan' : 'View Plans'}
          </Link>
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Current plan: <span className="font-semibold capitalize">{profile?.plan || 'free'}</span>
        </p>
      </CardContent>
    </Card>
  );
}
