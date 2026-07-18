// RESPONSIBILITY: Server Component entry page for shift gap analyzer (`Rule 8`).
// DATA FLOW: Next.js App Router -> Server page -> AdminAccountingShiftGapAnalyzerClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingShiftGapAnalyzerClient } from '@/app/admin/admin_accounting/shift-gap-analyzer/admin_accounting_shift_gap_analyzer_components/AdminAccountingShiftGapAnalyzerClient';

export default function ShiftGapAnalyzerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Analyzer...</div>}>
      <AdminAccountingShiftGapAnalyzerClient />
    </Suspense>
  );
}
