// RESPONSIBILITY: Entry page for the admin_finance referrals module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceReferralsClient } from './admin_finance_referrals_components/FinanceReferralsClient';

export default function ReferralsPage() {
  return <FinanceReferralsClient />;
}
