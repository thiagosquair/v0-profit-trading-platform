"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "pt" | "es" | "fr"
const supportedLanguages: Language[] = ["en", "pt", "es", "fr"]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Complete translations object
const translations = {
  en: {
    // Navigation
    "nav.overview": "Overview",
    "nav.aiCoach": "AI Coach",
    "nav.analysis": "Screenshot Analysis",
    "nav.progress": "Progress Tracking",
    "nav.exercises": "Interactive Exercises",
    "nav.patterns": "Behavioral Patterns",
    "nav.courses": "Psychology Courses",
    "nav.journal": "Reflection Journal",
    "nav.insights": "Coaching Insights",
    "nav.tradeBuilder": "Trade Builder",
    "nav.marketInsights": "Market Insights",
    "nav.settings": "Settings",

    // Common
    "common.signOut": "Sign Out",
    "common.profile": "Profile Settings",
    "common.welcome": "Welcome back",
    "common.loading": "Loading...",

    // Dashboard
    welcome: "Welcome back",
    subtitle: "Ready to enhance your trading psychology today?",
    psychologyScore: "Psychology Score",
    exercisesCompleted: "Exercises Completed",
    coachingSessions: "Coaching Sessions",
    achievements: "Achievements",
    thisWeek: "This week",
    thisMonth: "This month",
    badgesEarned: "Badges earned",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    currentGoals: "Current Goals",
  },
  pt: {
    // Navigation
    "nav.overview": "Visão Geral",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Análise de Screenshot",
    "nav.progress": "Acompanhamento de Progresso",
    "nav.exercises": "Exercícios Interativos",
    "nav.patterns": "Padrões Comportamentais",
    "nav.courses": "Cursos de Psicologia",
    "nav.journal": "Diário de Reflexão",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Construtor de Trade",
    "nav.marketInsights": "Insights de Mercado",
    "nav.settings": "Configurações",

    // Common
    "common.signOut": "Sair",
    "common.profile": "Configurações do Perfil",
    "common.welcome": "Bem-vindo de volta",
    "common.loading": "Carregando...",

    // Dashboard
    welcome: "Bem-vindo de volta",
    subtitle: "Pronto para melhorar sua psicologia de trading hoje?",
    psychologyScore: "Pontuação de Psicologia",
    exercisesCompleted: "Exercícios Completados",
    coachingSessions: "Sessões de Coaching",
    achievements: "Conquistas",
    thisWeek: "Esta semana",
    thisMonth: "Este mês",
    badgesEarned: "Distintivos conquistados",
    quickActions: "Ações Rápidas",
    recentActivity: "Atividade Recente",
    currentGoals: "Objetivos Atuais",
  },
  es: {
    // Navigation
    "nav.overview": "Resumen",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Análisis de Captura",
    "nav.progress": "Seguimiento de Progreso",
    "nav.exercises": "Ejercicios Interactivos",
    "nav.patterns": "Patrones Conductuales",
    "nav.courses": "Cursos de Psicología",
    "nav.journal": "Diario de Reflexión",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Constructor de Trade",
    "nav.marketInsights": "Insights de Mercado",
    "nav.settings": "Configuración",

    // Common
    "common.signOut": "Cerrar Sesión",
    "common.profile": "Configuración del Perfil",
    "common.welcome": "Bienvenido de vuelta",
    "common.loading": "Cargando...",

    // Dashboard
    welcome: "Bienvenido de vuelta",
    subtitle: "¿Listo para mejorar tu psicología de trading hoy?",
    psychologyScore: "Puntuación de Psicología",
    exercisesCompleted: "Ejercicios Completados",
    coachingSessions: "Sesiones de Coaching",
    achievements: "Logros",
    thisWeek: "Esta semana",
    thisMonth: "Este mes",
    badgesEarned: "Distintivos ganados",
    quickActions: "Acciones Rápidas",
    recentActivity: "Actividad Reciente",
    currentGoals: "Objetivos Actuales",
  },
  fr: {
    // Navigation
    "nav.overview": "Aperçu",
    "nav.aiCoach": "Coach IA",
    "nav.analysis": "Analyse de Capture",
    "nav.progress": "Suivi des Progrès",
    "nav.exercises": "Exercices Interactifs",
    "nav.patterns": "Modèles Comportementaux",
    "nav.courses": "Cours de Psychologie",
    "nav.journal": "Journal de Réflexion",
    "nav.insights": "Insights de Coaching",
    "nav.tradeBuilder": "Constructeur de Trade",
    "nav.marketInsights": "Insights de Marché",
    "nav.settings": "Paramètres",

    // Common
    "common.signOut": "Se Déconnecter",
    "common.profile": "Paramètres du Profil",
    "common.welcome": "Bon retour",
    "common.loading": "Chargement...",

    // Dashboard
    welcome: "Bon retour",
    subtitle: "Prêt à améliorer votre psychologie du trading aujourd'hui ?",
    psychologyScore: "Score de Psychologie",
    exercisesCompleted: "Exercices Complétés",
    coachingSessions: "Sessions de Coaching",
    achievements: "Réalisations",
    thisWeek: "Cette semaine",
    thisMonth: "Ce mois-ci",
    badgesEarned: "Badges gagnés",
    quickActions: "Actions Rapides",
    recentActivity: "Activité Récente",
    currentGoals: "Objectifs Actuels",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profitz-language") as Language
      if (saved && ["en", "pt", "es", "fr"].includes(saved)) {
        setLanguageState(saved)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    console.log("Setting language to:", lang) // Debug log
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("profitz-language", lang)
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            console.warn(`Translation key not found: ${key}`)
            return key
          }
        }
        break
      }
    }

    if (typeof value !== "string") {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    // Replace parameters if provided
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)

  // Safe fallback for when hook is used outside provider
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      t: (key: string) => key,
    }
  }

  return context
}
