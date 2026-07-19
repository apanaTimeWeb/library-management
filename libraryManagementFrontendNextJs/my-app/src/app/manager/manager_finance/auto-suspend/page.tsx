import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinancePlaceholderClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinancePlaceholderClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Suspend | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinancePlaceholderClient title="Auto Suspend" description="Manage Auto Suspend records and settings." />
    </ManagerFinanceErrorBoundary>
  );
}
