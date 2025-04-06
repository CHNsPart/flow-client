/**
 * Global site configuration
 * Central configuration for site-wide settings that can be customized per company
 */

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github?: string
    twitter?: string
    linkedin?: string
  }
  defaultLocale: string
  supportedLocales: string[]
  company: {
    name: string
    logo: string
    favicon: string
  }
  apiBaseUrl: string
  featureFlags: {
    enableAnalytics: boolean
    enableNotifications: boolean
    enableMultiCompanySupport: boolean
  }
}

export const defaultSiteConfig: SiteConfig = {
  name: "Flow Hub",
  description: "Loan Management System",
  url: "https://flowhub.example.com",
  ogImage: "/images/og-image.jpg",
  links: {
    github: "https://github.com/flowhub",
    linkedin: "https://linkedin.com/company/flowhub"
  },
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
  company: {
    name: "Flow Hub Inc.",
    logo: "/brands/default/flow.svg",
    favicon: "/favicon.ico"
  },
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flowhub.example.com",
  featureFlags: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    enableNotifications: true,
    enableMultiCompanySupport: true
  }
}

export const companySiteConfigs: Record<string, Partial<SiteConfig>> = {
  companyA: {
    name: "Company A",
    description: "Loan Management System customized for Company A",
    url: "https://companya.flowhub.example.com",
    ogImage: "/images/companyA-og-image.jpg",
    company: {
      name: "Company A Inc.",
      logo: "/brands/companyA/companyA.svg",
      favicon: "/favicon.ico"
    },
    featureFlags: {
      enableAnalytics: true,
      enableNotifications: false,
      enableMultiCompanySupport: true
    }
  },
  companyB: {
    name: "Company B",
    description: "Loan Management System customized for Company B",
    url: "https://companyb.flowhub.example.com",
    ogImage: "/images/companyB-og-image.jpg",
    company: {
      name: "Company B Inc.",
      logo: "/brands/companyB/companyB.svg",
      favicon: "/favicon.ico"
    },
    featureFlags: {
      enableAnalytics: false,
      enableNotifications: true,
      enableMultiCompanySupport: true
    }
  }
}



// Get the site config for the current company
export const getSiteConfig = (companyId: string = 'default'): SiteConfig => {
  if (companyId === 'default') {
    return defaultSiteConfig;
  }
  
  const companyConfig = companySiteConfigs[companyId];
  
  if (!companyConfig) {
    return defaultSiteConfig;
  }
  
  // Deep merge the default config with the company-specific config
  return {
    ...defaultSiteConfig,
    ...companyConfig,
    company: {
      ...defaultSiteConfig.company,
      ...(companyConfig.company || {})
    },
    links: {
      ...defaultSiteConfig.links,
      ...(companyConfig.links || {})
    },
    featureFlags: {
      ...defaultSiteConfig.featureFlags,
      ...(companyConfig.featureFlags || {})
    }
  };
}