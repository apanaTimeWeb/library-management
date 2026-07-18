// RESPONSIBILITY: Component or Page.
import { SuperadminSystemRoute } from '@/app/superadmin/superadmin_shared_components/SuperadminRoute';

export default function SuperAdminRootLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminSystemRoute>{children}</SuperadminSystemRoute>;
}
