// Path: components/ClientLink.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings';
import { validClients } from '@/config';

interface ClientLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  lang?: string;
  client?: string;
}

export function ClientLink({ 
  href, 
  lang, 
  client,
  ...props 
}: ClientLinkProps) {
  const params = useParams<{ lang: string; client: string }>();
  
  // Use provided values or fall back to URL params
  const currentLang = params?.lang || defaultLocale;
  const currentClient = params?.client || 'default';
  
  // Get theme from environment variable if set
  const envThemeClient = process.env.NEXT_PUBLIC_THEME;
  
  // Use provided overrides, environment variable, or fallbacks
  const targetLang = lang || currentLang;
  const targetClient = client || envThemeClient || currentClient;
  
  // Only process relative URLs
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
    return <Link href={href} {...props} />;
  }
  
  // Process the href to ensure it has proper lang and client prefixes
  let processedHref = href;
  
  // If href already contains language prefixes, extract the base path
  const segments = href.split('/').filter(Boolean);
  
  if (segments.length > 0 && isValidLocale(segments[0])) {
    // If href has language, check for client
    if (segments.length > 1) {
      const hasClient = validClients.includes(segments[1]);
      
      if (hasClient) {
        // Has both lang and client, extract the page path
        processedHref = '/' + segments.slice(2).join('/');
      } else {
        // Has only lang, extract the page path
        processedHref = '/' + segments.slice(1).join('/');
      }
    } else {
      // Just the language with no path
      processedHref = '/';
    }
  }
  
  // Ensure it starts with a slash
  if (!processedHref.startsWith('/')) {
    processedHref = '/' + processedHref;
  }
  
  // Build the final URL with correct lang and client
  const finalHref = `/${targetLang}/${targetClient}${processedHref}`;
  
  return <Link href={finalHref} {...props} />;
}