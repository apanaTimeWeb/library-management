// RESPONSIBILITY: Server Component entry page for financial reports (`Rule 8`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminAccountingFinancialReportsClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingFinancialReportsClient } from '@/app/admin/admin_accounting/financial-reports/admin_accounting_financial_reports_components/AdminAccountingFinancialReportsClient';

export default function FinancialReportsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Financial Reports...</div>}>
      <AdminAccountingFinancialReportsClient />
    </Suspense>
  );
}
