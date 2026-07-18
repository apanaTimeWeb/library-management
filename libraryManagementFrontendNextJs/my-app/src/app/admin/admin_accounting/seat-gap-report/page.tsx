// RESPONSIBILITY: Server Component entry page for seat gap report (`Rule 8`).
// DATA FLOW: Next.js App Router -> Server page -> AdminAccountingSeatGapReportClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingSeatGapReportClient } from '@/app/admin/admin_accounting/seat-gap-report/admin_accounting_seat_gap_report_components/AdminAccountingSeatGapReportClient';

export default function SeatGapReportPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Report...</div>}>
      <AdminAccountingSeatGapReportClient />
    </Suspense>
  );
}
