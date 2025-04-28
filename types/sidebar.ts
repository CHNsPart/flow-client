export interface SubMenuItem {
  name: string;
  url: string;
  icon: string;
}

export interface MenuItem {
  name: string;
  description: string;
  icon: string;
  url: string;
  "sub-menu": SubMenuItem[];
}

export type SidebarData = Record<string, MenuItem>;