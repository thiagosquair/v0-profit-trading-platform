'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Brain, 
  Target, 
  Lightbulb, 
  FileText, 
  Award,
  ChevronDown,
  Globe,
  Star,
  TrendingUp,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Simple language management
type Language = 'en' | 'pt-BR' | 'es' | 'fr';

const LANGUAGES = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'pt-BR' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' }
];

// Complete translations for all content
const TRANSLATIONS = {
  en: {
    // Header
    'header.title': 'MaxTrades',
    'header.nav.features': 'Features',
    'header.nav.pricing': 'Pricing',
    'header.nav.about': 'About',
    'header.nav.contact': 'Contact',
    'header.nav.login': 'Login',
    'header.nav.signup': 'Get Started',

    // Hero Section
    'hero.badge': 'AI-Powered Trading Psychology',
    'hero.title': 'Master Your Trading Mind, Master Your Results',
    'hero.subtitle': 'Transform your trading performance with AI-powered psychology coaching. Build discipline, manage emotions, and develop the mindset of consistently profitable traders.',
    'hero.cta.primary': 'Start Free Assessment',
    'hero.cta.secondary': 'Watch Demo',
    'hero.trusted': 'Trusted by 10,000+ traders worldwide',

    // Stats Section
    'stats.traders': 'Active Traders',
    'stats.success': 'Success Rate',
    'stats.countries': 'Countries',
    'stats.sessions': 'Coaching Sessions',

    // Features Section
    'features.title': 'Why MaxTrades Works',
    'features.subtitle': 'Comprehensive trading psychology platform designed by professionals',
    
    'features.assessment.title': 'Psychology Assessment',
    'features.assessment.description': 'Comprehensive evaluation of your trading psychology patterns and emotional triggers',
    
    'features.coach.title': 'AI Trading Coach',
    'features.coach.description': 'Personalized coaching sessions that adapt to your specific psychological profile',
    
    'features.patterns.title': 'Pattern Recognition',
    'features.patterns.description': 'Identify and break destructive trading patterns before they impact your performance',
    
    'features.progress.title': 'Progress Tracking',
    'features.progress.description': 'Monitor your psychological development and trading improvement over time',
    
    'features.community.title': 'Trader Community',
    'features.community.description': 'Connect with like-minded traders and share experiences in a supportive environment',
    
    'features.resources.title': 'Learning Resources',
    'features.resources.description': 'Access extensive library of trading psychology courses and educational materials',

    // How It Works Section
    'howItWorks.title': 'How MaxTrades Works',
    'howItWorks.subtitle': "It's a Purpose-Built Space to Master Consistency, Shape the Right Trading Mindset to achieve Long-Term Success",
    
    'howItWorks.step1.title': 'Take Assessment',
    'howItWorks.step1.description': 'Complete our comprehensive trading psychology assessment',
    
    'howItWorks.step2.title': 'Get AI Coach',
    'howItWorks.step2.description': 'Receive your personalized AI psychology coach',
    
    'howItWorks.step3.title': 'Build Trades',
    'howItWorks.step3.description': 'Structure trades with psychological checkpoints',
    
    'howItWorks.step4.title': 'Track Progress',
    'howItWorks.step4.description': 'Monitor your psychological development and trading improvement',

    // Pricing Section
    'pricing.title': 'Choose Your Plan',
    'pricing.subtitle': 'Start free, upgrade when you\'re ready to accelerate your growth',
    
    'pricing.free.title': 'Free',
    'pricing.free.price': '$0',
    'pricing.free.period': '/month',
    'pricing.free.description': 'Perfect for getting started',
    'pricing.free.cta': 'Get Started Free',
    
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '$29',
    'pricing.pro.period': '/month',
    'pricing.pro.description': 'For serious traders',
    'pricing.pro.cta': 'Start Pro Trial',
    
    'pricing.premium.title': 'Premium',
    'pricing.premium.price': '$79',
    'pricing.premium.period': '/month',
    'pricing.premium.description': 'For professional traders',
    'pricing.premium.cta': 'Go Premium',

    // Testimonials
    'testimonials.title': 'What Traders Say',
    'testimonials.subtitle': 'Join thousands of traders who have transformed their performance',
    
    'testimonials.1.text': 'MaxTrades helped me identify my emotional triggers and develop better discipline. My win rate improved by 40% in just 3 months.',
    'testimonials.1.author': 'Sarah Chen',
    'testimonials.1.role': 'Day Trader',
    
    'testimonials.2.text': 'The AI coach is like having a personal trading psychologist. It helped me overcome my fear of taking profits.',
    'testimonials.2.author': 'Marcus Rodriguez',
    'testimonials.2.role': 'Swing Trader',
    
    'testimonials.3.text': 'Finally, a platform that addresses the mental game of trading. The psychology assessment was eye-opening.',
    'testimonials.3.author': 'David Kim',
    'testimonials.3.role': 'Professional Trader',

    // CTA Section
    'cta.title': 'Ready to Master Your Trading Psychology?',
    'cta.subtitle': 'Join thousands of traders who have transformed their performance with MaxTrades',
    'cta.button': 'Start Your Free Assessment',

    // Footer
    'footer.description': 'MaxTrades is the leading AI-powered trading psychology platform helping traders worldwide achieve consistent profitability.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.rights': '© 2024 MaxTrades. All rights reserved.'
  },
  
  'pt-BR': {
    // Header
    'header.title': 'MaxTrades',
    'header.nav.features': 'Recursos',
    'header.nav.pricing': 'Preços',
    'header.nav.about': 'Sobre',
    'header.nav.contact': 'Contato',
    'header.nav.login': 'Entrar',
    'header.nav.signup': 'Começar',

    // Hero Section
    'hero.badge': 'Psicologia de Trading com IA',
    'hero.title': 'Domine Sua Mente de Trading, Domine Seus Resultados',
    'hero.subtitle': 'Transforme sua performance de trading com coaching de psicologia alimentado por IA. Construa disciplina, gerencie emoções e desenvolva a mentalidade de traders consistentemente lucrativos.',
    'hero.cta.primary': 'Iniciar Avaliação Gratuita',
    'hero.cta.secondary': 'Assistir Demo',
    'hero.trusted': 'Confiado por mais de 10.000 traders mundialmente',

    // Stats Section
    'stats.traders': 'Traders Ativos',
    'stats.success': 'Taxa de Sucesso',
    'stats.countries': 'Países',
    'stats.sessions': 'Sessões de Coaching',

    // Features Section
    'features.title': 'Por Que MaxTrades Funciona',
    'features.subtitle': 'Plataforma abrangente de psicologia de trading projetada por profissionais',
    
    'features.assessment.title': 'Avaliação Psicológica',
    'features.assessment.description': 'Avaliação abrangente dos seus padrões de psicologia de trading e gatilhos emocionais',
    
    'features.coach.title': 'Coach de Trading IA',
    'features.coach.description': 'Sessões de coaching personalizadas que se adaptam ao seu perfil psicológico específico',
    
    'features.patterns.title': 'Reconhecimento de Padrões',
    'features.patterns.description': 'Identifique e quebre padrões de trading destrutivos antes que impactem sua performance',
    
    'features.progress.title': 'Acompanhamento de Progresso',
    'features.progress.description': 'Monitore seu desenvolvimento psicológico e melhoria de trading ao longo do tempo',
    
    'features.community.title': 'Comunidade de Traders',
    'features.community.description': 'Conecte-se com traders com mentalidade similar e compartilhe experiências em um ambiente de apoio',
    
    'features.resources.title': 'Recursos de Aprendizado',
    'features.resources.description': 'Acesse biblioteca extensa de cursos de psicologia de trading e materiais educacionais',

    // How It Works Section
    'howItWorks.title': 'Como MaxTrades Funciona',
    'howItWorks.subtitle': 'É um Espaço Construído com Propósito para Dominar Consistência, Moldar a Mentalidade de Trading Certa para alcançar Sucesso a Longo Prazo',
    
    'howItWorks.step1.title': 'Fazer Avaliação',
    'howItWorks.step1.description': 'Complete nossa avaliação abrangente de psicologia de trading',
    
    'howItWorks.step2.title': 'Obter Coach IA',
    'howItWorks.step2.description': 'Receba seu coach de psicologia IA personalizado',
    
    'howItWorks.step3.title': 'Construir Trades',
    'howItWorks.step3.description': 'Estruture trades com checkpoints psicológicos',
    
    'howItWorks.step4.title': 'Acompanhar Progresso',
    'howItWorks.step4.description': 'Monitore seu desenvolvimento psicológico e melhoria de trading',

    // Pricing Section
    'pricing.title': 'Escolha Seu Plano',
    'pricing.subtitle': 'Comece grátis, faça upgrade quando estiver pronto para acelerar seu crescimento',
    
    'pricing.free.title': 'Gratuito',
    'pricing.free.price': 'R$0',
    'pricing.free.period': '/mês',
    'pricing.free.description': 'Perfeito para começar',
    'pricing.free.cta': 'Começar Grátis',
    
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': 'R$149',
    'pricing.pro.period': '/mês',
    'pricing.pro.description': 'Para traders sérios',
    'pricing.pro.cta': 'Iniciar Teste Pro',
    
    'pricing.premium.title': 'Premium',
    'pricing.premium.price': 'R$399',
    'pricing.premium.period': '/mês',
    'pricing.premium.description': 'Para traders profissionais',
    'pricing.premium.cta': 'Ir Premium',

    // Testimonials
    'testimonials.title': 'O Que Traders Dizem',
    'testimonials.subtitle': 'Junte-se a milhares de traders que transformaram sua performance',
    
    'testimonials.1.text': 'MaxTrades me ajudou a identificar meus gatilhos emocionais e desenvolver melhor disciplina. Minha taxa de vitória melhorou 40% em apenas 3 meses.',
    'testimonials.1.author': 'Sarah Chen',
    'testimonials.1.role': 'Day Trader',
    
    'testimonials.2.text': 'O coach IA é como ter um psicólogo de trading pessoal. Me ajudou a superar meu medo de realizar lucros.',
    'testimonials.2.author': 'Marcus Rodriguez',
    'testimonials.2.role': 'Swing Trader',
    
    'testimonials.3.text': 'Finalmente, uma plataforma que aborda o jogo mental do trading. A avaliação psicológica foi reveladora.',
    'testimonials.3.author': 'David Kim',
    'testimonials.3.role': 'Trader Profissional',

    // CTA Section
    'cta.title': 'Pronto para Dominar Sua Psicologia de Trading?',
    'cta.subtitle': 'Junte-se a milhares de traders que transformaram sua performance com MaxTrades',
    'cta.button': 'Iniciar Sua Avaliação Gratuita',

    // Footer
    'footer.description': 'MaxTrades é a plataforma líder de psicologia de trading alimentada por IA ajudando traders mundialmente a alcançar lucratividade consistente.',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.support': 'Suporte',
    'footer.legal': 'Legal',
    'footer.rights': '© 2024 MaxTrades. Todos os direitos reservados.'
  },
  
  es: {
    // Header
    'header.title': 'MaxTrades',
    'header.nav.features': 'Características',
    'header.nav.pricing': 'Precios',
    'header.nav.about': 'Acerca de',
    'header.nav.contact': 'Contacto',
    'header.nav.login': 'Iniciar Sesión',
    'header.nav.signup': 'Comenzar',

    // Hero Section
    'hero.badge': 'Psicología de Trading con IA',
    'hero.title': 'Domina Tu Mente de Trading, Domina Tus Resultados',
    'hero.subtitle': 'Transforma tu rendimiento de trading con coaching de psicología impulsado por IA. Construye disciplina, gestiona emociones y desarrolla la mentalidad de traders consistentemente rentables.',
    'hero.cta.primary': 'Iniciar Evaluación Gratuita',
    'hero.cta.secondary': 'Ver Demo',
    'hero.trusted': 'Confiado por más de 10,000 traders mundialmente',

    // Stats Section
    'stats.traders': 'Traders Activos',
    'stats.success': 'Tasa de Éxito',
    'stats.countries': 'Países',
    'stats.sessions': 'Sesiones de Coaching',

    // Features Section
    'features.title': 'Por Qué MaxTrades Funciona',
    'features.subtitle': 'Plataforma integral de psicología de trading diseñada por profesionales',
    
    'features.assessment.title': 'Evaluación Psicológica',
    'features.assessment.description': 'Evaluación integral de tus patrones de psicología de trading y desencadenantes emocionales',
    
    'features.coach.title': 'Coach de Trading IA',
    'features.coach.description': 'Sesiones de coaching personalizadas que se adaptan a tu perfil psicológico específico',
    
    'features.patterns.title': 'Reconocimiento de Patrones',
    'features.patterns.description': 'Identifica y rompe patrones de trading destructivos antes de que impacten tu rendimiento',
    
    'features.progress.title': 'Seguimiento de Progreso',
    'features.progress.description': 'Monitorea tu desarrollo psicológico y mejora de trading a lo largo del tiempo',
    
    'features.community.title': 'Comunidad de Traders',
    'features.community.description': 'Conéctate con traders de mentalidad similar y comparte experiencias en un ambiente de apoyo',
    
    'features.resources.title': 'Recursos de Aprendizaje',
    'features.resources.description': 'Accede a biblioteca extensa de cursos de psicología de trading y materiales educativos',

    // How It Works Section
    'howItWorks.title': 'Cómo Funciona MaxTrades',
    'howItWorks.subtitle': 'Es un Espacio Construido con Propósito para Dominar Consistencia, Formar la Mentalidad de Trading Correcta para lograr Éxito a Largo Plazo',
    
    'howItWorks.step1.title': 'Hacer Evaluación',
    'howItWorks.step1.description': 'Completa nuestra evaluación integral de psicología de trading',
    
    'howItWorks.step2.title': 'Obtener Coach IA',
    'howItWorks.step2.description': 'Recibe tu coach de psicología IA personalizado',
    
    'howItWorks.step3.title': 'Construir Trades',
    'howItWorks.step3.description': 'Estructura trades con puntos de control psicológicos',
    
    'howItWorks.step4.title': 'Seguir Progreso',
    'howItWorks.step4.description': 'Monitorea tu desarrollo psicológico y mejora de trading',

    // Pricing Section
    'pricing.title': 'Elige Tu Plan',
    'pricing.subtitle': 'Comienza gratis, actualiza cuando estés listo para acelerar tu crecimiento',
    
    'pricing.free.title': 'Gratuito',
    'pricing.free.price': '$0',
    'pricing.free.period': '/mes',
    'pricing.free.description': 'Perfecto para comenzar',
    'pricing.free.cta': 'Comenzar Gratis',
    
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '$29',
    'pricing.pro.period': '/mes',
    'pricing.pro.description': 'Para traders serios',
    'pricing.pro.cta': 'Iniciar Prueba Pro',
    
    'pricing.premium.title': 'Premium',
    'pricing.premium.price': '$79',
    'pricing.premium.period': '/mes',
    'pricing.premium.description': 'Para traders profesionales',
    'pricing.premium.cta': 'Ir Premium',

    // Testimonials
    'testimonials.title': 'Lo Que Dicen Los Traders',
    'testimonials.subtitle': 'Únete a miles de traders que han transformado su rendimiento',
    
    'testimonials.1.text': 'MaxTrades me ayudó a identificar mis desencadenantes emocionales y desarrollar mejor disciplina. Mi tasa de ganancia mejoró 40% en solo 3 meses.',
    'testimonials.1.author': 'Sarah Chen',
    'testimonials.1.role': 'Day Trader',
    
    'testimonials.2.text': 'El coach IA es como tener un psicólogo de trading personal. Me ayudó a superar mi miedo de tomar ganancias.',
    'testimonials.2.author': 'Marcus Rodriguez',
    'testimonials.2.role': 'Swing Trader',
    
    'testimonials.3.text': 'Finalmente, una plataforma que aborda el juego mental del trading. La evaluación psicológica fue reveladora.',
    'testimonials.3.author': 'David Kim',
    'testimonials.3.role': 'Trader Profesional',

    // CTA Section
    'cta.title': '¿Listo para Dominar Tu Psicología de Trading?',
    'cta.subtitle': 'Únete a miles de traders que han transformado su rendimiento con MaxTrades',
    'cta.button': 'Iniciar Tu Evaluación Gratuita',

    // Footer
    'footer.description': 'MaxTrades es la plataforma líder de psicología de trading impulsada por IA ayudando a traders mundialmente a lograr rentabilidad consistente.',
    'footer.product': 'Producto',
    'footer.company': 'Empresa',
    'footer.support': 'Soporte',
    'footer.legal': 'Legal',
    'footer.rights': '© 2024 MaxTrades. Todos los derechos reservados.'
  },
  
  fr: {
    // Header
    'header.title': 'MaxTrades',
    'header.nav.features': 'Fonctionnalités',
    'header.nav.pricing': 'Tarifs',
    'header.nav.about': 'À propos',
    'header.nav.contact': 'Contact',
    'header.nav.login': 'Connexion',
    'header.nav.signup': 'Commencer',

    // Hero Section
    'hero.badge': 'Psychologie de Trading avec IA',
    'hero.title': 'Maîtrisez Votre Esprit de Trading, Maîtrisez Vos Résultats',
    'hero.subtitle': 'Transformez votre performance de trading avec un coaching de psychologie alimenté par IA. Construisez la discipline, gérez les émotions et développez la mentalité des traders constamment rentables.',
    'hero.cta.primary': 'Commencer Évaluation Gratuite',
    'hero.cta.secondary': 'Voir Démo',
    'hero.trusted': 'Fait confiance par plus de 10 000 traders mondialement',

    // Stats Section
    'stats.traders': 'Traders Actifs',
    'stats.success': 'Taux de Réussite',
    'stats.countries': 'Pays',
    'stats.sessions': 'Sessions de Coaching',

    // Features Section
    'features.title': 'Pourquoi MaxTrades Fonctionne',
    'features.subtitle': 'Plateforme complète de psychologie de trading conçue par des professionnels',
    
    'features.assessment.title': 'Évaluation Psychologique',
    'features.assessment.description': 'Évaluation complète de vos modèles de psychologie de trading et déclencheurs émotionnels',
    
    'features.coach.title': 'Coach de Trading IA',
    'features.coach.description': 'Sessions de coaching personnalisées qui s\'adaptent à votre profil psychologique spécifique',
    
    'features.patterns.title': 'Reconnaissance de Motifs',
    'features.patterns.description': 'Identifiez et brisez les modèles de trading destructeurs avant qu\'ils impactent votre performance',
    
    'features.progress.title': 'Suivi de Progrès',
    'features.progress.description': 'Surveillez votre développement psychologique et amélioration de trading au fil du temps',
    
    'features.community.title': 'Communauté de Traders',
    'features.community.description': 'Connectez-vous avec des traders partageant les mêmes idées et partagez des expériences dans un environnement de soutien',
    
    'features.resources.title': 'Ressources d\'Apprentissage',
    'features.resources.description': 'Accédez à une bibliothèque étendue de cours de psychologie de trading et matériaux éducatifs',

    // How It Works Section
    'howItWorks.title': 'Comment MaxTrades Fonctionne',
    'howItWorks.subtitle': 'C\'est un Espace Construit avec un Objectif pour Maîtriser la Cohérence, Façonner le Bon État d\'Esprit de Trading pour atteindre le Succès à Long Terme',
    
    'howItWorks.step1.title': 'Faire Évaluation',
    'howItWorks.step1.description': 'Complétez notre évaluation complète de psychologie de trading',
    
    'howItWorks.step2.title': 'Obtenir Coach IA',
    'howItWorks.step2.description': 'Recevez votre coach de psychologie IA personnalisé',
    
    'howItWorks.step3.title': 'Construire Trades',
    'howItWorks.step3.description': 'Structurez les trades avec des points de contrôle psychologiques',
    
    'howItWorks.step4.title': 'Suivre Progrès',
    'howItWorks.step4.description': 'Surveillez votre développement psychologique et amélioration de trading',

    // Pricing Section
    'pricing.title': 'Choisissez Votre Plan',
    'pricing.subtitle': 'Commencez gratuitement, mettez à niveau quand vous êtes prêt à accélérer votre croissance',
    
    'pricing.free.title': 'Gratuit',
    'pricing.free.price': '0€',
    'pricing.free.period': '/mois',
    'pricing.free.description': 'Parfait pour commencer',
    'pricing.free.cta': 'Commencer Gratuitement',
    
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '29€',
    'pricing.pro.period': '/mois',
    'pricing.pro.description': 'Pour les traders sérieux',
    'pricing.pro.cta': 'Commencer Essai Pro',
    
    'pricing.premium.title': 'Premium',
    'pricing.premium.price': '79€',
    'pricing.premium.period': '/mois',
    'pricing.premium.description': 'Pour les traders professionnels',
    'pricing.premium.cta': 'Aller Premium',

    // Testimonials
    'testimonials.title': 'Ce Que Disent Les Traders',
    'testimonials.subtitle': 'Rejoignez des milliers de traders qui ont transformé leur performance',
    
    'testimonials.1.text': 'MaxTrades m\'a aidé à identifier mes déclencheurs émotionnels et développer une meilleure discipline. Mon taux de gain s\'est amélioré de 40% en seulement 3 mois.',
    'testimonials.1.author': 'Sarah Chen',
    'testimonials.1.role': 'Day Trader',
    
    'testimonials.2.text': 'Le coach IA est comme avoir un psychologue de trading personnel. Il m\'a aidé à surmonter ma peur de prendre des profits.',
    'testimonials.2.author': 'Marcus Rodriguez',
    'testimonials.2.role': 'Swing Trader',
    
    'testimonials.3.text': 'Enfin, une plateforme qui aborde le jeu mental du trading. L\'évaluation psychologique était révélatrice.',
    'testimonials.3.author': 'David Kim',
    'testimonials.3.role': 'Trader Professionnel',

    // CTA Section
    'cta.title': 'Prêt à Maîtriser Votre Psychologie de Trading?',
    'cta.subtitle': 'Rejoignez des milliers de traders qui ont transformé leur performance avec MaxTrades',
    'cta.button': 'Commencer Votre Évaluation Gratuite',

    // Footer
    'footer.description': 'MaxTrades est la plateforme leader de psychologie de trading alimentée par IA aidant les traders mondialement à atteindre une rentabilité cohérente.',
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.support': 'Support',
    'footer.legal': 'Légal',
    'footer.rights': '© 2024 MaxTrades. Tous droits réservés.'
  }
};

