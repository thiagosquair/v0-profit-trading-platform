import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "demo-service-key"

// Check if we're in development mode with placeholder values
const isDemoMode = supabaseUrl.includes("demo") || supabaseUrl === "your_supabase_url"

// Create a mock client for demo purposes
const createMockClient = () => ({
  auth: {
    signUp: async () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
    signInWithPassword: async () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
    signInWithOAuth: async () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: null } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
    update: () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
    delete: () => ({ data: null, error: { message: "Demo mode - Supabase not configured" } }),
  }),
  rpc: async () => ({ data: [], error: null }),
})

// Export the appropriate client
export const supabase = isDemoMode ? createMockClient() : createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const createServerSupabaseClient = () => {
  if (isDemoMode) {
    return createMockClient()
  }
  return createClient(supabaseUrl, serviceRoleKey)
}

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => !isDemoMode
