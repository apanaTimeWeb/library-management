import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceCollectFeeClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceCollectFeeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collect Fee | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceCollectFeeClient />
    </ManagerFinanceErrorBoundary>
  );
}
