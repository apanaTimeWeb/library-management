'use client';
// RESPONSIBILITY: Renders the SuperadminDashboardSidebar component.
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Wand2, Building2, CreditCard, Receipt,
  HeadphonesIcon, ScrollText, Activity, Settings, BarChart2, LogOut,
} from 'lucide-react';
import type { SuperadminDashboardSidebarProps as SidebarProps } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

const NAV_ITEMS = [
  { href: SUPERADMIN_ROUTES.PREFIX + '_dashboard',       icon: LayoutDashboard, label: 'Dashboard'         },
  { href: SUPERADMIN_ROUTES.PREFIX + '_setup-wizard',    icon: Wand2,           label: 'Setup Wizard'      },
  { href: SUPERADMIN_ROUTES.LIBRARIES,       icon: Building2,       label: 'Libraries'         },
  { href: SUPERADMIN_ROUTES.SUBSCRIPTIONS,   icon: CreditCard,      label: 'Subscriptions'     },
  { href: SUPERADMIN_ROUTES.BILLING,         icon: Receipt,         label: 'Billing'           },
  { href: SUPERADMIN_ROUTES.PREFIX + '_support-tickets', icon: HeadphonesIcon,  label: 'Support Tickets'   },
  { href: SUPERADMIN_ROUTES.AUDIT_LOGS,      icon: ScrollText,      label: 'Audit Logs'        },
  { href: SUPERADMIN_ROUTES.SYSTEM_HEALTH,   icon: Activity,        label: 'System Health'     },
  { href: SUPERADMIN_ROUTES.REPORTS,         icon: BarChart2,       label: 'Reports'           },
  { href: SUPERADMIN_ROUTES.PREFIX + '_settings',        icon: Settings,        label: 'Platform Settings' },
];

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-bg-card border-r border-border flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex items-center gap-3 p-5 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-md shadow-primary/20">
          <span className="text-white text-xs font-bold">N</span>
        </div>
        <div>
          <p className="font-bold text-[15px] text-text-primary leading-tight">Nexus 360</p>
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wider">Super Admin Panel</p>
        </div>
      </div>

      <div className="h-px w-[calc(100%-2rem)] mx-auto bg-border mb-4 shrink-0" />

      <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-thin">
        {NAV_ITEMS.map(({ href, icon: Icon, label }, i) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          const iconColors = ['#4F46E5', '#059669', '#D97706', '#2563EB', '#7C3AED', '#E11D48', '#0D9488'];
          const color = iconColors[i % iconColors.length];

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white hover:bg-primary hover:text-white shadow-sm shadow-primary/20' : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'}`}
            >
              <Icon size={17} className={isActive ? 'text-current' : 'text-text-secondary'} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border bg-bg-card flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold border border-primary/20 shrink-0">SA</div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-text-primary truncate">Super Admin</p>
          <p className="text-[11px] text-text-secondary truncate">Platform Owner</p>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:border-danger hover:text-danger hover:bg-danger-bg transition-colors"
          onClick={() => setShowLogout(true)}
          title="Log out"
          aria-label="Log out"
        >
          <LogOut size={15} />
        </button>
      </div>

      {showLogout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLogout(false)}>
          <div className="bg-bg-card max-w-[360px] w-full rounded-2xl shadow-2xl p-6 relative border border-border flex flex-col items-center text-center animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-warning-bg/50 flex items-center justify-center mb-4">
              <LogOut size={20} className="text-warning" />
            </div>
            <p className="text-xl font-bold text-text-primary mb-2">Log out?</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">Are you sure you want to log out of the Super Admin panel?</p>
            <div className="flex gap-3 mt-4 w-full">
              <button className="px-3 py-1.5 text-[13px] rounded-lg font-medium transition-colors border border-border text-text-secondary bg-transparent hover:bg-bg-elevated hover:text-text-primary flex-1" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="px-3 py-1.5 text-[13px] rounded-lg font-medium transition-colors border border-border text-danger bg-transparent hover:bg-danger hover:text-white flex-1" onClick={() => router.push(SUPERADMIN_ROUTES.AUTH_LOGIN)}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
