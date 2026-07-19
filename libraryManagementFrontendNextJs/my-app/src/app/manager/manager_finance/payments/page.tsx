import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinancePaymentsClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinancePaymentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payments Overview | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinancePaymentsClient />
    </ManagerFinanceErrorBoundary>
  );
}
