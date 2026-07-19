import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinancePaymentPromisesClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinancePaymentPromisesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Promises | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinancePaymentPromisesClient />
    </ManagerFinanceErrorBoundary>
  );
}
