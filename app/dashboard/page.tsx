"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { LanguageProvider } from "@/hooks/use-language"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <LanguageProvider>
        <DashboardLayout>
          <DashboardOverview />
        </DashboardLayout>
      </LanguageProvider>
    </AuthGuard>
  )
}
