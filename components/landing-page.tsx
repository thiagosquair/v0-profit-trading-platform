"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Brain,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Camera,
  BookOpen,
  MessageSquare,
  Globe,
  ChevronRight,
  Star,
  Settings,
  Activity,
  Play,
  Check,
  Zap,
  Shield,
  Users,
  ChevronDown,
  X,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: number]: boolean }>({})
  const [allExpanded, setAllExpanded] = useState(false)
  const [selectedFeatureModal, setSelectedFeatureModal] = useState<number | null>(null)

  // Load saved language on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("app-language") || "en"
      setSelectedLanguage(savedLanguage)
    }
  }, [])

  // Save language when changed
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode)
    if (typeof window !== "undefined") {
      localStorage.setItem("app-language", langCode)
    }
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  // Your original content exactly as it was - preserving everything
  const content = {
    en: {
      title: "ProFitz",
      subtitle: "Trading Psychology Labbbb",
      description:
        "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
      getStarted: "Start Your Journey",
      learnMore: "Watch Demo",
      signIn: "Sign In",
      badge: "Ai-Powered Trading Psychology",
      heroTitle: "Master Your Mindset. Master Your Trading.",
      featuresTitle: "Developed for Trading Psychology Mastery and High Performance",
      featuresSubtitle:
        "The Ultimate Platform for Mental Edge — Combining AI-Powered Insights, Personalized Coaching, and a Deeply Immersive Environment Where You Continuously Grow, Review Past Trades with Purpose, and Build Each New Trade with Clarity and Confidence.",
      howItWorksTitle: "How ProFitz Works",
      howItWorksSubtitle: "Your Path to Trading Mastery in 4 Simple Steps",
      howItWorksSteps: [
        {
          step: "1",
          title: "Take Assessment",
          description: "Complete our comprehensive trading psychology assessment"
        },
        {
          step: "2", 
          title: "Get AI Coach",
          description: "Receive your personalized AI psychology coach"
        },
        {
          step: "3",
          title: "Build Trades", 
          description: "Structure trades with psychological checkpoints"
        },
        {
          step: "4",
          title: "Track Progress",
          description: "Monitor your psychological development and trading improvement"
        }
      ],
      testimonialsTitle: "Join Thousands of Successful Traders",
      testimonialsSubtitle: "Join thousands of traders who have transformed their mindset",
      ctaTitle: "Ready to Unlock Your Full Trading Potential??",
      ctaSubtitle: "Join ProFitz Today and Start Your Journey to Consistent, Disciplined and Profitable Trading.",
      ctaButton: "Start Free Plan",
      footerTagline: "Transforming traders through AI-powered psychology coaching.",
      footerProduct: "Product",
      footerSupport: "Support",
      footerLanguages: "Languages",
      footerFeatures: "Features",
      footerPricing: "Pricing",
      footerDemo: "Demo",
      footerHelp: "Help Center",
      footerContact: "Contact",
      footerCommunity: "Community",
      footerCopyright: "© 2025 ProFitz. All rights reserved.",
      // New translations for missing sections
      ultimateFeaturesTitle: "Our Ultimate Trading Features",
      ultimateFeaturesSubtitle: "The core tools that set ProFitz apart from every other trading platform",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
      mostPopular: "Most Popular",
      getStartedButton: "Get Started",
      pricingTitle: "Your Trading Journey Transformation Starts Here",
      pricingSubtitle: "Start free, upgrade when you're ready",
      trustTitle: "The Professional's Choice for a Reason",
      bankSecurity: "Bank-Level Security",
      bankSecurityDesc: "Your data is encrypted and secure",
      realTimeAnalysis: "Real-Time Analysis",
      realTimeAnalysisDesc: "Instant psychological insights",
      expertCommunity: "Expert Community",
      expertCommunityDesc: "Learn from top traders",
      provenResults: "Proven Results",
      provenResultsDesc: "Backed by trading psychology research",
      getStartedWith: "Get Started with",
      features: [
        {
          title: "AI Psychology Coach",
          description:
            "Your Personal AI Mindset Coach: Receive real-time, personalized guidance from our advanced AI. It's like having a world-class trading psychologist by your side, 24/7, helping you conquer fear, greed, and other emotional hurdles.",
        },
        {
          title: "Trade Builder",
          description:
            "Build Discipline into Every Trade: Structure your trades with our guided Trade Builder, incorporating psychological checkpoints to ensure you stick to your plan and avoid impulsive decisions.",
        },
        {
          title: "AI Trade Analysis",
          description:
            "Transform Every Trade into a Learning Opportunity: Our AI analyzes your trades through a psychological lens, providing actionable insights to improve your decision-making and boost your profitability.",
        },
        {
          title: "Funded Career Builder",
          description:
            "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence.",
        },
      ],
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
      testimonials: [
        {
          name: "Sarah Chen",
          role: "Day Trader",
          content: "ProFitz helped me overcome my fear of taking profits. My consistency has improved dramatically in just 3 months.",
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
      subtitle: "Laboratório de Psicologia de Trading",
      description:
        "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisões.",
      getStarted: "Começar Jornada",
      learnMore: "Assistir Demo",
      signIn: "Entrar",
      badge: "Psicologia de Trading Alimentada por IA",
      heroTitle: "Domine Sua Mentalidade. Domine Seu Trading.",
      featuresTitle: "Desenvolvido para Maestria em Psicologia de Trading e Alto Desempenho",
      featuresSubtitle:
        "A Plataforma Definitiva para Vantagem Mental — Combinando Insights Alimentados por IA, Coaching Personalizado e um Ambiente Profundamente Imersivo Onde Você Cresce Continuamente, Revisa Trades Passados com Propósito e Constrói Cada Novo Trade com Clareza e Confiança.",
      howItWorksTitle: "Como o ProFitz Funciona",
      howItWorksSubtitle: "Seu Caminho para Maestria no Trading em 4 Passos Simples",
      howItWorksSteps: [
        {
          step: "1",
          title: "Fazer Avaliação",
          description: "Complete nossa avaliação abrangente de psicologia de trading"
        },
        {
          step: "2", 
          title: "Obter Coach IA",
          description: "Receba seu coach de psicologia IA personalizado"
        },
        {
          step: "3",
          title: "Construir Trades", 
          description: "Estruture trades com checkpoints psicológicos"
        },
        {
          step: "4",
          title: "Acompanhar Progresso",
          description: "Monitore seu desenvolvimento psicológico e melhoria no trading"
        }
      ],
      testimonialsTitle: "Junte-se a Milhares de Traders Bem-Sucedidos",
      testimonialsSubtitle: "Junte-se a milhares de traders que transformaram sua mentalidade",
      ctaTitle: "Pronto Para Desbloquear Seu Potencial Completo no Trading??",
      ctaSubtitle: "Junte-se ao ProFitz Hoje e Comece Sua Jornada para Trading Consistente, Disciplinado e Lucrativo.",
      ctaButton: "Começar Plano Gratuito",
      footerTagline: "Transformando traders através de coaching psicológico alimentado por IA.",
      footerProduct: "Produto",
      footerSupport: "Suporte",
      footerLanguages: "Idiomas",
      footerFeatures: "Recursos",
      footerPricing: "Preços",
      footerDemo: "Demo",
      footerHelp: "Central de Ajuda",
      footerContact: "Contato",
      footerCommunity: "Comunidade",
      footerCopyright: "© 2025 ProFitz. Todos os direitos reservados.",
      ultimateFeaturesTitle: "Nossos Recursos Definitivos de Trading",
      ultimateFeaturesSubtitle: "As ferramentas essenciais que diferenciam o ProFitz de todas as outras plataformas de trading",
      expandAll: "Expandir Todos",
      collapseAll: "Recolher Todos",
      mostPopular: "Mais Popular",
      getStartedButton: "Começar",
      pricingTitle: "Sua Transformação na Jornada de Trading Começa Aqui",
      pricingSubtitle: "Comece grátis, faça upgrade quando estiver pronto",
      trustTitle: "A Escolha dos Profissionais por uma Razão",
      bankSecurity: "Segurança Nível Bancário",
      bankSecurityDesc: "Seus dados são criptografados e seguros",
      realTimeAnalysis: "Análise em Tempo Real",
      realTimeAnalysisDesc: "Insights psicológicos instantâneos",
      expertCommunity: "Comunidade de Especialistas",
      expertCommunityDesc: "Aprenda com os melhores traders",
      provenResults: "Resultados Comprovados",
      provenResultsDesc: "Respaldado por pesquisa em psicologia de trading",
      getStartedWith: "Começar com",
      features: [
        {
          title: "Coach de Psicologia IA",
          description:
            "Seu Coach Pessoal de Mentalidade IA: Receba orientação personalizada em tempo real de nossa IA avançada. É como ter um psicólogo de trading de classe mundial ao seu lado, 24/7, ajudando você a conquistar medo, ganância e outros obstáculos emocionais.",
        },
        {
          title: "Construtor de Trade",
          description:
            "Construa Disciplina em Cada Trade: Estruture seus trades com nosso Construtor de Trade guiado, incorporando pontos de verificação psicológicos para garantir que você siga seu plano e evite decisões impulsivas.",
        },
        {
          title: "Análise de Trade IA",
          description:
            "Transforme Cada Trade em uma Oportunidade de Aprendizado: Nossa IA analisa seus trades através de uma lente psicológica, fornecendo insights acionáveis para melhorar sua tomada de decisões e aumentar sua lucratividade.",
        },
        {
          title: "Construtor de Carreira Financiada",
          description:
            "Seu Caminho para Trading Profissional: Obtenha orientação abrangente e ferramentas para se qualificar para programas de trading financiado, construir seu histórico e lançar sua carreira de trading profissional com confiança.",
        },
      ],
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
          content: "O coach IA é como ter um psicólogo de trading disponível 24/7. Transformou como eu abordo os mercados.",
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
      subtitle: "Laboratorio de Psicología de Trading",
      description:
        "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
      getStarted: "Comenzar Viaje",
      learnMore: "Ver Demo",
      signIn: "Iniciar Sesión",
      badge: "Psicología de Trading Impulsada por IA",
      heroTitle: "Domina Tu Mentalidad. Domina Tu Trading.",
      featuresTitle: "Desarrollado para Maestría en Psicología de Trading y Alto Rendimiento",
      featuresSubtitle:
        "La Plataforma Definitiva para Ventaja Mental — Combinando Insights Impulsados por IA, Coaching Personalizado y un Entorno Profundamente Inmersivo Donde Creces Continuamente, Revisas Trades Pasados con Propósito y Construyes Cada Nuevo Trade con Claridad y Confianza.",
      howItWorksTitle: "Cómo Funciona ProFitz",
      howItWorksSubtitle: "Tu Camino hacia la Maestría en Trading en 4 Pasos Simples",
      howItWorksSteps: [
        {
          step: "1",
          title: "Hacer Evaluación",
          description: "Completa nuestra evaluación integral de psicología de trading"
        },
        {
          step: "2", 
          title: "Obtener Coach IA",
          description: "Recibe tu coach de psicología IA personalizado"
        },
        {
          step: "3",
          title: "Construir Trades", 
          description: "Estructura trades con checkpoints psicológicos"
        },
        {
          step: "4",
          title: "Seguir Progreso",
          description: "Monitorea tu desarrollo psicológico y mejora en el trading"
        }
      ],
      testimonialsTitle: "Únete a Miles de Traders Exitosos",
      testimonialsSubtitle: "Únete a miles de traders que han transformado su mentalidad",
      ctaTitle: "¿Listo Para Desbloquear Tu Potencial Completo en Trading??",
      ctaSubtitle: "Únete a ProFitz Hoy y Comienza Tu Viaje hacia Trading Consistente, Disciplinado y Rentable.",
      ctaButton: "Comenzar Plan Gratuito",
      footerTagline: "Transformando traders a través de coaching psicológico impulsado por IA.",
      footerProduct: "Producto",
      footerSupport: "Soporte",
      footerLanguages: "Idiomas",
      footerFeatures: "Características",
      footerPricing: "Precios",
      footerDemo: "Demo",
      footerHelp: "Centro de Ayuda",
      footerContact: "Contacto",
      footerCommunity: "Comunidad",
      footerCopyright: "© 2025 ProFitz. Todos los derechos reservados.",
      ultimateFeaturesTitle: "Nuestras Características Definitivas de Trading",
      ultimateFeaturesSubtitle: "Las herramientas esenciales que distinguen a ProFitz de todas las demás plataformas de trading",
      expandAll: "Expandir Todo",
      collapseAll: "Contraer Todo",
      mostPopular: "Más Popular",
      getStartedButton: "Comenzar",
      pricingTitle: "Tu Transformación en el Viaje de Trading Comienza Aquí",
      pricingSubtitle: "Comienza gratis, actualiza cuando estés listo",
      trustTitle: "La Elección de los Profesionales por una Razón",
      bankSecurity: "Seguridad Nivel Bancario",
      bankSecurityDesc: "Tus datos están encriptados y seguros",
      realTimeAnalysis: "Análisis en Tiempo Real",
      realTimeAnalysisDesc: "Insights psicológicos instantáneos",
      expertCommunity: "Comunidad de Expertos",
      expertCommunityDesc: "Aprende de los mejores traders",
      provenResults: "Resultados Probados",
      provenResultsDesc: "Respaldado por investigación en psicología de trading",
      getStartedWith: "Comenzar con",
      features: [
        {
          title: "Coach de Psicología IA",
          description:
            "Tu Coach Personal de Mentalidad IA: Recibe orientación personalizada en tiempo real de nuestra IA avanzada. Es como tener un psicólogo de trading de clase mundial a tu lado, 24/7, ayudándote a conquistar miedo, codicia y otros obstáculos emocionales.",
        },
        {
          title: "Constructor de Trade",
          description:
            "Construye Disciplina en Cada Trade: Estructura tus trades con nuestro Constructor de Trade guiado, incorporando puntos de verificación psicológicos para asegurar que sigas tu plan y evites decisiones impulsivas.",
        },
        {
          title: "Análisis de Trade IA",
          description:
            "Transforma Cada Trade en una Oportunidad de Aprendizaje: Nuestra IA analiza tus trades a través de una lente psicológica, proporcionando insights accionables para mejorar tu toma de decisiones y aumentar tu rentabilidad.",
        },
        {
          title: "Constructor de Carrera Financiada",
          description:
            "Tu Camino hacia Trading Profesional: Obtén orientación integral y herramientas para calificar para programas de trading financiado, construir tu historial y lanzar tu carrera de trading profesional con confianza.",
        },
      ],
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
      testimonials: [
        {
          name: "Sarah Chen",
          role: "Day Trader",
          content: "ProFitz me ayudó a superar mi miedo de tomar ganancias. Mi consistencia ha mejorado dramáticamente en solo 3 meses.",
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
      subtitle: "Laboratoire de Psychologie du Trading",
      description:
        "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour développer la résilience mentale et une meilleure prise de décision.",
      getStarted: "Commencer le Voyage",
      learnMore: "Regarder la Démo",
      signIn: "Se Connecter",
      badge: "Psychologie de Trading Alimentée par l'IA",
      heroTitle: "Maîtrisez Votre Mentalité. Maîtrisez Votre Trading.",
      featuresTitle: "Développé pour la Maîtrise de la Psychologie du Trading et la Haute Performance",
      featuresSubtitle:
        "La Plateforme Ultime pour l'Avantage Mental — Combinant des Insights Alimentés par l'IA, un Coaching Personnalisé et un Environnement Profondément Immersif Où Vous Grandissez Continuellement, Révisez les Trades Passés avec un Objectif et Construisez Chaque Nouveau Trade avec Clarté et Confiance.",
      howItWorksTitle: "Comment ProFitz Fonctionne",
      howItWorksSubtitle: "Votre Chemin vers la Maîtrise du Trading en 4 Étapes Simples",
      howItWorksSteps: [
        {
          step: "1",
          title: "Faire l'Évaluation",
          description: "Complétez notre évaluation complète de psychologie du trading"
        },
        {
          step: "2", 
          title: "Obtenir Coach IA",
          description: "Recevez votre coach de psychologie IA personnalisé"
        },
        {
          step: "3",
          title: "Construire Trades", 
          description: "Structurez les trades avec des checkpoints psychologiques"
        },
        {
          step: "4",
          title: "Suivre Progrès",
          description: "Surveillez votre développement psychologique et amélioration du trading"
        }
      ],
      testimonialsTitle: "Rejoignez des Milliers de Traders Prospères",
      testimonialsSubtitle: "Rejoignez des milliers de traders qui ont transformé leur mentalité",
      ctaTitle: "Prêt à Débloquer Votre Plein Potentiel de Trading ??",
      ctaSubtitle: "Rejoignez ProFitz Aujourd'hui et Commencez Votre Voyage vers un Trading Cohérent, Discipliné et Rentable.",
      ctaButton: "Commencer le Plan Gratuit",
      footerTagline: "Transformer les traders grâce au coaching psychologique alimenté par l'IA.",
      footerProduct: "Produit",
      footerSupport: "Support",
      footerLanguages: "Langues",
      footerFeatures: "Fonctionnalités",
      footerPricing: "Tarification",
      footerDemo: "Démo",
      footerHelp: "Centre d'Aide",
      footerContact: "Contact",
      footerCommunity: "Communauté",
      footerCopyright: "© 2025 ProFitz. Tous droits réservés.",
      ultimateFeaturesTitle: "Nos Fonctionnalités Ultimes de Trading",
      ultimateFeaturesSubtitle: "Les outils essentiels qui distinguent ProFitz de toutes les autres plateformes de trading",
      expandAll: "Tout Développer",
      collapseAll: "Tout Réduire",
      mostPopular: "Le Plus Populaire",
      getStartedButton: "Commencer",
      pricingTitle: "Votre Transformation de Voyage de Trading Commence Ici",
      pricingSubtitle: "Commencez gratuitement, mettez à niveau quand vous êtes prêt",
      trustTitle: "Le Choix des Professionnels pour une Raison",
      bankSecurity: "Sécurité Niveau Bancaire",
      bankSecurityDesc: "Vos données sont chiffrées et sécurisées",
      realTimeAnalysis: "Analyse en Temps Réel",
      realTimeAnalysisDesc: "Insights psychologiques instantanés",
      expertCommunity: "Communauté d'Experts",
      expertCommunityDesc: "Apprenez des meilleurs traders",
      provenResults: "Résultats Prouvés",
      provenResultsDesc: "Soutenu par la recherche en psychologie du trading",
      getStartedWith: "Commencer avec",
      features: [
        {
          title: "Coach de Psychologie IA",
          description:
            "Votre Coach Personnel de Mentalité IA : Recevez des conseils personnalisés en temps réel de notre IA avancée. C'est comme avoir un psychologue de trading de classe mondiale à vos côtés, 24/7, vous aidant à conquérir la peur, la cupidité et autres obstacles émotionnels.",
        },
        {
          title: "Constructeur de Trade",
          description:
            "Construisez la Discipline dans Chaque Trade : Structurez vos trades avec notre Constructeur de Trade guidé, incorporant des points de contrôle psychologiques pour vous assurer de suivre votre plan et d'éviter les décisions impulsives.",
        },
        {
          title: "Analyse de Trade IA",
          description:
            "Transformez Chaque Trade en Opportunité d'Apprentissage : Notre IA analyse vos trades à travers une lentille psychologique, fournissant des insights exploitables pour améliorer votre prise de décision et augmenter votre rentabilité.",
        },
        {
          title: "Constructeur de Carrière Financée",
          description:
            "Votre Chemin vers le Trading Professionnel : Obtenez des conseils complets et des outils pour vous qualifier pour les programmes de trading financé, construire votre historique et lancer votre carrière de trading professionnel avec confiance.",
        },
      ],
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
  }

  const t = content[selectedLanguage as keyof typeof content]

  const detailedFeatures = [
    {
      title: "Behavioral Patterns",
      icon: BarChart3,
      description: "Identify and understand your recurring trading behaviors and psychological biases.",
      detailedContent:
        "Our advanced behavioral pattern analysis uses machine learning to identify recurring patterns in your trading behavior. We analyze your decision-making processes, emotional triggers, and psychological biases that may be affecting your trading performance.",
    },
    {
      title: "Interactive Exercises",
      icon: Target,
      description: "Engage with CBT exercises, meditations, and simulations designed for traders.",
      detailedContent:
        "Our comprehensive library of interactive exercises is specifically designed for traders to build mental resilience and emotional control. These include Cognitive Behavioral Therapy (CBT) exercises that help you identify and change negative thought patterns.",
    },
    {
      title: "Market Live Insights",
      icon: Activity,
      description: "Real-time market psychology indicators and sentiment analysis to help you make informed decisions.",
      detailedContent:
        "Get real-time insights into market psychology and sentiment with our advanced analytics dashboard. This feature provides live market sentiment analysis, fear and greed indicators, volatility stress levels, and crowd psychology metrics.",
    },
    {
      title: "Screenshot Analysis",
      icon: Camera,
      description: "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.",
      detailedContent:
        "Our revolutionary screenshot analysis feature uses advanced AI to analyze your trading platform screenshots and provide deep insights into your decision-making process.",
    },
    {
      title: "Progress Tracking",
      icon: TrendingUp,
      description: "Monitor your psychological development with detailed metrics and performance reports.",
      detailedContent:
        "Track your psychological development and trading improvement with our comprehensive progress tracking system. This feature monitors your emotional control, discipline levels, consistency metrics, and psychological growth over time.",
    },
    {
      title: "Gamification",
      icon: Award,
      description: "Earn badges and rewards as you develop better trading psychology and discipline.",
      detailedContent:
        "Make your psychological development engaging and motivating with our comprehensive gamification system. Earn badges for achieving milestones like 'Discipline Master' for following your trading plan for 30 consecutive days.",
    },
    {
      title: "Psychology Courses",
      icon: BookOpen,
      description: "Access structured learning paths covering all aspects of trading psychology.",
      detailedContent:
        "Access our comprehensive library of trading psychology courses designed by professional trading psychologists and successful traders. Our structured learning paths cover everything from basic emotional control to advanced psychological strategies.",
    },
    {
      title: "Reflection Tools",
      icon: MessageSquare,
      description: "Journal your trades and emotions with guided prompts for deeper self-analysis.",
      detailedContent:
        "Develop deeper self-awareness with our comprehensive reflection and journaling tools. Our guided journaling system provides specific prompts to help you analyze your trades, emotions, and decision-making processes.",
    },
  ]

  const toggleFeature = (index: number) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleAllFeatures = () => {
    const newState = !allExpanded
    setAllExpanded(newState)
    const newExpandedFeatures: { [key: number]: boolean } = {}
    for (let i = 0; i < 4; i++) {
      newExpandedFeatures[i] = newState
    }
    setExpandedFeatures(newExpandedFeatures)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy-900">{t.title}</h1>
              <p className="text-xs text-navy-600">{t.subtitle}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {t.footerFeatures}
            </Link>
            <Link href="#pricing" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {t.footerPricing}
            </Link>
            <Link href="#demo" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {t.footerDemo}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-navy-700 hover:text-royal-blue-600"
                >
                  <Globe className="h-4 w-4" />
                  <span>{languages.find((lang) => lang.code === selectedLanguage)?.flag}</span>
                  <span>{languages.find((lang) => lang.code === selectedLanguage)?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className="flex items-center space-x-2"
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-navy-700 hover:text-royal-blue-600" asChild>
              <Link href="/auth/signin">{t.signIn}</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0"
              asChild
            >
              <Link href="/auth/signup">
                {t.getStarted}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-gradient-to-r from-navy-100 to-royal-blue-100 text-navy-700 border-navy-200 px-4 py-2 text-sm font-medium">
                {t.badge}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-navy-900 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-navy-600 leading-relaxed max-w-lg">
                {t.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0 px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/auth/signup">
                    {t.getStarted}
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-navy-300 text-navy-700 hover:bg-navy-50 px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  {t.learnMore}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-navy-100 to-royal-blue-100 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src="/images/herovid.mp4"
                  className="w-full h-full object-cover rounded-2xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">10,000+</div>
              <div className="text-navy-600">Active Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">85%</div>
              <div className="text-navy-600">Improved Consistency</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">4.9/5</div>
              <div className="text-navy-600">User Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">24/7</div>
              <div className="text-navy-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.featuresTitle}</h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detailedFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-navy-100">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl text-navy-800">{feature.title}</CardTitle>
                        <CardDescription className="text-navy-600">{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-900">{feature.title}</h3>
                      </div>
                      <p className="text-navy-700 leading-relaxed">{feature.detailedContent}</p>
                      <Button
                        className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                        asChild
                      >
                        <Link href="/auth/signup">
                          {t.getStartedWith} {feature.title}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ultimate Trading Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.ultimateFeaturesTitle}</h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto mb-6">
              {t.ultimateFeaturesSubtitle}
            </p>
            <Button
              variant="outline"
              onClick={toggleAllFeatures}
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              {allExpanded ? t.collapseAll : t.expandAll}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${allExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.features.map((feature, index) => {
              const icons = [Brain, Settings, TrendingUp, Award]
              const IconComponent = icons[index]
              const isExpanded = expandedFeatures[index] || false
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-navy-100 p-6"
                >
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-navy-800 mb-4">{feature.title}</CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => toggleFeature(index)}
                      className="text-navy-600 hover:text-navy-800 hover:bg-navy-50 p-2"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="text-center">
                      <CardDescription className="text-navy-600 text-lg leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.howItWorksTitle}</h2>
            <p className="text-xl text-navy-600">{t.howItWorksSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorksSteps.map((step, index) => {
              const icons = [Target, Brain, Settings, TrendingUp]
              const IconComponent = icons[index]
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-royal-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
                  <p className="text-navy-600">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white" id="pricing">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.pricingTitle}</h2>
            <p className="text-xl text-navy-600">{t.pricingSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? "scale-105 border-2 border-royal-blue-500" : ""
                } bg-gradient-to-br from-white to-blue-50`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-royal-blue-500 text-white">
                    {t.mostPopular}
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-navy-800">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-royal-blue-600">{plan.price}</span>
                    <span className="text-navy-500 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-navy-600">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-navy-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                        : "border-navy-300 text-navy-700 hover:bg-navy-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/auth/signup">{t.getStartedButton}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.testimonialsTitle}</h2>
            <p className="text-xl text-navy-600">{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 border-navy-100 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-navy-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-400 to-royal-blue-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-800">{testimonial.name}</p>
                      <p className="text-sm text-navy-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-gradient-to-r from-navy-50 to-royal-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">{t.trustTitle}</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">{t.bankSecurity}</h4>
              <p className="text-sm text-navy-600">{t.bankSecurityDesc}</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">{t.realTimeAnalysis}</h4>
              <p className="text-sm text-navy-600">{t.realTimeAnalysisDesc}</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">{t.expertCommunity}</h4>
              <p className="text-sm text-navy-600">{t.expertCommunityDesc}</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">{t.provenResults}</h4>
              <p className="text-sm text-navy-600">{t.provenResultsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy-600 to-royal-blue-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <Button
            size="lg"
            className="bg-white text-navy-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link href="/auth/signup">
              {t.ctaButton}
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{t.title}</h1>
                  <p className="text-xs text-blue-200">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">{t.footerTagline}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.footerProduct}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="#features" className="hover:text-white transition-colors">{t.footerFeatures}</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">{t.footerPricing}</Link></li>
                <li><Link href="#demo" className="hover:text-white transition-colors">{t.footerDemo}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.footerSupport}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="#help" className="hover:text-white transition-colors">{t.footerHelp}</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">{t.footerContact}</Link></li>
                <li><Link href="#community" className="hover:text-white transition-colors">{t.footerCommunity}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.footerLanguages}</h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      selectedLanguage === language.code ? "text-white" : "text-blue-200 hover:text-white"
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-navy-700 pt-8 text-center">
            <p className="text-blue-200 text-sm">{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

