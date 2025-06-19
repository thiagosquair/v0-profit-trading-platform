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

  return { session, user }
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
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
  return ctx
}
