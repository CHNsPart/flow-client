// /hooks/use-translation-helper.ts
'use client'

import { useTranslation } from 'react-i18next'
import { ValidNamespace } from '@/lib/i18n/settings'

/**
 * A type-safe wrapper around react-i18next's useTranslation hook
 * that adds additional utility functions
 */
export function useTranslationHelper(namespace: ValidNamespace = 'common') {
  const { t, i18n } = useTranslation(namespace)
  
  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    
    // Helper to format dates according to the current locale
    formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = date instanceof Date ? date : new Date(date)
      return new Intl.DateTimeFormat(i18n.language, options).format(dateObj)
    },
    
    // Helper to format currency according to the current locale
    formatCurrency: (amount: number, currency: string = 'CAD') => {
      return new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency
      }).format(amount)
    },
    
    // Helper to format numbers according to the current locale
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(i18n.language, options).format(number)
    }
  }
}