"use client"

import { Button } from "@/components/ui/button"
import { demoAuth } from "@/lib/demo-auth"

export default function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <h1 className="text-lg font-semibold">ProFitz&nbsp;Trading&nbsp;Psychology&nbsp;Lab</h1>
      <Button
        size="sm"
        onClick={() => {
          demoAuth.signOut()
          window.location.href = "/auth/signin"
        }}
      >
        Sign&nbsp;Out
      </Button>
    </header>
  )
}
