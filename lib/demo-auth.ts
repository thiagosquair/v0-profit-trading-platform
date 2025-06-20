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
    try {
      const authData = localStorage.getItem("demo-auth")
      if (authData) {
        const parsed = JSON.parse(authData)
        return parsed.isAuthenticated === true
      }
      return false
    } catch (error) {
      console.error("Error checking sign in status:", error)
      return false
    }
  },

  // Get current user (demo mode)
  getCurrentUser() {
    if (!this.isSignedIn()) return null

    try {
      const authData = localStorage.getItem("demo-auth")
      if (authData) {
        const parsed = JSON.parse(authData)
        return parsed.user || this.demoUser
      }
      return this.demoUser
    } catch (error) {
      console.error("Error getting current user:", error)
      return this.demoUser
    }
  },

  // Sign in (demo mode)
  signIn(email: string, password: string): boolean {
    try {
      if (email === "demo@profitz.com" && password === "demo123") {
        if (typeof window !== "undefined") {
          const authData = {
            isAuthenticated: true,
            user: this.demoUser,
            timestamp: Date.now(),
          }
          localStorage.setItem("demo-auth", JSON.stringify(authData))
          console.log("Demo auth set:", authData)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Error during sign in:", error)
      return false
    }
  },

  // Sign out (demo mode)
  signOut() {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("demo-auth")
        console.log("Demo auth cleared")
      }
    } catch (error) {
      console.error("Error during sign out:", error)
    }
  },
}
