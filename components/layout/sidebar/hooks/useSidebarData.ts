// File: components/layout/sidebar/hooks/useSidebarData.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarData, MenuItem } from '@/types/sidebar';
import { fetchSidebarData, getMenuPermissions } from '@/services/sidebarService';
import { useLangParam } from '@/providers/LangParamProvider';

/**
 * Custom hook for fetching and managing sidebar data
 * @returns Sidebar data, state, and helper functions
 */
export function useSidebarData() {
  const pathname = usePathname();
  const lang = useLangParam();
  
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
        const [data, userPermissions] = await Promise.all([
          fetchSidebarData(),
          getMenuPermissions()
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
  }, [locales, pathname]);

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
    const normalizedCurrentPath = normalizePath(currentPath, locales);
    const normalizedMenuUrl = normalizePath(menuUrl, locales);
    
    // Check for exact match or if the current path starts with the menu URL
    // For the dashboard or root URL, only match exactly to avoid matching all pages
    if (normalizedMenuUrl === '/' || normalizedMenuUrl === '/dashboard') {
      return normalizedCurrentPath === normalizedMenuUrl;
    }
    
    return normalizedCurrentPath === normalizedMenuUrl || 
           normalizedCurrentPath.startsWith(`${normalizedMenuUrl}/`);
  };

  // Helper function to normalize paths
  const normalizePath = (path: string, locales: string[]): string => {
    let result = path.replace(/\/+$/, ''); // Remove trailing slashes
    
    // Remove language prefix
    for (const locale of locales) {
      if (result.startsWith(`/${locale}/`)) {
        result = result.substring(locale.length + 2);
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
  }, [pathname]);

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
    
    // Check if URL already has language prefix
    const hasLangPrefix = locales.some(locale => url.startsWith(`/${locale}/`));
    
    // Add language prefix if needed
    return hasLangPrefix ? url : `/${lang}${url.startsWith('/') ? url : `/${url}`}`;
  }, [locales, lang]);

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
    locales
  };
}