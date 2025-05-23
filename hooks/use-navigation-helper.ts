// Path: hooks/use-navigation-helper.ts
'use client';

import { useParams } from 'next/navigation';
import { isValidLocale, defaultLocale } from '@/lib/i18n/settings';

export function useNavigationHelper() {
  const params = useParams<{ lang: string; client: string }>();
  
  // Get current language and client from URL params
  const currentLang = isValidLocale(params?.lang) ? params.lang : defaultLocale;
  const currentClient = params?.client || 'default';
  
  // Generate URL with proper language and client parameters
  const getUrl = (path: string, options?: { 
    lang?: string; 
    client?: string;
    absolute?: boolean;
  }) => {
    const targetLang = options?.lang || currentLang;
    const targetClient = options?.client || currentClient;
    
    // If path is already absolute URL or external, return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // If path already includes the language and client, extract the page path
    let pagePath = path;
    const pathSegments = path.split('/').filter(Boolean);
    
    if (pathSegments.length > 0 && isValidLocale(pathSegments[0])) {
      // Path already has language prefix, remove it
      pagePath = '/' + pathSegments.slice(1).join('/');
      
      // If path already has client after language, remove it too
      if (pathSegments.length > 1) {
        pagePath = '/' + pathSegments.slice(2).join('/');
      }
    }
    
    // Ensure pagePath starts with slash
    if (!pagePath.startsWith('/')) {
      pagePath = '/' + pagePath;
    }
    
    // Construct new URL with language and client
    return `/${targetLang}/${targetClient}${pagePath}`;
  };
  
  return {
    currentLang,
    currentClient,
    getUrl
  };
}