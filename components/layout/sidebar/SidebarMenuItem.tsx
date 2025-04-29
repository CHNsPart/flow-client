// /components/layout/sidebar/SidebarMenuItem.tsx
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { DynamicIcon } from './DynamicIcon';
import { SidebarMenuItemProps } from './types';
import { useRouter } from 'next/navigation';

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
}: SidebarMenuItemProps) {
  const router = useRouter();
  const directUrl = item.url || '';

  // Handle click on menu item
  const handleClick = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      // If it has submenu, toggle the menu
      toggleMenu(menuKey, e);
    } else if (directUrl && directUrl !== '#') {
      // If it has a direct URL and no submenu, navigate to the URL
      e.preventDefault();
      const targetUrl = getLocalizedUrl(directUrl);
      router.push(targetUrl);
    }
  };

  return (
    <div className="group relative">
      <div 
        className={cn(
          "flex items-center justify-between p-2 rounded-md cursor-pointer",
          (isActive || hasActiveChild) 
            ? "bg-primary text-primary-foreground font-medium" 
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-500/20 dark:hover:text-gray-200"
        )}
        onClick={handleClick}
        title={item.description}
        role="button"
        tabIndex={0}
        aria-expanded={hasSubmenu ? isOpen : undefined}
        aria-haspopup={hasSubmenu ? "true" : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-gray-500",
            (isActive || hasActiveChild) && "text-primary-foreground"
          )}>
            <DynamicIcon iconName={item.icon} />
          </span>
          <span className="text-sm">{translatedName}</span>
        </div>
        {hasSubmenu && (
          <span className={cn(
            "text-gray-400",
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
    </div>
  );
});