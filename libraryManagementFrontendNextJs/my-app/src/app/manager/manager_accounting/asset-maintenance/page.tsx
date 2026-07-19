import { ManagerAccountingErrorBoundary } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingErrorBoundary';
import { ManagerAccountingAssetMaintenanceClient } from '@/app/manager/manager_accounting/manager_accounting_components/ManagerAccountingAssetMaintenanceClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asset Maintenance | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerAccountingErrorBoundary>
      <ManagerAccountingAssetMaintenanceClient />
    </ManagerAccountingErrorBoundary>
  );
}
