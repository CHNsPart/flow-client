// /components/layout/sidebar/SidebarSubmenu.tsx
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DynamicIcon } from './DynamicIcon';
import { SidebarSubmenuProps } from './types';

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
  t
}: SidebarSubmenuProps) {
  const router = useRouter();

  if (!isOpen || !subMenuItems || subMenuItems.length === 0) {
    return null;
  }

  return (
    <div className="ml-8 mt-2.5 space-y-2.5">
      {subMenuItems.map((subItem, index) => {
        // Create a stable key for this submenu item
        const subKey = subItem.name.toLowerCase().replace(/\s+/g, '-');
        
        // Get translated submenu name
        const subTranslationKey = getMenuTranslation(menuKey, subKey);
        const subItemName = t(subTranslationKey) || subItem.name;
        
        // Use exact matching for submenu items to prevent all items showing as active
        // This ensures that only the exact path match is considered active
        const isSubItemActive = subItem.url !== '#' && isActive(subItem.url);
        const isSubHashLink = subItem.url === '#';
        
        // Handle clicking on submenu item
        const handleClick = () => {
          if (!isSubHashLink) {
            const targetUrl = getLocalizedUrl(subItem.url);
            router.push(targetUrl);
          }
        };

        return (
          <div key={`${menuKey}-submenu-${index}`} className="group relative">
            <div 
              className={cn(
                "flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer",
                isSubItemActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-500/20 dark:hover:text-gray-200"
              )}
              onClick={handleClick}
              title={subItem.name}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick();
                }
              }}
            >
              <span className={cn(
                "text-gray-500",
                isSubItemActive && "text-primary"
              )}>
                <DynamicIcon iconName={subItem.icon} />
              </span>
              <span>{subItemName}</span>
            </div>
            
          </div>
        );
      })}
    </div>
  );
});