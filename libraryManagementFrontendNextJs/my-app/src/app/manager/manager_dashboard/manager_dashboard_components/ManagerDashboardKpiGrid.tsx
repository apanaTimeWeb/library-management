import { Users, CalendarCheck, Phone, Armchair } from 'lucide-react';
import type { DashboardKpiGridProps } from '@/app/manager/manager_dashboard/manager_dashboard_types';

// RESPONSIBILITY: Renders the read-only grid of KPI cards. Receives data via props. No API calls.

const iconMap: Record<string, React.ElementType> = {
  Users, CalendarCheck, Phone, Armchair,
};

export function ManagerDashboardKpiGrid({ kpiData }: DashboardKpiGridProps) {
  if (!kpiData || kpiData.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {kpiData.map((kpi) => {
        const Icon = iconMap[kpi.icon];
        return (
          <div key={kpi.title} className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.iconClass}`}>
                {Icon && <Icon size={18} />}
              </div>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold bg-success-bg text-success">{kpi.trend}</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{kpi.title}</p>
              <p className="text-2xl font-bold text-text-primary leading-tight">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
