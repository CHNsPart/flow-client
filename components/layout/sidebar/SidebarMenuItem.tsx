// /components/layout/sidebar/SidebarMenuItem.tsx
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { DynamicIcon } from './DynamicIcon';
import { SidebarMenuItemProps } from './types';

/**
 * Individual menu item component for the sidebar
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

  // Handle click on menu item
  const handleClick = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      // If it has submenu, toggle the menu
      toggleMenu(menuKey, e);
    } else if (directUrl && directUrl !== '#') {
      // If it has a direct URL, navigate to it
      window.location.href = getLocalizedUrl(directUrl);
    }
  };

  return (
    <div 
      className={cn(
        "flex w-full items-center justify-between rounded-md p-2 cursor-pointer",
        "hover:bg-primary/10 dark:hover:bg-primary/30",
        "text-left text-sm outline-hidden transition-all",
        "disabled:pointer-events-none disabled:opacity-50",
        (isActive || hasActiveChild) 
        && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground font-medium" 
      )}
      onClick={handleClick}
      title={isCollapsed ? translatedName : item.description}
    >
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
    </div>
  );
});