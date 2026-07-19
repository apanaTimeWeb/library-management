import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinancePlaceholderClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinancePlaceholderClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust Score | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinancePlaceholderClient title="Trust Score" description="Manage Trust Score records and settings." />
    </ManagerFinanceErrorBoundary>
  );
}
