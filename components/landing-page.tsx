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
  Shield,
  Heart,
  Zap,
  CheckCircle,
  TrendingDown,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import { useEnhancedLanguage } from "@/hooks/use-enhanced-language"

export default function LandingPage() {
  const { currentLanguage, setLanguage, t, translateText, isLoading } = useEnhancedLanguage()
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: number]: boolean }>({})
  const [allExpanded, setAllExpanded] = useState(false)
  const [expandedBenefits, setExpandedBenefits] = useState<{ [key: number]: boolean }>({})

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const handleLanguageChange = (language: string) => {
    setLanguage(language)
  }

  // Static translations for UI elements
  const staticTranslations = {
    en: {
      title: "MaXTrades",
      subtitle: "Trading Psychology Lab",
      badge: "AI-Powered Trading Psychology",
      heroTitle: "Master Your Mindset. Master Your Trading.",
      description: "Master your trading psychology with AI-powered coaching, behavioral analysis, and interactive exercises designed to build mental resilience and better decision-making.",
      getStarted: "Start Your Journey",
      learnMore: "Watch Demo",
      signIn: "Sign In",
      footerFeatures: "Features",
      footerPricing: "Pricing",
      footerDemo: "Demo",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
    },
    pt: {
      title: "MaXTrades",
      subtitle: "Laboratório de Psicologia de Trading",
      badge: "Psicologia de Trading Alimentada por IA",
      heroTitle: "Domine Sua Mentalidade. Domine Seu Trading.",
      description: "Domine sua psicologia de trading com coaching alimentado por IA, análise comportamental e exercícios interativos projetados para construir resistência mental e melhor tomada de decisão.",
      getStarted: "Comece Sua Jornada",
      learnMore: "Assistir Demo",
      signIn: "Entrar",
      footerFeatures: "Recursos",
      footerPricing: "Preços",
      footerDemo: "Demo",
      expandAll: "Expandir Tudo",
      collapseAll: "Recolher Tudo",
    },
    es: {
      title: "MaXTrades",
      subtitle: "Laboratorio de Psicología de Trading",
      badge: "Psicología de Trading Impulsada por IA",
      heroTitle: "Domina Tu Mentalidad. Domina Tu Trading.",
      description: "Domina tu psicología de trading con coaching impulsado por IA, análisis conductual y ejercicios interactivos diseñados para construir resistencia mental y mejor toma de decisiones.",
      getStarted: "Comienza Tu Viaje",
      learnMore: "Ver Demo",
      signIn: "Iniciar Sesión",
      footerFeatures: "Características",
      footerPricing: "Precios",
      footerDemo: "Demo",
      expandAll: "Expandir Todo",
      collapseAll: "Contraer Todo",
    },
    fr: {
      title: "MaXTrades",
      subtitle: "Laboratoire de Psychologie de Trading",
      badge: "Psychologie de Trading Alimentée par l'IA",
      heroTitle: "Maîtrisez Votre Mentalité. Maîtrisez Votre Trading.",
      description: "Maîtrisez votre psychologie de trading avec un coaching alimenté par l'IA, une analyse comportementale et des exercices interactifs conçus pour construire la résilience mentale et une meilleure prise de décision.",
      getStarted: "Commencez Votre Voyage",
      learnMore: "Voir la Démo",
      signIn: "Se Connecter",
      footerFeatures: "Fonctionnalités",
      footerPricing: "Tarifs",
      footerDemo: "Démo",
      expandAll: "Tout Développer",
      collapseAll: "Tout Réduire",
    }
  }

  const currentTranslations = staticTranslations[currentLanguage as keyof typeof staticTranslations] || staticTranslations.en

  // Dynamic content that will be translated by AI
  const dynamicContent = {
    featuresTitle: "Developed for Trading Psychology Mastery and High Performance",
    featuresSubtitle: "The Ultimate Platform for Mental Edge — Combining AI-Powered Insights, Personalized Coaching, and a Deeply Immersive Environment Where You Continuously Grow, Review Past Trades with Purpose, and Build Each New Trade with Clarity and Confidence.",
    
    howItWorksTitle: "How MaXTrades Works",
    howItWorksSubtitle: "Your Path to Trading Mastery in 4 Simple Steps",
    
    benefitsTitle: "Transform Your Trading Psychology",
    benefitsSubtitle: "Unlock your full potential and achieve consistent profitability with our comprehensive trading psychology platform",
    
    pricingTitle: "Your Trading Transformation Journey Starts Here",
    pricingSubtitle: "Start free, upgrade when you're ready",
    
    testimonialsTitle: "Join the Community of Successful Traders",
    testimonialsSubtitle: "Join thousands of traders who are transforming their mindset",
    
    ctaTitle: "Ready to Unlock Your Full Trading Potential?",
    ctaSubtitle: "Join thousands of traders who have transformed their psychology and achieved consistent profitability.",
    ctaButton: "Start Your Free Trial",
  }

  const features = [
    {
      title: "AI Psychology Coach",
      description: "Your Personal Trading Psychology Mentor: Get real-time emotional coaching, behavioral pattern analysis, and personalized strategies to overcome psychological barriers and develop unshakeable trading discipline.",
    },
    {
      title: "Trade Builder",
      description: "Psychology-Focused Trade Planning: Plan every trade with psychological analysis, emotion checkpoints, and behavioral safeguards designed to help you make informed decisions.",
    },
    {
      title: "AI Trade Analysis",
      description: "Transform Every Trade into Learning Opportunity: Our AI analyzes your trades through a psychological lens, providing actionable insights to improve your decision-making and increase your profitability.",
    },
    {
      title: "Funded Career Builder",
      description: "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence.",
    },
  ]

  const detailedFeatures = [
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
      detailedContent: "Our advanced behavioral pattern analysis uses machine learning to identify recurring patterns in your trading behavior. We analyze your decision-making processes, emotional triggers and psychological biases that may be affecting your trading performance."
    },
    {
      title: "Screenshot Analysis",
      description: "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.",
      detailedContent: "Our revolutionary screenshot analysis feature uses advanced AI to analyze your trading platform screenshots and provide deep insights into your decision-making process."
    },
    {
      title: "Progress Tracking",
      description: "Monitor your psychological development with detailed metrics and performance reports.",
      detailedContent: "Track your psychological development and improvement with our comprehensive progress tracking system. This feature monitors your emotional control, discipline levels, consistency metrics, and psychological growth over time."
    },
    {
      title: "Gamification",
      description: "Earn badges and rewards as you develop better trading psychology and discipline.",
      detailedContent: "Make your psychological development engaging and motivating with our comprehensive gamification system. Earn badges for achieving milestones like 'Discipline Master' for following your trading plan for 30 days consecutive."
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
  ]

  const benefits = [
    {
      title: "Overcome Hesitation with a Well-Developed Trading Plan",
      description: "Build confidence by creating a structured, actionable trading plan tailored to your strategy and goals. Eliminate second-guessing and execute trades decisively with a clear roadmap that defines entry, exit, and risk management rules.",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Manage Emotional Decision-Making",
      description: "Learn proven techniques to recognize, control, and channel emotions while trading. Reduce impulsive reactions and cultivate a disciplined mindset that supports sound, objective decisions—even in volatile markets.",
      icon: Heart,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Stop Poor Risk Management Decisions",
      description: "Master the principles of effective risk management. Define your risk limits, position sizes, and loss mitigation strategies to protect capital and stay in the game long-term, avoiding catastrophic errors that sabotage your progress.",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Eliminate Bad Trades and Poor Decisions",
      description: "Analyze your trading behavior to identify patterns of mistakes and self-sabotage. Use guided reflection and structured feedback to break the cycle of repeated errors, helping you make consistently better trading choices.",
      icon: TrendingDown,
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Maximize Trading Opportunities with Confident Position Sizing",
      description: "Learn to size positions strategically based on your plan and risk tolerance. Optimize potential returns while managing downside risk, empowering you to take advantage of opportunities without fear or hesitation.",
      icon: Zap,
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      title: "Aim for Consistent Profitability",
      description: "Shift from sporadic wins to sustainable success. Develop the habits, processes, and psychological resilience required to deliver reliable results over time, turning disciplined trading into a consistently profitable career.",
      icon: DollarSign,
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for Getting Started",
      features: [
        "AI Psychology Coach",
        "Trader Assessment",
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
        "Trader Assessment",
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
        "Trader Assessment",
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
        "Trader Assessment",
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
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content: "MaXTrades helped me overcome my fear of taking profits. My consistency improved dramatically in just 3 months.",
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

  const toggleBenefit = (index: number) => {
    setExpandedBenefits((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/maxtradeslogo.png" alt="MaXTrades Logo" className="h-auto w-48" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {currentTranslations.footerFeatures}
            </Link>
            <Link href="#pricing" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {currentTranslations.footerPricing}
            </Link>
            <Link href="#demo" className="text-navy-700 hover:text-royal-blue-600 transition-colors">
              {currentTranslations.footerDemo}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-navy-700 hover:text-royal-blue-600"
                >
                  <Globe className="h-4 w-4" />
                  <span>{languages.find((lang) => lang.code === currentLanguage)?.flag}</span>
                  <span>{languages.find((lang) => lang.code === currentLanguage)?.name}</span>
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
              <Link href="/auth/signin">{currentTranslations.signIn}</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0"
              asChild
            >
              <Link href="/auth/signup">
                {currentTranslations.getStarted}
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
                {currentTranslations.badge}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-navy-900 leading-tight gradient-text">
                {currentTranslations.heroTitle}
              </h1>
              <p className="text-xl text-navy-600 leading-relaxed max-w-lg">
                {currentTranslations.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white border-0 px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/auth/signup">
                    {currentTranslations.getStarted}
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-navy-300 text-navy-700 hover:bg-navy-50 px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  {currentTranslations.learnMore}
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
              <div className="text-navy-600">{translateText("Active Traders")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">85%</div>
              <div className="text-navy-600">{translateText("Improved Consistency")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">4.9/5</div>
              <div className="text-navy-600">{translateText("User Rating")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-royal-blue-600 mb-2">24/7</div>
              <div className="text-navy-600">{translateText("AI Support")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4 gradient-text">
              {translateText(dynamicContent.featuresTitle)}
            </h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">
              {translateText(dynamicContent.featuresSubtitle)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detailedFeatures.map((feature, index) => {
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
                        <CardTitle className="text-xl text-navy-800">
                          {translateText(feature.title)}
                        </CardTitle>
                        <CardDescription className="text-navy-600">
                          {translateText(feature.description)}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-900">
                          {translateText(feature.title)}
                        </h3>
                      </div>
                      <p className="text-navy-600 leading-relaxed">
                        {translateText(feature.detailedContent)}
                      </p>
                      <Button
                        className="bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                        asChild
                      >
                        <Link href="/auth/signup">{currentTranslations.getStarted}</Link>
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
            <h2 className="text-4xl font-bold text-navy-900 mb-4 gradient-text">
              {translateText("Our Ultimate Trading Features")}
            </h2>
            <p className="text-xl text-navy-600">
              {translateText("The core tools that set MaXTrades apart from every other trading platform")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const icons = [Brain, Settings, TrendingUp, Award]
              const IconComponent = icons[index]
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-navy-100 p-6"
                >
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-royal-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-navy-800 mb-4">
                      {translateText(feature.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-navy-600 text-lg leading-relaxed">
                      {translateText(feature.description)}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works - IMAGE SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-8 gradient-text">
            {translateText("The Ultimate Toolkit to Accelerate Your Trading Success")}
          </h2>
          <Image
            src="/images/sec1.png"
            alt="How MaXTrades Works"
            width={1000}
            height={400}
            layout="responsive"
            objectFit="contain"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4 gradient-text">
              {translateText(dynamicContent.benefitsTitle)}
            </h2>
            <p className="text-xl text-navy-600 max-w-4xl mx-auto">
              {translateText(dynamicContent.benefitsSubtitle)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              const isExpanded = expandedBenefits[index] || false
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 overflow-hidden group"
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-navy-800 text-center leading-tight">
                      {translateText(benefit.title)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center mb-4">
                      <Button
                        variant="ghost"
                        onClick={() => toggleBenefit(index)}
                        className={`text-white w-10 h-10 p-0 rounded-full bg-gradient-to-r ${benefit.gradient} hover:opacity-90 transition-all duration-300 flex items-center justify-center`}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </Button>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gradient-to-b from-navy-500 to-royal-blue-500">
                        <div className="flex items-start mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-navy-600 leading-relaxed text-sm">
                            {translateText(benefit.description)}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Career Box Image Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-8 gradient-text">
            {translateText("Master Your Mindset, Unlock Career Growth.")}
          </h2>
          <Image
            src="/images/sec2.png"
            alt="Funded Career Builder"
            width={1000}
            height={400}
            layout="responsive"
            objectFit="contain"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4 gradient-text">
              {translateText(dynamicContent.pricingTitle)}
            </h2>
            <p className="text-xl text-navy-600">
              {translateText(dynamicContent.pricingSubtitle)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
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
                      {translateText("Most Popular")}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-navy-800 mb-4">
                    {translateText(plan.name)}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-royal-blue-600">{plan.price}</span>
                    <span className="text-navy-600 ml-2">{translateText(plan.period)}</span>
                  </div>
                  <CardDescription className="text-navy-600 text-lg">
                    {translateText(plan.description)}
                  </CardDescription>
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
                        <span className="text-sm">{translateText(feature)}</span>
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
                    <Link href="/auth/signup">{currentTranslations.getStarted}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4 gradient-text">
              {translateText(dynamicContent.testimonialsTitle)}
            </h2>
            <p className="text-xl text-navy-600">
              {translateText(dynamicContent.testimonialsSubtitle)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-navy-600 mb-6 italic">
                    "{translateText(testimonial.content)}"
                  </p>
                  <div>
                    <p className="font-bold text-navy-900">{testimonial.name}</p>
                    <p className="text-navy-600 text-sm">{translateText(testimonial.role)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/img5.png')" }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {translateText(dynamicContent.ctaTitle)}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {translateText(dynamicContent.ctaSubtitle)}
          </p>
          <Button
            size="lg"
            className="bg-white text-navy-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link href="/auth/signup">{translateText(dynamicContent.ctaButton)}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/images/maxtradeslogo.png" alt="MaXTrades Logo" className="h-8 w-auto" />
              </Link>
              <p className="text-blue-200">
                {translateText("Master your trading psychology with AI-powered coaching and behavioral analysis.")}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">{translateText("Product")}</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="#features" className="hover:text-white transition-colors">{currentTranslations.footerFeatures}</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">{currentTranslations.footerPricing}</Link></li>
                <li><Link href="#demo" className="hover:text-white transition-colors">{currentTranslations.footerDemo}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">{translateText("Company")}</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/about" className="hover:text-white transition-colors">{translateText("About")}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">{translateText("Contact")}</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">{translateText("Careers")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">{translateText("Support")}</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/help" className="hover:text-white transition-colors">{translateText("Help Center")}</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">{translateText("Privacy Policy")}</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">{translateText("Terms of Service")}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-700 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; 2024 MaXTrades. {translateText("All rights reserved.")}</p>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-royal-blue-600"></div>
              <span className="text-navy-700">{translateText("Translating content...")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

