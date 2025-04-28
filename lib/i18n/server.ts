// /lib/i18n/server.ts
import { createInstance } from 'i18next';
import { ValidLocale, ValidNamespace, defaultLocale } from './settings';

// Import translation files
import enCommon from '@/public/locales/en/en.json';
import frCommon from '@/public/locales/fr/fr.json';
import esCommon from '@/public/locales/es/es.json';

// Define resources with type safety
const resources = {
  en: {
    common: enCommon,
    flowConfig: enCommon.flowConfig || {},
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

// Server-side translation function
export async function getServerTranslation(
  locale: ValidLocale, 
  namespace: ValidNamespace, 
  key: string, 
  options?: Record<string, unknown> // Fixed type here
): Promise<string> {
  const i18nInstance = createInstance();
  await i18nInstance.init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources,
    defaultNS: 'common',
    ns: [namespace],
    interpolation: {
      escapeValue: false,
    },
  });
  
  return i18nInstance.t(key, { ns: namespace, ...(options || {}) }); // Fixed spread
}

// Get dictionary for a specific locale
export async function getDictionary(locale: ValidLocale) {
  return resources[locale] || resources[defaultLocale];
}