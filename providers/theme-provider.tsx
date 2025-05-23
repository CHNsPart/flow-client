// Path: providers/theme-provider.tsx
'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useParams } from "next/navigation"
import { getThemeForClient } from "@/config/themes"

/**
 * CSS variable generation function
 * Converts theme colors to CSS variables
 */
const generateCssVariables = (clientId: string) => {
  const theme = getThemeForClient(clientId);
  
  // Process keys with camelCase pattern (e.g., primaryForeground -> primary-foreground)
  const formatKey = (key: string) => 
    key.replace(/([A-Z])/g, "-$1").toLowerCase();
  
  const lightVars = Object.entries(theme.colors.light).map(
    ([key, value]) => `--${formatKey(key)}: ${value};`
  ).join("\n")
  
  const darkVars = Object.entries(theme.colors.dark).map(
    ([key, value]) => `--${formatKey(key)}: ${value};`
  ).join("\n")

  return {
    light: lightVars,
    dark: darkVars,
    borderRadius: theme.borderRadius
  }
}

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
}

/**
 * Theme Provider Component
 * Applies the selected theme throughout the application and handles theme switching
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  
  // Get client ID from URL params
  const params = useParams<{ client: string }>();
  const urlClientId = params?.client || "default";
  
  // Get theme ID from environment variable
  const envThemeId = process.env.NEXT_PUBLIC_THEME;
  
  // Use environment variable theme ID if set, otherwise use client ID from URL
  // This ensures that the NEXT_PUBLIC_THEME environment variable takes precedence
  const effectiveClientId = envThemeId || urlClientId;
  
  const cssVars = generateCssVariables(effectiveClientId);

  // Prevent hydration mismatch by only rendering theme styles after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      {mounted && (
        <style jsx global>{`
          :root {
            --radius: ${cssVars.borderRadius};
            ${cssVars.light}
          }
          
          .dark {
            ${cssVars.dark}
          }
        `}</style>
      )}
      {children}
    </NextThemesProvider>
  )
}