// RESPONSIBILITY: Entry page for the admin_finance auto-suspend module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceAutoSuspendClient } from '@/app/admin/admin_finance/auto-suspend/admin_finance_auto_suspend_components/FinanceAutoSuspendClient';

export default function AutoSuspendPage() {
  return <FinanceAutoSuspendClient />;
}
