// RESPONSIBILITY: Entry page for the admin_finance payments module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinancePaymentsClient } from '@/app/admin/admin_finance/payments/admin_finance_payments_components/AdminFinancePaymentsClient';

export default function PaymentsPage() {
  return <AdminFinancePaymentsClient />;
}
