// RESPONSIBILITY: The application shell for the admin module, wrapping children with the Sidebar and Header.
'use client';
// DATA FLOW: layout.tsx -> AdminRoute -> (AdminProvider, AdminSidebar, AdminHeader, children)

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/app/admin/admin_components/AdminSidebar/AdminSidebar';
import AdminHeader from '@/app/admin/admin_components/AdminHeader/AdminHeader';
import { AdminProvider } from '@/app/admin/admin_context/AdminContext';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

// All route prefixes that belong to admin shell
const ADMIN_ROUTE_PREFIXES = [
  ADMIN_ROUTES.PREFIX
];

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdminRoute = ADMIN_ROUTE_PREFIXES.some(r => pathname.startsWith(r));
  if (!isAdminRoute) return <>{children}</>;

  const sidebarWidth = collapsed ? 60 : 240;

  return (
    <AdminProvider>
      <div className="admin-theme flex min-h-screen relative w-full bg-bg-card text-foreground overflow-x-hidden">
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        
        <div
          className="flex flex-col flex-1 min-w-0 transition-all duration-300 ml-[length:var(--ml)]" style={{ '--ml': sidebarWidth } as React.CSSProperties}
        >
        <AdminHeader
          sidebarWidth={sidebarWidth}
          onMobileOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </AdminProvider>
  );
}
