'use client';
// RESPONSIBILITY: Renders the SuperadminRoute component.
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/app/superadmin/superadmin_shared_components/SuperadminSidebar';
import Header from '@/app/superadmin/superadmin_shared_components/SuperadminHeader';
import { getCurrentUser } from '@/lib/auth';

// ALL system routes â€” including ones previously missing from the guard
const SYSTEM_ROUTES = [
  '/superadmin',
];

const ALLOWED_ROLES = ['admin', 'superadmin'];

export function SuperadminSystemRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const isSuperadminRoute = pathname.startsWith('/superadmin');

  useEffect(() => {
    if (!isSuperadminRoute) {
      setIsVerified(true);
      return;
    }

    // Client-side backup check (middleware is the real guard)
    const user = getCurrentUser();
    if (!user) {
      router.replace(`/auth/login?returnTo=${encodeURIComponent(pathname)}&reason=unauthenticated`);
      return;
    }
    if (!ALLOWED_ROLES.includes(user.role)) {
      router.replace('/403');
      return;
    }
    setIsVerified(true);
  }, [pathname, isSuperadminRoute, router]);

  if (!isSuperadminRoute) return <>{children}</>;
  if (!isVerified) return null;

  const sidebarWidth = collapsed ? 60 : 240;

  return (
    <div className="flex min-h-screen relative w-full bg-page text-text-primary overflow-x-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ml-0 ${collapsed ? 'md:ml-[60px]' : 'md:ml-[240px]'}`}>
        <Header sidebarWidth={sidebarWidth} onMobileOpen={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 md:pt-24 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
