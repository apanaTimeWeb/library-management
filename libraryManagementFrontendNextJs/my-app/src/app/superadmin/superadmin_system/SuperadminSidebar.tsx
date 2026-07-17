'use client';

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

type NavItem =
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };

const NAV: NavItem[] = [
  { href: '/superadmin/superadmin_dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/superadmin/superadmin_libraries', icon: Building2, label: 'Libraries' },
  { href: '/superadmin/superadmin_subscriptions', icon: FileText, label: 'Subscriptions' },
  { href: '/superadmin/superadmin_billing', icon: IndianRupee, label: 'Billing' },
  { href: '/superadmin/superadmin_reports', icon: BarChart2, label: 'Reports' },
  { group: 'Monitoring & Support' },
  { href: '/superadmin/superadmin_system-health', icon: Activity, label: 'System Health' },
  { href: '/superadmin/superadmin_audit-logs', icon: History, label: 'Audit Logs' },
  { href: '/superadmin/superadmin_support-tickets', icon: LifeBuoy, label: 'Support Tickets' },
  { group: 'System' },
  { href: '/superadmin/superadmin_settings', icon: Settings, label: 'Settings' },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function SuperadminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`admin-sidebar${mobileOpen ? ' admin-sidebar-mobile-open' : ''}`}
        style={{ width: collapsed ? 60 : 240 }}
      >
        <div className="admin-sidebar-logo">
          <SuperadminButton
            variant="ghost"
            size="icon"
            onClick={mobileOpen ? onMobileClose : onToggle}
            aria-label={mobileOpen ? 'Close sidebar' : 'Toggle sidebar'}
            className="h-8 w-8 ml-2 hover:bg-muted/50"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </SuperadminButton>
          {(!collapsed || mobileOpen) && (
            <span className="admin-sidebar-logo-text ml-2">📚 Smart Library</span>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          {NAV.map((item, i) => {
            if ('group' in item) {
              if (collapsed && !mobileOpen) return null;
              return <div key={'group-' + item.group} className="admin-nav-group-label">{item.group}</div>;
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
                className={`admin-nav-item${isActive ? ' active' : ''}`}
                title={(collapsed && !mobileOpen) ? item.label : undefined}
                onClick={mobileOpen ? onMobileClose : undefined}
              >
                <Icon size={15} className="shrink-0 admin-nav-icon" />
                {(!collapsed || mobileOpen) && (
                  <span className="admin-nav-label">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {(!collapsed || mobileOpen) && (
          <div className="admin-sidebar-footer">
            <div className="admin-avatar">SA</div>
            <div className="admin-sidebar-user-info">
              <p className="admin-sidebar-user-name">Super Admin</p>
              <p className="admin-sidebar-user-email">superadmin@nexus360.com</p>
            </div>
            <SuperadminButton
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 ml-auto"
              aria-label="Log out"
              onClick={() => setShowLogout(true)}
            >
              <LogOut size={14} />
            </SuperadminButton>
          </div>
        )}
      </aside>

      <SuperadminDialog open={showLogout} onOpenChange={setShowLogout}>
        <SuperadminDialogContent className="max-w-sm">
          <SuperadminDialogHeader>
            <SuperadminDialogTitle>Log out?</SuperadminDialogTitle>
            <SuperadminDialogDescription>
              Are you sure you want to log out of your session?
            </SuperadminDialogDescription>
          </SuperadminDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <SuperadminButton variant="ghost" onClick={() => setShowLogout(false)}>Cancel</SuperadminButton>
            <SuperadminButton variant="destructive" onClick={() => router.push('/auth/login')}>Log out</SuperadminButton>
          </div>
        </SuperadminDialogContent>
      </SuperadminDialog>
    </>
  );
}
