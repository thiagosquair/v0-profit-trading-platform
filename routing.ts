import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pt", "es", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always show locale prefix to prevent redirect loops
  localePrefix: "always",
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
