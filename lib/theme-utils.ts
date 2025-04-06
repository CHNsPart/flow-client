import { activeTheme, activeSiteConfig } from "@/config"

/**
 * Get theme value
 * Access theme values from components with type safety
 * @param path Path to the value in the theme object
 * @param mode Light or dark mode
 * @returns The theme value
 */
export function getThemeValue(
  path: string,
  mode: "light" | "dark" = "light"
): string {
  const parts = path.split(".")
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let value: any = activeTheme
  
  // Special case for colors which need mode
  if (parts[0] === "colors") {
    parts.splice(0, 1)
    value = activeTheme.colors[mode]
  }
  
  for (const part of parts) {
    if (value === undefined || value === null) return ""
    value = value[part]
  }
  
  return value || ""
}

/**
 * Theme info
 * Returns information about the current theme and site config
 */
export function getThemeInfo() {
  return {
    id: activeTheme.id,
    name: activeTheme.name,
    company: activeTheme.company,
    siteConfig: activeSiteConfig
  }
}

/**
 * Convert to CSS variable
 * Converts a theme key to a CSS variable name
 * @param key Theme key
 * @returns CSS variable name
 */
export function toCssVar(key: string): string {
  return `var(--${key.replace(/([A-Z])/g, "-$1").toLowerCase()})`
}