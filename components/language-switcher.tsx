"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { setGlobalLanguage, getCurrentLanguage, type Language } from "@/lib/simple-translations";

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
];

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar" | "compact";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get current language from the translation system
    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const handleLanguageChange = async (language: Language) => {
    if (language === currentLanguage) return;
    
    setIsLoading(true);
    
    try {
      // Update the global language in the translation system
      setGlobalLanguage(language);
      setCurrentLanguage(language);
      
      // Save preference to localStorage
      localStorage.setItem("preferred-language", language);
      
      // Force a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Trigger a custom event to notify all components of language change
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
      
    } catch (error) {
      console.error("Error changing language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  const renderMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center space-x-1", className)}
          disabled={isLoading}
        >
          <Globe className={cn("h-4 w-4", isLoading && "animate-spin")} />
          <span className="text-sm">{currentLang?.flag}</span>
          {variant !== "compact" && (
            <span className="hidden sm:inline-block text-xs">
              {isLoading ? "..." : currentLang?.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center space-x-2 cursor-pointer",
              currentLanguage === language.code && "bg-accent",
              isLoading && "opacity-50 pointer-events-none"
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return renderMenu();
}
