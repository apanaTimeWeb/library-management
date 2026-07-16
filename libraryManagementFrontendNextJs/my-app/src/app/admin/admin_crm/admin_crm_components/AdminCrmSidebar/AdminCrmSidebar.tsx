'use client';

// RESPONSIBILITY: Renders the Sidebar component for the admin_crm module.
// DATA FLOW: Parent -> AdminCrmSidebar -> DOM

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

// CRM sub-module only exposes its own nav items — the full shell sidebar
// is rendered by AdminSidebar in AdminRoute. This component is intentionally
// minimal to avoid duplicating the shell and violating Rule 67.
const CRM_NAV = [
  { href: ADMIN_ROUTES.CRM_ENQUIRIES, Icon: PhoneCall, label: 'Enquiries' },
] as const;

interface AdminCrmSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminCrmSidebar({ isOpen, onClose }: AdminCrmSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`crm-sidebar${isOpen ? ' crm-sidebar--open' : ''}`}>
      <div className="crm-sidebar-spacer" />

      <p className="crm-nav-group-label">CRM</p>
      {CRM_NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`crm-nav-item${active ? ' crm-nav-item--active' : ''}`}
            onClick={onClose}
            title={item.label}
          >
            <item.Icon size={16} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <div className="crm-sidebar-bottom" />
    </aside>
  );
}

