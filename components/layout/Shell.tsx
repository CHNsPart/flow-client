// File: components/layout/Shell.tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Button } from '@/components/ui/button';
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti';
import { useTheme } from 'next-themes';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { Sidebar, SidebarTrigger } from './sidebar';
import { 
  SidebarProvider, 
  SidebarInset
} from '@/components/ui/sidebar';

interface ShellProps {
  children: ReactNode;
}

function ShellContent({ children }: { children: ReactNode }) {
  const { t } = useTranslationHelper();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, set mounted to true to enable theme-dependent rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex flex-1 overflow-hidden w-full">
        <Sidebar />
        
        <SidebarInset>
          <header className={cn(
            "h-16 border-b border-border flex items-center justify-between sticky top-0 z-20 bg-card px-4"
          )}>
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              
              <h1 className="text-xl font-semibold">{mounted ? t('common.app.name') : 'Flow Hub'}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle - ensure consistent class between server and client */}
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:text-foreground dark:hover:bg-primary/10 hover:bg-primary/10 cursor-pointer"
                onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {mounted && theme === 'dark' ? (
                  <TiAdjustBrightness className="h-5 w-5" />
                ) : (
                  <TiAdjustContrast className="h-5 w-5" />
                )}
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </>
  );
}

export function Shell({ children }: ShellProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-background w-full">
        <ShellContent>{children}</ShellContent>
      </div>
    </SidebarProvider>
  );
}

function cn(...inputs: (string | boolean | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}