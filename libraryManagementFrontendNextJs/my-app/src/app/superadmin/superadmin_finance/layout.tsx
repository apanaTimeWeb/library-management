import { FinanceRoute } from '@/app/superadmin/superadmin_finance/superadmin_finance_shared_components/FinanceRoute';

export default function FinanceModuleLayout({ children }: { children: React.ReactNode }) {
  return <FinanceRoute>{children}</FinanceRoute>;
}
