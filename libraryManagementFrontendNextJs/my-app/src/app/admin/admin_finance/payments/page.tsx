// RESPONSIBILITY: Entry page for the admin_finance payments module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinancePaymentsClient } from '@/app/admin/admin_finance/payments/admin_finance_payments_components/FinancePaymentsClient';

export default function PaymentsPage() {
  return <FinancePaymentsClient />;
}
