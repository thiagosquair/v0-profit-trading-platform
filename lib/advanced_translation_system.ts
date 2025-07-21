// Advanced Dynamic Translation System
// Core engine with OpenAI integration, caching, and hybrid translation

'use client';

import { openai } from '@/lib/openai';

export type Language = 'en' | 'pt-BR' | 'es' | 'fr';

export interface TranslationCache {
  [key: string]: {
    [lang in Language]?: string;
  };
}

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  openaiCode: string;
  tradingContext: string;
}

// Language configurations with trading psychology context
export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    openaiCode: 'en',
    tradingContext: 'trading psychology and financial markets'
  },
  {
    code: 'pt-BR',
    name: 'Português',
    flag: '🇧🇷',
    openaiCode: 'pt-BR',
    tradingContext: 'psicologia do trading e mercados financeiros'
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    openaiCode: 'es',
    tradingContext: 'psicología del trading y mercados financieros'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    openaiCode: 'fr',
    tradingContext: 'psychologie du trading et marchés financiers'
  }
];

// Static UI translations (for performance)
export const STATIC_TRANSLATIONS = {
  en: {
    // Dashboard Navigation
    'nav.overview': 'Overview',
    'nav.aiCoach': 'AI Coach',
    'nav.assessment': 'Trader Assessment',
    'nav.analysis': 'Screenshot Analysis',
    'nav.tradeBuilder': 'Trade Builder',
    'nav.exercises': 'Interactive Exercises',
    'nav.patterns': 'Behavioral Patterns',
    'nav.courses': 'Psychology Courses',
    'nav.journal': 'Reflection Journal',
    'nav.insights': 'Coaching Insights',
    'nav.careerBuilder': 'Funded Career Builder',
    'nav.progress': 'Progress Tracking',
    
    // Common UI Elements
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Assessment
    'assessment.title': 'Trading Psychology Assessment',
    'assessment.subtitle': 'Discover your trading psychology profile',
    'assessment.startButton': 'Start Assessment',
    'assessment.question': 'Question',
    'assessment.of': 'of',
    'assessment.complete': 'Assessment Complete',
    'assessment.results': 'Your Results',
    
    // Language Switcher
    'language.switch': 'Switch Language',
    'language.current': 'Current Language',
    
    // Dashboard
    'dashboard.title': 'MaxTrades Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.newFeature': 'NEW',
    'dashboard.premiumFeature': 'PREMIUM',
    
    // Trading Psychology Terms
    'trading.psychology': 'Trading Psychology',
    'trading.mindset': 'Trading Mindset',
    'trading.discipline': 'Trading Discipline',
    'trading.emotions': 'Trading Emotions',
    'trading.risk': 'Risk Management',
    'trading.analysis': 'Market Analysis',
    'trading.strategy': 'Trading Strategy',
    'trading.performance': 'Trading Performance'
  },
  'pt-BR': {
    // Dashboard Navigation
    'nav.overview': 'Visão Geral',
    'nav.aiCoach': 'Coach IA',
    'nav.assessment': 'Avaliação do Trader',
    'nav.analysis': 'Análise de Screenshot',
    'nav.tradeBuilder': 'Construtor de Trades',
    'nav.exercises': 'Exercícios Interativos',
    'nav.patterns': 'Padrões Comportamentais',
    'nav.courses': 'Cursos de Psicologia',
    'nav.journal': 'Diário de Reflexão',
    'nav.insights': 'Insights de Coaching',
    'nav.careerBuilder': 'Construtor de Carreira Financiada',
    'nav.progress': 'Acompanhamento de Progresso',
    
    // Common UI Elements
    'common.loading': 'Carregando...',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.close': 'Fechar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sim',
    'common.no': 'Não',
    
    // Assessment
    'assessment.title': 'Avaliação de Psicologia do Trading',
    'assessment.subtitle': 'Descubra seu perfil de psicologia do trading',
    'assessment.startButton': 'Iniciar Avaliação',
    'assessment.question': 'Pergunta',
    'assessment.of': 'de',
    'assessment.complete': 'Avaliação Completa',
    'assessment.results': 'Seus Resultados',
    
    // Language Switcher
    'language.switch': 'Alterar Idioma',
    'language.current': 'Idioma Atual',
    
    // Dashboard
    'dashboard.title': 'Painel MaxTrades',
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.newFeature': 'NOVO',
    'dashboard.premiumFeature': 'PREMIUM',
    
    // Trading Psychology Terms
    'trading.psychology': 'Psicologia do Trading',
    'trading.mindset': 'Mentalidade de Trading',
    'trading.discipline': 'Disciplina de Trading',
    'trading.emotions': 'Emoções do Trading',
    'trading.risk': 'Gestão de Risco',
    'trading.analysis': 'Análise de Mercado',
    'trading.strategy': 'Estratégia de Trading',
    'trading.performance': 'Performance de Trading'
  },
  es: {
    // Dashboard Navigation
    'nav.overview': 'Resumen',
    'nav.aiCoach': 'Coach IA',
    'nav.assessment': 'Evaluación del Trader',
    'nav.analysis': 'Análisis de Captura',
    'nav.tradeBuilder': 'Constructor de Trades',
    'nav.exercises': 'Ejercicios Interactivos',
    'nav.patterns': 'Patrones Conductuales',
    'nav.courses': 'Cursos de Psicología',
    'nav.journal': 'Diario de Reflexión',
    'nav.insights': 'Insights de Coaching',
    'nav.careerBuilder': 'Constructor de Carrera Financiada',
    'nav.progress': 'Seguimiento de Progreso',
    
    // Common UI Elements
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.close': 'Cerrar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sí',
    'common.no': 'No',
    
    // Assessment
    'assessment.title': 'Evaluación de Psicología del Trading',
    'assessment.subtitle': 'Descubre tu perfil de psicología del trading',
    'assessment.startButton': 'Iniciar Evaluación',
    'assessment.question': 'Pregunta',
    'assessment.of': 'de',
    'assessment.complete': 'Evaluación Completa',
    'assessment.results': 'Tus Resultados',
    
    // Language Switcher
    'language.switch': 'Cambiar Idioma',
    'language.current': 'Idioma Actual',
    
    // Dashboard
    'dashboard.title': 'Panel MaxTrades',
    'dashboard.welcome': 'Bienvenido de vuelta',
    'dashboard.newFeature': 'NUEVO',
    'dashboard.premiumFeature': 'PREMIUM',
    
    // Trading Psychology Terms
    'trading.psychology': 'Psicología del Trading',
    'trading.mindset': 'Mentalidad de Trading',
    'trading.discipline': 'Disciplina de Trading',
    'trading.emotions': 'Emociones del Trading',
    'trading.risk': 'Gestión de Riesgo',
    'trading.analysis': 'Análisis de Mercado',
    'trading.strategy': 'Estrategia de Trading',
    'trading.performance': 'Rendimiento de Trading'
  },
  fr: {
    // Dashboard Navigation
    'nav.overview': 'Aperçu',
    'nav.aiCoach': 'Coach IA',
    'nav.assessment': 'Évaluation du Trader',
    'nav.analysis': 'Analyse de Capture',
    'nav.tradeBuilder': 'Constructeur de Trades',
    'nav.exercises': 'Exercices Interactifs',
    'nav.patterns': 'Modèles Comportementaux',
    'nav.courses': 'Cours de Psychologie',
    'nav.journal': 'Journal de Réflexion',
    'nav.insights': 'Insights de Coaching',
    'nav.careerBuilder': 'Constructeur de Carrière Financée',
    'nav.progress': 'Suivi des Progrès',
    
    // Common UI Elements
    'common.loading': 'Chargement...',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.continue': 'Continuer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Soumettre',
    'common.close': 'Fermer',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    
    // Assessment
    'assessment.title': 'Évaluation de Psychologie du Trading',
    'assessment.subtitle': 'Découvrez votre profil de psychologie du trading',
    'assessment.startButton': 'Commencer l\'Évaluation',
    'assessment.question': 'Question',
    'assessment.of': 'de',
    'assessment.complete': 'Évaluation Terminée',
    'assessment.results': 'Vos Résultats',
    
    // Language Switcher
    'language.switch': 'Changer de Langue',
    'language.current': 'Langue Actuelle',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord MaxTrades',
    'dashboard.welcome': 'Bon retour',
    'dashboard.newFeature': 'NOUVEAU',
    'dashboard.premiumFeature': 'PREMIUM',
    
    // Trading Psychology Terms
    'trading.psychology': 'Psychologie du Trading',
    'trading.mindset': 'Mentalité de Trading',
    'trading.discipline': 'Discipline de Trading',
    'trading.emotions': 'Émotions du Trading',
    'trading.risk': 'Gestion des Risques',
    'trading.analysis': 'Analyse de Marché',
    'trading.strategy': 'Stratégie de Trading',
    'trading.performance': 'Performance de Trading'
  }
};

