import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

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

    // Mark this as a new signup for assessment triggering
    if (data.user && !error) {
      localStorage.setItem(`new_signup_${data.user.id}`, "true")
    }

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

  // Test signup function for demo purposes
  async testSignUp(email: string, password: string, userData?: any) {
    // Simulate a successful signup for testing
    const testUser = {
      id: `test-user-${Date.now()}`,
      email,
      user_metadata: {
        full_name: userData?.full_name || "Test User",
        ...userData,
      },
    }

    // Mark as new signup
    localStorage.setItem(`new_signup_${testUser.id}`, "true")

    return {
      data: {
        user: testUser,
        session: { user: testUser },
      },
      error: null,
    }
  },
}
