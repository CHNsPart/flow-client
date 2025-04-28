// /app/[lang]/layout.tsx
import { ReactNode } from 'react'
import { defaultLocale, locales } from '@/lib/i18n/settings'
import { activeSiteConfig } from '@/config'
import type { Metadata } from 'next'
import { I18nProvider } from "@/providers/i18n-provider" 
import { ThemeProvider } from '@/providers/theme-provider'
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate static params for all supported languages
export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

// Fixed metadata that doesn't depend on the dynamic route
export const metadata: Metadata = {
  title: {
    default: activeSiteConfig.name,
    template: `%s | ${activeSiteConfig.name}`,
  },
  description: activeSiteConfig.description,
  keywords: ["Loan Management", "Flow Hub", "LMS"],
  // Ensure metadataBase is properly set with a fallback
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    activeSiteConfig.url || 
    "http://localhost:3000"
  ),
  authors: [
    {
      name: activeSiteConfig.company.name,
      url: activeSiteConfig.url,
    },
  ],
  creator: activeSiteConfig.company.name,
  openGraph: {
    type: "website",
    url: activeSiteConfig.url,
    title: activeSiteConfig.name,
    description: activeSiteConfig.description,
    siteName: activeSiteConfig.name,
    images: [
      {
        url: activeSiteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: activeSiteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: activeSiteConfig.name,
    description: activeSiteConfig.description,
    images: [activeSiteConfig.ogImage],
    creator: activeSiteConfig.company.name,
  },
  icons: {
    icon: activeSiteConfig.company.favicon,
    shortcut: activeSiteConfig.company.favicon,
    apple: activeSiteConfig.company.favicon,
  },
  manifest: `${activeSiteConfig.url}/site.webmanifest`,
}

export default function LangLayout({
  children,
}: {
  children: ReactNode
}) {
  // Use the locale from static context
  // In Next.js 15, we don't access params.lang directly in the server component
  return (
    <I18nProvider locale={defaultLocale}>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </div>
    </I18nProvider>
  )
}