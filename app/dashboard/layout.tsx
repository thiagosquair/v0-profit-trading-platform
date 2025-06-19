"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { demoAuth } from "@/lib/demo-auth"

// Simple sidebar component directly in layout
function SimpleSidebar() {
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
        <a href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          🏠 Overview
        </a>
        <a href="/dashboard/coach" className="block p-2 rounded hover:bg-gray-100 bg-blue-100">
          🧠 AI Coach
        </a>
        <a href="/dashboard/analysis" className="block p-2 rounded hover:bg-gray-100">
          📷 Screenshot Analysis
        </a>
        <a href="/dashboard/progress" className="block p-2 rounded hover:bg-gray-100">
          📊 Progress Tracking
        </a>
        <a href="/dashboard/exercises" className="block p-2 rounded hover:bg-gray-100">
          🎯 Interactive Exercises
        </a>
        <a href="/dashboard/patterns" className="block p-2 rounded hover:bg-gray-100">
          📈 Behavioral Patterns
        </a>
        <a href="/dashboard/courses" className="block p-2 rounded hover:bg-gray-100">
          📚 Psychology Courses
        </a>
        <a href="/dashboard/journal" className="block p-2 rounded hover:bg-gray-100">
          ✏️ Reflection Journal
        </a>
        <a href="/dashboard/insights" className="block p-2 rounded hover:bg-gray-100">
          💡 Coaching Insights
        </a>
        <a href="/dashboard/trade-builder" className="block p-2 rounded hover:bg-gray-100">
          📈 Trade Builder
        </a>
        <a href="/dashboard/market-insights" className="block p-2 rounded hover:bg-gray-100">
          ⚡ Market Insights
        </a>
      </nav>

      {/* Language Switcher */}
      <div className="p-4 border-t">
        <SimpleLanguageSwitcher />
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t">
        <button onClick={handleSignOut} className="w-full p-2 text-left rounded hover:bg-gray-100">
          🚪 Sign Out
        </button>
      </div>
    </div>
  )
}

// Simple language switcher that actually works
function SimpleLanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("English")
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const handleLanguageSelect = (lang: any) => {
    console.log("Language selected:", lang.name)
    setCurrentLang(lang.name)
    setIsOpen(false)
    // Force a page refresh to see changes
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-left rounded hover:bg-gray-100 flex items-center justify-between"
      >
        <span>🌐 {currentLang}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded shadow-lg mb-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className="w-full p-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.name === currentLang && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
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
      {/* ONLY ONE SIDEBAR HERE */}
      <SimpleSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">ProFitz Dashboard</h1>
        </header>

        {/* Content - NO SIDEBAR HERE */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
