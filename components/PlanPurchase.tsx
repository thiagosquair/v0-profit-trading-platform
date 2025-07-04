// components/PlanPurchase.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';

interface PlanPurchaseProps {
  planId: 'free' | 'pro' | 'premium' | 'elite';
  planName: string;
  price: string;
  features: string[];
  onSuccess?: () => void;
}

export function PlanPurchase({ planId, planName, price, features, onSuccess }: PlanPurchaseProps) {
  const { profile, activatePlan } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
          <CardTitle className="text-green-800">Plan Activated!</CardTitle>
          <CardDescription className="text-green-600">
            Your {planName} plan is now active. All features are immediately available.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}>
      {isCurrentPlan && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
          Current Plan
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{planName}</CardTitle>
        <div className="text-3xl font-bold text-blue-600">{price}</div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
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
              {isUpgrade ? 'Upgrading...' : 'Activating...'}
            </>
          ) : isCurrentPlan ? (
            'Current Plan'
          ) : isUpgrade ? (
            'Upgrade Now'
          ) : (
            'Select Plan'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
