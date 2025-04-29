// File: config/themes/companyA.ts
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
      primary: "oklch(0.35 0.15 265)", // Dark blue
      primaryForeground: "oklch(0.98 0 0)", // Near white
      accent: "oklch(0.5 0.18 250)", // Medium blue
      accentForeground: "oklch(0.1 0 0)", // Near black
      sidebarPrimary: "oklch(0.35 0.15 265)", // Dark blue to match primary
      chart1: "oklch(0.35 0.15 265)", // Dark blue (primary)
      chart2: "oklch(0.45 0.16 250)", // Medium blue
      chart3: "oklch(0.55 0.15 235)", // Light blue
      chart4: "oklch(0.65 0.14 220)", // Sky blue
      chart5: "oklch(0.75 0.13 205)"  // Pale blue
    },
    dark: {
      ...defaultTheme.colors.dark,
      primary: "oklch(0.45 0.18 265)", // Slightly brighter dark blue for dark mode
      primaryForeground: "oklch(0.98 0 0)", // White text on dark blue
      accent: "oklch(0.6 0.2 250)", // Brighter medium blue for dark mode
      accentForeground: "oklch(0.1 0 0)", // Near black
      sidebarPrimary: "oklch(0.45 0.18 265)", // Match primary
      chart1: "oklch(0.45 0.18 265)", // Dark blue (primary)
      chart2: "oklch(0.55 0.17 250)", // Medium blue
      chart3: "oklch(0.65 0.16 235)", // Light blue
      chart4: "oklch(0.75 0.15 220)", // Sky blue
      chart5: "oklch(0.85 0.14 205)"  // Pale blue
    }
  }
}