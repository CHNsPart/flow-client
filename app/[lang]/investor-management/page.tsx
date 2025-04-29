'use client';

// import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvestorManagementPage() {
  // const { t } = useTranslationHelper();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Investor Management
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Investors Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Investor Management page.</p>
        </CardContent>
      </Card>
    </div>
  );
}