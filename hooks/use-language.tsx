"use client"

import type React from "react"

import { getCurrentLanguage, setGlobalLanguage, t } from "@/lib/simple-translations"

// Simple hook that just wraps the simple translation functions
export function useLanguage() {
  return {
    language: getCurrentLanguage(),
    setLanguage: setGlobalLanguage,
    t: t,
  }
}

// Keep the provider for backward compatibility but make it do nothing
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
