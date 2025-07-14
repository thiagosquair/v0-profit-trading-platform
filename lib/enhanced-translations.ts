// lib/enhanced-translations.ts
'use client';

import { OpenAI } from 'openai';

// Enhanced translation system that extends your existing simple-translations.ts
export interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

// In-memory cache for translations
let translationCache: TranslationCache = {};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Your existing static translations (from simple-translations.ts)
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
    
    // Stats
    activeTraders: "Active Traders",
    improvedConsistency: "Improved Consistency",
    userRating: "User Rating",
    aiSupport: "AI Support",
    
    // Features Section
    featuresTitle: "Our Ultimate Trading Features",
    featuresSubtitle: "The core tools that set ProFitz apart from every other trading platform",
    expandAll: "Expand All",
    
    // Feature Cards
    aiPsychologyCoach: "AI Psychology Coach",
    aiPsychologyCoachDesc: "Your Personal AI Mindset Coach: Receive real-time, personalized guidance from our advanced AI. It's like having a world-class trading psychologist by your side, 24/7, helping you conquer fear, greed, and other emotional hurdles.",
    
    tradeBuilder: "Trade Builder",
    tradeBuilderDesc: "Build Discipline into Every Trade: Structure your trades with our guided Trade Builder, incorporating psychological checkpoints to ensure you stick to your plan and avoid impulsive decisions.",
    
    aiTradeAnalysis: "AI Trade Analysis",
    aiTradeAnalysisDesc: "Transform Every Trade into a Learning Opportunity: Our AI analyzes your trades through a psychological lens, providing actionable insights to improve your decision-making and boost your profitability.",
    
    fundedCareerBuilder: "Funded Career Builder",
    fundedCareerBuilderDesc: "Your Path to Professional Trading: Get comprehensive guidance and tools to qualify for funded trading programs, build your track record, and launch your professional trading career with confidence.",
    
    // Pricing Section
    pricingTitle: "Your Trading Journey Transformation Starts Here",
    pricingSubtitle: "Start free, upgrade when you're ready",
    
    // Plan Names
    free: "Free",
    pro: "Pro",
    premium: "Premium",
    elite: "Elite",
    
    // Plan Descriptions
    freeDesc: "Perfect for Getting Started",
    proDesc: "For Serious Traders",
    premiumDesc: "For Professional Traders",
    eliteDesc: "For Elite Traders",
    
    // Common Features
    aiPsychologyCoachFeature: "AI Psychology Coach",
    tradeAnalyses: "Trade Analyses per month",
    progressTracking: "Progress Tracking",
    interactiveExercises: "Interactive Exercises",
    psychologyCourses: "Psychology Courses",
    reflectionJournal: "Reflection Journal",
    screenshotAnalysis: "Screenshot Analysis",
    tradeBuilder: "Trade Builder",
    behavioralPatterns: "Behavioral Patterns",
    coachingInsights: "Coaching Insights",
    fundedCareerBuilder: "Funded Career Builder",
    getStarted: "Get Started",
    
    // Feature Grid
    behavioralPatternsTitle: "Behavioral Patterns",
    behavioralPatternsDesc: "Identify and understand your recurring trading behaviors and psychological biases.",
    
    interactiveExercisesTitle: "Interactive Exercises",
    interactiveExercisesDesc: "Engage with CBT exercises, meditations, and simulations designed for traders.",
    
    marketLiveInsights: "Market Live Insights",
    marketLiveInsightsDesc: "Real-time market psychology indicators and sentiment analysis to help you make informed decisions.",
    
    screenshotAnalysisTitle: "Screenshot Analysis",
    screenshotAnalysisDesc: "Upload trading screenshots for AI-powered analysis of your decision-making and emotional state.",
    
    progressTrackingTitle: "Progress Tracking",
    progressTrackingDesc: "Monitor your psychological development with detailed metrics and performance reports.",
    
    gamification: "Gamification",
    gamificationDesc: "Earn badges and rewards as you develop better trading psychology and discipline.",
    
    psychologyCoursesTitle: "Psychology Courses",
    psychologyCoursesDesc: "Access structured learning paths covering all aspects of trading psychology.",
    
    reflectionTools: "Reflection Tools",
    reflectionToolsDesc: "Journal your trades and emotions with guided prompts for deeper self-analysis."
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
    
    // Stats
    activeTraders: "Traders Ativos",
    improvedConsistency: "Consistência Melhorada",
    userRating: "Avaliação do Usuário",
    aiSupport: "Suporte IA",
    
    // Features Section
    featuresTitle: "Nossos Recursos Definitivos de Trading",
    featuresSubtitle: "As ferramentas principais que diferenciam o ProFitz de todas as outras plataformas de trading",
    expandAll: "Expandir Tudo",
    
    // Feature Cards
    aiPsychologyCoach: "Coach de Psicologia IA",
    aiPsychologyCoachDesc: "Seu Coach Pessoal de Mentalidade IA: Receba orientação personalizada em tempo real de nossa IA avançada. É como ter um psicólogo de trading de classe mundial ao seu lado, 24/7, ajudando você a conquistar medo, ganância e outros obstáculos emocionais.",
    
    tradeBuilder: "Construtor de Trade",
    tradeBuilderDesc: "Construa Disciplina em Cada Trade: Estruture seus trades com nosso Construtor de Trade guiado, incorporando pontos de verificação psicológicos para garantir que você siga seu plano e evite decisões impulsivas.",
    
    aiTradeAnalysis: "Análise de Trade IA",
    aiTradeAnalysisDesc: "Transforme Cada Trade em uma Oportunidade de Aprendizado: Nossa IA analisa seus trades através de uma lente psicológica, fornecendo insights acionáveis para melhorar sua tomada de decisão e aumentar sua lucratividade.",
    
    fundedCareerBuilder: "Construtor de Carreira Financiada",
    fundedCareerBuilderDesc: "Seu Caminho para Trading Profissional: Obtenha orientação abrangente e ferramentas para se qualificar para programas de trading financiados, construir seu histórico e lançar sua carreira de trading profissional com confiança.",
    
    // Pricing Section
    pricingTitle: "Sua Transformação na Jornada de Trading Começa Aqui",
    pricingSubtitle: "Comece grátis, atualize quando estiver pronto",
    
    // Plan Names
    free: "Gratuito",
    pro: "Pro",
    premium: "Premium",
    elite: "Elite",
    
    // Plan Descriptions
    freeDesc: "Perfeito para Começar",
    proDesc: "Para Traders Sérios",
    premiumDesc: "Para Traders Profissionais",
    eliteDesc: "Para Traders Elite",
    
    // Common Features
    aiPsychologyCoachFeature: "Coach de Psicologia IA",
    tradeAnalyses: "Análises de Trade por mês",
    progressTracking: "Acompanhamento de Progresso",
    interactiveExercises: "Exercícios Interativos",
    psychologyCourses: "Cursos de Psicologia",
    reflectionJournal: "Diário de Reflexão",
    screenshotAnalysis: "Análise de Screenshot",
    tradeBuilder: "Construtor de Trade",
    behavioralPatterns: "Padrões Comportamentais",
    coachingInsights: "Insights de Coaching",
    fundedCareerBuilder: "Construtor de Carreira Financiada",
    getStarted: "Começar",
    
    // Feature Grid
    behavioralPatternsTitle: "Padrões Comportamentais",
    behavioralPatternsDesc: "Identifique e entenda seus comportamentos de trading recorrentes e vieses psicológicos.",
    
    interactiveExercisesTitle: "Exercícios Interativos",
    interactiveExercisesDesc: "Participe de exercícios de TCC, meditações e simulações projetadas para traders.",
    
    marketLiveInsights: "Insights de Mercado ao Vivo",
    marketLiveInsightsDesc: "Indicadores de psicologia de mercado em tempo real e análise de sentimento para ajudá-lo a tomar decisões informadas.",
    
    screenshotAnalysisTitle: "Análise de Screenshot",
    screenshotAnalysisDesc: "Carregue screenshots de trading para análise alimentada por IA de sua tomada de decisão e estado emocional.",
    
    progressTrackingTitle: "Acompanhamento de Progresso",
    progressTrackingDesc: "Monitore seu desenvolvimento psicológico com métricas detalhadas e relatórios de desempenho.",
    
    gamification: "Gamificação",
    gamificationDesc: "Ganhe distintivos e recompensas conforme desenvolve melhor psicologia de trading e disciplina.",
    
    psychologyCoursesTitle: "Cursos de Psicologia",
    psychologyCoursesDesc: "Acesse caminhos de aprendizado estruturados cobrindo todos os aspectos da psicologia de trading.",
    
    reflectionTools: "Ferramentas de Reflexão",
    reflectionToolsDesc: "Registre seus trades e emoções com prompts guiados para auto-análise mais profunda."
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
    
    // Stats
    activeTraders: "Traders Activos",
    improvedConsistency: "Consistencia Mejorada",
    userRating: "Calificación del Usuario",
    aiSupport: "Soporte IA",
    
    // Features Section
    featuresTitle: "Nuestras Características Definitivas de Trading",
    featuresSubtitle: "Las herramientas principales que distinguen a ProFitz de todas las demás plataformas de trading",
    expandAll: "Expandir Todo",
    
    // Feature Cards
    aiPsychologyCoach: "Coach de Psicología IA",
    aiPsychologyCoachDesc: "Tu Coach Personal de Mentalidad IA: Recibe orientación personalizada en tiempo real de nuestra IA avanzada. Es como tener un psicólogo de trading de clase mundial a tu lado, 24/7, ayudándote a conquistar el miedo, la codicia y otros obstáculos emocionales.",
    
    tradeBuilder: "Constructor de Operaciones",
    tradeBuilderDesc: "Construye Disciplina en Cada Operación: Estructura tus operaciones con nuestro Constructor de Operaciones guiado, incorporando puntos de control psicológicos para asegurar que sigas tu plan y evites decisiones impulsivas.",
    
    aiTradeAnalysis: "Análisis de Operaciones IA",
    aiTradeAnalysisDesc: "Transforma Cada Operación en una Oportunidad de Aprendizaje: Nuestra IA analiza tus operaciones a través de una lente psicológica, proporcionando insights accionables para mejorar tu toma de decisiones y aumentar tu rentabilidad.",
    
    fundedCareerBuilder: "Constructor de Carrera Financiada",
    fundedCareerBuilderDesc: "Tu Camino al Trading Profesional: Obtén orientación integral y herramientas para calificar para programas de trading financiados, construir tu historial y lanzar tu carrera de trading profesional con confianza.",
    
    // Pricing Section
    pricingTitle: "Tu Transformación del Viaje de Trading Comienza Aquí",
    pricingSubtitle: "Comienza gratis, actualiza cuando estés listo",
    
    // Plan Names
    free: "Gratis",
    pro: "Pro",
    premium: "Premium",
    elite: "Elite",
    
    // Plan Descriptions
    freeDesc: "Perfecto para Empezar",
    proDesc: "Para Traders Serios",
    premiumDesc: "Para Traders Profesionales",
    eliteDesc: "Para Traders Elite",
    
    // Common Features
    aiPsychologyCoachFeature: "Coach de Psicología IA",
    tradeAnalyses: "Análisis de Operaciones por mes",
    progressTracking: "Seguimiento de Progreso",
    interactiveExercises: "Ejercicios Interactivos",
    psychologyCourses: "Cursos de Psicología",
    reflectionJournal: "Diario de Reflexión",
    screenshotAnalysis: "Análisis de Captura de Pantalla",
    tradeBuilder: "Constructor de Operaciones",
    behavioralPatterns: "Patrones Conductuales",
    coachingInsights: "Insights de Coaching",
    fundedCareerBuilder: "Constructor de Carrera Financiada",
    getStarted: "Comenzar",
    
    // Feature Grid
    behavioralPatternsTitle: "Patrones Conductuales",
    behavioralPatternsDesc: "Identifica y entiende tus comportamientos de trading recurrentes y sesgos psicológicos.",
    
    interactiveExercisesTitle: "Ejercicios Interactivos",
    interactiveExercisesDesc: "Participa en ejercicios de TCC, meditaciones y simulaciones diseñadas para traders.",
    
    marketLiveInsights: "Insights de Mercado en Vivo",
    marketLiveInsightsDesc: "Indicadores de psicología de mercado en tiempo real y análisis de sentimiento para ayudarte a tomar decisiones informadas.",
    
    screenshotAnalysisTitle: "Análisis de Captura de Pantalla",
    screenshotAnalysisDesc: "Sube capturas de pantalla de trading para análisis impulsado por IA de tu toma de decisiones y estado emocional.",
    
    progressTrackingTitle: "Seguimiento de Progreso",
    progressTrackingDesc: "Monitorea tu desarrollo psicológico con métricas detalladas e informes de rendimiento.",
    
    gamification: "Gamificación",
    gamificationDesc: "Gana insignias y recompensas mientras desarrollas mejor psicología de trading y disciplina.",
    
    psychologyCoursesTitle: "Cursos de Psicología",
    psychologyCoursesDesc: "Accede a rutas de aprendizaje estructuradas que cubren todos los aspectos de la psicología de trading.",
    
    reflectionTools: "Herramientas de Reflexión",
    reflectionToolsDesc: "Registra tus operaciones y emociones con indicaciones guiadas para un auto-análisis más profundo."
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
    
    // Stats
    activeTraders: "Traders Actifs",
    improvedConsistency: "Consistance Améliorée",
    userRating: "Note Utilisateur",
    aiSupport: "Support IA",
    
    // Features Section
    featuresTitle: "Nos Fonctionnalités de Trading Ultimes",
    featuresSubtitle: "Les outils principaux qui distinguent ProFitz de toutes les autres plateformes de trading",
    expandAll: "Tout Développer",
    
    // Feature Cards
    aiPsychologyCoach: "Coach de Psychologie IA",
    aiPsychologyCoachDesc: "Votre Coach Personnel de Mentalité IA: Recevez des conseils personnalisés en temps réel de notre IA avancée. C'est comme avoir un psychologue de trading de classe mondiale à vos côtés, 24/7, vous aidant à conquérir la peur, la cupidité et autres obstacles émotionnels.",
    
    tradeBuilder: "Constructeur de Trade",
    tradeBuilderDesc: "Construisez la Discipline dans Chaque Trade: Structurez vos trades avec notre Constructeur de Trade guidé, incorporant des points de contrôle psychologiques pour vous assurer de suivre votre plan et éviter les décisions impulsives.",
    
    aiTradeAnalysis: "Analyse de Trade IA",
    aiTradeAnalysisDesc: "Transformez Chaque Trade en Opportunité d'Apprentissage: Notre IA analyse vos trades à travers une lentille psychologique, fournissant des insights actionnables pour améliorer votre prise de décision et augmenter votre rentabilité.",
    
    fundedCareerBuilder: "Constructeur de Carrière Financée",
    fundedCareerBuilderDesc: "Votre Chemin vers le Trading Professionnel: Obtenez des conseils complets et des outils pour vous qualifier pour les programmes de trading financés, construire votre historique et lancer votre carrière de trading professionnel avec confiance.",
    
    // Pricing Section
    pricingTitle: "Votre Transformation du Voyage de Trading Commence Ici",
    pricingSubtitle: "Commencez gratuitement, mettez à niveau quand vous êtes prêt",
    
    // Plan Names
    free: "Gratuit",
    pro: "Pro",
    premium: "Premium",
    elite: "Elite",
    
    // Plan Descriptions
    freeDesc: "Parfait pour Commencer",
    proDesc: "Pour les Traders Sérieux",
    premiumDesc: "Pour les Traders Professionnels",
    eliteDesc: "Pour les Traders Elite",
    
    // Common Features
    aiPsychologyCoachFeature: "Coach de Psychologie IA",
    tradeAnalyses: "Analyses de Trade par mois",
    progressTracking: "Suivi des Progrès",
    interactiveExercises: "Exercices Interactifs",
    psychologyCourses: "Cours de Psychologie",
    reflectionJournal: "Journal de Réflexion",
    screenshotAnalysis: "Analyse de Capture d'Écran",
    tradeBuilder: "Constructeur de Trade",
    behavioralPatterns: "Modèles Comportementaux",
    coachingInsights: "Insights de Coaching",
    fundedCareerBuilder: "Constructeur de Carrière Financée",
    getStarted: "Commencer",
    
    // Feature Grid
    behavioralPatternsTitle: "Modèles Comportementaux",
    behavioralPatternsDesc: "Identifiez et comprenez vos comportements de trading récurrents et biais psychologiques.",
    
    interactiveExercisesTitle: "Exercices Interactifs",
    interactiveExercisesDesc: "Participez à des exercices de TCC, méditations et simulations conçues pour les traders.",
    
    marketLiveInsights: "Insights de Marché en Direct",
    marketLiveInsightsDesc: "Indicateurs de psychologie de marché en temps réel et analyse de sentiment pour vous aider à prendre des décisions éclairées.",
    
    screenshotAnalysisTitle: "Analyse de Capture d'Écran",
    screenshotAnalysisDesc: "Téléchargez des captures d'écran de trading pour une analyse alimentée par l'IA de votre prise de décision et état émotionnel.",
    
    progressTrackingTitle: "Suivi des Progrès",
    progressTrackingDesc: "Surveillez votre développement psychologique avec des métriques détaillées et des rapports de performance.",
    
    gamification: "Gamification",
    gamificationDesc: "Gagnez des badges et récompenses en développant une meilleure psychologie de trading et discipline.",
    
    psychologyCoursesTitle: "Cours de Psychologie",
    psychologyCoursesDesc: "Accédez à des parcours d'apprentissage structurés couvrant tous les aspects de la psychologie de trading.",
    
    reflectionTools: "Outils de Réflexion",
    reflectionToolsDesc: "Journalisez vos trades et émotions avec des invites guidées pour une auto-analyse plus profonde."
  }
};

