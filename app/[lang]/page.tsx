// Path: app/[lang]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LangHomePage() {
  const params = useParams<{ lang: string }>();
  
  useEffect(() => {
    // Extract lang with proper null check for NextJS 15
    const lang = params?.lang || 'en';
    
    // Get theme from environment variable or default
    const envThemeClient = process.env.NEXT_PUBLIC_THEME || 'default';
    
    // Redirect to the dashboard with the theme client
    window.location.href = `/${lang}/${envThemeClient}/dashboard`;
  }, [params]);
  
  // Render a loading state
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}