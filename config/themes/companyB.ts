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
      primary: "oklch(0.65 0.22 300)", // Vivid violet
      primaryForeground: "oklch(0.98 0 0)", // Near white
      accent: "oklch(0.75 0.24 200)", // Electric cyan
      accentForeground: "oklch(0.1 0 0)", // Near black
      sidebarPrimary: "oklch(0.65 0.22 300)",
      chart1: "oklch(0.65 0.22 300)", // Vibrant violet
      chart2: "oklch(0.7 0.23 240)",  // Soft blue
      chart3: "oklch(0.75 0.24 180)", // Teal-green
      chart4: "oklch(0.8 0.25 120)",  // Spring green
      chart5: "oklch(0.85 0.26 60)"   // Lemon yellow
    },
    dark: {
      ...defaultTheme.colors.dark,
      primary: "oklch(0.75 0.22 300)", // Brighter violet for contrast
      primaryForeground: "oklch(0.1 0 0)",
      accent: "oklch(0.85 0.24 200)", // Bright cyan
      accentForeground: "oklch(0.1 0 0)",
      sidebarPrimary: "oklch(0.75 0.22 300)",
      chart1: "oklch(0.75 0.22 300)",
      chart2: "oklch(0.7 0.23 240)",
      chart3: "oklch(0.65 0.24 180)",
      chart4: "oklch(0.6 0.25 120)",
      chart5: "oklch(0.55 0.26 60)"
    }
  }
}
