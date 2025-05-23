// Path: app/page.tsx
'use client';

import { defaultLocale } from '@/lib/i18n/settings';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Get theme from environment variable or default
    const envThemeClient = process.env.NEXT_PUBLIC_THEME || 'default';
    
    // Redirect to the default locale with the theme client
    window.location.href = `/${defaultLocale}/${envThemeClient}/dashboard`;
  }, []);
  
  // Render a loading state
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}