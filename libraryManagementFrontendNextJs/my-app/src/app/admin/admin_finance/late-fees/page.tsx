// RESPONSIBILITY: Entry page for the admin_finance late fees module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceLateFeesClient } from './admin_finance_late_fees_components/FinanceLateFeesClient';

export default function LateFeesPage() {
  return <FinanceLateFeesClient />;
}
