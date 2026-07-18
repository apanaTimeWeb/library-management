// RESPONSIBILITY: Entry page for the admin_finance module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceDashboardClient } from '@/app/admin/admin_finance/finance-dashboard/admin_finance_dashboard_components/AdminFinanceDashboardClient';

export default function DashboardPage() {
  return <AdminFinanceDashboardClient />;
}
