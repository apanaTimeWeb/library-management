// RESPONSIBILITY: Renders the admin_dashboard_types.ts component/hook.
// Types for admin_dashboard
import type { LucideIcon } from 'lucide-react';


export interface AdminDashboardKpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: { value: string; up: boolean };
  sub?: string;
}
export interface AdminDashboardSeatData {
  id: string;
  shift: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  fee: 'Paid' | 'Due';
  occupant?: string;
  expiry?: string;
  studentId?: string;
}
export interface AdminDashboardActionItem {
  icon: LucideIcon;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  href: string;
}
export interface AdminDashboardPaymentData {
  studentId: string;
  name: string;
  initials: string;
  amount: string;
  mode: string;
  timeAgo: string;
}
export interface AdminDashboardData {
  kpiCards: Omit<AdminDashboardKpiCardProps, 'icon' | 'iconColor' | 'iconBg'>[];
  seats: AdminDashboardSeatData[];
  shifts: string[];
  actionItems: Omit<AdminDashboardActionItem, 'icon' | 'type' | 'href'> & { type: string; href?: string }[];
  recentPayments: AdminDashboardPaymentData[];
}
export interface AdminDashboardSeatMatrixState {
  activeShift: string;
  setActiveShift: (val: string) => void;
  feeFilter: string;
  setFeeFilter: (val: string) => void;
  appliedFee: string;
  appliedShift: string;
  setAppliedShift: (val: string) => void;
  handleSeatClick: (seat: AdminDashboardSeatData) => void;
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
}
export interface AdminDashboardSeatMatrixProps {
  seats: AdminDashboardSeatData[];
  shifts: string[];
  state: AdminDashboardSeatMatrixState;
}
export interface AdminDashboardSeatCellProps {
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  occupant?: string;
  shift?: string;
  expiry?: string;
  onClick?: () => void;
}
export interface AdminDashboardErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}
