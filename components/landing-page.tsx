"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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

export function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: number]: boolean }>({})
  const [allExpanded, setAllExpanded] = useState(false)
  const [selectedFeatureModal, setSelectedFeatureModal] = useState<number | null>(null)

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
      features: [
        {
          title: "AI Psychology Coach",
          description:
            "Get personalized psychological guidance powered by advanced AI to improve your trading mindset.",
        },
        {
          title: "Behavioral Patterns",
          description: "Identify and understand your recurring trading behaviors and psychological biases.",
        },
        {
          title: "Interactive Exercises",
          description: "Engage with CBT exercises, meditations, and simulations designed for traders.",
        },
        {
          title: "Ai Trade Analysis",
          description:
            "Advanced AI analyzes your trades to identify psychological patterns and suggest improvements for better performance.",
        },
        {
          title: "Trade Builder",
          description: "Plan and structure your trades with psychological checkpoints to ensure disciplined execution.",
        },
        {
          title: "Market Live Insights",
          description:
            "Real-time market psychology indicators and sentiment analysis to help you make informed decisions.",
        },
        {
          title: "Screenshot Analysis",
          description:
            "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.",
        },
        {
          title: "Progress Tracking",
          description: "Monitor your psychological development with detailed metrics and performance reports.",
        },
        {
          title: "Gamification",
          description: "Earn badges and rewards as you develop better trading psychology and discipline.",
        },
        {
          title: "Psychology Courses",
          description: "Access structured learning paths covering all aspects of trading psychology.",
        },
        {
          title: "Reflection Tools",
          description: "Journal your trades and emotions with guided prompts for deeper self-analysis.",
        },
      ],
      steps: [
        {
          title: "Complete Assessment",
          description: "Take our comprehensive trader personality profile to understand your psychological baseline.",
        },
        {
          title: "Get AI Coaching",
          description: "Receive personalized guidance from our AI psychology coach based on your unique profile.",
        },
        {
          title: "Practice & Learn",
          description: "Engage with interactive exercises, courses, and reflection tools to build new habits.",
        },
        {
          title: "Track Progress",
          description: "Monitor your psychological development with detailed analytics and celebrate milestones.",
        },
      ],
    },
    pt: {
      title: "ProFitz",
      subtitle: "Laboratório de Psicologia",
      description:
        "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisões.",
      getStarted: "Começar Jornada",
      learnMore: "Assistir Demo",
      signIn: "Entrar",
      badge: "Psicologia de Trading Alimentada por IA",
      heroTitle: "Transforme Sua Mentalidade de Trading",
      featuresTitle: "Tudo Que Você Precisa Para Dominar a Psicologia de Trading",
      featuresSubtitle: "Nossa plataforma abrangente combina IA de ponta com técnicas psicológicas comprovadas",
      howItWorksTitle: "Como o ProFitz Funciona",
      howItWorksSubtitle: "Um processo simples de 4 etapas para transformar sua psicologia de trading",
      testimonialsTitle: "O Que os Traders Dizem Sobre o ProFitz",
      testimonialsSubtitle: "Junte-se a milhares de traders que transformaram sua mentalidade",
      ctaTitle: "Pronto Para Dominar Sua Psicologia de Trading?",
      ctaSubtitle: "Junte-se ao ProFitz hoje e comece sua jornada rumo ao trading consistente e disciplinado.",
      ctaButton: "Começar Teste Grátis",
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
      footerCopyright: "© 2024 ProFitz. Todos os direitos reservados.",
      features: [
        {
          title: "Coach de Psicologia IA",
          description:
            "Obtenha orientação psicológica personalizada alimentada por IA avançada para melhorar sua mentalidade de trading.",
        },
        {
          title: "Padrões Comportamentais",
          description: "Identifique e compreenda seus comportamentos recorrentes de trading e vieses psicológicos.",
        },
        {
          title: "Exercícios Interativos",
          description: "Participe de exercícios de TCC, meditações e simulações projetadas para traders.",
        },
        {
          title: "Análise de Trade IA",
          description:
            "IA avançada analisa seus trades para identificar padrões psicológicos e sugerir melhorias para melhor desempenho.",
        },
        {
          title: "Construtor de Trade",
          description:
            "Planeje e estruture seus trades com pontos de verificação psicológicos para garantir execução disciplinada.",
        },
        {
          title: "Insights de Mercado ao Vivo",
          description:
            "Indicadores de psicologia de mercado em tempo real e análise de sentimento para ajudá-lo a tomar decisões informadas.",
        },
        {
          title: "Análise de Screenshot",
          description:
            "Carregue screenshots de trading para análise alimentada por IA de sua tomada de decisão e estado emocional.",
        },
        {
          title: "Acompanhamento de Progresso",
          description: "Monitore seu desenvolvimento psicológico com métricas detalhadas e relatórios de desempenho.",
        },
        {
          title: "Gamificação",
          description: "Ganhe distintivos e recompensas enquanto desenvolve melhor psicologia e disciplina de trading.",
        },
        {
          title: "Cursos de Psicologia",
          description:
            "Acesse caminhos de aprendizado estruturados cobrindo todos os aspectos da psicologia de trading.",
        },
        {
          title: "Ferramentas de Reflexão",
          description: "Registre seus trades e emoções com prompts guiados para auto-análise mais profunda.",
        },
      ],
      steps: [
        {
          title: "Complete a Avaliação",
          description:
            "Faça nosso perfil abrangente de personalidade de trader para entender sua linha de base psicológica.",
        },
        {
          title: "Obtenha Coaching IA",
          description: "Receba orientação personalizada de nosso coach de psicologia IA baseado em seu perfil único.",
        },
        {
          title: "Pratique e Aprenda",
          description:
            "Participe de exercícios interativos, cursos e ferramentas de reflexão para construir novos hábitos.",
        },
        {
          title: "Acompanhe o Progresso",
          description: "Monitore seu desenvolvimento psicológico com análises detalhadas e celebre marcos importantes.",
        },
      ],
    },
    es: {
      title: "ProFitz",
      subtitle: "Laboratorio de Psicología",
      description:
        "Domina tu psicología de trading com coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
      getStarted: "Comenzar Viaje",
      learnMore: "Ver Demo",
      signIn: "Iniciar Sesión",
      badge: "Psicología de Trading Impulsada por IA",
      heroTitle: "Transforma Tu Mentalidad de Trading",
      featuresTitle: "Todo Lo Que Necesitas Para Dominar la Psicología de Trading",
      featuresSubtitle: "Nuestra plataforma integral combina IA de vanguardia con técnicas psicológicas probadas",
      howItWorksTitle: "Cómo Funciona ProFitz",
      howItWorksSubtitle: "Un proceso simple de 4 pasos para transformar tu psicología de trading",
      testimonialsTitle: "Lo Que Dicen los Traders Sobre ProFitz",
      testimonialsSubtitle: "Únete a miles de traders que han transformado su mentalidad",
      ctaTitle: "¿Listo Para Dominar Tu Psicología de Trading?",
      ctaSubtitle: "Únete a ProFitz hoy y comienza tu viaje hacia un trading consistente y disciplinado.",
      ctaButton: "Comenzar Prueba Gratis",
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
      footerCopyright: "© 2024 ProFitz. Todos los derechos reservados.",
      features: [
        {
          title: "Coach de Psicología IA",
          description:
            "Obtén orientación psicológica personalizada impulsada por IA avanzada para mejorar tu mentalidad de trading.",
        },
        {
          title: "Patrones Conductuales",
          description: "Identifica y comprende tus comportamientos recurrentes de trading y sesgos psicológicos.",
        },
        {
          title: "Ejercicios Interactivos",
          description: "Participa en ejercicios de TCC, meditaciones y simulaciones diseñadas para traders.",
        },
        {
          title: "Análisis de Trade IA",
          description:
            "IA avanzada analiza tus trades para identificar patrones psicológicos y sugerir mejoras para mejor rendimiento.",
        },
        {
          title: "Constructor de Trade",
          description:
            "Planifica y estructura tus trades con puntos de control psicológicos para asegurar ejecución disciplinada.",
        },
        {
          title: "Insights de Mercado en Vivo",
          description:
            "Indicadores de psicología de mercado en tiempo real y análisis de sentimiento para ayudarte a tomar decisiones informadas.",
        },
        {
          title: "Análisis de Captura",
          description:
            "Sube capturas de trading para análisis impulsado por IA de tu toma de decisiones y estado emocional.",
        },
        {
          title: "Seguimiento de Progreso",
          description: "Monitorea tu desarrollo psicológico con métricas detalladas e informes de rendimiento.",
        },
        {
          title: "Gamificación",
          description: "Gana insignias y recompensas mientras desarrollas mejor psicología y disciplina de trading.",
        },
        {
          title: "Cursos de Psicología",
          description:
            "Accede a rutas de aprendizaje estructuradas que cubren todos los aspectos de la psicología de trading.",
        },
        {
          title: "Herramientas de Reflexión",
          description:
            "Registra tus operaciones y emociones con indicaciones guiadas para un auto-análisis más profundo.",
        },
      ],
      steps: [
        {
          title: "Completa la Evaluación",
          description:
            "Realiza nuestro perfil integral de personalidad de trader para entender tu línea de base psicológica.",
        },
        {
          title: "Obtén Coaching IA",
          description: "Recibe orientación personalizada de nuestro coach de psicología IA basado en tu perfil único.",
        },
        {
          title: "Practica y Aprende",
          description:
            "Participa en ejercicios interactivos, cursos y herramientas de reflexión para construir nuevos hábitos.",
        },
        {
          title: "Rastrea el Progreso",
          description: "Monitorea tu desarrollo psicológico con análisis detallados y celebra hitos importantes.",
        },
      ],
    },
    fr: {
      title: "ProFitz",
      subtitle: "Laboratoire de Psychologie",
      description:
        "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour renforcer la résistance mentale et améliorer la prise de décision.",
      getStarted: "Commencer le Voyage",
      learnMore: "Voir la Démo",
      signIn: "Se Connecter",
      badge: "Psychologie de Trading Alimentée par l'IA",
      heroTitle: "Transformez Votre Mentalité de Trading",
      featuresTitle: "Tout Ce Dont Vous Avez Besoin Pour Maîtriser la Psychologie de Trading",
      featuresSubtitle: "Notre plateforme complète combine l'IA de pointe avec des techniques psychologiques éprouvées",
      howItWorksTitle: "Comment ProFitz Fonctionne",
      howItWorksSubtitle: "Un processus simple en 4 étapes pour transformer votre psychologie de trading",
      testimonialsTitle: "Ce Que Disent les Traders À Propos de ProFitz",
      testimonialsSubtitle: "Rejoignez des milliers de traders qui ont transformé leur mentalité",
      ctaTitle: "Prêt À Maîtriser Votre Psychologie de Trading?",
      ctaSubtitle: "Rejoignez ProFitz aujourd'hui et commencez votre voyage vers un trading cohérent et discipliné.",
      ctaButton: "Commencer l'Essai Gratuit",
      footerTagline: "Transformer les traders grâce au coaching psychologique alimenté par l'IA.",
      footerProduct: "Produit",
      footerSupport: "Support",
      footerLanguages: "Langues",
      footerFeatures: "Fonctionnalités",
      footerPricing: "Tarifs",
      footerDemo: "Démo",
      footerHelp: "Centre d'Aide",
      footerContact: "Contact",
      footerCommunity: "Communauté",
      footerCopyright: "© 2024 ProFitz. Tous droits réservés.",
      features: [
        {
          title: "Coach de Psychologie IA",
          description:
            "Obtenez des conseils psychologiques personnalisés alimentés par une IA avancée pour améliorer votre mentalité de trading.",
        },
        {
          title: "Modèles Comportementaux",
          description: "Identifiez et comprenez vos comportements de trading récurrents et vos biais psychologiques.",
        },
        {
          title: "Exercices Interactifs",
          description: "Participez à des exercices de TCC, méditations et simulations conçues pour les traders.",
        },
        {
          title: "Analyse de Trade IA",
          description:
            "L'IA avancée analyse vos trades pour identifier les modèles psychologiques et suggérer des améliorations pour de meilleures performances.",
        },
        {
          title: "Constructeur de Trade",
          description:
            "Planifiez et structurez vos trades avec des points de contrôle psychologiques pour assurer une exécution disciplinée.",
        },
        {
          title: "Insights de Marché en Direct",
          description:
            "Indicateurs de psychologie de marché en temps réel et analyse de sentiment pour vous aider à prendre des décisions éclairées.",
        },
        {
          title: "Analyse de Capture d'Écran",
          description:
            "Téléchargez des captures d'écran de trading pour une analyse alimentée par l'IA de votre prise de décision et état émotionnel.",
        },
        {
          title: "Suivi des Progrès",
          description:
            "Surveillez votre développement psychologique avec des métriques détaillées et des rapports de performance.",
        },
        {
          title: "Gamification",
          description:
            "Gagnez des badges et des récompenses en développant une meilleure psychologie et discipline de trading.",
        },
        {
          title: "Cursos de Psicología",
          description:
            "Accédez à des parcours d'apprentissage structurés qui couvrent tous les aspects de la psychologie de trading.",
        },
        {
          title: "Outils de Réflexion",
          description:
            "Journalisez vos trades et émotions avec des invites guidées pour une auto-analyse plus profonde.",
        },
      ],
      steps: [
        {
          title: "Complétez l'Évaluation",
          description:
            "Passez notre profil complet de personnalité de trader pour comprendre votre ligne de base psychologique.",
        },
        {
          title: "Obtenez un Coaching IA",
          description:
            "Recevez des conseils personnalisés de notre coach de psychologie IA basé sur votre profil unique.",
        },
        {
          title: "Pratiquez et Apprenez",
          description:
            "Participez à des exercices interactifs, cours et outils de réflexion pour construire de nouvelles habitudes.",
        },
        {
          title: "Suivez les Progrès",
          description:
            "Surveillez votre développement psychologique avec des analyses détaillées et célébrez les jalons.",
        },
      ],
    },
  }

  const t = content[selectedLanguage as keyof typeof content]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for Getting Started",
      popular: false,
      features: [
        "Ai Psychology Coach",
        "5 Trade Analyses per month",
        "Progress Tracking",
        "Interactive Exercices",
        "Psychology Courses",
      ],
    },
    {
      name: "Pro",
      price: "$14",
      period: "/month",
      description: "For Serious Traders",
      popular: false,
      features: [
        "Advanced Ai Psychology Coach",
        "25 Trade Analyses per month",
        "Advanced Progress Tracking",
        "Reflection Journal",
        "Psychology Courses",
        "Screenshot Analysis",
        "10 Trade Builder",
        "Interactive Exercices",
      ],
    },
    {
      name: "Premium",
      price: "$28",
      period: "/month",
      description: "For Professional Traders",
      popular: true,
      features: [
        "Everything in Pro",
        "Advanced Ai Psychology Coach",
        "Unlimited Trade Analyses",
        "Advanced Progress Tracking",
        "Reflection Journal",
        "Psychology Courses",
        "Coaching Insights",
        "30 Trade Builder",
        "Interactive Exercices",
        "Behavioral Patterns",
      ],
    },
    {
      name: "Elite",
      price: "$55",
      period: "/month",
      description: "For Elite Traders",
      popular: false,
      features: [
       "Everything in Premium",
        "Advanced Ai Psychology Coach",
        "Unlimited Trade Analyses",
        "Advanced Progress Tracking",
        "Reflection Journal",
        "Psychology Courses",
        "Coaching Insights",
        "Unlimited Trade Builder",
        "Interactive Exercices",
        "Behavioral Patterns",
        "Funded Career Builder",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content:
        "ProFitz helped me overcome my fear of taking profits. My consistency improved by 300% in just 3 months.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Swing Trader",
      content:
        "The AI coach is like having a trading psychologist available 24/7. It's transformed how I approach the markets.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Options Trader",
      content: "Finally, a platform that addresses the mental game. My emotional control has never been better.",
      rating: 5,
    },
  ]

  const detailedFeatures = [
    {
      title: "Behavioral Patterns",
      icon: BarChart3,
      description: "Identify and understand your recurring trading behaviors and psychological biases.",
      detailedContent:
        "Our advanced behavioral pattern analysis uses machine learning to identify recurring patterns in your trading behavior. We analyze your decision-making processes, emotional triggers, and psychological biases that may be affecting your trading performance. The system tracks patterns like revenge trading, FOMO (Fear of Missing Out), overconfidence after wins, and fear after losses. You'll receive personalized insights about your trading psychology, including detailed reports on your risk tolerance, emotional state during different market conditions, and recommendations for improving your mental discipline. This feature helps you understand the 'why' behind your trading decisions, enabling you to develop better self-awareness and make more rational, profitable trades.",
    },
    {
      title: "Interactive Exercises",
      icon: Target,
      description: "Engage with CBT exercises, meditations, and simulations designed for traders.",
      detailedContent:
        "Our comprehensive library of interactive exercises is specifically designed for traders to build mental resilience and emotional control. These include Cognitive Behavioral Therapy (CBT) exercises that help you identify and change negative thought patterns, guided meditation sessions for stress reduction and focus enhancement, and realistic trading simulations that allow you to practice decision-making in a risk-free environment. The exercises cover various scenarios like handling losing streaks, managing winning streaks without overconfidence, dealing with market volatility, and maintaining discipline during high-stress situations. Each exercise is gamified with progress tracking, achievements, and personalized recommendations based on your performance and psychological profile.",
    },
    {
      title: "Market Live Insights",
      icon: Activity,
      description: "Real-time market psychology indicators and sentiment analysis to help you make informed decisions.",
      detailedContent:
        "Get real-time insights into market psychology and sentiment with our advanced analytics dashboard. This feature provides live market sentiment analysis, fear and greed indicators, volatility stress levels, and crowd psychology metrics. We analyze social media sentiment, news sentiment, options flow, and institutional behavior to give you a comprehensive view of market psychology. The system alerts you to potential market turning points based on extreme sentiment readings, helps you identify when the market is driven by emotion rather than fundamentals, and provides contrarian signals when crowd psychology reaches extremes. This tool is invaluable for timing entries and exits, understanding market dynamics, and avoiding common psychological traps that affect most traders.",
    },
    {
      title: "Screenshot Analysis",
      icon: Camera,
      description: "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.",
      detailedContent:
        "Our revolutionary screenshot analysis feature uses advanced AI to analyze your trading platform screenshots and provide deep insights into your decision-making process. Simply upload screenshots of your trades, charts, or trading platform, and our AI will analyze your setup, timing, risk management, and emotional state at the time of the trade. The system can identify signs of emotional trading, poor risk management, FOMO entries, revenge trading, and other psychological issues by analyzing your chart patterns, position sizes, and timing. You'll receive detailed feedback on what you did well, what could be improved, and specific recommendations for better decision-making. This feature is like having a professional trading coach review every single one of your trades and provide personalized feedback.",
    },
    {
      title: "Progress Tracking",
      icon: TrendingUp,
      description: "Monitor your psychological development with detailed metrics and performance reports.",
      detailedContent:
        "Track your psychological development and trading improvement with our comprehensive progress tracking system. This feature monitors your emotional control, discipline levels, consistency metrics, and psychological growth over time. You'll see detailed charts showing your progress in areas like emotional regulation, risk management discipline, patience levels, and decision-making quality. The system tracks your streaks (both winning and losing), how you handle different market conditions, your improvement in various psychological areas, and your overall trading psychology score. Regular progress reports highlight your strengths, areas for improvement, and celebrate your achievements. This data-driven approach to psychological development ensures you can see tangible improvements in your trading mindset and make informed decisions about your continued growth.",
    },
    {
      title: "Gamification",
      icon: Award,
      description: "Earn badges and rewards as you develop better trading psychology and discipline.",
      detailedContent:
        "Make your psychological development engaging and motivating with our comprehensive gamification system. Earn badges for achieving milestones like 'Discipline Master' for following your trading plan for 30 consecutive days, 'Emotional Control Expert' for maintaining composure during volatile markets, or 'Risk Management Pro' for consistently managing your risk properly. The system includes achievement levels, progress bars, leaderboards (anonymous), and reward systems that keep you motivated on your journey to better trading psychology. You can unlock new features, exercises, and content as you progress. The gamification system is designed to make the often challenging work of psychological development fun and engaging, while still maintaining the serious focus on improving your trading performance.",
    },
    {
      title: "Psychology Courses",
      icon: BookOpen,
      description: "Access structured learning paths covering all aspects of trading psychology.",
      detailedContent:
        "Access our comprehensive library of trading psychology courses designed by professional trading psychologists and successful traders. Our structured learning paths cover everything from basic emotional control to advanced psychological strategies used by professional traders. Courses include 'Mastering Trading Emotions', 'Building Unshakeable Discipline', 'The Psychology of Risk Management', 'Overcoming Trading Trauma', and 'Developing a Winning Mindset'. Each course includes video lessons, interactive exercises, quizzes, and practical assignments. The content is regularly updated with the latest research in trading psychology and behavioral finance. You can learn at your own pace, track your progress through each course, and receive certificates of completion. These courses provide the theoretical foundation to complement the practical tools and exercises available throughout the platform.",
    },
    {
      title: "Reflection Tools",
      icon: MessageSquare,
      description: "Journal your trades and emotions with guided prompts for deeper self-analysis.",
      detailedContent:
        "Develop deeper self-awareness with our comprehensive reflection and journaling tools. Our guided journaling system provides specific prompts to help you analyze your trades, emotions, and decision-making processes. After each trading session, you'll be prompted to reflect on your emotional state, what influenced your decisions, how well you followed your plan, and what you learned. The system includes mood tracking, emotion mapping, and pattern recognition to help you identify recurring themes in your trading psychology. You can also set up custom reflection prompts, track your psychological goals, and review your journal entries to see your growth over time. This feature is essential for developing the self-awareness needed to become a consistently profitable trader, as it helps you understand your psychological patterns and make conscious improvements to your trading approach.",
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
    for (let i = 0; i < 3; i++) {
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

            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-navy-700 hover:text-royal-blue-600"
                onClick={() => {
                  const currentIndex = languages.findIndex((lang) => lang.code === selectedLanguage)
                  const nextIndex = (currentIndex + 1) % languages.length
                  setSelectedLanguage(languages[nextIndex].code)
                }}
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find((lang) => lang.code === selectedLanguage)?.flag}</span>
                <span>{languages.find((lang) => lang.code === selectedLanguage)?.name}</span>
              </Button>
            </div>
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

      {/* Enhanced Hero Section with Media Space */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <Badge
                className="mb-4 bg-gradient-to-r from-navy-100 to-royal-blue-100 text-navy-700 border-navy-200 animate-pulse"
                variant="outline"
              >
                {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 animate-fade-in">
                {t.heroTitle.split(" ").slice(0, 2).join(" ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-600 via-royal-blue-500 to-blue-500">
                  {" "}
                  {t.heroTitle.split(" ").slice(2).join(" ")}
                </span>
              </h1>
              <p className="text-xl text-navy-600 mb-8 max-w-2xl lg:max-w-none">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0 transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/auth/signup">
                    {t.getStarted}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 border-navy-300 text-navy-700 hover:bg-navy-50 group"
                    >
                      <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      {t.learnMore}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="aspect-video bg-gradient-to-br from-navy-100 to-royal-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-royal-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-navy-800 mb-2">Demo Video Coming Soon</h3>
                        <p className="text-navy-600">Watch how ProFitz transforms trading psychology</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right Column - Media Space */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-2xl aspect-video bg-gradient-to-br from-navy-100 to-royal-blue-100 rounded-2xl shadow-2xl flex items-center justify-center border border-navy-200 overflow-hidden">
                <video
                  src="/images/Untitled design (14).mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
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
            <div className="space-y-2">
              <div className="text-3xl font-bold text-royal-blue-600">10,000+</div>
              <div className="text-navy-600">Active Traders</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-royal-blue-600">85%</div>
              <div className="text-navy-600">Improved Consistency</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-royal-blue-600">4.9/5</div>
              <div className="text-navy-600">User Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-royal-blue-600">24/7</div>
              <div className="text-navy-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.featuresTitle}</h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-navy-100 cursor-pointer group"
                  onClick={() => setSelectedFeatureModal(index)}
                >
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-royal-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg text-navy-800 group-hover:text-royal-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-navy-600">{feature.description}</CardDescription>
                    <div className="mt-4 text-sm text-royal-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to learn more →
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Feature Detail Modals */}
          {selectedFeatureModal !== null && (
            <Dialog open={selectedFeatureModal !== null} onOpenChange={() => setSelectedFeatureModal(null)}>
              <DialogContent className="max-w-4xl md:max-w-4xl max-w-[95vw] max-h-[90vh] md:max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl mx-4 md:mx-0">
                <div className="relative p-4 md:p-6">
                  <button
                    onClick={() => setSelectedFeatureModal(null)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 p-2 rounded-full bg-navy-100 hover:bg-navy-200 transition-colors z-10"
                  >
                    <X className="h-4 w-4 md:h-5 md:w-5 text-navy-600" />
                  </button>

                  <div className="text-center mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                      {React.createElement(detailedFeatures[selectedFeatureModal].icon, {
                        className: "h-8 w-8 md:h-12 md:w-12 text-white",
                      })}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 md:mb-4">
                      {detailedFeatures[selectedFeatureModal].title}
                    </h3>
                  </div>

                  <div className="prose prose-base md:prose-lg max-w-none">
                    <p className="text-navy-700 leading-relaxed text-base md:text-lg">
                      {detailedFeatures[selectedFeatureModal].detailedContent}
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8 text-center">
                    <Button
                      className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full md:w-auto"
                      asChild
                    >
                      <Link href="/auth/signup">
                        Get Started with {detailedFeatures[selectedFeatureModal].title}
                        <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </section>

      {/* Headline Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Our Ultimate Trading Features</h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto mb-6">
              The core tools that set ProFitz apart from every other trading platform
            </p>
            <Button
              variant="outline"
              onClick={toggleAllFeatures}
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              {allExpanded ? "Collapse All" : "Expand All"}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${allExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "AI Psychology Coach",
                description:
                  "Your Personal AI Mindset Coach: Receive real-time, personalized guidance from our advanced AI. It's like having a world-class trading psychologist by your side, 24/7, helping you conquer fear, greed, and other emotional hurdles.",
                icon: Brain,
              },
              {
                title: "Trade Builder",
                description:
                  "Build Discipline into Every Trade: Structure your trades with our guided Trade Builder, incorporating psychological checkpoints to ensure you stick to your plan and avoid impulsive decisions.",
                icon: Settings,
              },
              {
                title: "AI Trade Analysis",
                description:
                  "Transform Every Trade into a Learning Opportunity: Our AI analyzes your trades through a psychological lens, providing actionable insights to improve your decision-making and boost your profitability.",
                icon: TrendingUp,
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon
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

          <div className="grid md:grid-cols-4 gap-8">
            {t.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-royal-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-800">{step.title}</h3>
                <p className="text-navy-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">Your Trading Journey Transformation Starts Here</h2>
            <p className="text-xl text-navy-600">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-royal-blue-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-royal-blue-500 text-white">
                    Most Popular
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
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with more social proof */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.testimonialsTitle}</h2>
            <p className="text-xl text-navy-600">{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
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
            <h3 className="text-2xl font-bold text-navy-800 mb-4">The Professional's Choice for a Reason</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">Bank-Level Security</h4>
              <p className="text-sm text-navy-600">Your data is encrypted and secure</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">Real-Time Analysis</h4>
              <p className="text-sm text-navy-600">Instant psychological insights</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">Expert Community</h4>
              <p className="text-sm text-navy-600">Learn from top traders</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-royal-blue-500 mb-3" />
              <h4 className="font-semibold text-navy-800">Proven Results</h4>
              <p className="text-sm text-navy-600">Backed by trading psychology research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy-600 to-royal-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
          <Button
            size="lg"
            className="text-lg px-8 bg-white text-navy-600 hover:bg-gray-100 border-0 transform hover:scale-105 transition-all duration-200"
            asChild
          >
            <Link href="/auth/signup">
              {t.ctaButton}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className="text-xs text-gray-400">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400">{t.footerTagline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footerProduct}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    {t.footerFeatures}
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    {t.footerPricing}
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="hover:text-white transition-colors">
                    {t.footerDemo}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footerSupport}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    {t.footerHelp}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    {t.footerContact}
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    {t.footerCommunity}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footerLanguages}</h4>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`block text-left hover:text-white transition-colors ${
                      selectedLanguage === lang.code ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
