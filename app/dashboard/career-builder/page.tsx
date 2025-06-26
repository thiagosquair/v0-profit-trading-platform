import { FundedCareerBuilder } from "@/components/dashboard/funded-career-builder"

export default function CareerBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Funded Career Builder</h1>
        <p className="text-muted-foreground">
          Navigate your journey from prop firm challenges to scaling funded accounts
        </p>
      </div>
      <FundedCareerBuilder />
    </div>
  )
}

