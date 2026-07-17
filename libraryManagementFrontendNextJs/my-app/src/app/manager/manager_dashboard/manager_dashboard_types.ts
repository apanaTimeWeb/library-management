export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface DashboardKpiData {
  title: string;
  value: string | number;
  trend: string;
  icon: string;
  iconClass: string;
}

export interface DashboardSeatData {
  id: string;
  status: string;
}

export interface DashboardActionItem {
  title: string;
  count: string;
  countClass: string;
  showRenew: boolean;
  href: string;
}

export interface RecentAdmission {
  name: string;
  smartId: string;
  shift: string;
}

export interface RecentEnquiry {
  name: string;
  phone: string;
  status: string;
}

export interface DashboardData {
  kpiData: DashboardKpiData[];
  seatData: DashboardSeatData[];
  actionItems: DashboardActionItem[];
  recentAdmissions: RecentAdmission[];
  recentEnquiries: RecentEnquiry[];
}

export interface DashboardState {
  data: DashboardData | null;
  status: FetchState;
  error: string | null;
  fetchData: () => Promise<void>;
}

export interface DashboardSeatMatrixProps {
  seatData: DashboardSeatData[];
}

export interface DashboardKpiGridProps {
  kpiData: DashboardKpiData[];
}

export interface DashboardErrorBoundaryProps {
  children: React.ReactNode;
}

export interface DashboardErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface CellRendererProps {
  value: string;
}
