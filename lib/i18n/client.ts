// /lib/i18n/client.ts
'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { 
  ValidLocale, 
  ValidNamespace, 
  defaultLocale, 
  namespaces, 
  locales 
} from './settings';

// Import translation files
import enCommon from '@/public/locales/en/en.json';
import frCommon from '@/public/locales/fr/fr.json';
import esCommon from '@/public/locales/es/es.json';

// Define resources with type safety
const resources = {
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
} as const;

// Initialize client-side i18n, but don't await the initialization
// This avoids the Promise<TFunction> issue
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLocale,
    ns: namespaces,
    defaultNS: 'common',
    supportedLngs: locales,
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

export default i18next;

// Type-safe translation function
export function getClientTranslation(
  key: string, 
  namespace: ValidNamespace = 'common',
  locale: ValidLocale = defaultLocale,
  options?: Record<string, unknown>
): string {
  return i18next.getFixedT(locale, namespace)(key, options);
}