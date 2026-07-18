// RESPONSIBILITY: Entry page for the admin_finance refunds module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceRefundsClient } from '@/app/admin/admin_finance/refunds/admin_finance_refunds_components/AdminFinanceRefundsClient';

export default function RefundsPage() {
  return <AdminFinanceRefundsClient />;
}
