// RESPONSIBILITY: Renders the SuperadminSidebar component.
'use client';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, BarChart2, History,
  FileText, Building2, LogOut, Menu, X, type LucideIcon, IndianRupee,
  Activity, LifeBuoy, Settings
} from 'lucide-react';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import {
  SuperadminDialog,
  SuperadminDialogContent,
  SuperadminDialogDescription,
  SuperadminDialogHeader,
  SuperadminDialogTitle,
} from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminDialog';



const NAV: any[] = [
  { href: SUPERADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { href: SUPERADMIN_ROUTES.LIBRARIES, icon: Building2, label: 'Libraries' },
  { href: SUPERADMIN_ROUTES.SUBSCRIPTIONS, icon: FileText, label: 'Subscriptions' },
  { href: SUPERADMIN_ROUTES.BILLING, icon: IndianRupee, label: 'Billing' },
  { href: SUPERADMIN_ROUTES.REPORTS, icon: BarChart2, label: 'Reports' },
  { group: 'Monitoring & Support' },
  { href: SUPERADMIN_ROUTES.SYSTEM_HEALTH, icon: Activity, label: 'System Health' },
  { href: SUPERADMIN_ROUTES.AUDIT_LOGS, icon: History, label: 'Audit Logs' },
  { href: SUPERADMIN_ROUTES.SUPPORT_TICKETS, icon: LifeBuoy, label: 'Support Tickets' },
  { group: 'System' },
  { href: SUPERADMIN_ROUTES.SETTINGS, icon: Settings, label: 'Settings' },
];

import { SuperadminSidebarProps } from '@/app/superadmin/superadmin_shared_components/superadmin_shared_types';

export default function SuperadminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SuperadminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-bg-sidebar border-r border-border z-50 flex flex-col transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: collapsed ? 60 : 240 }}
      >
        <div className="h-16 flex items-center px-4 border-b border-border shrink-0 gap-3">
          <SuperadminButton
            variant="ghost"
            size="icon"
            onClick={mobileOpen ? onMobileClose : onToggle}
            aria-label={mobileOpen ? 'Close sidebar' : 'Toggle sidebar'}
            className="h-8 w-8 ml-2 hover:bg-black/5 dark:hover:bg-white/5"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </SuperadminButton>
          {(!collapsed || mobileOpen) && (
            <span className="font-bold text-text-primary truncate ml-2">📚 Smart Library</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {NAV.map((item, i) => {
            if ('group' in item) {
              if (collapsed && !mobileOpen) return null;
              return <div key={'group-' + item.group} className="px-3 text-[11px] font-bold uppercase tracking-wider text-text-secondary mt-6 mb-2">{item.group}</div>;
            }
            const Icon = item.icon;
            const isExactMatch = pathname === item.href;
            const isSubRouteMatch = pathname.startsWith(item.href + '/');
            const isActive = isExactMatch || (isSubRouteMatch && !NAV.some(
              nav => 'href' in nav && nav.href !== item.href && (pathname === nav.href || pathname.startsWith(nav.href + '/'))
            ));


            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${isActive ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}`}
                title={(collapsed && !mobileOpen) ? item.label : undefined}
                onClick={mobileOpen ? onMobileClose : undefined}
              >
                <Icon size={15} className="shrink-0" style={{ color: isActive ? 'inherit' : 'var(--primary)' }} />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-border flex items-center gap-3 bg-bg-page/50">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-bold shrink-0">SA</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">Super Admin</p>
              <p className="text-[11px] text-text-secondary truncate">superadmin@nexus360.com</p>
            </div>
            <SuperadminButton
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-text-secondary hover:text-danger hover:bg-danger/10 ml-auto transition-colors"
              aria-label="Log out"
              onClick={() => setShowLogout(true)}
            >
              <LogOut size={14} />
            </SuperadminButton>
          </div>
        )}
      </aside>

      <SuperadminDialog open={showLogout} onOpenChange={setShowLogout}>
        <SuperadminDialogContent className="max-w-sm border-border bg-bg-card">
          <SuperadminDialogHeader>
            <SuperadminDialogTitle className="text-text-primary">Log out?</SuperadminDialogTitle>
            <SuperadminDialogDescription className="text-text-secondary">
              Are you sure you want to log out of your session?
            </SuperadminDialogDescription>
          </SuperadminDialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <SuperadminButton className="bg-transparent border border-border text-text-primary hover:bg-bg-page" onClick={() => setShowLogout(false)}>Cancel</SuperadminButton>
            <SuperadminButton className="bg-danger text-white hover:opacity-90" onClick={() => router.push(SUPERADMIN_ROUTES.AUTH_LOGIN)}>Log out</SuperadminButton>
          </div>
        </SuperadminDialogContent>
      </SuperadminDialog>
    </>
  );
}
