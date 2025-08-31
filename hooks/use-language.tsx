"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getCurrentLanguage, setGlobalLanguage, t, type Language } from "@/lib/simple-translations"

// Enhanced hook that properly handles re-renders when language changes
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getCurrentLanguage());

  useEffect(() => {
    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Also check for changes in localStorage (in case changed from another tab)
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem("preferred-language") as Language;
      if (savedLanguage && savedLanguage !== currentLanguage) {
        setGlobalLanguage(savedLanguage);
        setCurrentLanguage(savedLanguage);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setGlobalLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem("preferred-language", language);
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
  };

  return {
    language: currentLanguage,
    setLanguage,
    t: (key: string, fallback?: string) => t(key, fallback),
  }
}

// Keep the provider for backward compatibility but make it reactive
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Force re-render of all children when language changes
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return <>{children}</>;
}
