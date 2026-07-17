// RESPONSIBILITY: Entry page for the admin_finance security-deposits module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceSecurityDepositsClient } from './admin_finance_security_deposits_components/FinanceSecurityDepositsClient';

export default function SecurityDepositsPage() {
  return <FinanceSecurityDepositsClient />;
}
