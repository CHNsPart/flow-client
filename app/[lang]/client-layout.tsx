// File: app/[lang]/client-layout.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { LangParamProvider } from '@/providers/LangParamProvider'
import { isValidLocale } from '@/lib/i18n/settings'
import { useParams } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  // Get the lang parameter from the URL using the useParams hook
  const params = useParams();
  const lang = params?.lang as string; 
  
  // Validate the language parameter on the client side
  const validLang = isValidLocale(lang) ? lang : 'en'
  
  useEffect(() => {
    // Set the HTML lang attribute
    document.documentElement.lang = validLang
  }, [validLang])
  
  return (
    <LangParamProvider lang={validLang}>
      {children}
    </LangParamProvider>
  )
}