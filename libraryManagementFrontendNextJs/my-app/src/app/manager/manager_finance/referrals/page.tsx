import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceReferralsClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceReferralsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referrals | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceReferralsClient />
    </ManagerFinanceErrorBoundary>
  );
}
