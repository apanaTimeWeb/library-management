// RESPONSIBILITY: Renders the SuperadminReportsKpiGrid component.
import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Users } from 'lucide-react';
import type { SuperadminReportsKpiCard, SuperadminReportsKpiGridProps as Props } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';

const ICON_MAP: Record<string, React.ElementType> = {
  rupee: IndianRupee,
  trending_down: TrendingDown,
  trending_up: TrendingUp,
  users: Users,
};

const STYLE_MAP = {
  primary: { bg: 'bg-primary-subtle', text: 'text-primary' },
  success: { bg: 'bg-success-bg', text: 'text-success' },
  warning: { bg: 'bg-warning-bg', text: 'text-warning' },
  danger:  { bg: 'bg-danger-bg', text: 'text-danger' },
};

export function SuperadminReportsKpiGrid({ kpiCards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {kpiCards.map((k, i) => {
        const Icon = ICON_MAP[k.icon] || TrendingUp;
        const TrendIcon = k.trendType === 'up' ? TrendingUp : TrendingDown;
        const style = STYLE_MAP[k.iconType] || STYLE_MAP.primary;
        const trendColor = k.trendType === 'up' ? 'text-success bg-success-bg' : 'text-danger bg-danger-bg';

        return (
          <div key={i} className="flex items-center gap-4 bg-bg-pageg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1 truncate">{k.label}</p>
              <p className="text-text-primaryxl font-extrabold text-text-primary tracking-tight mb-2 truncate">{k.value}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${trendColor} whitespace-nowrap`}>
                <TrendIcon size={12} /> {k.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

