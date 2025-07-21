// Enhanced Language Hook with Dynamic Translation Support
'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  translationSystem, 
  getCurrentLanguage, 
  setLanguage, 
  t, 
  translateText, 
  translateBatch,
  getOpenAIContext,
  subscribeToLanguageChanges,
  type Language 
} from './advanced_translation_system';

export interface UseLanguageReturn {
  // Current language state
  language: Language;
  
  // Language management
  setLanguage: (language: Language) => void;
  
  // Static translations (UI elements)
  t: (key: string, fallback?: string) => string;
  
  // Dynamic translations (content)
  translateText: (text: string, targetLanguage?: Language) => Promise<string>;
  translateBatch: (texts: string[], targetLanguage?: Language) => Promise<string[]>;
  
  // OpenAI context for AI features
  getOpenAIContext: (userLanguage?: Language) => string;
  
  // Loading states
  isTranslating: boolean;
  
  // Utility functions
  isCurrentLanguage: (lang: Language) => boolean;
  getLanguageConfig: () => { code: Language; name: string; flag: string };
}

export function useLanguage(): UseLanguageReturn {
  const [language, setCurrentLanguage] = useState<Language>(getCurrentLanguage());
  const [isTranslating, setIsTranslating] = useState(false);

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = subscribeToLanguageChanges(() => {
      setCurrentLanguage(getCurrentLanguage());
    });

    return unsubscribe;
  }, []);

  // Enhanced setLanguage with loading state
  const handleSetLanguage = useCallback((newLanguage: Language) => {
    setIsTranslating(true);
    setLanguage(newLanguage);
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsTranslating(false);
    }, 300);
  }, []);

  // Enhanced translateText with loading state
  const handleTranslateText = useCallback(async (text: string, targetLanguage?: Language) => {
    setIsTranslating(true);
    try {
      const result = await translateText(text, targetLanguage);
      return result;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Enhanced translateBatch with loading state
  const handleTranslateBatch = useCallback(async (texts: string[], targetLanguage?: Language) => {
    setIsTranslating(true);
    try {
      const result = await translateBatch(texts, targetLanguage);
      return result;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Utility functions
  const isCurrentLanguage = useCallback((lang: Language) => language === lang, [language]);
  
  const getLanguageConfig = useCallback(() => {
    const configs = {
      'en': { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
      'pt-BR': { code: 'pt-BR' as Language, name: 'Português', flag: '🇧🇷' },
      'es': { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
      'fr': { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' }
    };
    return configs[language];
  }, [language]);

  return {
    language,
    setLanguage: handleSetLanguage,
    t,
    translateText: handleTranslateText,
    translateBatch: handleTranslateBatch,
    getOpenAIContext,
    isTranslating,
    isCurrentLanguage,
    getLanguageConfig
  };
}

// Hook for dynamic content translation
export function useDynamicTranslation() {
  const { language, translateText, translateBatch, isTranslating } = useLanguage();
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});

  // Translate single text and cache result
  const translateAndCache = useCallback(async (key: string, text: string) => {
    if (language === 'en') {
      setTranslatedContent(prev => ({ ...prev, [key]: text }));
      return text;
    }

    if (translatedContent[key]) {
      return translatedContent[key];
    }

    const translated = await translateText(text);
    setTranslatedContent(prev => ({ ...prev, [key]: translated }));
    return translated;
  }, [language, translateText, translatedContent]);

  // Clear cache when language changes
  useEffect(() => {
    setTranslatedContent({});
  }, [language]);

  return {
    translateAndCache,
    translatedContent,
    isTranslating,
    language
  };
}

// Hook for AI features with language context
export function useAIWithLanguage() {
  const { language, getOpenAIContext } = useLanguage();

  // Get system message with language context
  const getSystemMessage = useCallback((basePrompt: string) => {
    const languageContext = getOpenAIContext();
    return `${basePrompt}\n\n${languageContext}`;
  }, [getOpenAIContext]);

  // Enhanced OpenAI call with language context
  const callOpenAIWithLanguage = useCallback(async (
    messages: any[], 
    options: any = {}
  ) => {
    // Add language context to system message if not present
    const enhancedMessages = [...messages];
    if (enhancedMessages[0]?.role === 'system') {
      enhancedMessages[0].content = getSystemMessage(enhancedMessages[0].content);
    } else {
      enhancedMessages.unshift({
        role: 'system',
        content: getOpenAIContext()
      });
    }

    return enhancedMessages;
  }, [getSystemMessage, getOpenAIContext]);

  return {
    language,
    getSystemMessage,
    callOpenAIWithLanguage,
    getOpenAIContext
  };
}

// Provider component for backward compatibility
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
