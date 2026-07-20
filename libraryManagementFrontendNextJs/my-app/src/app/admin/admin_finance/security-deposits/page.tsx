import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_finance security-deposits module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceSecurityDepositsClient } from '@/app/admin/admin_finance/security-deposits/admin_finance_security_deposits_components/AdminFinanceSecurityDepositsClient';

export default function SecurityDepositsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinanceSecurityDepositsClient />
    </Suspense>
  );
}
