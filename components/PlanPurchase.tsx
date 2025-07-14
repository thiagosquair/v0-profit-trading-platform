// components/PlanPurchase.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import { t, useDynamicTranslation } from '@/lib/enhanced-translations';

interface PlanPurchaseProps {
  planId: 'free' | 'pro' | 'premium' | 'elite';
  planName: string;
  price: string;
  features: string[];
  onSuccess?: () => void;
}

export function PlanPurchase({ planId, planName, price, features, onSuccess }: PlanPurchaseProps) {
  const { profile, activatePlan } = useUser();
  const { translateDynamic, currentLanguage } = useDynamicTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [translatedContent, setTranslatedContent] = useState({
    planName: planName,
    features: features,
    currentPlan: 'Current Plan',
    planActivated: 'Plan Activated!',
    planActiveDesc: 'plan is now active. All features are immediately available.',
    upgrading: 'Upgrading...',
    activating: 'Activating...',
    upgradeNow: 'Upgrade Now',
    selectPlan: 'Select Plan'
  });

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      if (currentLanguage === 'en') {
        setTranslatedContent({
          planName: planName,
          features: features,
          currentPlan: 'Current Plan',
          planActivated: 'Plan Activated!',
          planActiveDesc: 'plan is now active. All features are immediately available.',
          upgrading: 'Upgrading...',
          activating: 'Activating...',
          upgradeNow: 'Upgrade Now',
          selectPlan: 'Select Plan'
        });
        return;
      }

      try {
        const [
          translatedPlanName,
          translatedFeatures,
          translatedCurrentPlan,
          translatedPlanActivated,
          translatedPlanActiveDesc,
          translatedUpgrading,
          translatedActivating,
          translatedUpgradeNow,
          translatedSelectPlan
        ] = await Promise.all([
          translateDynamic(planName, { domain: 'trading' }),
          Promise.all(features.map(feature => translateDynamic(feature, { domain: 'trading' }))),
          translateDynamic('Current Plan'),
          translateDynamic('Plan Activated!'),
          translateDynamic('plan is now active. All features are immediately available.'),
          translateDynamic('Upgrading...'),
          translateDynamic('Activating...'),
          translateDynamic('Upgrade Now'),
          translateDynamic('Select Plan')
        ]);

        setTranslatedContent({
          planName: translatedPlanName,
          features: translatedFeatures,
          currentPlan: translatedCurrentPlan,
          planActivated: translatedPlanActivated,
          planActiveDesc: translatedPlanActiveDesc,
          upgrading: translatedUpgrading,
          activating: translatedActivating,
          upgradeNow: translatedUpgradeNow,
          selectPlan: translatedSelectPlan
        });
      } catch (error) {
        console.error('Translation error:', error);
        // Keep original content if translation fails
      }
    };

    translateContent();
  }, [currentLanguage, planName, features, translateDynamic]);

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      // In a real app, you would integrate with a payment processor here
      // For this example, we'll simulate a successful payment
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Activate the plan
      const activated = await activatePlan(planId);
      
      if (activated) {
        setSuccess(true);
        onSuccess?.();
      } else {
        throw new Error('Plan activation failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = profile?.plan === planId;
  const isUpgrade = profile && ['free', 'pro', 'premium', 'elite'].indexOf(planId) > 
                   ['free', 'pro', 'premium', 'elite'].indexOf(profile.plan);

  if (success) {
    return (
      <Card className="border-green-500 bg-green-50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-green-800">{translatedContent.planActivated}</CardTitle>
          <CardDescription className="text-green-600">
            {translatedContent.planName} {translatedContent.planActiveDesc}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}>
      {isCurrentPlan && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
          {translatedContent.currentPlan}
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{translatedContent.planName}</CardTitle>
        <div className="text-3xl font-bold text-blue-600">{price}</div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {translatedContent.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className="w-full"
          onClick={handlePurchase}
          disabled={loading || isCurrentPlan}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isUpgrade ? translatedContent.upgrading : translatedContent.activating}
            </>
          ) : isCurrentPlan ? (
            translatedContent.currentPlan
          ) : isUpgrade ? (
            translatedContent.upgradeNow
          ) : (
            translatedContent.selectPlan
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
