import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TradeBuilder } from "@/components/dashboard/trade-builder"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function TradeBuilderPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <TradeBuilder />
      </DashboardLayout>
    </AuthGuard>
  )
}
