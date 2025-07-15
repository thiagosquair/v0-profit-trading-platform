// lib/hybrid-translation.ts
'use client';

import { useState, useEffect } from 'react';

// Your existing static translations (keep these stable)
export const staticTranslations = {
  en: {
    title: "ProFitz",
    subtitle: "Trading Psychology Labbbb",
    badge: "AI-Powered Trading Psychology",
    heroTitle: "Master Your Mindset. Master Your Trading.",
    description: "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
    getStarted: "Start Your Journey",
    learnMore: "Watch Demo",
    signIn: "Sign In",
    footerFeatures: "Features",
    footerPricing: "Pricing",
    footerDemo: "Demo",
    
    // Core features (keep static for stability)
    featuresTitle: "Developed for Trading Psychology Mastery and High Performance",
    featuresSubtitle: "The Ultimate Platform for Mental Edge — Combining AI-Powered Insights, Personalized Coaching, and a Deeply Immersive Environment Where You Continuously Grow, Review Past Trades with Purpose, and Build Each New Trade with Clarity and Confidence.",
    
    // Pricing plans (keep static - these are core business content)
    pricingTitle: "Your Trading Transformation Journey Starts Here",
    pricingSubtitle: "Start free, upgrade when you're ready",
    pricingPlans: [
      {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for Getting Started",
        features: [
          "AI Psychology Coach",
          "5 Trade Analyses per month",
          "Progress Tracking",
          "Interactive Exercises",
          "Psychology Courses"
        ]
      },
      {
        name: "Pro", 
        price: "$14",
        period: "/month",
        description: "For Serious Traders",
        features: [
          "Advanced AI Psychology Coach",
          "25 Trade Analyses per month",
          "Advanced Progress Tracking",
          "Reflection Journal",
          "Psychology Courses",
          "Screenshot Analysis",
          "10 Trade Builder",
          "Interactive Exercises"
        ]
      },
      {
        name: "Premium",
        price: "$28", 
        period: "/month",
        description: "For Professional Traders",
        popular: true,
        features: [
          "Everything in Pro",
          "Advanced AI Psychology Coach",
          "Unlimited Trade Analyses",
          "Advanced Progress Tracking",
          "Reflection Journal",
          "Psychology Courses",
          "Coaching Insights",
          "30 Trade Builder",
          "Interactive Exercises",
          "Behavioral Patterns"
        ]
      },
      {
        name: "Elite",
        price: "$55",
        period: "/month", 
        description: "For Elite Traders",
        features: [
          "Everything in Premium",
          "Advanced AI Psychology Coach",
          "Unlimited Trade Analyses",
          "Advanced Progress Tracking",
          "Reflection Journal",
          "Psychology Courses",
          "Coaching Insights",
          "Unlimited Trade Builder",
          "Interactive Exercises",
          "Behavioral Patterns",
          "Funded Career Builder"
        ]
      }
    ],
    
    // Core testimonials (keep static)
    testimonialsTitle: "Join Thousands of Successful Traders",
    testimonialsSubtitle: "Join thousands of traders who have transformed their mindset",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Day Trader", 
        content: "ProFitz helped me overcome my fear of taking profits. My consistency improved dramatically in just 3 months.",
        rating: 5
      },
      {
        name: "Marcus Rodriguez",
        role: "Swing Trader",
        content: "The AI coach is like having a trading psychologist available 24/7. It's transformed how I approach the markets.",
        rating: 5
      },
      {
        name: "Emily Johnson",
        role: "Options Trader",
        content: "Finally, a platform that addresses the mental game. My emotional control has never been better.",
        rating: 5
      }
    ]
  },
  
  pt: {
    title: "ProFitz",
    subtitle: "Trading Psychology Labbbb",
    badge: "Psicologia de Trading Alimentada por IA",
    heroTitle: "Domine Sua Mentalidade. Domine Seu Trading.",
    description: "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisão.",
    getStarted: "Comece Sua Jornada",
    learnMore: "Assistir Demo",
    signIn: "Entrar",
    footerFeatures: "Recursos",
    footerPricing: "Preços",
    footerDemo: "Demo",
    
    featuresTitle: "Desenvolvido para Maestria em Psicologia de Trading e Alto Desempenho",
    featuresSubtitle: "A Plataforma Definitiva para Vantagem Mental — Combinando Insights Alimentados por IA, Coaching Personalizado e um Ambiente Profundamente Imersivo Onde Você Cresce Continuamente, Revisa Trades Passados com Propósito e Constrói Cada Novo Trade com Clareza e Confiança.",
    
    pricingTitle: "Sua Transformação na Jornada de Trading Começa Aqui",
    pricingSubtitle: "Comece grátis, faça upgrade quando estiver pronto",
    pricingPlans: [
      {
        name: "Gratuito",
        price: "$0",
        period: "/mês",
        description: "Perfeito para Começar",
        features: [
          "Coach de Psicologia IA",
          "5 Análises de Trade por mês",
          "Acompanhamento de Progresso",
          "Exercícios Interativos",
          "Cursos de Psicologia"
        ]
      },
      {
        name: "Pro",
        price: "$14",
        period: "/mês",
        description: "Para Traders Sérios",
        features: [
          "Coach de Psicologia IA Avançado",
          "25 Análises de Trade por mês",
          "Acompanhamento de Progresso Avançado",
          "Diário de Reflexão",
          "Cursos de Psicologia",
          "Análise de Screenshots",
          "10 Construtor de Trade",
          "Exercícios Interativos"
        ]
      },
      {
        name: "Premium",
        price: "$28",
        period: "/mês",
        description: "Para Traders Profissionais",
        popular: true,
        features: [
          "Tudo do Pro",
          "Coach de Psicologia IA Avançado",
          "Análises de Trade Ilimitadas",
          "Acompanhamento de Progresso Avançado",
          "Diário de Reflexão",
          "Cursos de Psicologia",
          "Insights de Coaching",
          "30 Construtor de Trade",
          "Exercícios Interativos",
          "Padrões Comportamentais"
        ]
      },
      {
        name: "Elite",
        price: "$55",
        period: "/mês",
        description: "Para Traders Elite",
        features: [
          "Tudo do Premium",
          "Coach de Psicologia IA Avançado",
          "Análises de Trade Ilimitadas",
          "Acompanhamento de Progresso Avançado",
          "Diário de Reflexão",
          "Cursos de Psicologia",
          "Insights de Coaching",
          "Construtor de Trade Ilimitado",
          "Exercícios Interativos",
          "Padrões Comportamentais",
          "Construtor de Carreira Financiada"
        ]
      }
    ],
    
    testimonialsTitle: "Junte-se a Milhares de Traders Bem-Sucedidos",
    testimonialsSubtitle: "Junte-se a milhares de traders que transformaram sua mentalidade",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Day Trader",
        content: "ProFitz me ajudou a superar meu medo de realizar lucros. Minha consistência melhorou drasticamente em apenas 3 meses.",
        rating: 5
      },
      {
        name: "Marcus Rodriguez",
        role: "Swing Trader",
        content: "O coach IA é como ter um psicólogo de trading disponível 24/7. Transformou como abordo os mercados.",
        rating: 5
      },
      {
        name: "Emily Johnson",
        role: "Trader de Opções",
        content: "Finalmente, uma plataforma que aborda o jogo mental. Meu controle emocional nunca esteve melhor.",
        rating: 5
      }
    ]
  },
  
  es: {
    title: "ProFitz",
    subtitle: "Trading Psychology Labbbb",
    badge: "Psicología de Trading Impulsada por IA",
    heroTitle: "Domina Tu Mentalidad. Domina Tu Trading.",
    description: "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
    getStarted: "Comienza Tu Viaje",
    learnMore: "Ver Demo",
    signIn: "Iniciar Sesión",
    footerFeatures: "Características",
    footerPricing: "Precios",
    footerDemo: "Demo",
    
    featuresTitle: "Desarrollado para Maestría en Psicología de Trading y Alto Rendimiento",
    featuresSubtitle: "La Plataforma Definitiva para Ventaja Mental — Combinando Insights Impulsados por IA, Coaching Personalizado y un Entorno Profundamente Inmersivo Donde Creces Continuamente, Revisas Trades Pasados con Propósito y Construyes Cada Nuevo Trade con Claridad y Confianza.",
    
    pricingTitle: "Tu Transformación en el Viaje de Trading Comienza Aquí",
    pricingSubtitle: "Comienza gratis, actualiza cuando estés listo",
    pricingPlans: [
      {
        name: "Gratuito",
        price: "$0",
        period: "/mes",
        description: "Perfecto para Empezar",
        features: [
          "Coach de Psicología IA",
          "5 Análisis de Trade por mes",
          "Seguimiento de Progreso",
          "Ejercicios Interactivos",
          "Cursos de Psicología"
        ]
      },
      {
        name: "Pro",
        price: "$14",
        period: "/mes",
        description: "Para Traders Serios",
        features: [
          "Coach de Psicología IA Avanzado",
          "25 Análisis de Trade por mes",
          "Seguimiento de Progreso Avanzado",
          "Diario de Reflexión",
          "Cursos de Psicología",
          "Análisis de Capturas de Pantalla",
          "10 Constructor de Trade",
          "Ejercicios Interactivos"
        ]
      },
      {
        name: "Premium",
        price: "$28",
        period: "/mes",
        description: "Para Traders Profesionales",
        popular: true,
        features: [
          "Todo de Pro",
          "Coach de Psicología IA Avanzado",
          "Análisis de Trade Ilimitados",
          "Seguimiento de Progreso Avanzado",
          "Diario de Reflexión",
          "Cursos de Psicología",
          "Insights de Coaching",
          "30 Constructor de Trade",
          "Ejercicios Interactivos",
          "Patrones Conductuales"
        ]
      },
      {
        name: "Elite",
        price: "$55",
        period: "/mes",
        description: "Para Traders Elite",
        features: [
          "Todo de Premium",
          "Coach de Psicología IA Avanzado",
          "Análisis de Trade Ilimitados",
          "Seguimiento de Progreso Avanzado",
          "Diario de Reflexión",
          "Cursos de Psicología",
          "Insights de Coaching",
          "Constructor de Trade Ilimitado",
          "Ejercicios Interactivos",
          "Patrones Conductuales",
          "Constructor de Carrera Financiada"
        ]
      }
    ],
    
    testimonialsTitle: "Únete a Miles de Traders Exitosos",
    testimonialsSubtitle: "Únete a miles de traders que han transformado su mentalidad",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Day Trader",
        content: "ProFitz me ayudó a superar mi miedo a tomar ganancias. Mi consistencia mejoró dramáticamente en solo 3 meses.",
        rating: 5
      },
      {
        name: "Marcus Rodriguez",
        role: "Swing Trader",
        content: "El coach IA es como tener un psicólogo de trading disponible 24/7. Ha transformado cómo abordo los mercados.",
        rating: 5
      },
      {
        name: "Emily Johnson",
        role: "Trader de Opciones",
        content: "Finalmente, una plataforma que aborda el juego mental. Mi control emocional nunca ha estado mejor.",
        rating: 5
      }
    ]
  },
  
  fr: {
    title: "ProFitz",
    subtitle: "Trading Psychology Labbbb",
    badge: "Psychologie de Trading Alimentée par l'IA",
    heroTitle: "Maîtrisez Votre Mentalité. Maîtrisez Votre Trading.",
    description: "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour construire la résilience mentale et une meilleure prise de décision.",
    getStarted: "Commencez Votre Voyage",
    learnMore: "Voir la Démo",
    signIn: "Se Connecter",
    footerFeatures: "Fonctionnalités",
    footerPricing: "Tarifs",
    footerDemo: "Démo",
    
    featuresTitle: "Développé pour la Maîtrise de la Psychologie du Trading et la Haute Performance",
    featuresSubtitle: "La Plateforme Ultime pour l'Avantage Mental — Combinant des Insights Alimentés par l'IA, un Coaching Personnalisé et un Environnement Profondément Immersif Où Vous Grandissez Continuellement, Révisez les Trades Passés avec un Objectif et Construisez Chaque Nouveau Trade avec Clarté et Confiance.",
    
    pricingTitle: "Votre Transformation de Voyage de Trading Commence Ici",
    pricingSubtitle: "Commencez gratuitement, mettez à niveau quand vous êtes prêt",
    pricingPlans: [
      {
        name: "Gratuit",
        price: "$0",
        period: "/mois",
        description: "Parfait pour Commencer",
        features: [
          "Coach de Psychologie IA",
          "5 Analyses de Trade par mois",
          "Suivi des Progrès",
          "Exercices Interactifs",
          "Cours de Psychologie"
        ]
      },
      {
        name: "Pro",
        price: "$14",
        period: "/mois",
        description: "Pour les Traders Sérieux",
        features: [
          "Coach de Psychologie IA Avancé",
          "25 Analyses de Trade par mois",
          "Suivi des Progrès Avancé",
          "Journal de Réflexion",
          "Cours de Psychologie",
          "Analyse de Captures d'Écran",
          "10 Constructeur de Trade",
          "Exercices Interactifs"
        ]
      },
      {
        name: "Premium",
        price: "$28",
        period: "/mois",
        description: "Pour les Traders Professionnels",
        popular: true,
        features: [
          "Tout de Pro",
          "Coach de Psychologie IA Avancé",
          "Analyses de Trade Illimitées",
          "Suivi des Progrès Avancé",
          "Journal de Réflexion",
          "Cours de Psychologie",
          "Insights de Coaching",
          "30 Constructeur de Trade",
          "Exercices Interactifs",
          "Modèles Comportementaux"
        ]
      },
      {
        name: "Elite",
        price: "$55",
        period: "/mois",
        description: "Pour les Traders Elite",
        features: [
          "Tout de Premium",
          "Coach de Psychologie IA Avancé",
          "Analyses de Trade Illimitées",
          "Suivi des Progrès Avancé",
          "Journal de Réflexion",
          "Cours de Psychologie",
          "Insights de Coaching",
          "Constructeur de Trade Illimité",
          "Exercices Interactifs",
          "Modèles Comportementaux",
          "Constructeur de Carrière Financée"
        ]
      }
    ],
    
    testimonialsTitle: "Rejoignez des Milliers de Traders Prospères",
    testimonialsSubtitle: "Rejoignez des milliers de traders qui ont transformé leur mentalité",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Day Trader",
        content: "ProFitz m'a aidé à surmonter ma peur de prendre des bénéfices. Ma cohérence s'est considérablement améliorée en seulement 3 mois.",
        rating: 5
      },
      {
        name: "Marcus Rodriguez",
        role: "Swing Trader",
        content: "Le coach IA est comme avoir un psychologue de trading disponible 24/7. Il a transformé ma façon d'aborder les marchés.",
        rating: 5
      },
      {
        name: "Emily Johnson",
        role: "Trader d'Options",
        content: "Enfin, une plateforme qui aborde le jeu mental. Mon contrôle émotionnel n'a jamais été meilleur.",
        rating: 5
      }
    ]
  }
};

