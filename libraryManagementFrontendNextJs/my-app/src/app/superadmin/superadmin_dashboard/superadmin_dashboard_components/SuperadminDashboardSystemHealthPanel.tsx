// RESPONSIBILITY: Renders the SuperadminDashboardSystemHealthPanel component.
import React from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { CheckCircle, Users, Zap, HardDrive, ExternalLink } from 'lucide-react';
import type { SuperadminDashboardSystemHealth as SystemHealth, SuperadminDashboardSystemHealthPanelProps as Props } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

const METRICS = [
  { key: 'uptime',      label: 'System Uptime',   icon: CheckCircle, colorCls: 'text-success', bgCls: 'bg-success-bg' },
  { key: 'activeUsers', label: 'Active Users Now', icon: Users,       colorCls: 'text-primary', bgCls: 'bg-primary-subtle' },
  { key: 'apiLatency',  label: 'API Latency',      icon: Zap,         colorCls: 'text-info', bgCls: 'bg-info-bg' },
  { key: 'lastBackup',  label: 'Last Backup',      icon: HardDrive,   colorCls: 'text-text-disabled', bgCls: 'bg-page' },
] as const;

export function SuperadminDashboardSystemHealthPanel({ data }: Props) {
  return (
    <div className="col-span-12 lg:col-span-7 bg-bg-pageg-card border border-border rounded-lg flex flex-col overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border bg-bg-pageg-page/30">
        <h2 className="text-base font-bold text-text-primary">System Health</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4 flex-1">
        {METRICS.map(({ key, label, icon: Icon, colorCls, bgCls }) => (
          <div key={key} className={`p-4 rounded-md border border-border flex flex-col justify-center items-start ${bgCls}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className={colorCls} />
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{label}</span>
            </div>
            <span className={`text-xl font-bold ${colorCls}`}>
              {data[key as keyof SystemHealth]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-border bg-bg-pageg-page/30">
        <Link href={SUPERADMIN_ROUTES.SYSTEM_HEALTH} className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
          <ExternalLink size={13} /> View Full System Report
        </Link>
      </div>
    </div>
  );
}
