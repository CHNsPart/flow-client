// Path: config/themes/index.ts
import { ThemeConfig } from "./types"
import { defaultTheme } from "./default"
import { companyATheme } from "./companyA"
import { companyBTheme } from "./companyB"
import { getSiteConfig } from "../site"

/**
 * Theme registry
 * Contains all available themes that can be used in the application
 */
export const themes: Record<string, ThemeConfig> = {
  default: defaultTheme,
  companyA: companyATheme,
  companyB: companyBTheme,
  // Add more company themes as needed
}

/**
 * Get theme by client ID
 * Returns the theme configuration for a specific client
 * @param clientId Client identifier
 * @returns Theme configuration for the specified client
 */
export function getThemeForClient(clientId: string): ThemeConfig {
  return themes[clientId] || defaultTheme;
}

/**
 * Get site config by client ID
 * Returns the site configuration for a specific client
 * @param clientId Client identifier
 * @returns Site configuration for the specified client
 */
export function getSiteConfigForClient(clientId: string) {
  return getSiteConfig(clientId);
}

/**
 * Active theme selector
 * Selects the active theme based on the NEXT_PUBLIC_THEME environment variable
 * Falls back to the default theme if not specified
 */
export const getActiveTheme = (): ThemeConfig => {
  // Use process.env to access environment variables
  const activeThemeId = process.env.NEXT_PUBLIC_THEME;
  
  // Check if the theme ID exists in the themes registry
  if (activeThemeId && themes[activeThemeId]) {
    return themes[activeThemeId];
  }
  
  // Fall back to default theme if theme ID is not provided or not found
  return defaultTheme;
}
/**
 * Active theme
 * The currently active theme configuration
 */
export const activeTheme = getActiveTheme()

/**
 * Active site config
 * The site configuration for the currently active theme
 */
export const activeSiteConfig = getSiteConfig(activeTheme.id)

export * from "./types"
export * from "./default"