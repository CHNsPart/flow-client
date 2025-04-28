import { ThemeConfig } from "./types"
import { defaultTheme } from "./default"

export const companyATheme: ThemeConfig = {
  ...defaultTheme,
  id: "companyA",
  name: "Company A Theme",
  company: "Company A Inc.",
  colors: {
    light: {
      ...defaultTheme.colors.light,
      primary: "oklch(0.6 0.24 295)", // Matches your logo
      primaryForeground: "oklch(0.98 0 0)", // white
      accent: "oklch(0.65 0.22 295)", // Slightly lighter version
      accentForeground: "oklch(0.1 0 0)", // black
      sidebarPrimary: "oklch(0.6 0.24 295)",
      chart1: "oklch(0.6 0.24 295)",
      chart2: "oklch(0.55 0.22 290)",
      chart3: "oklch(0.5 0.2 285)",
      chart4: "oklch(0.45 0.18 280)",
      chart5: "oklch(0.4 0.16 275)"
    },
    dark: {
      ...defaultTheme.colors.dark,
      primary: "oklch(0.75 0.24 295)", // Brighter for dark mode
      primaryForeground: "oklch(0.1 0 0)", // black
      accent: "oklch(0.7 0.22 295)", // Close match
      accentForeground: "oklch(0.98 0 0)", // white
      sidebarPrimary: "oklch(0.75 0.24 295)",
      chart1: "oklch(0.75 0.24 295)",
      chart2: "oklch(0.7 0.22 290)",
      chart3: "oklch(0.65 0.2 285)",
      chart4: "oklch(0.6 0.18 280)",
      chart5: "oklch(0.55 0.16 275)"
    }
  }
}
