"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getThemeInfo } from "@/lib/theme-utils"

/**
 * Theme Display Component
 * Shows current theme information and a theme toggle button
 */
export function ThemeDisplay() {
  const { theme, setTheme } = useTheme()
  const themeInfo = getThemeInfo()
  const { siteConfig } = themeInfo
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch by only rendering theme-dependent elements after mount
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <Card className="w-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-left text-lg">{themeInfo.name}</CardTitle>
        </div>
        {/* Company Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center bg-card rounded-md border">
            <Image 
              src={siteConfig.company.logo} 
              alt={`${siteConfig.company.name} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          {/* Favicon */}
          <div className="relative w-6 h-6 flex items-center justify-center bg-card rounded-md border">
            <Image 
              src={siteConfig.company.favicon} 
              alt="Favicon"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company info section */}
        <div className="flex items-center border-b pb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{siteConfig.company.name}</h3>
            <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>
        </div>
        
        {/* Theme details section */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 justify-between w-full">
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Site Name</div>
          <div className="text-left">{siteConfig.name}</div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Company</div>
          <div className="text-left">{themeInfo.company}</div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Theme ID</div>
          <div className="text-left">{themeInfo.id}</div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Default Locale</div>
          <div className="text-left">{siteConfig.defaultLocale}</div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Supported Locales</div>
          <div className="text-left">{siteConfig.supportedLocales.join(", ")}</div>
          
          {mounted && (
            <>
              <div className="font-medium dark:text-white/50 text-black/50 text-left">Mode</div>
              <div className="text-left">{theme}</div>
            </>
          )}
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Primary Color</div>
          <div className="flex items-center gap-2 justify-start">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            <span className="text-xs font-mono font-medium">var(--primary)</span>
          </div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Sidebar Background</div>
          <div className="flex items-center gap-2 justify-start">
            <div className="w-4 h-4 rounded-full bg-sidebar"></div>
            <span className="text-xs font-mono font-medium">var(--color-sidebar)</span>
          </div>

          <div className="font-medium dark:text-white/50 text-black/50 text-left">Sidebar Color</div>
          <div className="flex items-center gap-2 justify-start">
            <div className="w-4 h-4 rounded-full bg-sidebar-primary"></div>
            <span className="text-xs font-mono font-medium">var(--color-sidebar-primary)</span>
          </div>
          
          <div className="font-medium dark:text-white/50 text-black/50 text-left">Accent Color</div>
          <div className="flex items-center gap-2 justify-start">
            <div className="w-4 h-4 rounded-full bg-accent"></div>
            <span className="text-xs font-mono font-medium">var(--accent)</span>
          </div>
        </div>
        
        {/* Color showcase */}
        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-2">Theme Colors</p>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col items-center">
              <div className="h-10 w-full rounded-md bg-primary mb-1" />
              <span className="text-xs">Primary</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-full rounded-md bg-secondary mb-1" />
              <span className="text-xs">Secondary</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-full rounded-md bg-accent mb-1" />
              <span className="text-xs">Accent</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-full rounded-md bg-muted mb-1" />
              <span className="text-xs">Muted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-full rounded-md bg-destructive mb-1" />
              <span className="text-xs">Destructive</span>
            </div>
          </div>
        </div>
        
        {/* Feature flags */}
        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-2">Feature Flags</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(siteConfig.featureFlags).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Theme toggle button */}
        {mounted && (
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full mt-2"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        )}
      </CardContent>
    </Card>
  )
}