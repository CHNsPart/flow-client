// /providers/LangParamProvider.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings'

// Create a context for the language
const LangContext = createContext<string>(defaultLocale)

// Context provider component
export function LangParamProvider({ 
  children, 
  lang 
}: { 
  children: ReactNode, 
  lang: string 
}) {
  // Validate the language
  const validLang = isValidLocale(lang) ? lang : defaultLocale
  
  return (
    <LangContext.Provider value={validLang}>
      {children}
    </LangContext.Provider>
  )
}

// Hook to use the language
export function useLangParam() {
  return useContext(LangContext)
}