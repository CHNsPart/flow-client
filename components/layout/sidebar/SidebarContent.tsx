// /components/layout/sidebar/SidebarContent.tsx
import { memo } from 'react';
import { SidebarContentProps } from './types';
import { MenuItem } from '@/types/sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarSubmenu } from './SidebarSubmenu';

/**
 * Content component for the sidebar that renders the menu items
 * Using memo to prevent unnecessary re-renders
 */
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
              getLocalizedUrl={getLocalizedUrl}
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
                getLocalizedUrl={getLocalizedUrl}
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