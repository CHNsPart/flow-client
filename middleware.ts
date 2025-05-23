// Path: middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/settings'
import { companySiteConfigs } from '@/config'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

// Default client if not specified
const defaultClient = 'default';

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

// Get valid clients from config
const validClients = ['default', ...Object.keys(companySiteConfigs)];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip static files, API routes, etc.
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Parse path segments
  const segments = pathname.split('/').filter(Boolean);
  // Check if the first segment is a valid locale
  const hasLocale = segments.length > 0 && locales.includes(segments[0] as 'en' | 'fr' | 'es');
  const locale = hasLocale ? segments[0] : getLocale(request);
  
  // Check if the second segment is a valid client
  const hasClient = segments.length > 1 && validClients.includes(segments[1]);
  const client = hasClient ? segments[1] : defaultClient;
  
  // If path doesn't have locale or client, redirect to the proper URL
  if (!hasLocale || !hasClient) {
    // Construct the new URL with locale and client
    let newPath: string;
    
    if (!hasLocale && !hasClient) {
      // Neither locale nor client - add both
      newPath = `/${locale}/${client}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
    } else if (hasLocale && !hasClient) {
      // Has locale but no client - add client
      newPath = `/${locale}/${client}${segments.length > 1 ? '/' + segments.slice(1).join('/') : ''}`;
    } else {
      // Should never reach here due to the earlier conditions
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ],
}