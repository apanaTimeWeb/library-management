import React from 'react';
import Link from 'next/link';
import { CheckCircle, Users, Zap, HardDrive, ExternalLink } from 'lucide-react';
import type { SuperadminDashboardSystemHealth as SystemHealth } from '../superadmin_dashboard_types/SuperadminDashboardTypes';

interface Props { data: SystemHealth; }

const METRICS = [
  { key: 'uptime',      label: 'System Uptime',   icon: CheckCircle, colorCls: 'text-[var(--success)]', bgCls: 'bg-[var(--success-bg,rgba(52,211,153,0.1))]' },
  { key: 'activeUsers', label: 'Active Users Now', icon: Users,       colorCls: 'text-[var(--primary)]', bgCls: 'bg-[var(--primary-subtle,rgba(99,102,241,0.1))]' },
  { key: 'apiLatency',  label: 'API Latency',      icon: Zap,         colorCls: 'text-[var(--info,#3B82F6)]', bgCls: 'bg-[rgba(59,130,246,0.1)]' },
  { key: 'lastBackup',  label: 'Last Backup',      icon: HardDrive,   colorCls: 'text-[var(--text-disabled)]', bgCls: 'bg-[var(--bg-page)]' },
] as const;

export function SuperadminDashboardSystemHealthPanel({ data }: Props) {
  return (
    <div className="col-span-12 lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] flex flex-col overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[var(--border)] bg-[var(--bg-page)]/30">
        <h2 className="text-base font-bold text-[var(--text-primary)]">System Health</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4 flex-1">
        {METRICS.map(({ key, label, icon: Icon, colorCls, bgCls }) => (
          <div key={key} className={`p-4 rounded-[var(--radius-md)] border border-[var(--border)] flex flex-col justify-center items-start ${bgCls}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className={colorCls} />
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{label}</span>
            </div>
            <span className={`text-xl font-bold ${colorCls}`}>
              {data[key as keyof SystemHealth]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-[var(--border)] bg-[var(--bg-page)]/30">
        <Link href="/superadmin/superadmin_system-health" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
          <ExternalLink size={13} /> View Full System Report
        </Link>
      </div>
    </div>
  );
}
