import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_finance invoices module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceInvoiceClient } from '@/app/admin/admin_finance/invoice/admin_finance_invoice_components/AdminFinanceInvoiceClient';

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinanceInvoiceClient />
    </Suspense>
  );
}
