// Path: components/layout/sidebar/SidebarContent.tsx

import { memo } from 'react';
import { SidebarContentProps } from './types';
import { MenuItem } from '@/types/sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarSubmenu } from './SidebarSubmenu';
import { useParams } from 'next/navigation';

export const SidebarContent = memo(function SidebarContent({
  sidebarData,
  permissions,
  openMenus,
  toggleMenu,
  isActive,
  getMenuTranslation,
  getLocalizedUrl,
  t,
  isCollapsed
}: SidebarContentProps) {
  // Get current client from URL
  const params = useParams<{ client: string }>();
  const currentClient = params?.client || 'default';
  
  // Get theme from environment variable if set
  const envThemeClient = process.env.NEXT_PUBLIC_THEME;
  // Use environment theme if set, otherwise use URL client
  const effectiveClient = envThemeClient || currentClient;
  
  if (!sidebarData || Object.keys(sidebarData).length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No menu items available</div>;
  }

  return (
    <>
      {Object.entries(sidebarData).map(([key, item]: [string, MenuItem]) => {
        // Skip rendering if user doesn't have permission
        if (permissions[key] === false) return null;
        
        // Get translation for menu item
        const translationKey = getMenuTranslation(key);
        const categoryName = t(translationKey) || item.name;
        
        // Determine if this item or any of its children is active
        const directUrl = item.url || '';
        const isItemActive = isActive(directUrl);
        
        // Check if any child is active
        const subMenu = item["sub-menu"];
        const hasActiveChild = subMenu && Array.isArray(subMenu) ? 
          subMenu.some(subItem => isActive(subItem.url)) : 
          false;
          
        const isMenuOpen = openMenus[key];
        const hasSubmenu = !!(subMenu && Array.isArray(subMenu) && subMenu.length > 0);
        
        // Fix URL generation to prevent double client in path
        const getCorrectUrl = (url: string) => {
          // If it's a hash link or empty, return as is
          if (!url || url === '#') return url;
          
          // Get base URL with language and client
          const baseUrl = getLocalizedUrl(url);
          
          // If URL already contains the client segment, we need to prevent duplication
          if (baseUrl.includes(`/${effectiveClient}/`)) {
            return baseUrl;
          }
          
          // Parse URL to extract language
          const urlParts = baseUrl.split('/');
          if (urlParts.length >= 2) {
            const lang = urlParts[1];
            
            // Check if there's already a client after the language
            if (urlParts.length > 2 && validClients.includes(urlParts[2])) {
              // URL already has a client, replace it with effective client
              const pathAfterClient = urlParts.slice(3).join('/');
              return `/${lang}/${effectiveClient}/${pathAfterClient}`;
            } else {
              // URL doesn't have a client, insert the effective client
              const pathAfterLang = urlParts.slice(2).join('/');
              return `/${lang}/${effectiveClient}/${pathAfterLang}`;
            }
          }
          
          return baseUrl;
        };
        
        return (
          <div key={key} className="group/menu-item relative mb-1">
            <SidebarMenuItem
              menuKey={key}
              item={item}
              isActive={isItemActive}
              hasActiveChild={hasActiveChild}
              isOpen={isMenuOpen}
              hasSubmenu={hasSubmenu}
              toggleMenu={toggleMenu}
              getLocalizedUrl={getCorrectUrl}
              translatedName={categoryName}
              isCollapsed={isCollapsed}
            />
            
            {/* Sub Menu Items if available and menu is open */}
            {hasSubmenu && (
              <SidebarSubmenu 
                menuKey={key}
                subMenuItems={subMenu}
                isOpen={isMenuOpen}
                isActive={isActive}
                getMenuTranslation={getMenuTranslation}
                getLocalizedUrl={getCorrectUrl}
                t={t}
                isCollapsed={isCollapsed}
              />
            )}
          </div>
        );
      })}
    </>
  );
});

// Add this import at the top
import { validClients } from '@/config';