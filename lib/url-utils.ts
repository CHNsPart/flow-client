// Path: lib/url-utils.ts (new file)
/**
 * Helper utility to handle URL manipulation with client segment
 */

import { isValidLocale, defaultLocale } from '@/lib/i18n/settings';
import { validClients } from '@/config';

/**
 * Extract language and client from a URL path
 * @param path URL path
 * @returns Object with lang and client
 */
export function extractLangAndClient(path: string): { 
  lang: string; 
  client: string;
  pagePath: string;
} {
  const segments = path.split('/').filter(Boolean);
  let lang = defaultLocale;
  let client = 'default';
  let pagePath = '';
  
  // Extract language (first segment if valid)
  if (segments.length > 0 && isValidLocale(segments[0])) {
    lang = segments[0];
    
    // Extract client (second segment if exists)
    if (segments.length > 1) {
      const potentialClient = segments[1];
      if (validClients.includes(potentialClient)) {
        client = potentialClient;
        
        // Extract page path (everything after lang/client)
        if (segments.length > 2) {
          pagePath = '/' + segments.slice(2).join('/');
        }
      } else {
        // No valid client in URL, use the rest as page path
        pagePath = '/' + segments.slice(1).join('/');
      }
    }
  } else {
    // No valid language in URL, treat as page path
    pagePath = '/' + segments.join('/');
  }
  
  return { lang, client, pagePath };
}

/**
 * Build a URL with language and client segments
 * @param pagePath Page path without lang/client
 * @param lang Language code
 * @param client Client ID
 * @returns Full URL path
 */
export function buildUrlWithLangAndClient(
  pagePath: string, 
  lang: string = defaultLocale, 
  client: string = 'default'
): string {
  // Ensure pagePath starts with a slash if not empty
  if (pagePath && !pagePath.startsWith('/')) {
    pagePath = '/' + pagePath;
  }
  
  return `/${lang}/${client}${pagePath}`;
}