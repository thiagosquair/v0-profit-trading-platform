"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown, Check } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const languages = [
  { code: "en" as const, name: "English", flag: "🇺🇸" },
  { code: "pt" as const, name: "Português", flag: "🇧🇷" },
  { code: "es" as const, name: "Español", flag: "🇪🇸" },
  { code: "fr" as const, name: "Français", flag: "🇫🇷" },
]

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar" | "compact"
}

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const currentLang = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: "en" | "pt" | "es" | "fr") => {
    console.log("Changing language to:", langCode) // Debug log
    setLanguage(langCode)
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {language === lang.code && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "sidebar") {
    return (
      <div className="px-3 py-2 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between h-10">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="flex items-center gap-1">
                  <span>{currentLang.flag}</span>
                  <span className="text-sm">{currentLang.name}</span>
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {language === lang.code && <Check className="h-4 w-4" />}
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
        <Button variant="ghost" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            <span>{currentLang.flag}</span>
            <span>{currentLang.name}</span>
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
            {language === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
