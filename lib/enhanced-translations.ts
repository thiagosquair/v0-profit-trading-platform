// lib/enhanced-translations.ts
'use client';

import { useState, useEffect } from 'react';

export type Language = "en" | "pt" | "es" | "fr";

// Language configurations
export const languageConfig = {
  en: { name: "English", flag: "🇺🇸", code: "en" },
  pt: { name: "Português", flag: "🇧🇷", code: "pt" },
  es: { name: "Español", flag: "🇪🇸", code: "es" },
  fr: { name: "Français", flag: "🇫🇷", code: "fr" },
} as const;

// Your existing static translations (preserved)
export const staticTranslations = {
  en: {
    // Navigation
    features: "Features",
    pricing: "Pricing",
    demo: "Demo",
    signIn: "Sign In",
    startYourJourney: "Start Your Journey",
    
    // Hero Section
    heroTitle: "Master Your Mindset. Master Your Trading.",
    heroSubtitle: "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
    watchDemo: "Watch Demo",
    
    // Pricing Plans
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Start your trading psychology transformation today",
    "pricing.free.name": "Free",
    "pricing.free.price": "$0",
    "pricing.free.period": "/month",
    "pricing.free.description": "Perfect for getting started",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$14",
    "pricing.pro.period": "/month",
    "pricing.pro.description": "For serious traders",
    "pricing.premium.name": "Premium",
    "pricing.premium.price": "$28",
    "pricing.premium.period": "/month",
    "pricing.premium.description": "Advanced features",
    "pricing.elite.name": "Elite",
    "pricing.elite.price": "$55",
    "pricing.elite.period": "/month",
    "pricing.elite.description": "Complete mastery package",
    "pricing.getStarted": "Get Started",
    "pricing.choosePlan": "Choose Plan",
    "pricing.mostPopular": "Most Popular",
    "pricing.bestValue": "Best Value",

    // Common UI elements
    "ui.selectLanguage": "Select Language",
    "ui.language": "Language",
    "ui.loading": "Loading...",
    "ui.error": "Error",
    "ui.success": "Success",
    "ui.cancel": "Cancel",
    "ui.save": "Save",
    "ui.close": "Close",
    "ui.back": "Back",
    "ui.next": "Next",
    "ui.previous": "Previous",
    "ui.continue": "Continue",
    "ui.getStarted": "Get Started",
    "ui.learnMore": "Learn More",
    "ui.tryFree": "Try Free",
    "ui.upgrade": "Upgrade",
    "ui.startTrial": "Start Trial",
  },
  pt: {
    // Navigation
    features: "Recursos",
    pricing: "Preços",
    demo: "Demo",
    signIn: "Entrar",
    startYourJourney: "Comece Sua Jornada",
    
    // Hero Section
    heroTitle: "Domine Sua Mentalidade. Domine Seu Trading.",
    heroSubtitle: "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisão.",
    watchDemo: "Assistir Demo",
    
    // Pricing Plans
    "pricing.title": "Escolha Seu Plano",
    "pricing.subtitle": "Inicie sua transformação em psicologia de trading hoje",
    "pricing.free.name": "Gratuito",
    "pricing.free.price": "$0",
    "pricing.free.period": "/mês",
    "pricing.free.description": "Perfeito para começar",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$14",
    "pricing.pro.period": "/mês",
    "pricing.pro.description": "Para traders sérios",
    "pricing.premium.name": "Premium",
    "pricing.premium.price": "$28",
    "pricing.premium.period": "/mês",
    "pricing.premium.description": "Recursos avançados",
    "pricing.elite.name": "Elite",
    "pricing.elite.price": "$55",
    "pricing.elite.period": "/mês",
    "pricing.elite.description": "Pacote completo de maestria",
    "pricing.getStarted": "Começar",
    "pricing.choosePlan": "Escolher Plano",
    "pricing.mostPopular": "Mais Popular",
    "pricing.bestValue": "Melhor Valor",

    // Common UI elements
    "ui.selectLanguage": "Selecionar Idioma",
    "ui.language": "Idioma",
    "ui.loading": "Carregando...",
    "ui.error": "Erro",
    "ui.success": "Sucesso",
    "ui.cancel": "Cancelar",
    "ui.save": "Salvar",
    "ui.close": "Fechar",
    "ui.back": "Voltar",
    "ui.next": "Próximo",
    "ui.previous": "Anterior",
    "ui.continue": "Continuar",
    "ui.getStarted": "Começar",
    "ui.learnMore": "Saber Mais",
    "ui.tryFree": "Experimentar Grátis",
    "ui.upgrade": "Atualizar",
    "ui.startTrial": "Iniciar Teste",
  },
  es: {
    // Navigation
    features: "Características",
    pricing: "Precios",
    demo: "Demo",
    signIn: "Iniciar Sesión",
    startYourJourney: "Comienza Tu Viaje",
    
    // Hero Section
    heroTitle: "Domina Tu Mentalidad. Domina Tu Trading.",
    heroSubtitle: "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
    watchDemo: "Ver Demo",
    
    // Pricing Plans
    "pricing.title": "Elige Tu Plan",
    "pricing.subtitle": "Comienza tu transformación en psicología de trading hoy",
    "pricing.free.name": "Gratuito",
    "pricing.free.price": "$0",
    "pricing.free.period": "/mes",
    "pricing.free.description": "Perfecto para empezar",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$14",
    "pricing.pro.period": "/mes",
    "pricing.pro.description": "Para traders serios",
    "pricing.premium.name": "Premium",
    "pricing.premium.price": "$28",
    "pricing.premium.period": "/mes",
    "pricing.premium.description": "Características avanzadas",
    "pricing.elite.name": "Elite",
    "pricing.elite.price": "$55",
    "pricing.elite.period": "/mes",
    "pricing.elite.description": "Paquete completo de maestría",
    "pricing.getStarted": "Comenzar",
    "pricing.choosePlan": "Elegir Plan",
    "pricing.mostPopular": "Más Popular",
    "pricing.bestValue": "Mejor Valor",

    // Common UI elements
    "ui.selectLanguage": "Seleccionar Idioma",
    "ui.language": "Idioma",
    "ui.loading": "Cargando...",
    "ui.error": "Error",
    "ui.success": "Éxito",
    "ui.cancel": "Cancelar",
    "ui.save": "Guardar",
    "ui.close": "Cerrar",
    "ui.back": "Atrás",
    "ui.next": "Siguiente",
    "ui.previous": "Anterior",
    "ui.continue": "Continuar",
    "ui.getStarted": "Comenzar",
    "ui.learnMore": "Saber Más",
    "ui.tryFree": "Probar Gratis",
    "ui.upgrade": "Actualizar",
    "ui.startTrial": "Iniciar Prueba",
  },
  fr: {
    // Navigation
    features: "Fonctionnalités",
    pricing: "Tarifs",
    demo: "Démo",
    signIn: "Se Connecter",
    startYourJourney: "Commencez Votre Voyage",
    
    // Hero Section
    heroTitle: "Maîtrisez Votre Mentalité. Maîtrisez Votre Trading.",
    heroSubtitle: "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour construire la résilience mentale et une meilleure prise de décision.",
    watchDemo: "Regarder la Démo",
    
    // Pricing Plans
    "pricing.title": "Choisissez Votre Plan",
    "pricing.subtitle": "Commencez votre transformation en psychologie de trading aujourd'hui",
    "pricing.free.name": "Gratuit",
    "pricing.free.price": "$0",
    "pricing.free.period": "/mois",
    "pricing.free.description": "Parfait pour commencer",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$14",
    "pricing.pro.period": "/mois",
    "pricing.pro.description": "Pour les traders sérieux",
    "pricing.premium.name": "Premium",
    "pricing.premium.price": "$28",
    "pricing.premium.period": "/mois",
    "pricing.premium.description": "Fonctionnalités avancées",
    "pricing.elite.name": "Elite",
    "pricing.elite.price": "$55",
    "pricing.elite.period": "/mois",
    "pricing.elite.description": "Package complet de maîtrise",
    "pricing.getStarted": "Commencer",
    "pricing.choosePlan": "Choisir le Plan",
    "pricing.mostPopular": "Le Plus Populaire",
    "pricing.bestValue": "Meilleure Valeur",

    // Common UI elements
    "ui.selectLanguage": "Sélectionner la Langue",
    "ui.language": "Langue",
    "ui.loading": "Chargement...",
    "ui.error": "Erreur",
    "ui.success": "Succès",
    "ui.cancel": "Annuler",
    "ui.save": "Sauvegarder",
    "ui.close": "Fermer",
    "ui.back": "Retour",
    "ui.next": "Suivant",
    "ui.previous": "Précédent",
    "ui.continue": "Continuer",
    "ui.getStarted": "Commencer",
    "ui.learnMore": "En Savoir Plus",
    "ui.tryFree": "Essayer Gratuitement",
    "ui.upgrade": "Mettre à Niveau",
    "ui.startTrial": "Commencer l'Essai",
  },
};

