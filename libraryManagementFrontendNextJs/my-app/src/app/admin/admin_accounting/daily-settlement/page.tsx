// RESPONSIBILITY: Server Component entry page for daily settlement (`Rule 8`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminAccountingDailySettlementClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingDailySettlementClient } from '@/app/admin/admin_accounting/daily-settlement/admin_accounting_daily_settlement_components/AdminAccountingDailySettlementClient';

export default function DailySettlementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Daily Settlement...</div>}>
      <AdminAccountingDailySettlementClient />
    </Suspense>
  );
}
