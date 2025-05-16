// /components/layout/sidebar/SidebarSubmenu.tsx
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';
import { SidebarSubmenuProps } from './types';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

/**
 * Submenu component for the sidebar
 * Using memo to prevent unnecessary re-renders
 */
export const SidebarSubmenu = memo(function SidebarSubmenu({
  menuKey,
  subMenuItems,
  isOpen,
  isActive,
  getMenuTranslation,
  getLocalizedUrl,
  t,
  isCollapsed
}: SidebarSubmenuProps) {
  const router = useRouter();

  if (!subMenuItems || subMenuItems.length === 0) {
    return null;
  }

  // Don't show submenu when collapsed
  if (isCollapsed) {
    return null;
  }

  return (
    <Collapsible open={isOpen && !isCollapsed} className="overflow-hidden">
      <CollapsibleContent className="animate-collapsible-down pl-2" data-state={isOpen ? "open" : "closed"}>
        <div className="border-l border-sidebar-border ml-4 pl-3 mt-1 space-y-1">
          {subMenuItems.map((subItem, index) => {
            // Create a stable key for this submenu item
            const subKey = subItem.name.toLowerCase().replace(/\s+/g, '-');
            
            // Get translated submenu name
            const subTranslationKey = getMenuTranslation(menuKey, subKey);
            const subItemName = t(subTranslationKey) || subItem.name;
            
            // Use exact matching for submenu items
            const isSubItemActive = subItem.url !== '#' && isActive(subItem.url);
            const isSubHashLink = subItem.url === '#';
            
            // Handle clicking on submenu item
            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();
              if (!isSubHashLink) {
                const targetUrl = getLocalizedUrl(subItem.url);
                router.push(targetUrl);
              }
            };

            return (
              <div
                key={`${menuKey}-submenu-${index}`}
                className={cn(
                  "flex items-center gap-3 rounded-md p-2 text-sm cursor-pointer",
                  "hover:bg-primary/10 dark:hover:bg-primary/30 hover:text-foreground",
                  isSubItemActive 
                  && "text-primary hover:text-primary font-medium bg-primary/10 dark:bg-primary/30 dark:text-primary-foreground", 
                )}
                onClick={handleClick}
              >
                <span className={cn(
                  "text-sidebar-foreground",
                  isSubItemActive && "text-primary dark:text-primary-foreground"
                )}>
                  <DynamicIcon iconName={subItem.icon} className="size-4" />
                </span>
                <span className="text-sm truncate">{subItemName}</span>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});