import { ManagerAccountingErrorBoundary } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingErrorBoundary';
import { ManagerAccountingDailySettlementClient } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingDailySettlementClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Settlement | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerAccountingErrorBoundary>
      <ManagerAccountingDailySettlementClient />
    </ManagerAccountingErrorBoundary>
  );
}
