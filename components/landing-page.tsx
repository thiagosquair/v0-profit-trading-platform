"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const content = {
    en: {
      title: "ProFitz",
      subtitle: "Psychology Lab",
      description:
        "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
      getStarted: "Start Your Journey",
      learnMore: "Watch Demo",
      signIn: "Sign In",
      badge: "AI-Powered Trading Psychology",
      heroTitle: "Transform Your Trading Mindset",
      featuresTitle: "Everything You Need to Master Trading Psychology",
      featuresSubtitle: "Our comprehensive platform combines cutting-edge AI with proven psychological techniques",
      howItWorksTitle: "How ProFitz Works",
      howItWorksSubtitle: "A simple 4-step process to transform your trading psychology",
      testimonialsTitle: "What Traders Say About ProFitz",
      testimonialsSubtitle: "Join thousands of traders who have transformed their mindset",
      ctaTitle: "Ready to Master Your Trading Psychology?",
      ctaSubtitle: "Join ProFitz today and start your journey toward consistent, disciplined trading.",
      ctaButton: "Start Free Trial",
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
      footerCopyright: "© 2024 ProFitz. All rights reserved.",
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
          title: "AI Trade Analysis",
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
        "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
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
            "Realiza nuestro perfil integral de personalidad de trader para entender tu línea base psicológica.",
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
          description: "Identifiez et comprenez vos comportements récurrents de trading et biais psychologiques.",
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
          title: "Analyse de Capture",
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
            "Gagnez des badges et récompenses en développant une meilleure psychologie et discipline de trading.",
        },
        {
          title: "Cours de Psychologie",
          description:
            "Accédez à des parcours d'apprentissage structurés couvrant tous les aspects de la psychologie de trading.",
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
            "Passez notre profil complet de personnalité de trader pour comprendre votre base psychologique.",
        },
        {
          title: "Obtenez du Coaching IA",
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
            "Surveillez votre développement psychologique avec des analyses détaillées et célébrez les étapes importantes.",
        },
      ],
    },
  }

  // pick the current language pack (fallback to English)
  const t = content[selectedLanguage as keyof typeof content] ?? content.en

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content:
        "ProFitz helped me identify my emotional triggers and develop better discipline. My consistency improved dramatically.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Swing Trader",
      content: "The AI coach feels like having a personal trading psychologist. The insights are incredibly accurate.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Options Trader",
      content: "The screenshot analysis feature is game-changing. It shows me patterns I never noticed before.",
      rating: 5,
    },
  ]

  const featureIcons = [
    Brain,
    BarChart3,
    Target,
    TrendingUp,
    Settings,
    Activity,
    Camera,
    TrendingUp,
    Award,
    BookOpen,
    MessageSquare,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-navy-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-royal-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-navy-800 to-royal-blue-600 bg-clip-text text-transparent">
              {t.title}
            </span>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-navy-100 to-royal-blue-100 text-navy-700 border-navy-200"
            >
              {t.subtitle}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-navy-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none text-navy-700"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <Button variant="ghost" className="text-navy-600 hover:text-navy-800 hover:bg-navy-50" asChild>
              <Link href="/auth/signin">{t.signIn}</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0"
              asChild
            >
              <Link href="/auth/signup">{t.getStarted}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge
            className="mb-4 bg-gradient-to-r from-navy-100 to-royal-blue-100 text-navy-700 border-navy-200"
            variant="outline"
          >
            {t.badge}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
            {t.heroTitle.split(" ").slice(0, 2).join(" ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-600 via-royal-blue-500 to-blue-500">
              {" "}
              {t.heroTitle.split(" ").slice(2).join(" ")}
            </span>
          </h1>
          <p className="text-xl text-navy-600 mb-8 max-w-3xl mx-auto">{t.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0"
              asChild
            >
              <Link href="/auth/signup">
                {t.getStarted}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-navy-300 text-navy-700 hover:bg-navy-50">
              {t.learnMore}
            </Button>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {t.features.map((feature, index) => {
              const IconComponent = featureIcons[index]
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-navy-100"
                >
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-royal-blue-500 mb-4" />
                    <CardTitle className="text-lg text-navy-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-navy-600">{feature.description}</CardDescription>
                  </CardContent>
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

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">{t.testimonialsTitle}</h2>
            <p className="text-xl text-navy-600">{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 border-navy-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-navy-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-navy-800">{testimonial.name}</p>
                    <p className="text-sm text-navy-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy-800 via-royal-blue-600 to-navy-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 bg-white text-navy-800 hover:bg-navy-50"
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
      <footer className="bg-navy-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-royal-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-royal-blue-200 bg-clip-text text-transparent">
                  ProFitz
                </span>
              </div>
              <p className="text-navy-300">{t.footerTagline}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-royal-blue-200">{t.footerProduct}</h3>
              <ul className="space-y-2 text-navy-300">
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerFeatures}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerPricing}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerDemo}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-royal-blue-200">{t.footerSupport}</h3>
              <ul className="space-y-2 text-navy-300">
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerHelp}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerContact}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-royal-blue-200 transition-colors">
                    {t.footerCommunity}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-royal-blue-200">{t.footerLanguages}</h3>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`text-left text-sm p-2 rounded hover:bg-navy-800 transition-colors ${
                      selectedLanguage === lang.code ? "bg-navy-800 text-royal-blue-200" : "text-navy-300"
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-8 pt-8 text-center text-navy-400">
            <p>{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
