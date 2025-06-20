"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { getCurrentLanguage, setGlobalLanguage, type Language } from "@/lib/simple-translations"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
]

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar"
  className?: string
}

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    setCurrentLanguage(getCurrentLanguage())
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    setGlobalLanguage(language)
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
