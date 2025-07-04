import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"
import { supabase } from './supabase';
import { getPlanFeatures } from './planConfig';

export const auth = {
  // ... existing methods

  // Activate a new plan for the user
  async activatePlan(plan: 'free' | 'pro' | 'premium' | 'elite', resetUsage: boolean = true) {
    try {
      const { user } = await this.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Call the database function to activate the plan
      const { data, error } = await supabase.rpc('activate_user_plan', {
        user_id: user.id,
        new_plan: plan,
        reset_usage: resetUsage
      });

      if (error) {
        console.error('Error activating plan:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error activating plan:', error);
      return { success: false, error: 'Failed to activate plan' };
    }
  },

  // Get user's current plan and features
  async getUserPlanDetails() {
    try {
      const { user } = await this.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return { success: false, error: error.message };
      }

      const planFeatures = getPlanFeatures(profile.plan);

      return {
        success: true,
        data: {
          profile,
          features: planFeatures,
          remainingUsage: {
            trade_analyses: getRemainingUsage(profile.plan, 'trade_analyses', profile.trade_analyses_count),
            trade_builder: getRemainingUsage(profile.plan, 'trade_builder', profile.trade_builder_count),
          }
        }
      };
    } catch (error) {
      console.error('Error getting plan details:', error);
      return { success: false, error: 'Failed to get plan details' };
    }
  },
};

const DEMO_CREDENTIALS = {
  email: "demo@profitz.com",
  password: "demo123",
  user: {
    id: "demo-user-123",
    email: "demo@profitz.com",
    user_metadata: {
      full_name: "Demo User",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      provider: "email",
      trading_experience: "intermediate",
      trading_style: "day-trading",
      risk_tolerance: "moderate",
    },
  },
}

export interface AuthUser extends User {
  user_metadata?: {
    full_name?: string
    avatar_url?: string
    provider?: string
  }
}

const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    // Check for demo credentials first
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Simulate successful login with demo user
      return {
        data: {
          user: DEMO_CREDENTIALS.user,
          session: { user: DEMO_CREDENTIALS.user },
        },
        error: null,
      }
    }

    // If Supabase is configured, use real auth
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    }

    // Demo mode fallback
    return {
      data: null,
      error: { message: "Demo mode: Use demo@profitz.com / demo123 to test the dashboard" },
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
