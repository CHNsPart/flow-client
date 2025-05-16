// /components/layout/sidebar/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { getThemeInfo } from '@/lib/theme-utils';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { BsInfoCircle } from 'react-icons/bs';
import { useSidebarData } from './hooks/useSidebarData';

import {
  Sidebar as ShadcnSidebar,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarMenu,
  SidebarGroup,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarError } from './SidebarError';

/**
 * Main Sidebar component for the application
 * Integrates all sidebar sub-components with shadcn/ui sidebar
 */
export function Sidebar() {
  const { t } = useTranslationHelper();
  const themeInfo = getThemeInfo();
  const [mounted, setMounted] = useState(false);
  
  // Get sidebar state from shadcn/ui sidebar
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Flow User',
    email: 'flowuser@flowhub.com',
    avatar: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };
  
  // Fetch sidebar data
  const {
    sidebarData,
    permissions,
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

  // Error state
  if (error) {
    return <SidebarError error={error} onRetry={handleRetry} />;
  }

  // No data state
  if (!sidebarData || Object.keys(sidebarData).length === 0) {
    return (
      <aside className="h-screen w-60 bg-sidebar border-r border-sidebar-border flex flex-col items-center justify-center p-4">
        <BsInfoCircle className="size-12 text-muted-foreground mb-4" />
        <p className="text-sidebar-foreground mb-4 text-center">No menu items available</p>
      </aside>
    );
  }

  // During initial server render, use a simplified structure without translations
  // This prevents hydration errors when translations differ between server and client
  if (!mounted) {
    return (
      <aside className="h-screen w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <header className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="size-9 bg-sidebar-primary rounded-md flex items-center justify-center text-sidebar-primary-foreground overflow-hidden">
              <div className="size-5" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <h2 className="font-semibold truncate">Flow Hub</h2>
              <p className="text-xs truncate text-muted-foreground">Loan Management System</p>
            </div>
          </div>
        </header>
        <div className="p-1.5 flex-1 overflow-y-auto">
          {/* Simplified content during server render */}
        </div>
        <footer className="px-4 py-2.5 border-t border-sidebar-border">
          <div className="h-12 w-full"></div>
        </footer>
      </aside>
    );
  }

  // Render sidebar with shadcn/ui components
  return (
    <ShadcnSidebar 
      className="bg-sidebar text-sidebar-foreground border-r border-border h-full"
      collapsible={isCollapsed ? "icon" : "offcanvas"}
    >
      <ShadcnSidebarHeader>
        <SidebarHeader
          companyName={themeInfo.company || t('common.app.name')}
          companyLogo={themeInfo.siteConfig?.company?.logo}
          appTagline={t('common.app.tagline')}
          isCollapsed={isCollapsed}
        />
      </ShadcnSidebarHeader>
      
      <ShadcnSidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarContent
              sidebarData={sidebarData}
              permissions={permissions}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              isActive={isActive}
              getMenuTranslation={getMenuTranslation}
              getLocalizedUrl={getLocalizedUrl}
              t={t}
              isCollapsed={isCollapsed}
            />
          </SidebarMenu>
        </SidebarGroup>
      </ShadcnSidebarContent>
      
      <ShadcnSidebarFooter>
        <SidebarFooter 
          user={user}
          t={t}
          isCollapsed={isCollapsed}
        />
      </ShadcnSidebarFooter>
    </ShadcnSidebar>
  );
}

// Export the SidebarTrigger for use in the Shell component
export { SidebarTrigger };