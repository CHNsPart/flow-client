/**
 * Central configuration export
 * Provides easy access to all configuration objects
 */

export * from "./site"
export * from "./themes"

// Re-export active configurations for convenience
import { activeTheme, activeSiteConfig } from "./themes"
export { activeTheme, activeSiteConfig }