import { AccountingRoute } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_shared_components/AccountingRoute';

export default function AccountingModuleLayout({ children }: { children: React.ReactNode }) {
  return <AccountingRoute>{children}</AccountingRoute>;
}
