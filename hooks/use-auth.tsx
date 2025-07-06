"use client"

import * as React from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase as baseSupabase, isSupabaseConfigured } from "@/lib/supabase"

/* -------------------------------------------------------------------------- */
/*                                useAuth hook                                */
/* -------------------------------------------------------------------------- */
function useAuthInternal() {
  const [session, setSession] = React.useState<Session | null>(null)
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    // --- DEMO MODE ----------------------------------------------------------
    if (!isSupabaseConfigured()) {
      const demoUser = { id: "demo-user", email: "demo@profitz.com" } as User
      setSession({ user: demoUser } as Session)
      setUser(demoUser)
      return
    }
    // --- REAL SUPABASE MODE -------------------------------------------------
    baseSupabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = baseSupabase.auth.onAuthStateChange((_evt, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  // Sign up function
  const signUp = async (email: string, password: string, metadata?: any) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Demo mode: Authentication requires Supabase configuration")
    }

    const { data, error } = await baseSupabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })

    if (error) {
      throw error
    }

    return data
  }

  // Sign in with Google function
  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error("Demo mode: Authentication requires Supabase configuration")
    }

    const { data, error } = await baseSupabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      throw error
    }

    return data
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Demo mode: Authentication requires Supabase configuration")
    }

    const { data, error } = await baseSupabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    return data
  }

  // Sign out function
  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      return
    }

    const { error } = await baseSupabase.auth.signOut()
    
    if (error) {
      throw error
    }
  }

  return { 
    session, 
    user, 
    signUp, 
    signInWithGoogle, 
    signIn, 
    signOut 
  }
}

/* -------------------------------------------------------------------------- */
/*                          Context + Provider wrapper                        */
/* -------------------------------------------------------------------------- */
type AuthContextValue = ReturnType<typeof useAuthInternal>

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useAuthInternal()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (ctx === undefined) {
    // Return a safe fallback during static generation / when no provider mounted
    return {
      session: null,
      user: null,
      signUp: async () => { throw new Error("useAuth must be used within AuthProvider") },
      signInWithGoogle: async () => { throw new Error("useAuth must be used within AuthProvider") },
      signIn: async () => { throw new Error("useAuth must be used within AuthProvider") },
      signOut: async () => { throw new Error("useAuth must be used within AuthProvider") },
    } as ReturnType<typeof useAuthInternal>
  }
  return ctx
}