class AdvancedTranslationSystem {
  private currentLanguage: Language = 'en';
  private cache: TranslationCache = {};
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    if (this.isInitialized) return;
    
    // Load saved language
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && LANGUAGES.find(lang => lang.code === savedLanguage)) {
      this.currentLanguage = savedLanguage;
    }

    // Load cached translations
    const cachedTranslations = localStorage.getItem('translation-cache');
    if (cachedTranslations) {
      try {
        this.cache = JSON.parse(cachedTranslations);
      } catch (error) {
        console.warn('Failed to load translation cache:', error);
      }
    }

    this.isInitialized = true;
  }

  // Get current language
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  // Set language and notify listeners
  setLanguage(language: Language) {
    if (this.currentLanguage === language) return;
    
    this.currentLanguage = language;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
    
    // Notify all listeners
    this.listeners.forEach(listener => listener());
  }

  // Subscribe to language changes
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Static translation (for UI elements)
  t(key: string, fallback?: string): string {
    const translations = STATIC_TRANSLATIONS[this.currentLanguage];
    return translations?.[key] || fallback || key;
  }

  // Dynamic translation using OpenAI
  async translateText(text: string, targetLanguage?: Language): Promise<string> {
    const target = targetLanguage || this.currentLanguage;
    
    // Return original if English
    if (target === 'en') return text;

    // Check cache first
    const cacheKey = this.getCacheKey(text);
    if (this.cache[cacheKey]?.[target]) {
      return this.cache[cacheKey][target]!;
    }

    try {
      const targetConfig = LANGUAGES.find(lang => lang.code === target);
      if (!targetConfig) throw new Error(`Unsupported language: ${target}`);

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator specializing in ${targetConfig.tradingContext}. 
            Translate the following English text to ${targetConfig.name} (${targetConfig.openaiCode}).
            
            Guidelines:
            - Maintain professional trading and psychology terminology
            - Keep the same tone and style
            - Preserve any technical terms appropriately
            - Return ONLY the translation, no explanations
            - If the text contains trading psychology concepts, use appropriate professional terminology`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const translation = response.choices[0]?.message?.content?.trim() || text;

      // Cache the translation
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {};
      }
      this.cache[cacheKey][target] = translation;

      // Save cache to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('translation-cache', JSON.stringify(this.cache));
      }

      return translation;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Fallback to original text
    }
  }

  // Batch translate multiple texts
  async translateBatch(texts: string[], targetLanguage?: Language): Promise<string[]> {
    const target = targetLanguage || this.currentLanguage;
    
    if (target === 'en') return texts;

    const translations = await Promise.all(
      texts.map(text => this.translateText(text, target))
    );

    return translations;
  }

  // Get OpenAI context for AI features
  getOpenAIContext(userLanguage?: Language): string {
    const language = userLanguage || this.currentLanguage;
    const config = LANGUAGES.find(lang => lang.code === language);
    
    if (language === 'en') {
      return 'Respond in English with professional trading psychology terminology.';
    }

    return `Respond in ${config?.name} (${config?.openaiCode}) with professional trading psychology terminology. 
    Use appropriate ${config?.tradingContext} vocabulary and maintain a professional, coaching tone.`;
  }

  // Clear translation cache
  clearCache() {
    this.cache = {};
    if (typeof window !== 'undefined') {
      localStorage.removeItem('translation-cache');
    }
  }

  // Get cache statistics
  getCacheStats() {
    const totalEntries = Object.keys(this.cache).length;
    const totalTranslations = Object.values(this.cache).reduce(
      (sum, entry) => sum + Object.keys(entry).length, 0
    );
    
    return { totalEntries, totalTranslations };
  }

  private getCacheKey(text: string): string {
    // Create a simple hash for the cache key
    return btoa(text.substring(0, 100)).replace(/[^a-zA-Z0-9]/g, '');
  }
}

// Global instance
export const translationSystem = new AdvancedTranslationSystem();

// Export convenience functions
export const getCurrentLanguage = () => translationSystem.getCurrentLanguage();
export const setLanguage = (language: Language) => translationSystem.setLanguage(language);
export const t = (key: string, fallback?: string) => translationSystem.t(key, fallback);
export const translateText = (text: string, targetLanguage?: Language) => 
  translationSystem.translateText(text, targetLanguage);
export const translateBatch = (texts: string[], targetLanguage?: Language) => 
  translationSystem.translateBatch(texts, targetLanguage);
export const getOpenAIContext = (userLanguage?: Language) => 
  translationSystem.getOpenAIContext(userLanguage);
export const subscribeToLanguageChanges = (listener: () => void) => 
  translationSystem.subscribe(listener);