// Simple global language state
let currentLanguage: Language = "en";

export function setGlobalLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem("app-language", lang);
    // Trigger a custom event to notify components of language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("app-language") as Language;
    if (saved && ["en", "pt", "es", "fr"].includes(saved)) {
      currentLanguage = saved;
      return saved;
    }
  }
  return currentLanguage;
}

// Static translation function (for existing translations)
export function t(key: string): string {
  const lang = getCurrentLanguage();
  const langTranslations = staticTranslations[lang] as Record<string, string>;
  const enTranslations = staticTranslations.en as Record<string, string>;

  // Try to get translation from current language, fallback to English, then return key
  return langTranslations[key] || enTranslations[key] || key;
}

// Simple dynamic translation (without OpenAI for now to avoid API issues)
export async function translateText(
  text: string, 
  targetLanguage: Language, 
  context?: { domain?: string; style?: string }
): Promise<string> {
  // For now, return the original text to avoid API issues
  // This can be enhanced later with OpenAI integration
  return text;
}

// Dynamic translation hook for React components
export function useDynamicTranslation() {
  const [currentLang, setCurrentLang] = useState<Language>(() => getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail as Language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const translateDynamic = async (text: string, context?: { domain?: string; style?: string }) => {
    if (currentLang === 'en') return text;
    return await translateText(text, currentLang, context);
  };

  return {
    t, // Static translations
    translateDynamic, // Dynamic AI translations
    currentLanguage: currentLang,
    setLanguage: setGlobalLanguage,
    languageConfig
  };
}

// Utility function to get language display info
export function getLanguageInfo(lang: Language) {
  return languageConfig[lang];
}

// Batch translation function for multiple texts
export async function translateBatch(
  texts: string[], 
  targetLanguage: Language, 
  context?: { domain?: string; style?: string }
): Promise<string[]> {
  if (targetLanguage === 'en') {
    return texts;
  }

  const translations = await Promise.all(
    texts.map(text => translateText(text, targetLanguage, context))
  );

  return translations;
}
