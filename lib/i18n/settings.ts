// /lib/i18n/settings.ts
import { activeSiteConfig } from "@/config";

// Define valid locales as a type for type safety
export const locales = ['en', 'fr', 'es'] as const;
export type ValidLocale = typeof locales[number];

export const defaultLocale: ValidLocale = (activeSiteConfig.defaultLocale as ValidLocale) || 'en';

// Type-safe locale validation
export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale);
}

// Dictionary of supported languages with metadata
export const supportedLanguages: Record<ValidLocale, { nativeName: string; flag: string }> = {
  en: { nativeName: 'English', flag: '🇨🇦' },
  fr: { nativeName: 'Français', flag: '🇨🇦' },
  es: { nativeName: 'Español', flag: '🇪🇸' }
};

// Type-safe namespace definition
export const namespaces = ['common', 'flowConfig'] as const;
export type ValidNamespace = typeof namespaces[number];

// Dictionary type for typed translations
export type Dictionary = {
  [key in ValidNamespace]: Record<string, unknown>;
};