// RESPONSIBILITY: Entry page for the admin_finance collect-fee module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceCollectFeeClient } from '@/app/admin/admin_finance/collect-fee/admin_finance_collect_fee_components/AdminFinanceCollectFeeClient';

export default function CollectFeePage() {
  return <AdminFinanceCollectFeeClient />;
}
