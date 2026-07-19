import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceRenewalsClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceRenewalsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renewals | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceRenewalsClient />
    </ManagerFinanceErrorBoundary>
  );
}
