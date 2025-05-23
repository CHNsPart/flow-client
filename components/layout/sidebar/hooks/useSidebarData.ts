// Path: components/layout/sidebar/hooks/useSidebarData.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { SidebarData, MenuItem } from '@/types/sidebar';
import { fetchSidebarData, getMenuPermissions } from '@/services/sidebarService';
import { useLangParam } from '@/providers/LangParamProvider';
import { validClients } from '@/config';

export function useSidebarData() {
  const pathname = usePathname();
  const lang = useLangParam();
  const params = useParams<{ client: string }>();
  const client = params?.client || 'default';
  
  const [sidebarData, setSidebarData] = useState<SidebarData | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  
  // Memoize the locales array to prevent it from changing on each render
  const locales = useMemo(() => ['en', 'fr', 'es'], []);

  // Load sidebar data and user permissions
  useEffect(() => {
    let isMounted = true;
    let loadingStarted = false;

    const loadSidebarData = async () => {
      // Prevent duplicate loading
      if (loadingStarted) return;
      loadingStarted = true;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch sidebar data and permissions in parallel
        // Pass client ID to fetch company-specific sidebar data
        const [data, userPermissions] = await Promise.all([
          fetchSidebarData(client),
          getMenuPermissions(client)
        ]);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setSidebarData(data);
          setPermissions(userPermissions);
          
          // Initialize openMenus state based on current path
          const initialOpenState: Record<string, boolean> = {};
          Object.entries(data).forEach(([key, item]: [string, MenuItem]) => {
            // Check if current path includes this menu item or any of its children
            let shouldBeOpen = false;
            
            // If the item has a direct URL, check if the current path starts with it
            if (item.url) {
              shouldBeOpen = isActiveUrl(pathname || '', item.url);
            }
            
            // If it has sub-menu items, check if any of them match the current path
            const subMenu = item["sub-menu"];
            if (subMenu && Array.isArray(subMenu)) {
              const hasActiveChild = subMenu.some(subItem => 
                isActiveUrl(pathname || '', subItem.url)
              );
              shouldBeOpen = shouldBeOpen || hasActiveChild;
            }
            
            initialOpenState[key] = shouldBeOpen;
          });
          setOpenMenus(initialOpenState);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading sidebar data:', err);
          setError('Failed to load sidebar data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          loadingStarted = false;
        }
      }
    };

    loadSidebarData();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locales, pathname, client]); // Add client as dependency

  // Toggle submenu expansion
  const toggleMenu = (key: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper function to check if a URL is active
  const isActiveUrl = (currentPath: string, menuUrl: string): boolean => {
    if (!currentPath || menuUrl === '#') return false;
    
    // Handle exact path and parent path matches
    const normalizedCurrentPath = normalizePath(currentPath, locales, client);
    const normalizedMenuUrl = normalizePath(menuUrl, locales, client);
    
    // Check for exact match or if the current path starts with the menu URL
    // For the dashboard or root URL, only match exactly to avoid matching all pages
    if (normalizedMenuUrl === '/' || normalizedMenuUrl === '/dashboard') {
      return normalizedCurrentPath === normalizedMenuUrl;
    }
    
    return normalizedCurrentPath === normalizedMenuUrl || 
           normalizedCurrentPath.startsWith(`${normalizedMenuUrl}/`);
  };

  // Helper function to normalize paths, accounting for client segment
  const normalizePath = (path: string, locales: string[], client: string): string => {
    let result = path.replace(/\/+$/, ''); // Remove trailing slashes
    
    // Remove language prefix and client prefix if present
    for (const locale of locales) {
      // Check for /en/client/ pattern (regular path)
      if (result.startsWith(`/${locale}/${client}/`)) {
        result = result.substring(locale.length + client.length + 3);
        break;
      }
      // Check for /en/client end pattern (root of client)
      if (result === `/${locale}/${client}`) {
        result = '/';
        break;
      }
      
      // Handle other cases where the client might be different
      const segments = result.split('/').filter(Boolean);
      if (segments.length >= 2 && segments[0] === locale && validClients.includes(segments[1])) {
        // Has language and some client - extract the path after client
        if (segments.length > 2) {
          result = '/' + segments.slice(2).join('/'); 
        } else {
          result = '/';
        }
        break;
      }
      
      // Legacy pattern /en/ without client
      if (result.startsWith(`/${locale}/`)) {
        result = result.substring(locale.length + 1);
        break;
      }
      if (result === `/${locale}`) {
        result = '/';
        break;
      }
    }
    
    // Ensure path starts with a slash
    if (!result.startsWith('/')) {
      result = '/' + result;
    }
    
    return result;
  };

  // Memoize the isActive function to prevent new function reference on each render
  const isActive = useMemo(() => (url: string): boolean => {
    return isActiveUrl(pathname || '', url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, client]); // Add client as dependency

  const getMenuTranslation = useMemo(() => (key: string, subKey?: string): string => {
    // Extract main category from the key (e.g., "tenants-management" -> "tenants")
    const mainCategory = key.split('-')[0];
    
    if (subKey) {
      // For submenu items, use a stable translation key pattern
      return `common.sidebar.${mainCategory}.${subKey}`;
    }
    
    // For main menu items, use the title pattern
    return `common.sidebar.${mainCategory}.title`;
  }, []);

const getLocalizedUrl = useMemo(() => (url: string): string => {
  // Don't process hash links
  if (!url || url === '#') return url;
  
  // Get the theme client from environment variable if set
  const envThemeClient = process.env.NEXT_PUBLIC_THEME;
  // Use environment theme if set, otherwise use client from URL
  const effectiveClient = envThemeClient || client;
  
  // Parse the URL to get components
  let pagePath = url;
  const urlSegments = url.split('/').filter(Boolean);
  
  // Check if URL already has language prefix
  if (urlSegments.length > 0 && locales.includes(urlSegments[0])) {
    const urlLang = urlSegments[0];
    
    // Check if URL already has client segment
    if (urlSegments.length > 1) {
      const urlClient = urlSegments[1];
      
      if (validClients.includes(urlClient)) {
        // URL already has a client, ensure it's the effective client
        if (urlClient !== effectiveClient) {
          // Replace the client with the effective client
          const remainingPath = urlSegments.slice(2).join('/');
          return `/${urlLang}/${effectiveClient}${remainingPath ? `/${remainingPath}` : ''}`;
        }
        // Client already matches, return original URL
        return url;
      } else {
        // URL has language but no valid client, insert effective client
        const remainingPath = urlSegments.slice(1).join('/');
        return `/${urlLang}/${effectiveClient}/${remainingPath}`;
      }
    } else {
      // URL only has language, add client
      return `/${urlLang}/${effectiveClient}`;
    }
  }
  
  // URL doesn't have language, add language and client
  if (!pagePath.startsWith('/')) {
    pagePath = '/' + pagePath;
  }
  
  return `/${lang}/${effectiveClient}${pagePath}`;
}, [locales, lang, client]);

  return {
    sidebarData,
    permissions,
    isLoading,
    error,
    openMenus,
    toggleMenu,
    isActive,
    getMenuTranslation,
    getLocalizedUrl,
    locales,
    client
  };
}