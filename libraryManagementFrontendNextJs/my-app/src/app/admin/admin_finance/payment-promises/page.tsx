import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminFinancePaymentPromisesClient } from '@/app/admin/admin_finance/payment-promises/admin_finance_payment_promises_components/AdminFinancePaymentPromisesClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinancePaymentPromisesClient />
    </Suspense>
  );
}
