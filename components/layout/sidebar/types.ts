// Path: components/layout/sidebar/types.ts
import { SidebarData, MenuItem, SubMenuItem } from '@/types/sidebar';

/**
 * Interface for the dynamic icon component
 */
export interface DynamicIconProps {
  iconName: string;
  className?: string;
}

/**
 * Props for the SidebarHeader component
 */
export interface SidebarHeaderProps {
  companyName: string;
  companyLogo?: string;
  appTagline: string;
  isCollapsed?: boolean;
}

/**
 * Props for the SidebarContent component
 */
export interface SidebarContentProps {
  sidebarData: SidebarData;
  permissions: Record<string, boolean>;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string, e?: React.MouseEvent) => void;
  isActive: (url: string) => boolean;
  getMenuTranslation: (key: string, subKey?: string) => string;
  getLocalizedUrl: (url: string) => string;
  t: (key: string) => string;
  isCollapsed?: boolean;
}

/**
 * Props for the SidebarMenuItem component
 */
export interface SidebarMenuItemProps {
  menuKey: string;
  item: MenuItem;
  isActive: boolean;
  hasActiveChild: boolean;
  isOpen: boolean;
  hasSubmenu: boolean;
  toggleMenu: (key: string, e?: React.MouseEvent) => void;
  getLocalizedUrl: (url: string) => string;
  translatedName: string;
  isCollapsed?: boolean;
}

/**
 * Props for the SidebarSubmenu component
 */
export interface SidebarSubmenuProps {
  menuKey: string;
  subMenuItems: SubMenuItem[];
  isOpen: boolean;
  isActive: (url: string) => boolean;
  getMenuTranslation: (key: string, subKey?: string) => string;
  getLocalizedUrl: (url: string) => string;
  t: (key: string) => string;
  isCollapsed?: boolean;
}

/**
 * Props for the SidebarFooter component
 */
export interface SidebarFooterProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  t: (key: string) => string;
  isCollapsed?: boolean;
}

/**
 * Props for the SidebarError component
 */
export interface SidebarErrorProps {
  error: string;
  onRetry: () => void;
}

/**
 * Props for the SidebarPopover component
 */
export interface SidebarPopoverProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  getPosition?: () => { top: number; left: number };
}

/**
 * Props for the SidebarCollapsedMenuItem component
 */
export interface SidebarCollapsedMenuItemProps {
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
}

/**
 * Props for the SidebarCollapsedUserMenu component
 */
export interface SidebarCollapsedUserMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  t: (key: string) => string;
}

/**
 * Props for the SidebarSkeleton component
 */
export interface SidebarSkeletonProps {
  className?: string;
}