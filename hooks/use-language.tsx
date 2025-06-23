"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Language, setLanguage as setGlobalLanguage, getCurrentLanguage, t } from "@/lib/simple-translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage())

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setGlobalLanguage(lang)
  }

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguageState(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
