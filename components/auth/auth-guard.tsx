"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { demoAuth } from "@/lib/demo-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log("Checking authentication...")
        const signedIn = demoAuth.isSignedIn()
        console.log("Authentication status:", signedIn)

        setIsAuthenticated(signedIn)

        if (!signedIn) {
          console.log("Not authenticated, redirecting to signin...")
          router.push("/auth/signin")
        } else {
          console.log("Authenticated, showing dashboard...")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/auth/signin")
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to ensure localStorage is available
    setTimeout(checkAuth, 50)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
