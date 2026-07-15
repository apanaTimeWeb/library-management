import { SuperadminRoute } from '@/app/superadmin/SuperadminRoute';

export default function SuperAdminRootLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminRoute>{children}</SuperadminRoute>;
}
