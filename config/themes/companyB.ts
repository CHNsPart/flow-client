// File: config/themes/companyB.ts
import { ThemeConfig } from "./types"
import { defaultTheme } from "./default"

export const companyBTheme: ThemeConfig = {
  ...defaultTheme,
  id: "companyB",
  name: "Company B Theme",
  company: "Company B Inc.",
  colors: {
    light: {
      ...defaultTheme.colors.light,
      primary: "oklch(0.7 0.18 60)", // Light shaded orange
      primaryForeground: "oklch(0.1 0 0)", // Dark text for contrast on light orange
      accent: "oklch(0.65 0.16 70)", // Slightly deeper orange accent
      accentForeground: "oklch(0.1 0 0)", // Near black
      sidebarPrimary: "oklch(0.7 0.18 60)", // Match primary
      chart1: "oklch(0.7 0.18 60)", // Light orange (primary)
      chart2: "oklch(0.65 0.2 55)", // Slightly deeper orange
      chart3: "oklch(0.6 0.22 50)", // More saturated orange
      chart4: "oklch(0.55 0.24 45)", // Orange-red
      chart5: "oklch(0.5 0.26 40)"  // Deep orange-red
    },
    dark: {
      ...defaultTheme.colors.dark,
      primary: "oklch(0.6 0.2 60)", // Slightly deeper orange for dark mode
      primaryForeground: "oklch(0.98 0 0)", // White text
      accent: "oklch(0.55 0.18 65)", // Accent orange
      accentForeground: "oklch(0.98 0 0)", // White
      sidebarPrimary: "oklch(0.6 0.2 60)", // Match primary
      chart1: "oklch(0.6 0.2 60)", // Orange (primary)
      chart2: "oklch(0.65 0.18 55)", // Lighter orange
      chart3: "oklch(0.7 0.16 50)", // Very light orange
      chart4: "oklch(0.55 0.22 45)", // Deeper orange
      chart5: "oklch(0.5 0.24 40)"  // Deep orange-red
    }
  }
}