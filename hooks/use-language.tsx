"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCurrentLanguage, setGlobalLanguage, t as translate, type Language } from "@/lib/simple-translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    setLanguageState(getCurrentLanguage())
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setGlobalLanguage(lang)
  }

  // Enhanced t function with better error handling
  const t = (key: string): string => {
    try {
      // Handle nested keys like "nav.overview"
      if (key.includes(".")) {
        const [section, subkey] = key.split(".")
        const sectionKey = `${section}.${subkey}` as keyof typeof translate
        return translate(sectionKey as any) || key
      }

      // Handle direct keys
      return translate(key as any) || key
    } catch (error) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
