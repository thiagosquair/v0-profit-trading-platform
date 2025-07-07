// contexts/UserContext.tsx - CORRECTED VERSION
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth, AuthUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { getPlanFeatures, hasFeatureAccess, getRemainingUsage } from '@/lib/planConfig';

interface UserProfile {
  id: string;
  plan: 'free' | 'pro' | 'premium' | 'elite';
  screenshot_analysis_count: number;
  trade_builder_count: number;
  last_reset_date: string;
  plan_activated_at: string;
  created_at: string;
  updated_at: string;
}

interface UserContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  activatePlan: (plan: 'free' | 'pro' | 'premium' | 'elite') => Promise<boolean>;
  hasFeature: (feature: string) => boolean;
  getRemainingUsage: (feature: 'screenshot_analysis' | 'trade_builder') => number | 'unlimited';
  isFeatureEnabled: (feature: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  }, [user?.id, fetchProfile]);

  // Plan activation function
  const activatePlan = useCallback(async (plan: 'free' | 'pro' | 'premium' | 'elite'): Promise<boolean> => {
    try {
      const result = await auth.activatePlan(plan, true);
      
      if (result.success) {
        // Immediately refresh the profile to reflect changes
        await refreshProfile();
        return true;
      } else {
        console.error('Plan activation failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error activating plan:', error);
      return false;
    }
  }, [refreshProfile]);

  // Feature access checking
  const hasFeature = useCallback((feature: string): boolean => {
    if (!profile) return false;
    return hasFeatureAccess(profile.plan, feature as any);
  }, [profile]);

  // Get remaining usage for limited features
  const getRemainingUsageCount = useCallback((feature: 'screenshot_analysis' | 'trade_builder'): number | 'unlimited' => {
    if (!profile) return 0;
    
    const currentUsage = feature === 'screenshot_analysis' 
      ? profile.screenshot_analysis_count 
      : profile.trade_builder_count;
    
    return getRemainingUsage(profile.plan, feature, currentUsage);
  }, [profile]);

  // Check if feature is enabled (combines access + usage limits)
  const isFeatureEnabled = useCallback((feature: string): boolean => {
    if (!hasFeature(feature)) return false;
    
    // For limited features, check if they have remaining usage
    if (feature === 'screenshot_analysis') {
      const remaining = getRemainingUsageCount('screenshot_analysis');
      return remaining === 'unlimited' || remaining > 0;
    }
    
    if (feature === 'trade_builder') {
      const remaining = getRemainingUsageCount('trade_builder');
      return remaining === 'unlimited' || remaining > 0;
    }
    
    return true;
  }, [hasFeature, getRemainingUsageCount]);

  // Initialize user and profile on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: currentUser } = await auth.getCurrentUser();
        setUser(currentUser);

        if (currentUser?.id) {
          const profileData = await fetchProfile(currentUser.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user?.id) {
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // Listen for real-time profile changes
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Profile updated:', payload);
          setProfile(payload.new as UserProfile);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
        activatePlan,
        hasFeature,
        getRemainingUsage: getRemainingUsageCount,
        isFeatureEnabled,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
