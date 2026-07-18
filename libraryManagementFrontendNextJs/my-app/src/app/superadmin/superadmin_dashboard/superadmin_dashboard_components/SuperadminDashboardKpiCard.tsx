// RESPONSIBILITY: Renders the SuperadminDashboardKpiCard component.
import React from 'react';
import { TrendingUp, AlertTriangle, Building, Users, IndianRupee, Hourglass, BarChart2 } from 'lucide-react';
import type { SuperadminDashboardKpiCard as KpiCardProps } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

const ICON_MAP: Record<string, React.ReactNode> = {
  store:           <Building size={24} />,
  groups:          <Users size={24} />,
  currency_rupee:  <IndianRupee size={24} />,
  pending_actions: <Hourglass size={24} />,
};

export function SuperadminDashboardKpiCard({ title, value, icon, subtitle, trend, progress, alert }: KpiCardProps) {
  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-tight">{title}</p>
        <span className="text-primary">{ICON_MAP[icon] ?? <BarChart2 size={24} />}</span>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-extrabold text-text-primary tracking-tight">{value}</p>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {trend && (
            <span className="flex items-center gap-1 text-xs font-bold text-success bg-success-bg px-2 py-0.5 rounded-full">
              <TrendingUp size={11} /> {trend}
            </span>
          )}
          {subtitle && <span className="text-xs text-text-disabled">{subtitle}</span>}
          {alert && (
            <span className="flex items-center gap-1 text-xs font-bold text-danger bg-danger-bg px-2 py-0.5 rounded-full">
              <AlertTriangle size={11} /> {alert}
            </span>
          )}
          {progress !== undefined && (
            <div className="h-1.5 w-16 bg-bg-pageg-input rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
