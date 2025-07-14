'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Award,
  Play, 
  CheckCircle, 
  Star,
  Users,
  Shield,
  Zap,
  Target,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { t, useDynamicTranslation, getLanguageInfo, Language } from '@/lib/enhanced-translations';

export default function LandingPage() {
  const { translateDynamic, currentLanguage, setLanguage, languageConfig } = useDynamicTranslation();
  const [expandedFeatures, setExpandedFeatures] = useState<number[]>([]);
  const [translatedContent, setTranslatedContent] = useState({
    heroTitle: "Master Your Mindset. Master Your Trading.",
    heroSubtitle: "Transform your trading psychology with AI-powered coaching, behavioral analysis, and personalized strategies designed to eliminate emotional trading and maximize your potential.",
    heroButton: "Start Your Transformation",
    heroSecondaryButton: "Watch Demo",
    
    // Features section
    featuresTitle: "Our Ultimate Trading Features",
    featuresSubtitle: "Developed for Trading Psychology Mastery",
    
    // Individual feature cards
    features: [
      {
        title: "AI Psychology Coach",
        description: "Your Personal Trading Psychology Mentor: Get real-time emotional coaching, behavioral pattern analysis, and personalized strategies to overcome psychological barriers that limit your trading success."
      },
      {
        title: "Trade Builder", 
        description: "Psychology-Focused Trade Planning: Plan every trade with psychological analysis, emotional state tracking, and risk assessment tools designed to eliminate impulsive decisions and build disciplined trading habits."
      },
      {
        title: "AI Trade Analysis",
        description: "Intelligent Performance Review: Upload your trading screenshots for comprehensive AI analysis that identifies psychological patterns, emotional triggers, and provides actionable insights to improve your trading psychology."
      },
      {
        title: "Funded Career Builder",
        description: "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence."
      }
    ],

    // Pricing section
    pricingTitle: "Choose Your Plan",
    pricingSubtitle: "Start your trading psychology transformation today",
    
    // Trust indicators
    trustTitle: "Trusted by Traders Worldwide",
    trustSubtitle: "Join thousands of successful traders who have transformed their psychology",
    
    // CTA section
    ctaTitle: "Your Trading Journey Transformation Starts Here",
    ctaSubtitle: "Don't let emotions control your trades. Take control of your trading psychology today.",
    ctaButton: "Start Free Trial"
  });

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      if (currentLanguage === 'en') {
        setTranslatedContent({
          heroTitle: "Master Your Mindset. Master Your Trading.",
          heroSubtitle: "Transform your trading psychology with AI-powered coaching, behavioral analysis, and personalized strategies designed to eliminate emotional trading and maximize your potential.",
          heroButton: "Start Your Transformation",
          heroSecondaryButton: "Watch Demo",
          
          featuresTitle: "Our Ultimate Trading Features",
          featuresSubtitle: "Developed for Trading Psychology Mastery",
          
          features: [
            {
              title: "AI Psychology Coach",
              description: "Your Personal Trading Psychology Mentor: Get real-time emotional coaching, behavioral pattern analysis, and personalized strategies to overcome psychological barriers that limit your trading success."
            },
            {
              title: "Trade Builder", 
              description: "Psychology-Focused Trade Planning: Plan every trade with psychological analysis, emotional state tracking, and risk assessment tools designed to eliminate impulsive decisions and build disciplined trading habits."
            },
            {
              title: "AI Trade Analysis",
              description: "Intelligent Performance Review: Upload your trading screenshots for comprehensive AI analysis that identifies psychological patterns, emotional triggers, and provides actionable insights to improve your trading psychology."
            },
            {
              title: "Funded Career Builder",
              description: "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence."
            }
          ],

          pricingTitle: "Choose Your Plan",
          pricingSubtitle: "Start your trading psychology transformation today",
          
          trustTitle: "Trusted by Traders Worldwide",
          trustSubtitle: "Join thousands of successful traders who have transformed their psychology",
          
          ctaTitle: "Your Trading Journey Transformation Starts Here",
          ctaSubtitle: "Don't let emotions control your trades. Take control of your trading psychology today.",
          ctaButton: "Start Free Trial"
        });
        return;
      }

      try {
        const [
          heroTitle,
          heroSubtitle,
          heroButton,
          heroSecondaryButton,
          featuresTitle,
          featuresSubtitle,
          translatedFeatures,
          pricingTitle,
          pricingSubtitle,
          trustTitle,
          trustSubtitle,
          ctaTitle,
          ctaSubtitle,
          ctaButton
        ] = await Promise.all([
          translateDynamic("Master Your Mindset. Master Your Trading.", { domain: 'trading' }),
          translateDynamic("Transform your trading psychology with AI-powered coaching, behavioral analysis, and personalized strategies designed to eliminate emotional trading and maximize your potential.", { domain: 'trading' }),
          translateDynamic("Start Your Transformation"),
          translateDynamic("Watch Demo"),
          translateDynamic("Our Ultimate Trading Features", { domain: 'trading' }),
          translateDynamic("Developed for Trading Psychology Mastery", { domain: 'trading' }),
          Promise.all([
            {
              title: await translateDynamic("AI Psychology Coach", { domain: 'trading' }),
              description: await translateDynamic("Your Personal Trading Psychology Mentor: Get real-time emotional coaching, behavioral pattern analysis, and personalized strategies to overcome psychological barriers that limit your trading success.", { domain: 'trading' })
            },
            {
              title: await translateDynamic("Trade Builder", { domain: 'trading' }),
              description: await translateDynamic("Psychology-Focused Trade Planning: Plan every trade with psychological analysis, emotional state tracking, and risk assessment tools designed to eliminate impulsive decisions and build disciplined trading habits.", { domain: 'trading' })
            },
            {
              title: await translateDynamic("AI Trade Analysis", { domain: 'trading' }),
              description: await translateDynamic("Intelligent Performance Review: Upload your trading screenshots for comprehensive AI analysis that identifies psychological patterns, emotional triggers, and provides actionable insights to improve your trading psychology.", { domain: 'trading' })
            },
            {
              title: await translateDynamic("Funded Career Builder", { domain: 'trading' }),
              description: await translateDynamic("Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence.", { domain: 'trading' })
            }
          ]),
          translateDynamic("Choose Your Plan"),
          translateDynamic("Start your trading psychology transformation today", { domain: 'trading' }),
          translateDynamic("Trusted by Traders Worldwide", { domain: 'trading' }),
          translateDynamic("Join thousands of successful traders who have transformed their psychology", { domain: 'trading' }),
          translateDynamic("Your Trading Journey Transformation Starts Here", { domain: 'trading' }),
          translateDynamic("Don't let emotions control your trades. Take control of your trading psychology today.", { domain: 'trading' }),
          translateDynamic("Start Free Trial")
        ]);

        setTranslatedContent({
          heroTitle,
          heroSubtitle,
          heroButton,
          heroSecondaryButton,
          featuresTitle,
          featuresSubtitle,
          features: translatedFeatures,
          pricingTitle,
          pricingSubtitle,
          trustTitle,
          trustSubtitle,
          ctaTitle,
          ctaSubtitle,
          ctaButton
        });
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateContent();
  }, [currentLanguage, translateDynamic]);

  const toggleFeature = (index: number) => {
    setExpandedFeatures(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const features = [
    { icon: Brain, ...translatedContent.features[0] },
    { icon: TrendingUp, ...translatedContent.features[1] },
    { icon: BarChart3, ...translatedContent.features[2] },
    { icon: Award, ...translatedContent.features[3] }
  ];

  const plans = [
    {
      id: 'free',
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      description: t('pricing.free.description'),
      features: [
        'Basic psychology assessments',
        'Limited AI coaching sessions',
        'Basic progress tracking',
        'Community access'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      description: t('pricing.pro.description'),
      features: [
        'Unlimited AI coaching',
        'Advanced psychology analysis',
        'Screenshot analysis',
        'Progress tracking & insights',
        'Email support'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: t('pricing.premium.name'),
      price: t('pricing.premium.price'),
      period: t('pricing.premium.period'),
      description: t('pricing.premium.description'),
      features: [
        'Everything in Pro',
        'Trade builder with psychology focus',
        'Behavioral pattern analysis',
        'Custom coaching programs',
        'Priority support'
      ],
      popular: false
    },
    {
      id: 'elite',
      name: t('pricing.elite.name'),
      price: t('pricing.elite.price'),
      period: t('pricing.elite.period'),
      description: t('pricing.elite.description'),
      features: [
        'Everything in Premium',
        'Funded career builder',
        'One-on-one coaching calls',
        'Custom psychology programs',
        '24/7 priority support'
      ],
      popular: false
    }
  ];

  const currentLangInfo = getLanguageInfo(currentLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ProFitz</span>
          </div>
          
          {/* Language Switcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{currentLangInfo.flag}</span>
                <span>{currentLangInfo.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(languageConfig).map(([code, info]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLanguage(code as Language)}
                  className={`flex items-center gap-2 ${currentLanguage === code ? 'bg-blue-50' : ''}`}
                >
                  <span>{info.flag}</span>
                  <span>{info.name}</span>
                  {currentLanguage === code && <CheckCircle className="h-4 w-4 text-blue-600 ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  {translatedContent.heroTitle}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {translatedContent.heroSubtitle}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-6">
                    {translatedContent.heroButton}
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Play className="h-5 w-5 mr-2" />
                  {translatedContent.heroSecondaryButton}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Traders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                </div>
              </div>
            </div>
            
            {/* Hero Video */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src="/images/herovid.mp4"
                  className="w-full h-full object-cover"
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

      {/* Ultimate Trading Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translatedContent.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {translatedContent.featuresSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isExpanded = expandedFeatures.includes(index);
              
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                      isExpanded ? '' : 'line-clamp-3'
                    }`}>
                      {feature.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeature(index)}
                      className="mt-3 p-0 h-auto text-blue-600 hover:text-blue-800"
                    >
                      {isExpanded ? (
                        <>
                          Show Less <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Learn More <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translatedContent.pricingTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {translatedContent.pricingSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    {t('pricing.mostPopular')}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {plan.price}<span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {t('pricing.getStarted')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translatedContent.trustTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {translatedContent.trustSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your trading data is encrypted and never shared</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced algorithms analyze your trading psychology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">95% of users improve their trading performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {translatedContent.ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {translatedContent.ctaSubtitle}
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {translatedContent.ctaButton}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ProFitz</span>
              </div>
              <p className="text-gray-400">
                Transform your trading psychology with AI-powered coaching and analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProFitz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