// Simple Language Switcher Component
const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLang?.flag} {currentLang?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string, fallback?: string): string => {
    return TRANSLATIONS[currentLanguage]?.[key] || fallback || key;
  };

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  };

  // Load saved language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      if (savedLanguage && LANGUAGES.find(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                {t('header.title')}
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.nav.features')}
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.nav.pricing')}
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.nav.about')}
                </Link>
                <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('header.nav.contact')}
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t('header.nav.login')}
              </Link>
              <Button asChild>
                <Link href="/auth/signup">{t('header.nav.signup')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            <Brain className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/signup">
                <Target className="w-5 h-5 mr-2" />
                {t('hero.cta.primary')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">
                <Play className="w-5 h-5 mr-2" />
                {t('hero.cta.secondary')}
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            <Shield className="w-4 h-4 inline mr-2" />
            {t('hero.trusted')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">{t('stats.traders')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">{t('stats.success')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">{t('stats.countries')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">100K+</div>
              <div className="text-gray-600">{t('stats.sessions')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('features.assessment.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.assessment.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t('features.coach.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.coach.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{t('features.patterns.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.patterns.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>{t('features.progress.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.progress.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>{t('features.community.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.community.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>{t('features.resources.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('features.resources.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Target className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('howItWorks.step1.title')}
              </h3>
              <p className="text-gray-600">
                {t('howItWorks.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Brain className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('howItWorks.step2.title')}
              </h3>
              <p className="text-gray-600">
                {t('howItWorks.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Lightbulb className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('howItWorks.step3.title')}
              </h3>
              <p className="text-gray-600">
                {t('howItWorks.step3.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <TrendingUp className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('howItWorks.step4.title')}
              </h3>
              <p className="text-gray-600">
                {t('howItWorks.step4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('pricing.free.title')}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-4">
                  {t('pricing.free.price')}
                  <span className="text-lg font-normal text-gray-600">{t('pricing.free.period')}</span>
                </div>
                <CardDescription>{t('pricing.free.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/auth/signup">{t('pricing.free.cta')}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('pricing.pro.title')}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-4">
                  {t('pricing.pro.price')}
                  <span className="text-lg font-normal text-gray-600">{t('pricing.pro.period')}</span>
                </div>
                <CardDescription>{t('pricing.pro.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/auth/signup">{t('pricing.pro.cta')}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('pricing.premium.title')}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-4">
                  {t('pricing.premium.price')}
                  <span className="text-lg font-normal text-gray-600">{t('pricing.premium.period')}</span>
                </div>
                <CardDescription>{t('pricing.premium.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/auth/signup">{t('pricing.premium.cta')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{t('testimonials.1.text')}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{t('testimonials.1.author')}</div>
                  <div className="text-sm text-gray-500">{t('testimonials.1.role')}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{t('testimonials.2.text')}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{t('testimonials.2.author')}</div>
                  <div className="text-sm text-gray-500">{t('testimonials.2.role')}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{t('testimonials.3.text')}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{t('testimonials.3.author')}</div>
                  <div className="text-sm text-gray-500">{t('testimonials.3.role')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link href="/auth/signup">
              <Target className="w-5 h-5 mr-2" />
              {t('cta.button')}
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">MaxTrades</div>
              <p className="text-gray-400 mb-4">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

