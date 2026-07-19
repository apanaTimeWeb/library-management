import { ManagerFinanceErrorBoundary } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceErrorBoundary';
import { ManagerFinanceInvoiceClient } from '@/app/manager/manager_finance/manager_finance_components/ManagerFinanceInvoiceClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Smart Library 360',
};

export default function Page() {
  return (
    <ManagerFinanceErrorBoundary>
      <ManagerFinanceInvoiceClient />
    </ManagerFinanceErrorBoundary>
  );
}
