"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { demoAuth } from "@/lib/demo-auth"
import { getCurrentLanguage, setGlobalLanguage, t, type Language } from "@/lib/simple-translations"

function WorkingLanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const languages = [
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
    { code: "es" as Language, name: "Español", flag: "🇪🇸" },
    { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  ]

  const handleLanguageChange = (lang: Language) => {
    console.log("Changing language to:", lang)
    setGlobalLanguage(lang)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 text-left rounded hover:bg-gray-100 flex items-center justify-between border"
      >
        <span className="flex items-center gap-2">
          <span>🌐</span>
          <span>{languages.find((l) => l.code === currentLang)?.name || "English"}</span>
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded shadow-lg mb-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full p-3 text-left hover:bg-gray-100 flex items-center gap-2 border-b last:border-b-0"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === currentLang && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TranslatedSidebar() {
  const router = useRouter()

  const handleSignOut = () => {
    demoAuth.signOut()
    router.push("/auth/signin")
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-blue-600">ProFitz</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="/dashboard" className="block p-3 rounded hover:bg-gray-100">
          🏠 {t("overview")}
        </a>
        <a href="/dashboard/coach" className="block p-3 rounded hover:bg-gray-100 bg-blue-100">
          🧠 {t("aiCoach")}
        </a>
        <a href="/dashboard/analysis" className="block p-3 rounded hover:bg-gray-100">
          📷 {t("screenshotAnalysis")}
        </a>
        <a href="/dashboard/progress" className="block p-3 rounded hover:bg-gray-100">
          📊 {t("progressTracking")}
        </a>
        <a href="/dashboard/exercises" className="block p-3 rounded hover:bg-gray-100">
          🎯 {t("interactiveExercises")}
        </a>
        <a href="/dashboard/patterns" className="block p-3 rounded hover:bg-gray-100">
          📈 {t("behavioralPatterns")}
        </a>
        <a href="/dashboard/courses" className="block p-3 rounded hover:bg-gray-100">
          📚 {t("psychologyCourses")}
        </a>
        <a href="/dashboard/journal" className="block p-3 rounded hover:bg-gray-100">
          ✏️ {t("reflectionJournal")}
        </a>
        <a href="/dashboard/insights" className="block p-3 rounded hover:bg-gray-100">
          💡 {t("coachingInsights")}
        </a>
        <a href="/dashboard/trade-builder" className="block p-3 rounded hover:bg-gray-100">
          📈 {t("tradeBuilder")}
        </a>
        <a href="/dashboard/market-insights" className="block p-3 rounded hover:bg-gray-100">
          ⚡ {t("marketInsights")}
        </a>
      </nav>

      {/* Language Switcher */}
      <div className="p-4 border-t">
        <WorkingLanguageSwitcher />
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t">
        <button onClick={handleSignOut} className="w-full p-3 text-left rounded hover:bg-gray-100 border">
          🚪 {t("signOut")}
        </button>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isSignedIn = demoAuth.isSignedIn()
        if (!isSignedIn) {
          router.push("/auth/signin")
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/auth/signin")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Single translated sidebar */}
      <TranslatedSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">ProFitz Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
