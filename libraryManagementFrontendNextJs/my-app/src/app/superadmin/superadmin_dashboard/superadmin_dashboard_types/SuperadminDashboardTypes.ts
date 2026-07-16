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
  icon: string;
  text: string;
  type: string;
}

export interface SuperadminDashboardRecentLibrary {
  id?: string;
  initials: string;
  name: string;
  owner: string;
  students: number;
  status: string;
  plan: string;
  joinedAt: string;
}

export interface SuperadminDashboardDataResponse {
  kpiCards: SuperadminDashboardKpiCard[];
  systemHealth: SuperadminDashboardSystemHealth;
  actionItems: SuperadminDashboardActionItem[];
  recentLibraries: SuperadminDashboardRecentLibrary[];
}
