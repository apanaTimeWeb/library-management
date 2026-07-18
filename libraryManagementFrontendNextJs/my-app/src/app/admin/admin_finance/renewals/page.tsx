// RESPONSIBILITY: Entry page for the admin_finance renewals module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceRenewalsClient } from '@/app/admin/admin_finance/renewals/admin_finance_renewals_components/AdminFinanceRenewalsClient';

export default function RenewalsPage() {
  return <AdminFinanceRenewalsClient />;
}
