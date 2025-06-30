"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type Language = "en" | "pt" | "es" | "fr"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
]

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar" | "compact"
  className?: string
}

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("preferred-language", language)
    // Note: In a full implementation, you would trigger a page reload or update the app's language context
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  if (variant === "sidebar") {
    return (
      <div className={cn("border-t p-3", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-10">
              <Globe className="h-5 w-5 mr-3" />
              <span className="font-medium">{currentLang?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn("flex items-center space-x-2", currentLanguage === language.code && "bg-accent")}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={cn("flex items-center space-x-1", className)}>
            <Globe className="h-4 w-4" />
            <span className="text-sm">{currentLang?.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn("flex items-center space-x-2", currentLanguage === language.code && "bg-accent")}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("flex items-center space-x-1", className)}>
          <Globe className="h-4 w-4" />
          <span className="text-sm">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn("flex items-center space-x-2", currentLanguage === language.code && "bg-accent")}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

