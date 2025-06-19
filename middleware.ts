// Temporarily disabled to fix redirect loop
// import createMiddleware from "next-intl/middleware"

// export default createMiddleware({
//   locales: ["en", "pt", "es", "fr"],
//   defaultLocale: "en",
//   localePrefix: "always",
// })

// export const config = {
//   matcher: [
//     "/((?!api|_next|_vercel|.*\\..*).*)",
//   ],
// }

// Temporary: No middleware to avoid redirect loops
export function middleware() {
  // Do nothing for now
}

export const config = {
  matcher: [],
}
