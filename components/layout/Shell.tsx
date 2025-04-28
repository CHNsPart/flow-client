'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Button } from '@/components/ui/button';
import { TiAdjustBrightness, TiAdjustContrast } from 'react-icons/ti';
import { useTheme } from 'next-themes';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { t } = useTranslationHelper();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, set mounted to true to enable theme-dependent rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-card border-b border-border h-16 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{mounted ? t('common.app.name') : 'Flow Hub'}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - only render fully after client-side mount */}
            {mounted ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:text-primary dark:hover:bg-primary/10 hover:bg-primary/10"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <TiAdjustBrightness className="h-5 w-5" />
                ) : (
                  <TiAdjustContrast className="h-5 w-5" />
                )}
              </Button>
            ) : (
              // Simple placeholder during server render - no attributes that depend on theme
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Toggle theme"
              >
                <TiAdjustContrast className="h-5 w-5" />
              </Button>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}