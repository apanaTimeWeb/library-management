import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceLateFeesClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceLateFeesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Late Fees | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceLateFeesClient />
    </ManagerFinanceErrorBoundary>
  );
}
