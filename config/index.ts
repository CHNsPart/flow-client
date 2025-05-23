// Path: config/index.ts (update)
// Export validClients for use in static param generation

export * from "./site"
export * from "./themes"

// Re-export active configurations for convenience
import { activeTheme, activeSiteConfig } from "./themes"
export { activeTheme, activeSiteConfig }

// Define and export valid clients
export const validClients = ['default', 'companyA', 'companyB'];