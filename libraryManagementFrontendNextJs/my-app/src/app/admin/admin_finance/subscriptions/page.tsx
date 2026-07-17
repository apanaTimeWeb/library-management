// RESPONSIBILITY: Entry page for the admin_finance subscriptions module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceSubscriptionsClient } from './admin_finance_subscriptions_components/FinanceSubscriptionsClient';

export default function SubscriptionsPage() {
  return <FinanceSubscriptionsClient />;
}
