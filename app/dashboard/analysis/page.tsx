"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ScreenshotAnalysis } from "@/components/dashboard/screenshot-analysis"

export default function AnalysisPage() {
  return (
    <AuthGuard requireAuth>
      <DashboardLayout>
        <ScreenshotAnalysis />
      </DashboardLayout>
    </AuthGuard>
  )
}
