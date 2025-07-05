"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { demoAuth } from "@/lib/demo-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname() // Get the current pathname

  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log("Checking authentication...")
        const signedIn = demoAuth.isSignedIn()
        console.log("Authentication status:", signedIn)

        setIsAuthenticated(signedIn)

        // Allow access to signup page without redirection
        if (!signedIn && pathname !== "/auth/signup") {
          console.log("Not authenticated and not on signup page, redirecting to signin...")
          router.push("/auth/signin")
        } else if (signedIn && pathname === "/auth/signin") {
          // If authenticated and on signin page, redirect to dashboard
          console.log("Authenticated and on signin page, redirecting to dashboard...")
          router.push("/dashboard")
        } else {
          console.log("Authentication status handled.")
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
  }, [router, pathname]) // Add pathname to dependency array

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

  // Only show loading/redirecting message if not on signup page and not authenticated
  if (!isAuthenticated && pathname !== "/auth/signup") {
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
