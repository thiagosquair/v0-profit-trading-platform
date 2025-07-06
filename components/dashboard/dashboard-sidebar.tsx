"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageSwitcher } from "@/components/language-switcher"
import { t } from "@/lib/simple-translations"
import {
  Brain,
  BarChart3,
  Camera,
  Target,
  TrendingUp,
  BookOpen,
  PenTool,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  LineChart,
  Zap,
  Trophy,
} from "lucide-react"

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
    key: "nav.overview",
  },
  {
    name: "AI Coach",
    href: "/dashboard/coach",
    icon: Brain,
    key: "nav.aiCoach",
  },
  {
    name: "Screenshot Analysis",
    href: "/dashboard/analysis",
    icon: Camera,
    key: "nav.analysis",
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
    icon: BarChart3,
    key: "nav.progress",
  },
  {
    name: "Interactive Exercises",
    href: "/dashboard/exercises",
    icon: Target,
    key: "nav.exercises",
  },
  {
    name: "Behavioral Patterns",
    href: "/dashboard/patterns",
    icon: TrendingUp,
    key: "nav.patterns",
  },
  {
    name: "Psychology Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    key: "nav.courses",
  },
  {
    name: "Reflection Journal",
    href: "/dashboard/journal",
    icon: PenTool,
    key: "nav.journal",
  },
  {
    name: "Coaching Insights",
    href: "/dashboard/insights",
    icon: Lightbulb,
    key: "nav.insights",
  },
  {
    name: "Trade Builder",
    href: "/dashboard/trade-builder",
    icon: LineChart,
    key: "nav.tradeBuilder",
  },
  {
    name: "Market Insights",
    href: "/dashboard/market-insights",
    icon: Zap,
    key: "nav.marketInsights",
  },
]

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("flex flex-col border-r bg-white/50 backdrop-blur-sm", collapsed ? "w-16" : "w-64", className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProFitz
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    collapsed && "px-2",
                    isActive && "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg",
                  )}
                  title={collapsed ? t(item.key) : undefined}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span className="font-medium">{t(item.key)}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Language Switcher - only when expanded */}
      {!collapsed && <LanguageSwitcher variant="sidebar" />}

      {/* Settings */}
      <div className="border-t p-3">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className={cn("w-full justify-start h-10", collapsed && "px-2")}
            title={collapsed ? t("nav.settings") : undefined}
          >
            <Settings className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && <span className="font-medium">{t("nav.settings")}</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}

