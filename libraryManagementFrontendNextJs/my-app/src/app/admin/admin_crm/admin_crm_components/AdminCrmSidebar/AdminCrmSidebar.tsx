// RESPONSIBILITY: Renders the Sidebar component for the admin_crm module.
'use client';
// DATA FLOW: Parent -> AdminCrmSidebar -> DOM

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import { AdminCrmSidebarProps } from "./AdminCrmSidebar_types";

// CRM sub-module only exposes its own nav items — the full shell sidebar
// is rendered by AdminSidebar in AdminRoute. This component is intentionally
// minimal to avoid duplicating the shell and violating Rule 67.
const CRM_NAV = [
  { href: ADMIN_ROUTES.CRM_ENQUIRIES, Icon: PhoneCall, label: 'Enquiries' },
] as const;

export default function AdminCrmSidebar({ isOpen, onClose }: AdminCrmSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0`}>
      <div className="h-16 shrink-0 md:hidden" /> {/* Spacer for mobile header */}

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">CRM</p>
        <div className="space-y-1">
          {CRM_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                onClick={onClose}
                title={item.label}
              >
                <item.Icon size={18} className={active ? 'text-primary' : 'text-muted-foreground'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-border mt-auto">
        {/* Additional footer items for sidebar if needed */}
      </div>
    </aside>
  );
}
