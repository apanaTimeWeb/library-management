import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_finance late fees module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceLateFeesClient } from '@/app/admin/admin_finance/late-fees/admin_finance_late_fees_components/AdminFinanceLateFeesClient';

export default function LateFeesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinanceLateFeesClient />
    </Suspense>
  );
}
