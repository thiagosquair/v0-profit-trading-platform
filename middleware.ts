import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "pt", "es", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Don't use locale prefix for default locale
  localePrefix: "as-needed",
})

export const config = {
  // Match all pathnames except for
  // - API routes
  // - files with extensions (e.g. favicon.ico)
  // - files in public folder
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
