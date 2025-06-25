"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const tabs = ["coach", "analysis", "exercises", "journal"]

// Placeholder components – replace these with real ones
const CoachComponent = () => <div>Your Coach content goes here.</div>
const AnalysisComponent = () => <div>Your Analysis content goes here.</div>
const ExercisesComponent = () => <div>Your Exercises content goes here.</div>
const JournalComponent = () => <div>Your Journal content goes here.</div>

export function DashboardOverview() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("coach")

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Total Sessions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("in the last month")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Completed Exercises")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">{t("across all categories")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Active Goals")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">{t("currently being tracked")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Journal Entries")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">{t("written this month")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab buttons */}
      <div className="flex space-x-4 pt-6">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
          >
            {t(tab)}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-4">
        {activeTab === "coach" && <CoachComponent />}
        {activeTab === "analysis" && <AnalysisComponent />}
        {activeTab === "exercises" && <ExercisesComponent />}
        {activeTab === "journal" && <JournalComponent />}
      </div>
    </div>
  )
}
