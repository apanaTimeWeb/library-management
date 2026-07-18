// RESPONSIBILITY: Next.js Server Component layout file serving as the entry point for the admin route structure.
// DATA FLOW: Next.js Router -> AdminRootLayout -> AdminRoute -> page Content

import { AdminRoute } from '@/app/admin/AdminRoute';
import { AdminRouteProps } from "@/app/admin/admin_types/admin_types";

export default function AdminRootLayout({ children }: AdminRouteProps) {
  return <AdminRoute>{children}</AdminRoute>;
}

