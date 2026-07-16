export interface SuperadminDashboardKpiCard {
  title: string;
  value: string;
  icon: string;
  subtitle?: string;
  trend?: string;
  progress?: number;
  alert?: string;
}

export interface SuperadminDashboardSystemHealth {
  uptime: string;
  activeUsers: number;
  apiLatency: string;
  lastBackup: string;
}

export interface SuperadminDashboardActionItem {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'error' | 'info';
  icon: string;
  actionLabel: string;
  actionUrl: string;
}

export interface SuperadminDashboardRecentLibrary {
  initials: string;
  name: string;
  owner: string;
  students: number;
  status: 'active' | 'setup' | 'inactive';
  plan: string;
  joinedAt: string;
}

export interface SuperadminDashboardDataResponse {
  kpiCards: SuperadminDashboardKpiCard[];
  systemHealth: SuperadminDashboardSystemHealth;
  actionItems: SuperadminDashboardActionItem[];
  recentLibraries: SuperadminDashboardRecentLibrary[];
}
