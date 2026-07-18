// RESPONSIBILITY: Entry page for the admin_finance late fees module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceLateFeesClient } from '@/app/admin/admin_finance/late-fees/admin_finance_late_fees_components/AdminFinanceLateFeesClient';

export default function LateFeesPage() {
  return <AdminFinanceLateFeesClient />;
}