// Dynamic translation function using OpenAI
export async function translateText(
  text: string, 
  targetLang: string, 
  context?: { domain?: string; style?: string }
): Promise<string> {
  // Check cache first
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey] && translationCache[cacheKey][targetLang]) {
    return translationCache[cacheKey][targetLang];
  }

  try {
    const systemPrompt = `You are a professional translator specializing in ${context?.domain || 'trading psychology'} terminology. 
    Translate the following text to ${getLanguageName(targetLang)} while maintaining:
    - Professional trading psychology terminology
    - Marketing tone and persuasive language
    - Technical accuracy
    - Cultural appropriateness
    
    Only return the translated text, nothing else.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const translatedText = response.choices[0]?.message?.content?.trim() || text;
    
    // Cache the translation
    if (!translationCache[cacheKey]) {
      translationCache[cacheKey] = {};
    }
    translationCache[cacheKey][targetLang] = translatedText;
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback to original text if translation fails
    return text;
  }
}

// Helper function to get language name
function getLanguageName(code: string): string {
  const languages: { [key: string]: string } = {
    'en': 'English',
    'pt': 'Portuguese',
    'es': 'Spanish',
    'fr': 'French'
  };
  return languages[code] || 'English';
}

// Enhanced translation hook that combines static and dynamic translations
export function useEnhancedTranslation(locale: string = 'en') {
  const t = (key: string, fallback?: string): string => {
    // First try static translations
    const staticTranslation = staticTranslations[locale as keyof typeof staticTranslations]?.[key as keyof typeof staticTranslations.en];
    if (staticTranslation) {
      return staticTranslation;
    }
    
    // Return fallback or key if no static translation found
    return fallback || key;
  };

  const tDynamic = async (text: string, context?: { domain?: string; style?: string }): Promise<string> => {
    if (locale === 'en') return text;
    return await translateText(text, locale, context);
  };

  return { t, tDynamic };
}

export default staticTranslations;
