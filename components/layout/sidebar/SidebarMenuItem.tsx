// Path: components/layout/sidebar/SidebarMenuItem.tsx
import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { DynamicIcon } from './DynamicIcon';
import { SidebarMenuItemProps } from './types';

/**
 * Individual menu item component for the sidebar
 * Modified to use Next.js Link for client-side navigation without page reload
 * Using memo to prevent unnecessary re-renders
 */
export const SidebarMenuItem = memo(function SidebarMenuItem({
  menuKey,
  item,
  isActive,
  hasActiveChild,
  isOpen,
  hasSubmenu,
  toggleMenu,
  getLocalizedUrl,
  translatedName,
  isCollapsed,
}: SidebarMenuItemProps) {
  const directUrl = item.url || '';
  const isHashLink = directUrl === '#';
  
  // Determine if this is a link, submenu toggle, or a button with both behaviors
  const isLink = directUrl !== '' && !isHashLink;

  // Content for the menu item
  const menuItemContent = (
    <>
      <div className="flex items-center gap-3 w-full">
        <span className={cn(
          "text-sidebar-foreground shrink-0",
          (isActive || hasActiveChild) && "text-primary-foreground",
        )}>
          <DynamicIcon iconName={item.icon} className={isCollapsed ? "flex justify-center items-center size-4" : ""} />
        </span>
        <span className={cn("text-sm truncate", isCollapsed && "text-content")}>
          {translatedName}
        </span>
      </div>
      {!isCollapsed && hasSubmenu && (
        <span className={cn(
          "text-sidebar-foreground transition-transform duration-200 ml-auto shrink-0",
          (isActive || hasActiveChild) && "text-primary-foreground"
        )}>
          {isOpen ? (
            <BsChevronDown className="size-4" />
          ) : (
            <BsChevronRight className="size-4" />
          )}
        </span>
      )}
    </>
  );

  // Common classes for the menu item
  const menuItemClasses = cn(
    "flex w-full items-center justify-between rounded-md p-2 text-sm cursor-pointer",
    "hover:bg-primary/10 dark:hover:bg-primary/30",
    "text-left outline-hidden transition-all",
    "disabled:pointer-events-none disabled:opacity-50",
    (isActive || hasActiveChild) 
    && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground font-medium" 
  );

  // If it has a submenu, use a div with click handler
  if (hasSubmenu) {
    return (
      <div
        className={menuItemClasses}
        onClick={(e) => toggleMenu(menuKey, e)}
        title={isCollapsed ? translatedName : item.description}
      >
        {menuItemContent}
      </div>
    );
  }

  // If it's a direct link, use Next.js Link
  if (isLink) {
    return (
      <Link
        href={getLocalizedUrl(directUrl)}
        className={menuItemClasses}
        title={isCollapsed ? translatedName : item.description}
      >
        {menuItemContent}
      </Link>
    );
  }

  // Fallback to a button for hash links or empty URLs
  return (
    <div
      className={menuItemClasses}
      title={isCollapsed ? translatedName : item.description}
    >
      {menuItemContent}
    </div>
  );
});