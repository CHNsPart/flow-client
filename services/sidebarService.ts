// Enhanced version of the sidebarService.ts with better error handling
// services/sidebarService.ts
import { SidebarData } from '@/types/sidebar';
import mockData from '@/data/mock.json';

/**
 * Fetch sidebar menu data from the API or mock data
 * 
 * This service allows for a seamless transition from development (mock data)
 * to production (actual API) based on configuration
 */
export async function fetchSidebarData(): Promise<SidebarData> {
  // Check if we have mockData defined
  if (!mockData || Object.keys(mockData).length === 0) {
    throw new Error('Mock data is not available');
  }

  try {
    // For development, use mock data with a small delay
    // In production, this would call an actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData as SidebarData);
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
export async function getMenuPermissions(): Promise<Record<string, boolean>> {
  try {
    // In production, this would fetch from an API based on the user's role
    // For development, return all permissions as true
    const menuKeys = Object.keys(mockData || {});
    const permissions: Record<string, boolean> = {};
    
    menuKeys.forEach(key => {
      permissions[key] = true;
    });
    
    return permissions;
  } catch (error) {
    console.error('Error fetching menu permissions:', error);
    throw new Error('Failed to fetch menu permissions');
  }
}