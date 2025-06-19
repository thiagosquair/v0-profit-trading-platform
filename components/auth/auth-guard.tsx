"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: ReactNode
  /**
   * If `requireAuth` is false, the guard will redirect
   * authenticated users away from public auth pages.
   */
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !user) {
      router.push("/auth/signin")
    } else if (!requireAuth && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, requireAuth, router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading…</div>
  }

  if (requireAuth && !user) return null
  if (!requireAuth && user) return null

  return <>{children}</>
}

/* ----------  backward-compat default export ---------- */
export default AuthGuard
