// Path: providers/LangParamProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react'
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings'

// Context type with clientId
type LangContextType = {
  lang: string;
  clientId: string;
};

// Create context with default values
const LangContext = createContext<LangContextType>({
  lang: defaultLocale,
  clientId: 'default'
});

// Context provider component
export function LangParamProvider({ 
  children, 
  lang,
  clientId = 'default'
}: { 
  children: ReactNode, 
  lang: string,
  clientId?: string 
}) {
  // Validate the language and client
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  
  return (
    <LangContext.Provider value={{
      lang: validLang,
      clientId
    }}>
      {children}
    </LangContext.Provider>
  );
}

// Hook to use lang context
export function useLangParam() {
  const { lang } = useContext(LangContext);
  return lang;
}

// Hook to get both lang and client
export function useLangAndClient() {
  return useContext(LangContext);
}