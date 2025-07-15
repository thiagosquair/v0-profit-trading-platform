"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Brain,
  ChevronRight,
  Play,
  Target,
  Settings,
  TrendingUp,
  Award,
  BarChart3,
  Activity,
  Camera,
  BookOpen,
  MessageSquare,
  ChevronDown,
  Globe,
  Star,
} from "lucide-react"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: number]: boolean }>({})
  const [allExpanded, setAllExpanded] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage")
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    localStorage.setItem("selectedLanguage", language)
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const content = {
    en: {
      title: "ProFitz",
      subtitle: "Trading Psychology Labbbb",
      badge: "AI-Powered Trading Psychology",
      heroTitle: "Master Your Mindset. Master Your Trading.",
      description:
        "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
      getStarted: "Start Your Journey",
      learnMore: "Watch Demo",
      signIn: "Sign In",
      footerFeatures: "Features",
      footerPricing: "Pricing",
      footerDemo: "Demo",
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
      detailedFeatures: [
        {
          title: "Behavioral Patterns",
          description: "Identify and understand your recurring trading behaviors and psychological biases.",
          detailedContent: "Our advanced behavioral pattern analysis uses machine learning to identify recurring patterns in your trading behavior. We analyze your decision-making processes, emotional triggers, and psychological biases that may be affecting your trading performance."
        },
        {
          title: "Interactive Exercises", 
          description: "Engage with CBT exercises, meditations, and simulations designed for traders.",
          detailedContent: "Our comprehensive library of interactive exercises is specifically designed for traders to build mental resilience and emotional control. These include Cognitive Behavioral Therapy (CBT) exercises that help you identify and change negative thought patterns."
        },
        {
          title: "Market Live Insights",
          description: "Real-time market psychology indicators and sentiment analysis to help you make informed decisions.",
          detailedContent: "Get real-time insights into market psychology and sentiment with our advanced analytics dashboard. This feature provides live market sentiment analysis, fear and greed indicators, volatility stress levels, and crowd psychology metrics."
        },
        {
          title: "Screenshot Analysis",
          description: "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.", 
          detailedContent: "Our revolutionary screenshot analysis feature uses advanced AI to analyze your trading platform screenshots and provide deep insights into your decision-making process."
        },
        {
          title: "Progress Tracking",
          description: "Monitor your psychological development with detailed metrics and performance reports.",
          detailedContent: "Track your psychological development and trading improvement with our comprehensive progress tracking system. This feature monitors your emotional control, discipline levels, consistency metrics, and psychological growth over time."
        },
        {
          title: "Gamification",
          description: "Earn badges and rewards as you develop better trading psychology and discipline.",
          detailedContent: "Make your psychological development engaging and motivating with our comprehensive gamification system. Earn badges for achieving milestones like 'Discipline Master' for following your trading plan for 30 consecutive days."
        },
        {
          title: "Psychology Courses",
          description: "Access structured learning paths covering all aspects of trading psychology.",
          detailedContent: "Access our comprehensive library of structured psychology courses designed specifically for traders. These courses cover essential topics like emotional regulation, risk management psychology, and developing a winning trader mindset."
        },
        {
          title: "Reflection Tools",
          description: "Journal your trades and emotions with guided prompts for deeper self-analysis.",
          detailedContent: "Our reflection tools help you develop deeper self-awareness through guided journaling and self-analysis exercises. These tools include trade reflection prompts, emotional awareness exercises, and goal-setting frameworks."
        }
      ],
      features: [
        {
          title: "AI Psychology Coach",
          description:
            "Your Personal Trading Psychology Mentor: Get real-time emotional coaching, behavioral pattern analysis, and personalized strategies to overcome psychological barriers and develop unshakeable trading discipline.",
        },
        {
          title: "Trade Builder",
          description:
            "Psychology-Focused Trade Planning: Plan every trade with psychological analysis, emotion checkpoints, and behavioral safeguards designed to help you make informed decisions.",
        },
        {
          title: "AI Trade Analysis",
          description:
            "Transform Every Trade into Learning Opportunity: Our AI analyzes your trades through a psychological lens, providing actionable insights to improve your decision-making and increase your profitability.",
        },
        {
          title: "Funded Career Builder",
          description:
            "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence.",
        },
      ],
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
          price: "$15",
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
          price: "$25",
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
          price: "$35",
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
      testimonialsTitle: "Join Thousands of Successful Traders",
      testimonialsSubtitle: "Join thousands of traders who have transformed their mindset",
      ctaTitle: "Ready to Unlock Your Full Trading Potential??",
      ctaSubtitle: "Join thousands of traders who have transformed their psychology and achieved consistent profitability.",
      ctaButton: "Start Your Free Trial",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
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
      description:
        "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisão.",
      getStarted: "Comece Sua Jornada",
      learnMore: "Assistir Demo",
      signIn: "Entrar",
      footerFeatures: "Recursos",
      footerPricing: "Preços",
      footerDemo: "Demo",
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
      detailedFeatures: [
        {
          title: "Padrões Comportamentais",
          description: "Identifique e compreenda seus comportamentos de trading recorrentes e vieses psicológicos.",
          detailedContent: "Nossa análise avançada de padrões comportamentais usa aprendizado de máquina para identificar padrões recorrentes em seu comportamento de trading. Analisamos seus processos de tomada de decisão, gatilhos emocionais e vieses psicológicos que podem estar afetando sua performance de trading."
        },
        {
          title: "Exercícios Interativos", 
          description: "Participe de exercícios de TCC, meditações e simulações projetadas para traders.",
          detailedContent: "Nossa biblioteca abrangente de exercícios interativos é especificamente projetada para traders construírem resistência mental e controle emocional. Estes incluem exercícios de Terapia Cognitivo-Comportamental (TCC) que ajudam você a identificar e mudar padrões de pensamento negativos."
        },
        {
          title: "Insights de Mercado ao Vivo",
          description: "Indicadores de psicologia de mercado em tempo real e análise de sentimento para ajudá-lo a tomar decisões informadas.",
          detailedContent: "Obtenha insights em tempo real sobre psicologia e sentimento do mercado com nosso painel de análise avançada. Este recurso fornece análise de sentimento de mercado ao vivo, indicadores de medo e ganância, níveis de estresse de volatilidade e métricas de psicologia de multidão."
        },
        {
          title: "Análise de Screenshots",
          description: "Carregue screenshots de trading para análise alimentada por IA de sua tomada de decisão e estado emocional.", 
          detailedContent: "Nosso recurso revolucionário de análise de screenshots usa IA avançada para analisar seus screenshots da plataforma de trading e fornecer insights profundos sobre seu processo de tomada de decisão."
        },
        {
          title: "Acompanhamento de Progresso",
          description: "Monitore seu desenvolvimento psicológico com métricas detalhadas e relatórios de performance.",
          detailedContent: "Acompanhe seu desenvolvimento psicológico e melhoria no trading com nosso sistema abrangente de acompanhamento de progresso. Este recurso monitora seu controle emocional, níveis de disciplina, métricas de consistência e crescimento psicológico ao longo do tempo."
        },
        {
          title: "Gamificação",
          description: "Ganhe distintivos e recompensas conforme desenvolve melhor psicologia e disciplina de trading.",
          detailedContent: "Torne seu desenvolvimento psicológico envolvente e motivador com nosso sistema abrangente de gamificação. Ganhe distintivos por alcançar marcos como 'Mestre da Disciplina' por seguir seu plano de trading por 30 dias consecutivos."
        },
        {
          title: "Cursos de Psicologia",
          description: "Acesse caminhos de aprendizado estruturados cobrindo todos os aspectos da psicologia de trading.",
          detailedContent: "Acesse nossa biblioteca abrangente de cursos de psicologia estruturados projetados especificamente para traders. Estes cursos cobrem tópicos essenciais como regulação emocional, psicologia de gestão de risco e desenvolvimento de uma mentalidade vencedora de trader."
        },
        {
          title: "Ferramentas de Reflexão",
          description: "Registre seus trades e emoções com prompts guiados para auto-análise mais profunda.",
          detailedContent: "Nossas ferramentas de reflexão ajudam você a desenvolver maior autoconsciência através de exercícios guiados de registro e auto-análise. Essas ferramentas incluem prompts de reflexão de trade, exercícios de consciência emocional e estruturas de definição de objetivos."
        }
      ],
      features: [
        {
          title: "Coach de Psicologia IA",
          description:
            "Seu Mentor Pessoal de Psicologia de Trading: Obtenha coaching emocional em tempo real, análise de padrões comportamentais e estratégias personalizadas para superar barreiras psicológicas e desenvolver disciplina de trading inabalável.",
        },
        {
          title: "Construtor de Trade",
          description:
            "Planejamento de Trade Focado em Psicologia: Planeje cada trade com análise psicológica, checkpoints emocionais e salvaguardas comportamentais projetadas para ajudá-lo a tomar decisões informadas.",
        },
        {
          title: "Análise de Trade IA",
          description:
            "Transforme Cada Trade em Oportunidade de Aprendizado: Nossa IA analisa seus trades através de uma lente psicológica, fornecendo insights acionáveis para melhorar sua tomada de decisão e aumentar sua rentabilidade.",
        },
        {
          title: "Construtor de Carreira Financiada",
          description:
            "Seu Caminho para Trading Profissional: Obtenha orientação abrangente e ferramentas para se qualificar para programas de trading financiado, construir seu histórico e lançar sua carreira de trading profissional com confiança.",
        },
      ],
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
      ctaTitle: "Pronto Para Desbloquear Seu Potencial Completo no Trading??",
      ctaSubtitle: "Junte-se a milhares de traders que transformaram sua psicologia e alcançaram rentabilidade consistente.",
      ctaButton: "Comece Seu Teste Gratuito",
      expandAll: "Expandir Tudo",
      collapseAll: "Recolher Tudo",
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
      description:
        "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
      getStarted: "Comienza Tu Viaje",
      learnMore: "Ver Demo",
      signIn: "Iniciar Sesión",
      footerFeatures: "Características",
      footerPricing: "Precios",
      footerDemo: "Demo",
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
      detailedFeatures: [
        {
          title: "Patrones Conductuales",
          description: "Identifica y comprende tus comportamientos de trading recurrentes y sesgos psicológicos.",
          detailedContent: "Nuestro análisis avanzado de patrones conductuales usa aprendizaje automático para identificar patrones recurrentes en tu comportamiento de trading. Analizamos tus procesos de toma de decisiones, disparadores emocionales y sesgos psicológicos que pueden estar afectando tu rendimiento de trading."
        },
        {
          title: "Ejercicios Interactivos", 
          description: "Participa en ejercicios de TCC, meditaciones y simulaciones diseñadas para traders.",
          detailedContent: "Nuestra biblioteca integral de ejercicios interactivos está específicamente diseñada para que los traders construyan resistencia mental y control emocional. Estos incluyen ejercicios de Terapia Cognitivo-Conductual (TCC) que te ayudan a identificar y cambiar patrones de pensamiento negativos."
        },
        {
          title: "Insights de Mercado en Vivo",
          description: "Indicadores de psicología de mercado en tiempo real y análisis de sentimiento para ayudarte a tomar decisiones informadas.",
          detailedContent: "Obtén insights en tiempo real sobre psicología y sentimiento del mercado con nuestro panel de análisis avanzado. Esta función proporciona análisis de sentimiento de mercado en vivo, indicadores de miedo y codicia, niveles de estrés de volatilidad y métricas de psicología de multitudes."
        },
        {
          title: "Análisis de Capturas de Pantalla",
          description: "Sube capturas de pantalla de trading para análisis impulsado por IA de tu toma de decisiones y estado emocional.", 
          detailedContent: "Nuestra función revolucionaria de análisis de capturas de pantalla usa IA avanzada para analizar tus capturas de pantalla de la plataforma de trading y proporcionar insights profundos sobre tu proceso de toma de decisiones."
        },
        {
          title: "Seguimiento de Progreso",
          description: "Monitorea tu desarrollo psicológico con métricas detalladas y reportes de rendimiento.",
          detailedContent: "Rastrea tu desarrollo psicológico y mejora en el trading con nuestro sistema integral de seguimiento de progreso. Esta función monitorea tu control emocional, niveles de disciplina, métricas de consistencia y crecimiento psicológico a lo largo del tiempo."
        },
        {
          title: "Gamificación",
          description: "Gana insignias y recompensas mientras desarrollas mejor psicología y disciplina de trading.",
          detailedContent: "Haz que tu desarrollo psicológico sea atractivo y motivador con nuestro sistema integral de gamificación. Gana insignias por lograr hitos como 'Maestro de la Disciplina' por seguir tu plan de trading durante 30 días consecutivos."
        },
        {
          title: "Cursos de Psicología",
          description: "Accede a rutas de aprendizaje estructuradas que cubren todos los aspectos de la psicología del trading.",
          detailedContent: "Accede a nuestra biblioteca integral de cursos de psicología estructurados diseñados específicamente para traders. Estos cursos cubren temas esenciales como regulación emocional, psicología de gestión de riesgos y desarrollo de una mentalidad ganadora de trader."
        },
        {
          title: "Herramientas de Reflexión",
          description: "Registra tus trades y emociones con prompts guiados para un auto-análisis más profundo.",
          detailedContent: "Nuestras herramientas de reflexión te ayudan a desarrollar mayor autoconciencia a través de ejercicios guiados de registro y auto-análisis. Estas herramientas incluyen prompts de reflexión de trades, ejercicios de conciencia emocional y marcos de establecimiento de objetivos."
        }
      ],
      features: [
        {
          title: "Coach de Psicología IA",
          description:
            "Tu Mentor Personal de Psicología de Trading: Obtén coaching emocional en tiempo real, análisis de patrones conductuales y estrategias personalizadas para superar barreras psicológicas y desarrollar disciplina de trading inquebrantable.",
        },
        {
          title: "Constructor de Trade",
          description:
            "Planificación de Trade Enfocada en Psicología: Planifica cada trade con análisis psicológico, checkpoints emocionales y salvaguardas conductuales diseñadas para ayudarte a tomar decisiones informadas.",
        },
        {
          title: "Análisis de Trade IA",
          description:
            "Transforma Cada Trade en Oportunidad de Aprendizaje: Nuestra IA analiza tus trades a través de una lente psicológica, proporcionando insights accionables para mejorar tu toma de decisiones y aumentar tu rentabilidad.",
        },
        {
          title: "Constructor de Carrera Financiada",
          description:
            "Tu Camino hacia Trading Profesional: Obtén orientación integral y herramientas para calificar para programas de trading financiado, construir tu historial y lanzar tu carrera de trading profesional con confianza.",
        },
      ],
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
      ctaTitle: "¿Listo Para Desbloquear Tu Potencial Completo en Trading??",
      ctaSubtitle: "Únete a miles de traders que han transformado su psicología y logrado rentabilidad consistente.",
      ctaButton: "Comienza Tu Prueba Gratuita",
      expandAll: "Expandir Todo",
      collapseAll: "Contraer Todo",
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
      description:
        "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour construire la résilience mentale et une meilleure prise de décision.",
      getStarted: "Commencez Votre Voyage",
      learnMore: "Voir la Démo",
      signIn: "Se Connecter",
      footerFeatures: "Fonctionnalités",
      footerPricing: "Tarifs",
      footerDemo: "Démo",
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
      detailedFeatures: [
        {
          title: "Modèles Comportementaux",
          description: "Identifiez et comprenez vos comportements de trading récurrents et biais psychologiques.",
          detailedContent: "Notre analyse avancée des modèles comportementaux utilise l'apprentissage automatique pour identifier les modèles récurrents dans votre comportement de trading. Nous analysons vos processus de prise de décision, déclencheurs émotionnels et biais psychologiques qui peuvent affecter votre performance de trading."
        },
        {
          title: "Exercices Interactifs", 
          description: "Participez à des exercices de TCC, méditations et simulations conçues pour les traders.",
          detailedContent: "Notre bibliothèque complète d'exercices interactifs est spécifiquement conçue pour que les traders développent la résilience mentale et le contrôle émotionnel. Ceux-ci incluent des exercices de Thérapie Cognitivo-Comportementale (TCC) qui vous aident à identifier et changer les schémas de pensée négatifs."
        },
        {
          title: "Insights de Marché en Direct",
          description: "Indicateurs de psychologie de marché en temps réel et analyse de sentiment pour vous aider à prendre des décisions éclairées.",
          detailedContent: "Obtenez des insights en temps réel sur la psychologie et le sentiment du marché avec notre tableau de bord d'analyse avancée. Cette fonctionnalité fournit une analyse de sentiment de marché en direct, des indicateurs de peur et de cupidité, des niveaux de stress de volatilité et des métriques de psychologie de foule."
        },
        {
          title: "Analyse de Captures d'Écran",
          description: "Téléchargez des captures d'écran de trading pour une analyse alimentée par l'IA de votre prise de décision et état émotionnel.", 
          detailedContent: "Notre fonctionnalité révolutionnaire d'analyse de captures d'écran utilise l'IA avancée pour analyser vos captures d'écran de plateforme de trading et fournir des insights profonds sur votre processus de prise de décision."
        },
        {
          title: "Suivi des Progrès",
          description: "Surveillez votre développement psychologique avec des métriques détaillées et des rapports de performance.",
          detailedContent: "Suivez votre développement psychologique et amélioration du trading avec notre système complet de suivi des progrès. Cette fonctionnalité surveille votre contrôle émotionnel, niveaux de discipline, métriques de cohérence et croissance psychologique au fil du temps."
        },
        {
          title: "Gamification",
          description: "Gagnez des badges et récompenses en développant une meilleure psychologie et discipline de trading.",
          detailedContent: "Rendez votre développement psychologique engageant et motivant avec notre système complet de gamification. Gagnez des badges pour atteindre des jalons comme 'Maître de la Discipline' pour suivre votre plan de trading pendant 30 jours consécutifs."
        },
        {
          title: "Cours de Psychologie",
          description: "Accédez à des parcours d'apprentissage structurés couvrant tous les aspects de la psychologie du trading.",
          detailedContent: "Accédez à notre bibliothèque complète de cours de psychologie structurés conçus spécifiquement pour les traders. Ces cours couvrent des sujets essentiels comme la régulation émotionnelle, la psychologie de gestion des risques et le développement d'un état d'esprit gagnant de trader."
        },
        {
          title: "Outils de Réflexion",
          description: "Enregistrez vos trades et émotions avec des invites guidées pour une auto-analyse plus approfondie.",
          detailedContent: "Nos outils de réflexion vous aident à développer une plus grande conscience de soi grâce à des exercices guidés de journalisation et d'auto-analyse. Ces outils incluent des invites de réflexion de trade, des exercices de conscience émotionnelle et des cadres de définition d'objectifs."
        }
      ],
      features: [
        {
          title: "Coach de Psychologie IA",
          description:
            "Votre Mentor Personnel de Psychologie de Trading : Obtenez un coaching émotionnel en temps réel, une analyse des modèles comportementaux et des stratégies personnalisées pour surmonter les barrières psychologiques et développer une discipline de trading inébranlable.",
        },
        {
          title: "Constructeur de Trade",
          description:
            "Planification de Trade Axée sur la Psychologie : Planifiez chaque trade avec une analyse psychologique, des checkpoints émotionnels et des garde-fous comportementaux conçus pour vous aider à prendre des décisions éclairées.",
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
      ctaTitle: "Prêt à Débloquer Votre Plein Potentiel de Trading ??",
      ctaSubtitle: "Rejoignez des milliers de traders qui ont transformé leur psychologie et atteint une rentabilité constante.",
      ctaButton: "Commencez Votre Essai Gratuit",
      expandAll: "Tout Développer",
      collapseAll: "Tout Réduire",
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
            {t.detailedFeatures.map((feature, index) => {
              const icons = [BarChart3, Target, Activity, Camera, TrendingUp, Award, BookOpen, MessageSquare]
              const IconComponent = icons[index]
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
                      <p className="text-navy-600 leading-relaxed">{feature.detailedContent}</p>
                      <Button
                        className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                        asChild
                      >
                        <Link href="/auth/signup">{t.getStarted}</Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ultimate Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Our Ultimate Trading Features</h2>
            <p className="text-xl text-navy-600">The core tools that set ProFitz apart from every other trading platform</p>
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
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.pricingTitle}</h2>
            <p className="text-xl text-navy-600">{t.pricingSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-royal-blue-50 to-navy-50 border-royal-blue-200 ring-2 ring-royal-blue-500"
                    : "bg-gradient-to-br from-white to-blue-50 border-navy-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-royal-blue-500 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-navy-800 mb-4">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-royal-blue-600">{plan.price}</span>
                    <span className="text-navy-600 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-navy-600 text-lg">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-navy-700">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 ${
                      plan.popular
                        ? "bg-gradient-to-r from-royal-blue-600 to-navy-600 hover:from-royal-blue-700 hover:to-navy-700 text-white"
                        : "bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0"
                    }`}
                    asChild
                  >
                    <Link href="/auth/signup">Get Started</Link>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-navy-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-navy-900">{testimonial.name}</p>
                    <p className="text-navy-600 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy-600 to-royal-blue-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{t.ctaSubtitle}</p>
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
      <footer className="bg-navy-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className="text-xs text-blue-200">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-blue-200">Master your trading psychology with AI-powered coaching and behavioral analysis.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="#features" className="hover:text-white transition-colors">{t.footerFeatures}</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">{t.footerPricing}</Link></li>
                <li><Link href="#demo" className="hover:text-white transition-colors">{t.footerDemo}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-700 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; 2024 ProFitz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

