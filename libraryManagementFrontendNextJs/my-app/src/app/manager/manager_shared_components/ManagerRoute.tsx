'use client';
// RESPONSIBILITY: Auth guard and shell wrapper for all /manager/* routes. Renders sidebar + header layout.

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ManagerSidebar from '@/app/manager/manager_shared_components/ManagerSidebar';
import ManagerHeader from '@/app/manager/manager_shared_components/ManagerHeader';

const MANAGER_ROUTES = [
  '/manager',
];

export function ManagerRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isManagerRoute = MANAGER_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/') || pathname.startsWith(r));
  if (!isManagerRoute) return <>{children}</>;

  const sidebarWidth = collapsed ? 60 : 240;

  return (
    <div className="flex min-h-screen relative w-full bg-bg-pageg-page text-text-primary overflow-x-hidden">
      <ManagerSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${collapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <ManagerHeader
          collapsed={collapsed}
          onMobileOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 md:pt-24 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
