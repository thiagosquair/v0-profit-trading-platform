import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "pt", "es", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always show locale in URL to avoid redirect loops
  localePrefix: "always",
})

export const config = {
  // Match only internationalized pathnames, exclude API routes and static files
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - files with extensions (e.g. favicon.ico)
    // - files in public folder
    // - Next.js internals
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
