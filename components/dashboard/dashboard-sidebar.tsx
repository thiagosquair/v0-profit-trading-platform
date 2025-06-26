'use client';

import {
  Brain,
  BarChart3,
  Camera,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  Trophy,
  PenTool,
  MessageSquare,
  Hammer
} from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: BarChart3,
    key: "nav.overview",
  },
  {
    name: "AI Coach",
    href: "/dashboard/ai-coach",
    icon: Brain,
    key: "nav.aiCoach",
  },
  {
    name: "Screenshot Analysis",
    href: "/dashboard/analysis",
    icon: Camera,
    key: "nav.screenshotAnalysis",
  },
  {
    name: "Funded Career Builder",
    href: "/dashboard/career-builder",
    icon: Trophy,
    key: "nav.careerBuilder",
  },
  {
    name: "Progress Tracking",
    href: "/dashboard/progress",
    icon: TrendingUp,
    key: "nav.progressTracking",
  },
  {
    name: "Interactive Exercises",
    href: "/dashboard/exercises",
    icon: Target,
    key: "nav.interactiveExercises",
  },
  {
    name: "Behavioral Patterns",
    href: "/dashboard/patterns",
    icon: Users,
    key: "nav.behavioralPatterns",
  },
  {
    name: "Psychology Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    key: "nav.psychologyCourses",
  },
  {
    name: "Reflection Journal",
    href: "/dashboard/journal",
    icon: PenTool,
    key: "nav.reflectionJournal",
  },
  {
    name: "Coaching Insights",
    href: "/dashboard/insights",
    icon: MessageSquare,
    key: "nav.coachingInsights",
  },
  {
    name: "Trade Builder",
    href: "/dashboard/trade-builder",
    icon: Hammer,
    key: "nav.tradeBuilder",
  },
  {
    name: "Market Insights",
    href: "/dashboard/market-insights",
    icon: TrendingUp,
    key: "nav.marketInsights",
  },
]

export function DashboardSidebar() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {t(item.key)}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
