import { CrmRoute } from '@/app/superadmin/superadmin_crm/superadmin_crm_shared_components/CrmRoute';

export default function CrmModuleLayout({ children }: { children: React.ReactNode }) {
  return <CrmRoute>{children}</CrmRoute>;
}
