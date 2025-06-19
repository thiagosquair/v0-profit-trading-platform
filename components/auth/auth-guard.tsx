"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

/**
 * Guard pages or sections that should (or should NOT) be accessed
 * when the user is authenticated.
 *
 * @param requireAuth  true  → only logged-in users may proceed
 *                     false → only guests may proceed
 */
export function AuthGuard({
  children,
  requireAuth = true,
}: {
  children: React.ReactNode
  requireAuth?: boolean
}) {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Redirect according to auth state
  useEffect(() => {
    if (loading) return

    if (requireAuth && !user) {
      router.replace("/auth/signin")
    } else if (!requireAuth && user) {
      router.replace("/dashboard")
    }
  }, [loading, user, requireAuth, router])

  // While we don’t know the auth state (or we are redirecting) render nothing
  if (loading) return null
  if (requireAuth && !user) return null
  if (!requireAuth && user) return null

  return <>{children}</>
}
