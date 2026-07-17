// RESPONSIBILITY: Entry page for the admin_finance collect-fee module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceCollectFeeClient } from './admin_finance_collect_fee_components/FinanceCollectFeeClient';

export default function CollectFeePage() {
  return <FinanceCollectFeeClient />;
}
