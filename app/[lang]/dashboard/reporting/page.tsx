'use client';

// import { useTranslationHelper } from '@/hooks/use-translation-helper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportingPage() {
  // const { t } = useTranslationHelper();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Reporting
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Reporting page.</p>
        </CardContent>
      </Card>
    </div>
  );
}