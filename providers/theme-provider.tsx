'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { activeTheme } from "@/config/themes"

/**
 * CSS variable generation function
 * Converts theme colors to CSS variables
 */
const generateCssVariables = () => {
  // Process keys with camelCase pattern (e.g., primaryForeground -> primary-foreground)
  const formatKey = (key: string) => 
    key.replace(/([A-Z])/g, "-$1").toLowerCase();
  
  const lightVars = Object.entries(activeTheme.colors.light).map(
    ([key, value]) => `--${formatKey(key)}: ${value};`
  ).join("\n")
  
  const darkVars = Object.entries(activeTheme.colors.dark).map(
    ([key, value]) => `--${formatKey(key)}: ${value};`
  ).join("\n")

  return {
    light: lightVars,
    dark: darkVars
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
  const cssVars = generateCssVariables()

  // Prevent hydration mismatch by only rendering theme styles after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      {mounted && (
        <style jsx global>{`
          :root {
            --radius: ${activeTheme.borderRadius};
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