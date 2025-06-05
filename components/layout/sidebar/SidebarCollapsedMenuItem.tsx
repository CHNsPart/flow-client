// Path: components/layout/sidebar/SidebarCollapsedMenuItem.tsx

import React, { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';
import { SidebarPopover } from './SidebarPopover';
import { SubMenuItem } from '@/types/sidebar';
import Link from 'next/link';

interface SidebarCollapsedMenuItemProps {
  menuKey: string;
  icon: string;
  title: string;
  isActive: boolean;
  hasSubmenu: boolean;
  subMenuItems?: SubMenuItem[];
  directUrl?: string;
  getLocalizedUrl: (url: string) => string;
  getMenuTranslation: (key: string, subKey?: string) => string;
  t: (key: string) => string;
  isActiveUrl?: (url: string) => boolean;
}

/**
 * Enhanced menu item component for collapsed sidebar that shows submenu in a popover
 * Modified to use Next.js Link for client-side navigation without page reload
 */
export function SidebarCollapsedMenuItem({
  menuKey,
  icon,
  title,
  isActive,
  hasSubmenu,
  subMenuItems,
  directUrl,
  getLocalizedUrl,
  getMenuTranslation,
  t,
  isActiveUrl
}: SidebarCollapsedMenuItemProps) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close submenu handler that can be passed to the popover
  const closeSubmenu = useCallback(() => {
    setShowSubmenu(false);
  }, []);

  // Handle click on menu item
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasSubmenu) {
      setShowSubmenu(!showSubmenu);
    } else if (directUrl && directUrl !== '#') {
      // Use client-side navigation
      router.push(getLocalizedUrl(directUrl));
    }
  };

  // Handle mouse enter on menu item
  const handleMouseEnter = () => {
    if (hasSubmenu) {
      setShowSubmenu(true);
    }
  };

  // Handle mouse leave to delay closing the submenu
  const handleMouseLeave = () => {
    if (!hasSubmenu) return;
    
    // Delayed close to allow moving the mouse to the popover
    setTimeout(() => {
      // Don't close if hovering over the popover
      const popoverEl = document.querySelector(`[data-popover-for="${menuKey}"]`);
      if (popoverEl && popoverEl.matches(':hover')) return;
      
      setShowSubmenu(false);
    }, 100);
  };

  // Check if any submenu item is active
  const hasActiveSubmenuItem = useCallback(() => {
    if (!hasSubmenu || !subMenuItems || !isActiveUrl) return false;
    
    // For each submenu item, check if its URL matches the current path
    return subMenuItems.some(subItem => {
      if (subItem.url && subItem.url !== '#') {
        // Check if this submenu URL is active
        return isActiveUrl(subItem.url);
      }
      return false;
    });
  }, [hasSubmenu, subMenuItems, isActiveUrl]);
  
  // Determine if this menu item should show as active
  const isMenuActive = isActive || hasActiveSubmenuItem();

  return (
    <div className="relative" ref={itemRef}>
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-md p-2 cursor-pointer",
          "hover:bg-primary/10 dark:hover:bg-primary/30",
          "text-left text-sm transition-all",
          isMenuActive && "bg-primary hover:bg-primary text-primary-foreground",
          "relative"
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={hasSubmenu ? "button" : "link"}
        aria-haspopup={hasSubmenu}
        aria-expanded={hasSubmenu ? showSubmenu : undefined}
        tabIndex={0}
        title={title}
      >
        <span className={cn(
          "flex justify-center items-center",
          isMenuActive ? "text-primary-foreground" : "text-sidebar-foreground"
        )}>
          <DynamicIcon 
            iconName={icon} 
            className="size-4"
          />
          
          {/* Small indicator for items with submenus */}
          {hasSubmenu && (
            <span 
              className={cn(
                "absolute -right-0.5 -bottom-0.5 size-1.5 rounded-full",
                isMenuActive ? "size-2 bg-green-500 border" : "bg-sidebar-primary"
              )}
              aria-hidden="true"
            />
          )}
        </span>
      </div>
      
      {/* Submenu popover */}
      {hasSubmenu && subMenuItems && (
        <SidebarPopover 
          triggerRef={itemRef} 
          isOpen={showSubmenu}
          onClose={closeSubmenu}
          className="py-1"
        >
          <div 
            className="p-2 border-b border-border"
            data-popover-for={menuKey}
          >
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <div className="p-1 space-y-1">
            {subMenuItems.map((subItem, index) => {
              // Get translated submenu name
              const subKey = subItem.name.toLowerCase().replace(/\s+/g, '-');
              const subTranslationKey = getMenuTranslation(menuKey, subKey);
              const subItemName = t(subTranslationKey) || subItem.name;
              
              // Determine if this is a link or just an action
              const isLink = subItem.url && subItem.url !== '#';
              
              // Check if this submenu item is active
              const isSubItemActive = isActiveUrl && subItem.url && 
                subItem.url !== '#' && 
                isActiveUrl(subItem.url);
              
              // Create the URL for the link
              const href = isLink ? getLocalizedUrl(subItem.url) : '#';
              
              return (
                <Link
                  key={`${menuKey}-collapsed-submenu-${index}`}
                  href={href}
                  onClick={(e) => {
                    if (!isLink) {
                      e.preventDefault();
                    }
                    closeSubmenu();
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer",
                    "hover:bg-primary/10 dark:hover:bg-primary/30 hover:text-foreground",
                    "outline-none focus:ring-2 focus:ring-primary/50 rounded-sm",
                    isSubItemActive && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <DynamicIcon 
                    iconName={subItem.icon} 
                    className={cn(
                      "size-3.5",
                      isSubItemActive ? "text-primary" : "text-muted-foreground"
                    )} 
                  />
                  <span className={cn(
                    "text-sm",
                    isSubItemActive && "text-primary font-medium"
                  )}>
                    {subItemName}
                  </span>
                </Link>
              );
            })}
          </div>
        </SidebarPopover>
      )}
    </div>
  );
}