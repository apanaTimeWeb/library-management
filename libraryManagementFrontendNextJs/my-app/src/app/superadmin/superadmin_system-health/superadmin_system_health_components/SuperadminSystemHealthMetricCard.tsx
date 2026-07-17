// RESPONSIBILITY: Renders the SuperadminSystemHealthMetricCard component.
import React from 'react';
import type { SuperadminSystemHealthMetric } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';

interface Props {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  metrics: SuperadminSystemHealthMetric[];
}

const COLOR_TEXT_CLS: Record<string, string> = {
  success: 'text-success',
  info:    'text-info,#3B82F6',
  warning: 'text-warning',
  danger:  'text-danger',
};

const COLOR_FILL_CLS: Record<string, string> = {
  success: 'bg-success',
  info:    'bg-info',
  warning: 'bg-warning',
  danger:  'bg-danger',
};

function MetricRow({ label, sub, val, pct, colorKey }: SuperadminSystemHealthMetric) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-sm font-bold text-text-primary">{label}</p>
          <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{sub}</p>
        </div>
        <span className={`text-sm font-extrabold ${COLOR_TEXT_CLS[colorKey]}`}>{val}</span>
      </div>
      <div className="h-2 w-full bg-bg-input rounded-full overflow-hidden border border-border">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${COLOR_FILL_CLS[colorKey]}`} 
          style={{ width: `${pct}%` }} 
        />
      </div>
    </div>
  );
}

export function SuperadminSystemHealthMetricCard({ title, icon: Icon, iconColor, metrics }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-sm font-bold text-text-primary mb-6 flex items-center gap-2 uppercase tracking-wider">
        <Icon size={18} className={iconColor} /> {title}
      </h2>
      <div className="space-y-6">
        {metrics.map((m) => <MetricRow key={m.label} {...m} />)}
      </div>
    </div>
  );
}

