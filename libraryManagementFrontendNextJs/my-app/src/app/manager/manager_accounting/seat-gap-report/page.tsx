import { ManagerAccountingErrorBoundary } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingErrorBoundary';
import { ManagerAccountingSeatGapClient } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingSeatGapClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seat Gap Report | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerAccountingErrorBoundary>
      <ManagerAccountingSeatGapClient />
    </ManagerAccountingErrorBoundary>
  );
}
