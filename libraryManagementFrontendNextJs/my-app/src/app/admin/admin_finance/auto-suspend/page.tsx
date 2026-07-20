import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_finance auto-suspend module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceAutoSuspendClient } from '@/app/admin/admin_finance/auto-suspend/admin_finance_auto_suspend_components/AdminFinanceAutoSuspendClient';

export default function AutoSuspendPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinanceAutoSuspendClient />
    </Suspense>
  );
}
