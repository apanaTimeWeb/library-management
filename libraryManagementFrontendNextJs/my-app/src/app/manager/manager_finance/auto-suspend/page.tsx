import { Suspense } from 'react';
import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceAutoSuspendClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceAutoSuspendClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Suspend | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
        <ManagerFinanceAutoSuspendClient />
      </Suspense>
</ManagerFinanceErrorBoundary>
  );
}
