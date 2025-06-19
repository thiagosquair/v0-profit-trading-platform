import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'pt', 'es', 'fr'] as const;
export const localePrefix = 'always'; // Default

// The `pathnames` object holds pairs of internal
// and external paths for each locale.
export const pathnames = {
  '/': '/',
  '/dashboard': {
    en: '/dashboard',
    pt: '/painel',
    es: '/tablero',
    fr: '/tableau-de-bord'
  },
  '/coach': {
    en: '/coach',
    pt: '/coach',
    es: '/entrenador',
    fr: '/entraineur'
  },
  // Add more pathnames as needed
} satisfies Pathnames<typeof locales>;

export type Pathnames = typeof pathnames;
export type Locale = typeof locales[number];

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});

