// /components/lang-detector.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings'
import i18next from 'i18next'

export function LangDetector() {
  const pathname = usePathname()
  
  useEffect(() => {
    if (pathname) {
      // Extract language from URL path
      const pathSegments = pathname.split('/')
      const langSegment = pathSegments[1] // First segment after the initial /
      
      if (langSegment && isValidLocale(langSegment)) {
        // Set language for i18next
        i18next.changeLanguage(langSegment)
        
        // Update HTML lang attribute
        document.documentElement.lang = langSegment
      } else {
        // Fallback to default
        i18next.changeLanguage(defaultLocale)
        document.documentElement.lang = defaultLocale
      }
    }
  }, [pathname])
  
  // This is a utility component that doesn't render anything
  return null
}