import { SuperadminAccountingRoute } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_shared_components/SuperadminAccountingRoute';

export default function AccountingModuleLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminAccountingRoute>{children}</SuperadminAccountingRoute>;
}
