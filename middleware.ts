// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt-BR', 'es', 'fr'], // match your /messages/ folder
  defaultLocale: 'en',
  localePrefix: 'always', // ensures /en/ or /pt-BR/ is always in the URL
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)', // exclude API, assets, files
  ],
};
