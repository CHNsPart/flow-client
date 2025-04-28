'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SidebarData } from '@/types/sidebar';
import { fetchSidebarData, getMenuPermissions } from '@/services/sidebarService';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Button } from '@/components/ui/button';
import * as Icons from 'react-icons/ti';
import { Skeleton } from '@/components/ui/skeleton';
import { getThemeInfo } from '@/lib/theme-utils';
import Image from 'next/image';

// Dynamic icon component
const DynamicIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] || Icons.TiAdjustBrightness;
  return <IconComponent className="size-4.5" />;
};

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslationHelper();
  const themeInfo = getThemeInfo();
  const [sidebarData, setSidebarData] = useState<SidebarData | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const user = {
    name: 'Flow User',
    email: 'flowuser@flowhub.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSidebarData = async () => {
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
          Object.keys(data).forEach(key => {
            const item = data[key];
            // Check if current path includes the base URL of this menu item
            initialOpenState[key] = pathname ? pathname.startsWith(item.url) : false;
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
        }
      }
    };

    loadSidebarData();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const toggleMenu = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isActive = (url: string) => {
    if (!pathname) return false;
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  // Loading state
  if (isLoading) {
    return (
      <aside className="h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        </div>
        <div className="p-2 flex-1 overflow-hidden">
          <div className="px-2 py-1.5">
            <Skeleton className="h-4 w-24 mb-2" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-2">
                <Skeleton className="h-9 w-full rounded-md mb-1" />
                {i === 1 && (
                  <div className="ml-8 space-y-1">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-7 w-full rounded-md" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </aside>
    );
  }

  // Error state
  if (error) {
    return (
      <aside className="h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-4">
        <Icons.TiWarning className="size-12 text-red-500 mb-4" />
        <p className="text-gray-800 mb-4 text-center">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="w-full max-w-52"
        >
          Retry
        </Button>
      </aside>
    );
  }

  // No data state
  if (!sidebarData || Object.keys(sidebarData).length === 0) {
    return (
      <aside className="h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-4">
        <Icons.TiInfoLarge className="size-12 text-gray-400 mb-4" />
        <p className="text-gray-800 mb-4 text-center">No menu items available</p>
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
              <Icons.TiBriefcase className="size-5" />
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
    <aside className="h-screen min-w-60 bg-none text-gray-800 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header - Company Logo & Name */}
      <header className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-none border rounded-md flex items-center justify-center text-white overflow-hidden">
            {themeInfo.siteConfig?.company?.logo ? (
              <Image 
                src={themeInfo.siteConfig.company.logo} 
                alt={themeInfo.siteConfig.company.name || 'Company logo'} 
                width={22}
                height={22}
                className="size-5 object-contain"
              />
            ) : (
              <Icons.TiBriefcase className="size-5" />
            )}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <h2 className="font-semibold truncate dark:text-white">
              {themeInfo.company || t('common.app.name')}
            </h2>
            <p className="text-xs truncate text-gray-500">{t('common.app.tagline')}</p>
          </div>
        </div>
      </header>

      {/* Content - Menu Items */}
      <div className="p-1.5 pt-5 flex-1 overflow-y-auto">
        {Object.entries(sidebarData).map(([key, item]) => {
          // Skip rendering if user doesn't have permission
          if (permissions[key] === false) return null;
          
          // Get translated category name
          const translationKey = `common.sidebar.${key.split('-')[0]}.title`;
          const categoryName = t(translationKey) || item.name;
          
          return (
            <div key={key} className="mb-5 px-1.5">
              
              {/* Main Menu Item */}
              <div className="group relative">
                <Link href={item.url}>
                  <div 
                    className={cn(
                      "flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer",
                      isActive(item.url) 
                        ? "bg-red-100 text-gray-950 font-medium" 
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-500/20 dark:hover:text-gray-200"
                    )}
                    onClick={(e) => item["sub-menu"].length > 0 && toggleMenu(key, e)}
                    title={item.description}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">
                        <DynamicIcon iconName={item.icon} />
                      </span>
                      <span className="text-sm">{categoryName}</span>
                    </div>
                    {item["sub-menu"].length > 0 && (
                      <span className="text-gray-400">
                        {openMenus[key] ? (
                          <Icons.TiArrowSortedDown className="size-4" />
                        ) : (
                          <Icons.TiArrowSortedUp className="size-4" />
                        )}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              {/* Sub Menu Items */}
              {openMenus[key] && item["sub-menu"].length > 0 && (
                <div className="ml-8 mt-0.5 space-y-0.5">
                  {item["sub-menu"].map((subItem, index) => {
                    // Get translated submenu name
                    const subKey = subItem.url.split('/').pop() || '';
                    const subTranslationKey = `common.sidebar.${key.split('-')[0]}.${subKey}`;
                    const subItemName = t(subTranslationKey) || subItem.name;
                    
                    return (
                      <div key={index} className="group relative">
                        <Link 
                          href={subItem.url} 
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                            isActive(subItem.url) 
                              ? "bg-gray-100 text-gray-900 font-medium" 
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-500/20 dark:hover:text-gray-200"
                          )}
                          title={subItem.name}
                        >
                          <span className="text-gray-500">
                            <DynamicIcon iconName={subItem.icon} />
                          </span>
                          <span>{subItemName}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer with User Section */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="p-2 relative" ref={userMenuRef}>
          {/* User Profile Button */}
          <button 
            className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="relative">
              <div className="size-9 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover size-full rounded-md"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate dark:text-white">{user.name}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            <div className="flex-shrink-0 text-gray-400">
              <Icons.TiChevronRight className={cn("size-4 transition-transform", 
                userMenuOpen ? "rotate-90" : ""
              )} />
            </div>
          </button>
          
          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full mb-1 left-2 right-2 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
              <div className="py-1">
                <Link 
                  href="/account" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Icons.TiUser className="size-4 mr-2 text-gray-500" />
                  Account
                </Link>
                <button 
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => console.log('Log out clicked')}
                >
                  <Icons.TiPower className="size-4 mr-2 text-gray-500" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="px-4 py-2.5 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center text-xs text-gray-500">
          <Icons.TiInfoLarge className="size-3.5 mr-2 text-gray-400" />
          <span>{t('common.app.copyright').replace('{{year}}', new Date().getFullYear().toString())}</span>
        </div>
      </footer>
    </aside>
  );
}