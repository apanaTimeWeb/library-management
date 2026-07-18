// RESPONSIBILITY: Entry page for the admin_finance subscriptions module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceSubscriptionsClient } from '@/app/admin/admin_finance/subscriptions/admin_finance_subscriptions_components/AdminFinanceSubscriptionsClient';

export default function SubscriptionsPage() {
  return <AdminFinanceSubscriptionsClient />;
}
