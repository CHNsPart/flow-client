import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { activeSiteConfig } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// console.log(activeSiteConfig)

export const metadata: Metadata = {
  title: {
    default: activeSiteConfig.name,
    template: `%s | ${activeSiteConfig.name}`,
  },
  description: activeSiteConfig.description,
  keywords: ["Loan Management", "Flow Hub", "LMS"],
  authors: [
    {
      name: activeSiteConfig.company.name,
      url: activeSiteConfig.url,
    },
  ],
  creator: activeSiteConfig.company.name,
  openGraph: {
    type: "website",
    locale: activeSiteConfig.defaultLocale,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={activeSiteConfig.defaultLocale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}