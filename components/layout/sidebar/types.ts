// /components/layout/sidebar/types.ts
import { SidebarData, MenuItem, SubMenuItem } from '@/types/sidebar';

/**
 * Interface for the dynamic icon component
 */
export interface DynamicIconProps {
  iconName: string;
  className?: string;
}

/**
 * Props for the main Sidebar component
 */
export interface SidebarProps {
  className?: string;
}

/**
 * Props for the SidebarHeader component
 */
export interface SidebarHeaderProps {
  companyName: string;
  companyLogo?: string;
  appTagline: string;
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
  toggleMenu: (key: string, e: React.MouseEvent) => void;
  getLocalizedUrl: (url: string) => string;
  translatedName: string;
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
}

/**
 * Props for the SidebarSkeleton component
 */
export interface SidebarSkeletonProps {
  className?: string;
}

/**
 * Props for the SidebarError component
 */
export interface SidebarErrorProps {
  error: string;
  onRetry: () => void;
}