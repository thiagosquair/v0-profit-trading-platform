"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
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
} from "lucide-react"

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
    translations: {
      en: "Overview",
      pt: "Visão Geral",
      es: "Resumen",
      fr: "Aperçu",
    },
  },
  {
    name: "AI Coach",
    href: "/dashboard/coach",
    icon: Brain,
    translations: {
      en: "AI Coach",
      pt: "Coach IA",
      es: "Coach IA",
      fr: "Coach IA",
    },
  },
  {
    name: "Screenshot Analysis",
    href: "/dashboard/analysis",
    icon: Camera,
    translations: {
      en: "Screenshot Analysis",
      pt: "Análise de Screenshot",
      es: "Análisis de Captura",
      fr: "Analyse de Capture",
    },
  },
  {
    name: "Progress Tracking",
    href: "/dashboard/progress",
    icon: BarChart3,
    translations: {
      en: "Progress Tracking",
      pt: "Acompanhamento de Progresso",
      es: "Seguimiento de Progreso",
      fr: "Suivi des Progrès",
    },
  },
  {
    name: "Interactive Exercises",
    href: "/dashboard/exercises",
    icon: Target,
    translations: {
      en: "Interactive Exercises",
      pt: "Exercícios Interativos",
      es: "Ejercicios Interactivos",
      fr: "Exercices Interactifs",
    },
  },
  {
    name: "Behavioral Patterns",
    href: "/dashboard/patterns",
    icon: TrendingUp,
    translations: {
      en: "Behavioral Patterns",
      pt: "Padrões Comportamentais",
      es: "Patrones Conductuales",
      fr: "Modèles Comportementaux",
    },
  },
  {
    name: "Psychology Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    translations: {
      en: "Psychology Courses",
      pt: "Cursos de Psicologia",
      es: "Cursos de Psicología",
      fr: "Cours de Psychologie",
    },
  },
  {
    name: "Reflection Journal",
    href: "/dashboard/journal",
    icon: PenTool,
    translations: {
      en: "Reflection Journal",
      pt: "Diário de Reflexão",
      es: "Diario de Reflexión",
      fr: "Journal de Réflexion",
    },
  },
  {
    name: "Coaching Insights",
    href: "/dashboard/insights",
    icon: Lightbulb,
    translations: {
      en: "Coaching Insights",
      pt: "Insights de Coaching",
      es: "Insights de Coaching",
      fr: "Insights de Coaching",
    },
  },
  {
    name: "Trade Builder",
    href: "/dashboard/trade-builder",
    icon: LineChart,
    translations: {
      en: "Trade Builder",
      pt: "Construtor de Trade",
      es: "Constructor de Trade",
      fr: "Constructeur de Trade",
    },
  },
  {
    name: "Market Insights",
    href: "/dashboard/market-insights",
    icon: Zap,
    translations: {
      en: "Market Insights",
      pt: "Insights de Mercado",
      es: "Insights de Mercado",
      fr: "Insights de Marché",
    },
  },
]

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { language } = useLanguage()

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
                  title={collapsed ? item.translations[language] : undefined}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span className="font-medium">{item.translations[language]}</span>}
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
            title={
              collapsed
                ? language === "en"
                  ? "Settings"
                  : language === "pt"
                    ? "Configurações"
                    : language === "es"
                      ? "Configuración"
                      : "Paramètres"
                : undefined
            }
          >
            <Settings className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed &&
              (language === "en"
                ? "Settings"
                : language === "pt"
                  ? "Configurações"
                  : language === "es"
                    ? "Configuración"
                    : "Paramètres")}
          </Button>
        </Link>
      </div>
    </div>
  )
}
