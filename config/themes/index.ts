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
 * Active theme selector
 * Selects the active theme based on the NEXT_PUBLIC_THEME environment variable
 * Falls back to the default theme if not specified
 */
export const getActiveTheme = (): ThemeConfig => {
  const activeThemeId = process.env.NEXT_PUBLIC_THEME || "default"
  return themes[activeThemeId] || defaultTheme
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