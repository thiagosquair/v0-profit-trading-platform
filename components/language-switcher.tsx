"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "pt-BR" | "es" | "fr";

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "pt-BR" as Language, name: "Português", flag: "🇧🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
];

interface LanguageSwitcherProps {
  variant?: "header" | "sidebar" | "compact";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language;
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("preferred-language", language);

    const pathParts = pathname.split("/").filter(Boolean);
    const currentLocale = pathParts[0];

    const knownLocales = ["en", "pt-BR", "es", "fr"];
    let basePath = pathname;

    if (knownLocales.includes(currentLocale)) {
      basePath = `/${pathParts.slice(1).join("/")}`;
    }

    const newPath = `/${language}${basePath || "/dashboard"}`;
    console.log("Redirecting to:", newPath);
    router.push(newPath);
  };

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  const renderMenu = () => (
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
  );

  return renderMenu();
}
