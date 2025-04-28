'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LangHomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard without relying on useLangParam
    const lang = window.location.pathname.split('/')[1] || 'en';
    router.replace(`/${lang}/dashboard`);
  }, [router]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}