// RESPONSIBILITY: Renders the admin_constants.ts component/hook.
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import {
  LayoutDashboard, Users, Users2, Shield, CreditCard,
  Settings, History, Ban, Tags, Phone, Receipt, LayoutGrid,
  TrendingUp, Clock, AlertCircle, AlertTriangle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem =
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { href: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { group: 'CRM & Students' },
  { href: ADMIN_ROUTES.CRM_ENQUIRIES, icon: Phone, label: 'Enquiries' },
  { href: ADMIN_ROUTES.STUDENTS, icon: Users, label: 'Students' },
  { group: 'Branch Management' },
  { href: ADMIN_ROUTES.BRANCHES, icon: LayoutGrid, label: 'Branches' },
  { href: ADMIN_ROUTES.STAFF_USERS, icon: Users2, label: 'Staff Users' },
  { href: ADMIN_ROUTES.PERMISSIONS, icon: Shield, label: 'Permissions' },
  { group: 'Finance & Accounting' },
  { href: ADMIN_ROUTES.PLANS, icon: CreditCard, label: 'Plans' },
  { href: ADMIN_ROUTES.ACCOUNTING_EXPENSES, icon: Receipt, label: 'Expenses' },
  { href: ADMIN_ROUTES.COUPONS, icon: Tags, label: 'Coupons' },
  { group: 'System Configuration' },
  { href: ADMIN_ROUTES.SETTINGS, icon: Settings, label: 'Settings' },
  { href: ADMIN_ROUTES.BLACKLIST, icon: Ban, label: 'Blacklist' },
  { href: ADMIN_ROUTES.AUDIT_LOGS, icon: History, label: 'Audit Logs' },
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
