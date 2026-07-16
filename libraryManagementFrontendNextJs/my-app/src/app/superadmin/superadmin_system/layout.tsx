import { SuperadminSystemRoute } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSystemRoute';

export default function SystemModuleLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminSystemRoute>{children}</SuperadminSystemRoute>;
}
