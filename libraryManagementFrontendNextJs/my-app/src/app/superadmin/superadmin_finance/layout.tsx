// RESPONSIBILITY: Component or Page.
import { SuperadminFinanceRoute } from '@/app/superadmin/superadmin_finance/superadmin_finance_shared_components/SuperadminFinanceRoute';

export default function FinanceModuleLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminFinanceRoute>{children}</SuperadminFinanceRoute>;
}
