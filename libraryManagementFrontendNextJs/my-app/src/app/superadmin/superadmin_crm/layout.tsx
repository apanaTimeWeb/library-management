// RESPONSIBILITY: Component or Page.
import { SuperadminCrmRoute } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/SuperadminCrmRoute';

export default function CrmModuleLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminCrmRoute>{children}</SuperadminCrmRoute>;
}
