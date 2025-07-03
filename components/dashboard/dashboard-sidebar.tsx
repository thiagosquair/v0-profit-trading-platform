
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
  Hammer,
  Activity,
  GitPullRequest,
  Lightbulb,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: BarChart3,
    displayName: "Overview",
  },
  {
    name: "Ai Coach",
    href: "/dashboard/coach",
    icon: Brain,
    displayName: "Ai Coach",
  },
  {
    name: "Screenshot Analysis",
    href: "/dashboard/analysis",
    icon: Camera,
    displayName: "Screenshot Analysis",
  },
  {
    name: "Trade Builder",
    href: "/dashboard/trade-builder",
    icon: Hammer,
    displayName: "Trade Builder",
  },
  {
    name: "Interactive Exercises",
    href: "/dashboard/exercises",
    icon: Activity,
    displayName: "Interactive Exercises",
  },
  {
    name: "Behavioral Patterns",
    href: "/dashboard/patterns",
    icon: GitPullRequest,
    displayName: "Behavioral Patterns",
  },
  {
    name: "Psychology Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    displayName: "Psychology Courses",
  },
  {
    name: "Reflection Journal",
    href: "/dashboard/journal",
    icon: PenTool,
    displayName: "Reflection Journal",
  },
  {
    name: "Coaching Insights",
    href: "/dashboard/insights",
    icon: MessageSquare,
    displayName: "Coaching Insights",
  },
  {
    name: "Funded Career Builder",
    href: "/dashboard/career-builder",
    icon: Trophy,
    displayName: "Funded Career Builder",
  },
  {
    name: "Progress Tracking",
    href: "/dashboard/progress",
    icon: TrendingDown,
    displayName: "Progress Tracking",
  },
]

export function DashboardSidebar() {
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
                {item.displayName}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}



