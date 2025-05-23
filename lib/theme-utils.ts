// Path: lib/theme-utils.ts
import { activeTheme, activeSiteConfig } from "@/config"
import { useParams } from "next/navigation"
import { getThemeForClient, getSiteConfigForClient } from "@/config/themes"

/**
 * Get theme value
 * Access theme values from components with type safety
 * @param path Path to the value in the theme object
 * @param mode Light or dark mode
 * @param clientId Optional client ID to get theme for specific client
 * @returns The theme value
 */
export function getThemeValue(
  path: string,
  mode: "light" | "dark" = "light",
  clientId?: string
): string {
  // Get the appropriate theme based on client ID if provided
  const theme = clientId ? getThemeForClient(clientId) : activeTheme;
  
  const parts = path.split(".")
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let value: any = theme;
  
  // Special case for colors which need mode
  if (parts[0] === "colors") {
    parts.splice(0, 1)
    value = theme.colors[mode]
  }
  
  for (const part of parts) {
    if (value === undefined || value === null) return ""
    value = value[part]
  }
  
  return value || ""
}

/**
 * Theme info hook
 * Returns information about the current theme and site config for the client in the URL
 */
export function useThemeInfo() {
  const params = useParams<{ client: string }>();
  const clientId = params?.client || "default";
  
  // Get theme for the current client
  const theme = getThemeForClient(clientId);
  const siteConfig = getSiteConfigForClient(clientId);
  
  return {
    id: theme.id,
    name: theme.name,
    company: theme.company,
    siteConfig
  };
}

/**
 * Theme info
 * Returns information about the theme and site config for a specific client
 * @param clientId Optional client ID (uses active theme if not provided)
 */
export function getThemeInfo(clientId?: string) {
  // If client ID is provided, use it; otherwise get from URL if in client component
  let effectiveClientId = clientId;
  
  if (typeof window !== 'undefined' && !effectiveClientId) {
    // Extract client from URL path if we're in a browser
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 2) {
      effectiveClientId = pathSegments[2];
    }
  }
  
  // Get theme and site config for the specified client or active
  const theme = effectiveClientId ? getThemeForClient(effectiveClientId) : activeTheme;
  const siteConfig = effectiveClientId ? getSiteConfigForClient(effectiveClientId) : activeSiteConfig;
  
  return {
    id: theme.id,
    name: theme.name,
    company: theme.company,
    siteConfig
  };
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