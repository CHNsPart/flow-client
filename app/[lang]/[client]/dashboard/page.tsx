'use client';

import { useState, useEffect } from 'react';
import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { getThemeInfo } from '@/lib/theme-utils';
import * as Icons from 'react-icons/ti';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { t } = useTranslationHelper();
  // const themeInfo = getThemeInfo();
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Initial content to show during server-side rendering to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {/* Avoid translations during server render */}
            Dashboard
          </h1>
          <div className="text-muted-foreground">
            <Button>
              Actions
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Skeleton placeholders to match layout */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Full content with translations after client-side hydration
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('common.navigation.dashboard')}
        </h1>
        <div className="text-muted-foreground">
          <Button>
            Action Button
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Tenants</CardTitle>
            <Icons.TiGroup className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Investors</CardTitle>
            <Icons.TiBriefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Active Loans</CardTitle>
            <Icons.TiChartPie className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">189</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border pb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Icons.TiDocumentText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Loan application #{1000 + i} submitted</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                  Pending
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}