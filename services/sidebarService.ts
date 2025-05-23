// Enhanced version of the sidebarService.ts with better error handling and menu active state detection
// services/sidebarService.ts
import { SidebarData, MenuItem, SubMenuItem } from '@/types/sidebar';
import mockData from '@/data/mock.json';

/**
 * Fetch sidebar menu data from the API or mock data
 * 
 * This service allows for a seamless transition from development (mock data)
 * to production (actual API) based on configuration
 */
export async function fetchSidebarData(clientId: string = 'default'): Promise<SidebarData> {
  // In production, we would fetch from an API endpoint
  const isProduction = process.env.NODE_ENV === 'production';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  // Use real API in production if configured
  if (isProduction && apiBaseUrl) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/sidebar-data?client=${clientId}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json() as SidebarData;
    } catch (error) {
      console.error('Error fetching sidebar data from API:', error);
      // Fallback to mock data if API fails
      console.warn('Falling back to mock data due to API error');
    }
  }
  
  // For development or fallback, use mock data
  try {
    // Check if we have mockData defined
    if (!mockData || Object.keys(mockData).length === 0) {
      throw new Error('Mock data is not available');
    }

    // Cast mockData to the correct type to help TypeScript understand the structure
    const typedMockData = mockData as Record<string, MenuItem>;

    // Enhance the mock data with translation keys for better i18n support
    const enhancedMockData = Object.entries(typedMockData).reduce((acc, [key, item]) => {
      // Create a stable translation key based on the category
      const categoryKey = key.split('-')[0];
      const enhancedItem: MenuItem = { 
        ...item,
        translationKey: `common.sidebar.${categoryKey}.title`
      };
      
      // Also enhance submenu items with translation keys if they exist
      // Use optional chaining and type assertion to avoid TypeScript errors
      if (item["sub-menu"] && Array.isArray(item["sub-menu"])) {
        enhancedItem["sub-menu"] = item["sub-menu"].map((subItem: SubMenuItem) => {
          // Create a stable subkey that's not dependent on URL
          const subKey = subItem.name.toLowerCase().replace(/\s+/g, '-');
          return {
            ...subItem,
            translationKey: `common.sidebar.${categoryKey}.${subKey}`
          };
        });
      }
      
      acc[key] = enhancedItem;
      return acc;
    }, {} as SidebarData);

    // For development, use mock data with a small delay to simulate API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(enhancedMockData);
      }, 100);
    });
  } catch (error) {
    console.error('Error fetching sidebar data:', error);
    throw new Error('Failed to fetch sidebar data');
  }
}

/**
 * Get menu permissions for the current user
 * This would integrate with your authentication system
 */
export async function getMenuPermissions(clientId: string = 'default'): Promise<Record<string, boolean>> {
  const isProduction = process.env.NODE_ENV === 'production';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  // In production, fetch permissions from API based on authenticated user
  if (isProduction && apiBaseUrl) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/user-permissions?client=${clientId}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user permissions from API:', error);
      // Fallback to default permissions if API fails
    }
  }
  
  try {
    // For development, return all permissions as true
    const menuKeys = Object.keys(mockData || {});
    const permissions: Record<string, boolean> = {};
    
    menuKeys.forEach(key => {
      permissions[key] = true;
    });
    
    return permissions;
  } catch (error) {
    console.error('Error generating menu permissions:', error);
    throw new Error('Failed to fetch menu permissions');
  }
}

/**
 * Validate URL for navigation
 * Checks if a URL is valid for navigation or is a special hash link
 */
export function isValidNavigationUrl(url: string): boolean {
  return url !== '#' && url.trim() !== '';
}

/**
 * Normalize a path for consistent comparison
 * Strips language prefixes and normalizes slashes
 */
export function normalizePath(path: string, locales: string[] = ['en', 'fr', 'es']): string {
  let normalizedPath = path;
  
  // Remove trailing slashes
  normalizedPath = normalizedPath.replace(/\/+$/, '');
  
  // Strip language prefix if present
  for (const locale of locales) {
    if (normalizedPath.startsWith(`/${locale}/`)) {
      normalizedPath = normalizedPath.substring(locale.length + 2);
      break;
    }
    if (normalizedPath === `/${locale}`) {
      normalizedPath = '/';
      break;
    }
  }
  
  // Ensure path starts with a slash
  if (!normalizedPath.startsWith('/') && normalizedPath !== '') {
    normalizedPath = '/' + normalizedPath;
  }
  
  return normalizedPath;
}

/**
 * Check if a path matches a target URL
 * Handles exact matches and parent-child relationships
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isPathMatch(path: string, targetUrl: string, locales: string[] = ['en', 'fr', 'es'], exactMatch: boolean = false): boolean {
  if (!path || targetUrl === '#') return false;
  
  const normalizedPath = normalizePath(path, locales);
  const normalizedTarget = normalizePath(targetUrl, locales);
  
  // For root or dashboard paths, only allow exact matches to prevent over-matching
  if (normalizedTarget === '/' || normalizedTarget === '/dashboard') {
    return normalizedPath === normalizedTarget;
  }
  
  // For exact matching, only return true if the paths are exactly the same
  if (exactMatch) {
    return normalizedPath === normalizedTarget;
  }
  
  // Otherwise, check if the current path starts with the target URL
  // This allows parent routes to be considered active when on child routes
  return normalizedPath === normalizedTarget || 
         (normalizedTarget !== '/' && normalizedPath.startsWith(`${normalizedTarget}/`));
}