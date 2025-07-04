// hooks/useFeatureUsage.ts
import { useCallback } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

export function useFeatureUsage() {
  const { profile, refreshProfile } = useUser();

  const trackUsage = useCallback(async (feature: 'trade_analyses' | 'trade_builder') => {
    if (!profile) return { success: false, error: 'No profile found' };

    try {
      // Increment the usage count
      const updateField = feature === 'trade_analyses' ? 'trade_analyses_count' : 'trade_builder_count';
      const currentCount = feature === 'trade_analyses' ? 
        profile.trade_analyses_count : profile.trade_builder_count;

      const { error } = await supabase
        .from('profiles')
        .update({ 
          [updateField]: currentCount + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) {
        console.error('Error tracking usage:', error);
        return { success: false, error: error.message };
      }

      // Refresh the profile to get updated counts
      await refreshProfile();

      // Log the usage event
      await supabase.from('usage_events').insert({
        user_id: profile.id,
        feature: feature,
        action: 'feature_used',
        metadata: {
          new_count: currentCount + 1,
          plan: profile.plan
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Error tracking usage:', error);
      return { success: false, error: 'Failed to track usage' };
    }
  }, [profile, refreshProfile]);

  return { trackUsage };
}
