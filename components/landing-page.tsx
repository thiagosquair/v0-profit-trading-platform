"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Play,
  Shield,
  Zap,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"

interface ExpandableFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  isExpanded: boolean
  onToggle: () => void
}

function ExpandableFeatureCard({ icon, title, description, isExpanded, onToggle }: ExpandableFeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardContent>
      )}
    </Card>
  )
}

export function LandingPage() {
  const { t } = useLanguage()
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set())

  const toggleFeature = (featureKey: string) => {
    const newExpanded = new Set(expandedFeatures)
    if (newExpanded.has(featureKey)) {
      newExpanded.delete(featureKey)
    } else {
      newExpanded.add(featureKey)
    }
    setExpandedFeatures(newExpanded)
  }

  const toggleAllFeatures = () => {
    if (expandedFeatures.size === features.length) {
      setExpandedFeatures(new Set())
    } else {
      setExpandedFeatures(new Set(features.map((f) => f.key)))
    }
  }

  const features = [
    {
      key: "behavioralPatterns",
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      title: "Behavioral Pattern Analysis",
      description: "Identify and understand your unique trading behavior patterns to improve decision-making.",
    },
    {
      key: "interactiveExercises",
      icon: <Target className="h-5 w-5 text-blue-600" />,
      title: "Interactive Trading Exercises",
      description:
        "Engage in practical exercises that simulate real-world trading scenarios to build mental resilience.",
    },
    {
      key: "marketInsights",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      title: "Personalized Market Insights",
      description:
        "Receive tailored market analysis and insights based on your trading style and psychological profile.",
    },
    {
      key: "screenshotAnalysis",
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      title: "Screenshot Analysis",
      description: "Analyze screenshots of your trades to identify emotional biases and improve future performance.",
    },
    {
      key: "progressTracking",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      title: "Progress Tracking",
      description: "Monitor your psychological progress over time with detailed reports and visualizations.",
    },
    {
      key: "gamification",
      icon: <Award className="h-5 w-5 text-blue-600" />,
      title: "Gamified Challenges",
      description: "Participate in fun challenges and earn rewards as you improve your trading psychology.",
    },
    {
      key: "psychologyCourses",
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      title: "Psychology Courses",
      description: "Access a library of courses designed to help you master your trading mindset.",
    },
    {
      key: "reflectionTools",
      icon: <Target className="h-5 w-5 text-blue-600" />,
      title: "Reflection Tools",
      description:
        "Use journaling prompts and other tools to reflect on your trading experiences and identify areas for improvement.",
    },
  ]

  const headlineFeatures = [
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      title: "AI-Powered Coaching",
      description: "Receive personalized guidance from an AI coach that understands your trading psychology.",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      title: "Trade Builder",
      description: "Simulate trades in a risk-free environment to test your strategies and build confidence.",
      gradient: "from-green-600 to-blue-600",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "AI Analysis",
      description: "Get instant feedback on your trades with AI-powered analysis.",
      gradient: "from-purple-600 to-pink-600",
    },
  ]

  const steps = [
    {
      number: "01",
      title: t("landing.step.assessment.title"),
      description: t("landing.step.assessment.description"),
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
    },
    {
      number: "02",
      title: t("landing.step.coaching.title"),
      description: t("landing.step.coaching.description"),
      icon: <Brain className="h-6 w-6 text-blue-600" />,
    },
    {
      number: "03",
      title: t("landing.step.practice.title"),
      description: t("landing.step.practice.description"),
      icon: <Target className="h-6 w-6 text-blue-600" />,
    },
    {
      number: "04",
      title: t("landing.step.track.title"),
      description: t("landing.step.track.description"),
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    },
  ]

  const stats = [
    { value: "10,000+", label: t("landing.stat.activeTraders") },
    { value: "85%", label: t("landing.stat.improvedConsistency") },
    { value: "4.9/5", label: t("landing.stat.userRating") },
    { value: "24/7", label: t("landing.stat.aiSupport") },
  ]

  const trustIndicators = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: t("landing.trust.securePlatform.title"),
      description: t("landing.trust.securePlatform.description"),
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: t("landing.trust.realTimeAnalysis.title"),
      description: t("landing.trust.realTimeAnalysis.description"),
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: t("landing.trust.communitySupport.title"),
      description: t("landing.trust.communitySupport.description"),
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: t("landing.trust.provenResults.title"),
      description: t("landing.trust.provenResults.description"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ProFitz</h1>
                <p className="text-xs text-gray-600">Trading Psychology Lab</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200"
              >
                AI-Powered Trading Psychology
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Your Trading Mindset
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("landing.heroDescription")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {t("landing.getStarted")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2">
                  <Play className="mr-2 h-5 w-5" />
                  {t("landing.watchDemo")}
                </Button>
              </div>
            </div>

            {/* Right Video */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                <video className="w-full h-auto rounded-xl" autoPlay loop muted playsInline>
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2814%29-JZOHGFprjAYiSZZUU6CaIo1E6iQENu.mp4"
                    type="video/mp4"
                  />
                  <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center">
                    <Play className="h-16 w-16 text-blue-600" />
                  </div>
                </video>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headline Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unlock your trading potential with our AI-powered tools and personalized insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {headlineFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-20 bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore Our Features</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore the features that make our platform the ultimate tool for mastering your trading psychology.
            </p>
            <Button onClick={toggleAllFeatures} variant="outline" className="mb-8">
              {expandedFeatures.size === features.length ? "Collapse All" : "Expand All"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <ExpandableFeatureCard
                key={feature.key}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isExpanded={expandedFeatures.has(feature.key)}
                onToggle={() => toggleFeature(feature.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("landing.howItWorksTitle")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple four-step process to improve your trading psychology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  <div className="flex justify-center">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("landing.trust.title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{indicator.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{indicator.title}</h3>
                <p className="text-sm text-gray-600">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("landing.demo.title")}</h2>
          <p className="text-xl text-blue-100 mb-8">
            See how our platform can help you master your trading psychology.
          </p>
          <div className="bg-gray-800 rounded-lg p-8 aspect-video flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-400">Watch a Demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("landing.ctaTitle")}</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Start your journey to a more disciplined and profitable trading mindset today.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t("landing.title")}</h3>
                  <p className="text-xs text-gray-400">{t("landing.subtitle")} </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Your AI-Powered Trading Psychology Coach</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Languages</h4>
              <div className="text-sm text-gray-400">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          <div className="text-center text-sm text-gray-400">
            <p>Copyright © 2024 ProFitz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
