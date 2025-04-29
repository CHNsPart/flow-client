// Path: config/themes/default.ts

import { ThemeConfig } from "./types"

export const defaultTheme: ThemeConfig = {
  id: "default",
  name: "Flow Hub Default",
  company: "Flow Hub Inc.",
  colors: {
    light: {
      // Light mode - white/light background
      background: "oklch(1 0 0)",            // White background
      foreground: "oklch(0.145 0 0)",        // Dark text
      card: "oklch(1 0 0)",                  // White card
      cardForeground: "oklch(0.145 0 0)",    // Dark text on card
      popover: "oklch(1 0 0)",               // White popover
      popoverForeground: "oklch(0.145 0 0)", // Dark text on popover
      primary: "oklch(0.205 0 0)",           // Original primary (from company theme)
      primaryForeground: "oklch(0.985 0 0)", // Light text on primary
      secondary: "oklch(0.97 0 0)",          // Very light secondary
      secondaryForeground: "oklch(0.205 0 0)", // Dark text on secondary
      muted: "oklch(0.97 0 0)",              // Very light muted
      mutedForeground: "oklch(0.556 0 0)",   // Medium-dark muted text
      accent: "oklch(0.97 0 0)",             // Very light accent
      accentForeground: "oklch(0.205 0 0)",  // Dark text on accent
      destructive: "oklch(0.577 0.245 27.325)", // Keep destructive red
      border: "oklch(0.922 0 0)",            // Light border
      input: "oklch(0.922 0 0)",             // Light input background
      ring: "oklch(0.708 0 0)",              // Light ring
      chart1: "oklch(0.646 0.222 41.116)",   // Original chart colors
      chart2: "oklch(0.6 0.118 184.704)",
      chart3: "oklch(0.398 0.07 227.392)",
      chart4: "oklch(0.828 0.189 84.429)",
      chart5: "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",           // Light sidebar
      sidebarForeground: "oklch(0.145 0 0)", // Dark text on sidebar
      sidebarPrimary: "oklch(0.205 0 0)",    // Original sidebar primary
      sidebarPrimaryForeground: "oklch(0.985 0 0)", // Light text on primary sidebar
      sidebarAccent: "oklch(0.97 0 0)",      // Light sidebar accent
      sidebarAccentForeground: "oklch(0.205 0 0)", // Dark text on sidebar accent
      sidebarBorder: "oklch(0.922 0 0)",     // Light sidebar border
      sidebarRing: "oklch(0.708 0 0)"        // Light sidebar ring
    },
    dark: {
      // Dark mode - dark UI style from the image
      background: "oklch(0.25 0 0)",         // Dark gray background
      foreground: "oklch(0.95 0 0)",         // Light text on dark background
      card: "oklch(0.28 0 0)",               // Slightly lighter card background
      cardForeground: "oklch(0.95 0 0)",     // Light text on card
      popover: "oklch(0.28 0 0)",            // Match card background for consistency
      popoverForeground: "oklch(0.95 0 0)",  // Light text on popover
      primary: "oklch(0.922 0 0)",           // Original dark mode primary
      primaryForeground: "oklch(0.205 0 0)", // Dark text on light primary
      secondary: "oklch(0.32 0 0)",          // Dark secondary
      secondaryForeground: "oklch(0.95 0 0)", // Light text on secondary
      muted: "oklch(0.3 0 0)",               // Dark muted elements
      mutedForeground: "oklch(0.7 0 0)",     // Medium-light muted text
      accent: "oklch(0.32 0 0)",             // Dark accent
      accentForeground: "oklch(0.95 0 0)",   // Light text on accent
      destructive: "oklch(0.704 0.191 22.216)", // Original destructive color
      border: "oklch(0.35 0 0)",             // Dark border
      input: "oklch(0.32 0 0)",              // Dark input background
      ring: "oklch(0.45 0 0)",               // Dark ring
      chart1: "oklch(0.488 0.243 264.376)",  // Original dark chart colors
      chart2: "oklch(0.696 0.17 162.48)",
      chart3: "oklch(0.769 0.188 70.08)",
      chart4: "oklch(0.627 0.265 303.9)",
      chart5: "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.28 0 0)",            // Very dark sidebar
      sidebarForeground: "oklch(0.95 0 0)",  // Light text on sidebar
      sidebarPrimary: "oklch(0.488 0.243 264.376)", // Original sidebar primary
      sidebarPrimaryForeground: "oklch(0.95 0 0)", // Light text on primary sidebar
      sidebarAccent: "oklch(0.269 0 0)",     // Dark sidebar accent
      sidebarAccentForeground: "oklch(0.95 0 0)", // Light text on sidebar accent
      sidebarBorder: "oklch(0.3 0 0)",       // Dark sidebar border
      sidebarRing: "oklch(0.45 0 0)"         // Dark sidebar ring
    }
  },
  borderRadius: "0.625rem",
  fontFamily: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)"
  }
}