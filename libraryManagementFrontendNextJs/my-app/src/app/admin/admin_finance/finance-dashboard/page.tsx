// RESPONSIBILITY: Entry page for the admin_finance module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceDashboardClient } from '@/app/admin/admin_finance/finance-dashboard/admin_finance_dashboard_components/FinanceDashboardClient';

export default function DashboardPage() {
  return <FinanceDashboardClient />;
}
