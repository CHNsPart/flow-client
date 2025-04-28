// lib/i18n.ts
// Simple i18n configuration for Flow Hub

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from '../../public/locales/fr/fr.json';
import en from '../../public/locales/en/en.json';
import es from '../../public/locales/es/es.json';

export const supportedLanguages = {
  en: { nativeName: 'English', flag: '🇨🇦' },
  fr: { nativeName: 'Français', flag: '🇨🇦' },
  es: { nativeName: 'Español', flag: '🇪🇸' }
};

// English translations
const enTranslations = en;
// French translations
const frTranslations = fr;
// Spanish translations
const esTranslations = es;

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      fr: frTranslations,
      es: esTranslations
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'flowHubLanguage',
      caches: ['localStorage']
    }
  });

export default i18n;