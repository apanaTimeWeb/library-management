import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceRefundsClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceRefundsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refunds | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceRefundsClient />
    </ManagerFinanceErrorBoundary>
  );
}