// Dynamic translation cache
interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

let translationCache: TranslationCache = {};

// Load cache from localStorage
if (typeof window !== 'undefined') {
  const savedCache = localStorage.getItem('translationCache');
  if (savedCache) {
    try {
      translationCache = JSON.parse(savedCache);
    } catch (e) {
      console.warn('Failed to load translation cache:', e);
    }
  }
}

// Save cache to localStorage
const saveCache = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('translationCache', JSON.stringify(translationCache));
  }
};

// Simple AI translation function (fallback without OpenAI)
const translateText = async (text: string, targetLang: string): Promise<string> => {
  // Check cache first
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey][targetLang];
  }

  // For now, return original text (you can add OpenAI integration later)
  // This prevents errors during development
  const translation = text; // Fallback to original text
  
  // Cache the result
  if (!translationCache[cacheKey]) {
    translationCache[cacheKey] = {};
  }
  translationCache[cacheKey][targetLang] = translation;
  saveCache();
  
  return translation;
};

// Hybrid translation function
export const getTranslation = async (key: string, language: string, fallbackText?: string): Promise<string> => {
  // First, try to get from static translations
  const staticContent = staticTranslations[language as keyof typeof staticTranslations];
  if (staticContent && (staticContent as any)[key]) {
    return (staticContent as any)[key];
  }
  
  // If not found in static translations and we have fallback text, use dynamic translation
  if (fallbackText && language !== 'en') {
    try {
      return await translateText(fallbackText, language);
    } catch (error) {
      console.warn(`Translation failed for "${fallbackText}" to ${language}:`, error);
      return fallbackText; // Return original text if translation fails
    }
  }
  
  // Return fallback text or empty string
  return fallbackText || '';
};

// React hook for hybrid translations
export const useHybridTranslation = (language: string = 'en') => {
  const [translations, setTranslations] = useState<any>({});
  
  useEffect(() => {
    // Load static translations immediately
    const staticContent = staticTranslations[language as keyof typeof staticTranslations] || staticTranslations.en;
    setTranslations(staticContent);
  }, [language]);
  
  // Function to get translation with dynamic fallback
  const t = async (key: string, fallbackText?: string): Promise<string> => {
    return await getTranslation(key, language, fallbackText);
  };
  
  // Synchronous function for static translations
  const ts = (key: string): string => {
    const staticContent = staticTranslations[language as keyof typeof staticTranslations] || staticTranslations.en;
    return (staticContent as any)[key] || key;
  };
  
  return {
    ...translations,
    t, // Async function for dynamic translations
    ts, // Sync function for static translations
    language
  };
};

// Language configuration
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export type Language = 'en' | 'pt' | 'es' | 'fr';
