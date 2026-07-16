import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import type { SuperadminDashboardKpiCard as KpiCardProps } from '../superadmin_dashboard_types/SuperadminDashboardTypes';

const ICON_MAP: Record<string, string> = {
  store:           '🏛️',
  groups:          '👥',
  currency_rupee:  '₹',
  pending_actions: '⏳',
};

export function SuperadminDashboardKpiCard({ title, value, icon, subtitle, trend, progress, alert }: KpiCardProps) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-tight">{title}</p>
        <span className="text-2xl leading-none">{ICON_MAP[icon] ?? '📊'}</span>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{value}</p>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {trend && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--success)] bg-[var(--success-bg,rgba(52,211,153,0.1))] px-2 py-0.5 rounded-full">
              <TrendingUp size={11} /> {trend}
            </span>
          )}
          {subtitle && <span className="text-xs text-[var(--text-disabled)]">{subtitle}</span>}
          {alert && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--danger)] bg-[var(--danger-bg,rgba(248,113,113,0.1))] px-2 py-0.5 rounded-full">
              <AlertTriangle size={11} /> {alert}
            </span>
          )}
          {progress !== undefined && (
            <div className="h-1.5 w-16 bg-[var(--bg-input)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
