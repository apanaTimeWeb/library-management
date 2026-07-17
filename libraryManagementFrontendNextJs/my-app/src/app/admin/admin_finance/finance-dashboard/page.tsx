// RESPONSIBILITY: Entry page for the admin_finance module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceDashboardClient } from './admin_finance_dashboard_components/FinanceDashboardClient';

export default function DashboardPage() {
  return <FinanceDashboardClient />;
}
