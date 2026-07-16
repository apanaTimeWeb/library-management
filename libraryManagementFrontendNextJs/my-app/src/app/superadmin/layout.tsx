import { SuperadminRoute } from '@/app/superadmin/superadmin_shared_components/SuperadminRoute';

export default function SuperAdminRootLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminRoute>{children}</SuperadminRoute>;
}
