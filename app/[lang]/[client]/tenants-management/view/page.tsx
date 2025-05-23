'use client';

// import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TenantsManagementPage() {
  // const { t } = useTranslationHelper();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Tenants Management
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tenants View</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Tenants View page.</p>
        </CardContent>
      </Card>
    </div>
  );
}