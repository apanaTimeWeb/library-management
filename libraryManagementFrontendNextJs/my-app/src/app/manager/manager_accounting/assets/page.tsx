import { ManagerAccountingErrorBoundary } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingErrorBoundary';
import { ManagerAccountingAssetsClient } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingAssetsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assets | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerAccountingErrorBoundary>
      <ManagerAccountingAssetsClient />
    </ManagerAccountingErrorBoundary>
  );
}
