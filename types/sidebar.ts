export interface SubMenuItem {
  name: string;
  url: string;  // URL path for navigation or '#' for no navigation
  icon: string; // Should be a valid Bootstrap icon name with Bs prefix
  translationKey?: string; // Optional translation key for i18n
}

export interface MenuItem {
  name: string;
  description: string;
  icon: string;     // Should be a valid Bootstrap icon name with Bs prefix
  url?: string;     // Optional URL for direct navigation
  translationKey?: string; // Optional translation key for i18n
  "sub-menu"?: SubMenuItem[]; // Optional sub-menu items
}

export type SidebarData = Record<string, MenuItem>;

// Helper type for dealing with the sidebar configuration
export interface SidebarConfig {
  activeItemColor: string;
  activeItemBgColor: string;
  activeSubItemColor: string;
  activeSubItemBgColor: string;
  hoverItemBgColor: string;
  hoverItemColor: string;
}