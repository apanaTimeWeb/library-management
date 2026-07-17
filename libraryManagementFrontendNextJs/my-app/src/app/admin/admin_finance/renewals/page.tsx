// RESPONSIBILITY: Entry page for the admin_finance renewals module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceRenewalsClient } from '@/app/admin/admin_finance/renewals/admin_finance_renewals_components/FinanceRenewalsClient';

export default function RenewalsPage() {
  return <FinanceRenewalsClient />;
}
