'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLangParam } from '@/providers/LangParamProvider';

export default function Home() {
  const router = useRouter();
  const lang = useLangParam();
  
  useEffect(() => {
    // Redirect to dashboard page
    router.replace(`/${lang}/dashboard`);
  }, [router, lang]);
  
  return null;
}