// /app/[lang]/root-layout.tsx
import ClientLayout from './client-layout';
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { Shell } from '@/components/layout/Shell';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LangRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <ThemeProvider defaultTheme="system">
        <ClientLayout>
          <Shell>
            {children}
          </Shell>
        </ClientLayout>
      </ThemeProvider>
    </div>
  );
}