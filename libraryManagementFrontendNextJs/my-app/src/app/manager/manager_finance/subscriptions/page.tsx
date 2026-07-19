import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceSubscriptionsClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceSubscriptionsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscriptions | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceSubscriptionsClient />
    </ManagerFinanceErrorBoundary>
  );
}
