import type React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  )
}
