import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pt", "es", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Use locale prefix only when needed
  localePrefix: "as-needed",
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
