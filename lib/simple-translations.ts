export type Language = "en" | "pt" | "es" | "fr"

export const translations = {
  en: {
    // Sidebar
    overview: "Overview",
    aiCoach: "AI Coach",
    screenshotAnalysis: "Screenshot Analysis",
    progressTracking: "Progress Tracking",
    interactiveExercises: "Interactive Exercises",
    behavioralPatterns: "Behavioral Patterns",
    psychologyCourses: "Psychology Courses",
    reflectionJournal: "Reflection Journal",
    coachingInsights: "Coaching Insights",
    tradeBuilder: "Trade Builder",
    marketInsights: "Market Insights",
    signOut: "Sign Out",

    // Dashboard
    welcome: "Welcome back",
    subtitle: "Ready to enhance your trading psychology today?",
    psychologyScore: "Psychology Score",
    exercisesCompleted: "Exercises Completed",
    coachingSessions: "Coaching Sessions",
    achievements: "Achievements",
  },
  pt: {
    // Sidebar
    overview: "Visão Geral",
    aiCoach: "Coach IA",
    screenshotAnalysis: "Análise de Screenshot",
    progressTracking: "Acompanhamento de Progresso",
    interactiveExercises: "Exercícios Interativos",
    behavioralPatterns: "Padrões Comportamentais",
    psychologyCourses: "Cursos de Psicologia",
    reflectionJournal: "Diário de Reflexão",
    coachingInsights: "Insights de Coaching",
    tradeBuilder: "Construtor de Trade",
    marketInsights: "Insights de Mercado",
    signOut: "Sair",

    // Dashboard
    welcome: "Bem-vindo de volta",
    subtitle: "Pronto para melhorar sua psicologia de trading hoje?",
    psychologyScore: "Pontuação de Psicologia",
    exercisesCompleted: "Exercícios Completados",
    coachingSessions: "Sessões de Coaching",
    achievements: "Conquistas",
  },
  es: {
    // Sidebar
    overview: "Resumen",
    aiCoach: "Coach IA",
    screenshotAnalysis: "Análisis de Captura",
    progressTracking: "Seguimiento de Progreso",
    interactiveExercises: "Ejercicios Interactivos",
    behavioralPatterns: "Patrones Conductuales",
    psychologyCourses: "Cursos de Psicología",
    reflectionJournal: "Diario de Reflexión",
    coachingInsights: "Insights de Coaching",
    tradeBuilder: "Constructor de Trade",
    marketInsights: "Insights de Mercado",
    signOut: "Cerrar Sesión",

    // Dashboard
    welcome: "Bienvenido de vuelta",
    subtitle: "¿Listo para mejorar tu psicología de trading hoy?",
    psychologyScore: "Puntuación de Psicología",
    exercisesCompleted: "Ejercicios Completados",
    coachingSessions: "Sesiones de Coaching",
    achievements: "Logros",
  },
  fr: {
    // Sidebar
    overview: "Aperçu",
    aiCoach: "Coach IA",
    screenshotAnalysis: "Analyse de Capture",
    progressTracking: "Suivi des Progrès",
    interactiveExercises: "Exercices Interactifs",
    behavioralPatterns: "Modèles Comportementaux",
    psychologyCourses: "Cours de Psychologie",
    reflectionJournal: "Journal de Réflexion",
    coachingInsights: "Insights de Coaching",
    tradeBuilder: "Constructeur de Trade",
    marketInsights: "Insights de Marché",
    signOut: "Se Déconnecter",

    // Dashboard
    welcome: "Bon retour",
    subtitle: "Prêt à améliorer votre psychologie du trading aujourd'hui ?",
    psychologyScore: "Score de Psychologie",
    exercisesCompleted: "Exercices Complétés",
    coachingSessions: "Sessions de Coaching",
    achievements: "Réalisations",
  },
}

// Simple global language state
let currentLanguage: Language = "en"

export function setGlobalLanguage(lang: Language) {
  currentLanguage = lang
  if (typeof window !== "undefined") {
    localStorage.setItem("app-language", lang)
    // Force page refresh to update all text
    window.location.reload()
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("app-language") as Language
    if (saved && ["en", "pt", "es", "fr"].includes(saved)) {
      currentLanguage = saved
    }
  }
  return currentLanguage
}

export function t(key: keyof typeof translations.en): string {
  const lang = getCurrentLanguage()
  return translations[lang][key] || translations.en[key] || key
}
