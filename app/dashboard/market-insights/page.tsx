import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MarketInsights } from "@/components/dashboard/market-insights"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function MarketInsightsPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <MarketInsights />
      </DashboardLayout>
    </AuthGuard>
  )
}
