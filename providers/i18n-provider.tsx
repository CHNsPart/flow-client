// /providers/i18n-provider.tsx
'use client'

import { PropsWithChildren, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings'
import { useParams, usePathname } from 'next/navigation'

// Import translation files
import enCommon from '@/public/locales/en/en.json'
import frCommon from '@/public/locales/fr/fr.json'
import esCommon from '@/public/locales/es/es.json'

// Initialize i18n here to avoid the Promise issue
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        flowConfig: enCommon.common.flowConfig || {},
      },
      fr: {
        common: frCommon,
        flowConfig: frCommon.flowConfig || {},
      },
      es: {
        common: esCommon,
        flowConfig: esCommon.flowConfig || {},
      },
    },
    fallbackLng: defaultLocale,
    ns: ['common', 'flowConfig'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'htmlTag', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: 'flowHubLanguage',
      caches: ['localStorage'],
    },
  });

export function I18nProvider({ 
  children, 
  locale: initialLocale,
}: PropsWithChildren<{ locale?: string }>) {
  // Get the current route params to access the language parameter
  const params = useParams();
  const pathname = usePathname();
  
  // Extract language from URL path as fallback method
  const getLanguageFromPath = () => {
    if (pathname) {
      const segments = pathname.split('/');
      // First segment after the leading slash
      if (segments.length > 1) {
        const langCode = segments[1];
        if (isValidLocale(langCode)) {
          return langCode;
        }
      }
    }
    return null;
  };
  
  // Get language from URL segments or params (client side)
  const urlLang = params?.lang as string || getLanguageFromPath();
  
  // Determine the language to use, with fallbacks
  const effectiveLocale = urlLang || initialLocale || defaultLocale;
  const safeLocale = isValidLocale(effectiveLocale) ? effectiveLocale : defaultLocale;
  
  useEffect(() => {
    // Only change if different to avoid unnecessary re-renders
    if (i18next.language !== safeLocale) {
      i18next.changeLanguage(safeLocale);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = safeLocale;
  }, [safeLocale]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}