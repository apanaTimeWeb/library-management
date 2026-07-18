import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import {
  LayoutDashboard, Building2, FileText, IndianRupee, BarChart2,
  Activity, History, LifeBuoy, Settings, Users, CreditCard, LayoutGrid, TrendingUp, Clock, AlertCircle, AlertTriangle, Phone
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem =
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { href: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { href: ADMIN_ROUTES.LIBRARIES, icon: Building2, label: 'Libraries' },
  { href: ADMIN_ROUTES.SUBSCRIPTIONS, icon: FileText, label: 'Subscriptions' },
  { href: ADMIN_ROUTES.BILLING, icon: IndianRupee, label: 'Billing' },
  { href: ADMIN_ROUTES.REPORTS, icon: BarChart2, label: 'Reports' },
  { group: 'Monitoring & Support' },
  { href: ADMIN_ROUTES.SYSTEM_HEALTH, icon: Activity, label: 'System Health' },
  { href: ADMIN_ROUTES.AUDIT_LOGS, icon: History, label: 'Audit Logs' },
  { href: ADMIN_ROUTES.SUPPORT_TICKETS, icon: LifeBuoy, label: 'Support Tickets' },
  { group: 'System' },
  { href: ADMIN_ROUTES.SETTINGS, icon: Settings, label: 'Settings' },
];

export const ADMIN_KPI_META = [
  { icon: Users, iconColor: 'text-primary', iconBg: 'bg-primary/10' },
  { icon: CreditCard, iconColor: 'text-success', iconBg: 'bg-success/10' },
  { icon: LayoutGrid, iconColor: 'text-warning', iconBg: 'bg-warning/10' },
  { icon: TrendingUp, iconColor: 'text-info', iconBg: 'bg-info/10' },
];

export const ADMIN_ACTION_ICONS: Record<string, LucideIcon> = {
  'Pending Renewals': Clock,
  'Expiring Subscriptions': AlertCircle,
  'Overdue Payments': AlertTriangle,
  'New Enquiries': Phone,
};
