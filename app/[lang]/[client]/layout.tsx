// Path: app/[lang]/[client]/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { validClients } from '@/config';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const params = useParams<{ lang: string; client: string }>();
  
  // Extract params with proper null checks
  const lang = params?.lang || 'en';
  const urlClient = params?.client || 'default';
  
  // Get theme from environment variable
  const envThemeClient = process.env.NEXT_PUBLIC_THEME;
  
  // Redirect if environment theme is set and different from URL client
  useEffect(() => {
    if (envThemeClient && envThemeClient !== urlClient && validClients.includes(envThemeClient)) {
      // Extract the path after language and client
      const pathSegments = window.location.pathname.split('/').slice(3);
      const remainingPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
      
      // Redirect to the same page but with the environment theme client
      router.replace(`/${lang}/${envThemeClient}${remainingPath}`);
    }
  }, [envThemeClient, lang, router, urlClient]);
  
  // Return 404 if client is not valid
  if (!validClients.includes(urlClient)) {
    return notFound();
  }
  
  return (
    <Shell>
      {children}
    </Shell>
  );
}