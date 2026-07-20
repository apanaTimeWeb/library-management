import { Suspense } from 'react';
import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceReceiptClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceReceiptClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receipt | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
        <ManagerFinanceReceiptClient />
      </Suspense>
</ManagerFinanceErrorBoundary>
  );
}
