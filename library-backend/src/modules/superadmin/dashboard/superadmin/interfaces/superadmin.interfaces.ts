export interface SuperadminKpiCard {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  subtitle?: string;
  alert?: string;
}

export interface LibraryItem {
  id?: string;
  initials: string;
  name: string;
  owner: string;
  students: number;
  status: string;
  plan: string;
  joinedAt: Date;
}

export interface ActionItem {
  icon: string;
  text: string;
  type: string;
}

export interface SystemHealth {
  uptime: string;
  activeUsers: number;
  apiLatency: string;
  lastBackup: string;
}

export interface SuperadminDashboardData {
  kpiCards: SuperadminKpiCard[];
  recentLibraries: LibraryItem[];
  actionItems: ActionItem[];
  systemHealth: SystemHealth;
}
