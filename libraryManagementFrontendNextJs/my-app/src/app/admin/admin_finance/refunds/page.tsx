// RESPONSIBILITY: Entry page for the admin_finance refunds module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceRefundsClient } from '@/app/admin/admin_finance/refunds/admin_finance_refunds_components/FinanceRefundsClient';

export default function RefundsPage() {
  return <FinanceRefundsClient />;
}
