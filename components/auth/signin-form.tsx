"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Chrome } from "lucide-react"
import { demoAuth } from "@/lib/demo-auth"
import Link from "next/link"
import Image from "next/image"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Attempting to sign in with:", email)

      // Check for demo credentials
      if (email === "demo@profitz.com" && password === "demo123") {
        const success = demoAuth.signIn(email, password)
        console.log("Demo sign in result:", success)

        if (success) {
          console.log("Sign in successful, navigating to dashboard...")
          // Small delay to ensure localStorage is set
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 100)
          return
        } else {
          setError("Failed to sign in with demo credentials")
        }
      } else {
        setError("Demo mode: Please use demo@profitz.com with password demo123")
      }
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError(err.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickDemo = async () => {
    setIsLoading(true)
    setError("")

    try {
      console.log("Quick demo login...")
      const success = demoAuth.signIn("demo@profitz.com", "demo123")
      console.log("Quick demo result:", success)

      if (success) {
        console.log("Quick demo successful, navigating...")
        // Small delay to ensure localStorage is set
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 100)
        return
      } else {
        setError("Failed to sign in with demo credentials")
      }
    } catch (err: any) {
      console.error("Quick demo error:", err)
      setError("Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("Demo mode: Google sign-in requires Supabase configuration. Use demo@profitz.com / demo123 instead.")
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/signinbackground.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/images/3.png"
              alt="MAXTRADES"
              width={200}
              height={60}
              className="h-28 w-auto"
              priority
            />
          </div>
          
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Sign in to your MAXTRADES account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              🚀 Demo Mode: Use <strong>demo@profitz.com</strong> with password <strong>demo123</strong>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Quick Demo Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            onClick={handleQuickDemo}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "🚀 Quick Demo Login"
            )}
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@profitz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="demo123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
