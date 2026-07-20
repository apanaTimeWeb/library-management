import { Suspense } from 'react';
import { ManagerAccountingErrorBoundary } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingErrorBoundary';
import { ManagerAccountingAssetsClient } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingAssetsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assets | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerAccountingErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
        <ManagerAccountingAssetsClient />
      </Suspense>
</ManagerAccountingErrorBoundary>
  );
}
