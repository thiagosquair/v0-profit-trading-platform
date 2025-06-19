"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import { demoAuth } from "@/lib/demo-auth"
import { useRouter } from "next/navigation"

export default function DashboardHeader() {
  const router = useRouter()
  const user = demoAuth.getCurrentUser()

  const handleSignOut = () => {
    demoAuth.signOut()
    router.push("/auth/signin")
  }

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.user_metadata?.avatar_url || "/placeholder.svg"}
              alt={user?.user_metadata?.full_name || "User"}
            />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.user_metadata?.full_name || "Demo User"}</p>
            <p className="text-xs text-gray-500">{user?.email || "demo@profitz.com"}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
