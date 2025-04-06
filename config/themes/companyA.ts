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
      // Override specific colors for Company A
      primary: "oklch(0.5 0.2 250)", // Blue primary color
      primaryForeground: "oklch(0.98 0 0)",
      accent: "oklch(0.8 0.2 140)", // Green accent
      accentForeground: "oklch(0.1 0 0)",
      sidebarPrimary: "oklch(0.5 0.2 250)", // Match primary for sidebar
      chart1: "oklch(0.5 0.2 250)",
      chart2: "oklch(0.6 0.2 200)",
      chart3: "oklch(0.7 0.2 150)",
      chart4: "oklch(0.8 0.2 100)",
      chart5: "oklch(0.9 0.2 50)"
    },
    dark: {
      ...defaultTheme.colors.dark,
      // Override specific colors for Company A (dark mode)
      primary: "oklch(0.7 0.2 250)", // Lighter blue for dark mode
      primaryForeground: "oklch(0.1 0 0)",
      accent: "oklch(0.6 0.2 140)", // Darker green for dark mode
      accentForeground: "oklch(0.98 0 0)",
      sidebarPrimary: "oklch(0.7 0.2 250)", // Match primary for sidebar
      chart1: "oklch(0.7 0.2 250)",
      chart2: "oklch(0.65 0.2 200)",
      chart3: "oklch(0.6 0.2 150)",
      chart4: "oklch(0.55 0.2 100)",
      chart5: "oklch(0.5 0.2 50)"
    }
  }
}