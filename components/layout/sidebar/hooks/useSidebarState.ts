'use client';

import { useState, useEffect } from 'react';

const SIDEBAR_STATE_KEY = 'flow-hub-sidebar-state';

/**
 * Hook to manage sidebar collapsed state with persistence
 * Stores state in localStorage to persist across page reloads and navigation
 */
export function useSidebarState() {
  // Initialize state with a function to avoid hydration mismatch
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved state on initial render
  useEffect(() => {
    // Get saved state from localStorage
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    
    // Default to expanded if no saved state
    const initialState = savedState ? savedState === 'collapsed' : false;
    
    setIsCollapsed(initialState);
    setIsLoading(false);
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    // Skip if initial load hasn't completed
    if (isLoading) return;
    
    // Save state to localStorage
    localStorage.setItem(
      SIDEBAR_STATE_KEY, 
      isCollapsed ? 'collapsed' : 'expanded'
    );
  }, [isCollapsed, isLoading]);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return {
    isCollapsed: isCollapsed ?? false, // Default to expanded while loading
    toggleSidebar,
    isLoading
  };
}