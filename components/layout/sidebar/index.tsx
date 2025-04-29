// /components/layout/sidebar/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { getThemeInfo } from '@/lib/theme-utils';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { cn } from '@/lib/utils';
import { SidebarProps } from './types';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
// import { SidebarSkeleton } from './SidebarSkeleton';
import { SidebarError } from './SidebarError';
import { useSidebarData } from './hooks/useSidebarData';
import { BsInfoCircle } from 'react-icons/bs';

/**
 * Main Sidebar component for the application
 * Integrates all sidebar sub-components
 */
export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslationHelper();
  const themeInfo = getThemeInfo();
  const [mounted, setMounted] = useState(false);
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Flow User',
    email: 'flowuser@flowhub.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  };
  
  // Fetch sidebar data
  const {
    sidebarData,
    permissions,
    // isLoading,
    error,
    openMenus,
    toggleMenu,
    isActive,
    getMenuTranslation,
    getLocalizedUrl
  } = useSidebarData();

  // Set mounted after initial render to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle retry when data fetch fails
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  // if (isLoading) {
  //   return <SidebarSkeleton />;
  // }

  // Error state
  if (error) {
    return <SidebarError error={error} onRetry={handleRetry} />;
  }

  // No data state
  if (!sidebarData || Object.keys(sidebarData).length === 0) {
    return (
      <aside className="h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-4">
        <BsInfoCircle className="size-12 text-gray-400 mb-4" />
        <p className="text-gray-800 mb-4 text-center dark:text-gray-200">No menu items available</p>
      </aside>
    );
  }

  // During initial server render, use a simplified structure without translations
  // This prevents hydration errors when translations differ between server and client
  if (!mounted) {
    return (
      <aside className="h-screen w-60 bg-none text-gray-800 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <header className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-9 bg-blue-600 rounded-md flex items-center justify-center text-white overflow-hidden">
              <div className="size-5" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <h2 className="font-semibold truncate">Flow Hub</h2>
              <p className="text-xs truncate text-gray-500">Loan Management System</p>
            </div>
          </div>
        </header>
        <div className="p-1.5 flex-1 overflow-y-auto">
          {/* Simplified content during server render */}
        </div>
        <footer className="px-4 py-2.5 border-t border-gray-200 dark:border-gray-800">
          <div className="h-12 w-full"></div>
        </footer>
      </aside>
    );
  }

  // Render sidebar with data (only on client after mounting)
  return (
    <aside className={cn(
      "h-screen min-w-60 bg-sidebar text-sidebar-foreground border-r flex flex-col",
      className
    )}>
      {/* Company Logo & Info */}
      <SidebarHeader
        companyName={themeInfo.company || t('common.app.name')}
        companyLogo={themeInfo.siteConfig?.company?.logo}
        appTagline={t('common.app.tagline')}
      />

      {/* Menu Items */}
      <SidebarContent
        sidebarData={sidebarData}
        permissions={permissions}
        openMenus={openMenus}
        toggleMenu={toggleMenu}
        isActive={isActive}
        getMenuTranslation={getMenuTranslation}
        getLocalizedUrl={getLocalizedUrl}
        t={t}
      />

      {/* User Profile & Footer */}
      <SidebarFooter 
        user={user}
        t={t}
      />
    </aside>
  );
}