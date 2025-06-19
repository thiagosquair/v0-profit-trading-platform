// Simple demo authentication without Supabase dependency
export const demoAuth = {
  // Demo user data
  demoUser: {
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

  // Check if user is signed in (demo mode)
  isSignedIn(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem("demo_signed_in") === "true"
  },

  // Get current user (demo mode)
  getCurrentUser() {
    if (this.isSignedIn()) {
      return this.demoUser
    }
    return null
  },

  // Sign in (demo mode)
  signIn(email: string, password: string): boolean {
    if (email === "demo@profitz.com" && password === "demo123") {
      if (typeof window !== "undefined") {
        localStorage.setItem("demo_signed_in", "true")
        localStorage.setItem("demo_user", JSON.stringify(this.demoUser))
      }
      return true
    }
    return false
  },

  // Sign out (demo mode)
  signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_signed_in")
      localStorage.removeItem("demo_user")
    }
  },
}
