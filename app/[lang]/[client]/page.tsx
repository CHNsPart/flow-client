// Path: app/[lang]/[client]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ClientHomePage() {
  const router = useRouter();
  const params = useParams<{ lang: string; client: string }>();
  
  useEffect(() => {
    // Extract params with proper null checks for NextJS 15
    const lang = params?.lang || 'en';
    const client = params?.client || 'default';
    
    // Redirect to dashboard page
    router.replace(`/${lang}/${client}/dashboard`);
  }, [router, params]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}