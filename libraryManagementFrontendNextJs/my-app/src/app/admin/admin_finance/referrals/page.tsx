// RESPONSIBILITY: Entry page for the admin_finance referrals module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceReferralsClient } from '@/app/admin/admin_finance/referrals/admin_finance_referrals_components/AdminFinanceReferralsClient';

export default function ReferralsPage() {
  return <AdminFinanceReferralsClient />;
}
