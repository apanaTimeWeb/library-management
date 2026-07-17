// RESPONSIBILITY: Entry page for the admin_finance subscriptions module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceSubscriptionsClient } from '@/app/admin/admin_finance/subscriptions/admin_finance_subscriptions_components/FinanceSubscriptionsClient';

export default function SubscriptionsPage() {
  return <FinanceSubscriptionsClient />;
}
