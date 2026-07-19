import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceTrustScoreClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceTrustScoreClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust Score | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceTrustScoreClient />
    </ManagerFinanceErrorBoundary>
  );
}
