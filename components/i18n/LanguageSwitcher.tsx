// Path: components/i18n/LanguageSwitcher.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, isValidLocale, defaultLocale } from '@/lib/i18n/settings';
import { usePathname, useRouter, useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState(defaultLocale);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ lang: string; client: string }>();
  
  // Use useEffect to handle hydration safely
  useEffect(() => {
    setMounted(true);
    
    // Determine the current language from URL params
    const urlLang = params?.lang as string;
    
    // Set the current language based on URL or i18n instance
    if (urlLang && isValidLocale(urlLang)) {
      setCurrentLang(urlLang);
      
      // Ensure i18n language matches URL
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
    } else if (i18n.language && isValidLocale(i18n.language)) {
      setCurrentLang(i18n.language);
    }
  }, [i18n, params]);
  
  // Change language handler
  const changeLanguage = (language: string) => {
    if (!isValidLocale(language)) return;
    
    i18n.changeLanguage(language);
    setCurrentLang(language);
    setIsOpen(false);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update the URL to reflect the language change while preserving client
    if (pathname) {
      // Extract the path without the language prefix
      const pathParts = pathname.split('/');
      
      // Get the client from URL (second segment or default)
      const client = pathParts.length > 2 ? pathParts[2] : 'default';
      
      // Get the path after language and client
      const pathWithoutLangAndClient = pathParts.slice(3).join('/');
      
      // Build new URL with new language code but preserve client
      const newPath = `/${language}/${client}${pathWithoutLangAndClient ? `/${pathWithoutLangAndClient}` : ''}`;
      router.push(newPath);
    }
  };

  // While not mounted (during server rendering or first client render),
  // display a simplified button without language-specific content
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <span>🌐</span>
        <span>Language</span>
      </Button>
    );
  }

  // Once mounted (client-side only), show the actual language selector
  const currentLanguage = supportedLanguages[currentLang];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:text-foreground dark:hover:bg-primary/10 hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.nativeName}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-10 bg-card rounded-md shadow-lg p-1 min-w-[150px]">
          {Object.entries(supportedLanguages).map(([code, { nativeName, flag }]) => (
            <Button
              key={code}
              variant={code === currentLang ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start mb-1 hover:text-foreground dark:hover:bg-primary/10 hover:bg-primary/10 cursor-pointer"
              onClick={() => changeLanguage(code)}
              disabled={code === currentLang}
            >
              <span className="mr-2">{flag}</span>
              <span>{nativeName}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}