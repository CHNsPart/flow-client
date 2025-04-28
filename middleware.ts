// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/settings'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

// Get the preferred locale based on the request
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
  // If no languages are specified, use the default locale
  if (!languages || languages.length === 0) {
    return defaultLocale
  }
  
  // Match the preferred locale against the available locales
  return matchLocale(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // If it doesn't have a locale, redirect to the preferred locale
  if (!pathnameHasLocale) {
    // Exclude handling for static files and api routes
    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next()
    }
    
    // Get the locale based on the Accept-Language header
    const locale = getLocale(request)
    
    return NextResponse.redirect(
      new URL(
        pathname === '/' ? `/${locale}` : `/${locale}${pathname}`,
        request.url
      )
    )
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except:
    // - Static files (with extensions like .jpg, .png, etc)
    // - API routes
    // - Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ],
}