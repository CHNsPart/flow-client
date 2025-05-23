// Path: app/[lang]/client-layout.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { LangParamProvider } from '@/providers/LangParamProvider'
import { ClientProvider } from '@/providers/ClientProvider'
import { isValidLocale } from '@/lib/i18n/settings'
import { useParams } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  // Get the lang and client parameters from the URL
  const params = useParams<{ lang: string; client: string }>();
  const lang = params?.lang as string;
  const client = params?.client as string || 'default';
  
  // Validate the language parameter on the client side
  const validLang = isValidLocale(lang) ? lang : 'en'
  
  useEffect(() => {
    // Set the HTML lang attribute
    document.documentElement.lang = validLang
  }, [validLang])
  
  return (
    <LangParamProvider lang={validLang} clientId={client}>
      <ClientProvider initialClient={client}>
        {children}
      </ClientProvider>
    </LangParamProvider>
  )
}