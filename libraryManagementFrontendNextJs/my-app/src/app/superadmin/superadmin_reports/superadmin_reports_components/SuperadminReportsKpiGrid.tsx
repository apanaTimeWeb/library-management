import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Users } from 'lucide-react';
import type { SuperadminReportsKpiCard } from '../superadmin_reports_types/SuperadminReportsTypes';

interface Props {
  kpiCards: SuperadminReportsKpiCard[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  rupee: IndianRupee,
  trending_down: TrendingDown,
  trending_up: TrendingUp,
  users: Users,
};

const STYLE_MAP = {
  primary: { bg: 'bg-[var(--primary-subtle,rgba(99,102,241,0.1))]', text: 'text-[var(--primary)]' },
  success: { bg: 'bg-[var(--success-bg,rgba(52,211,153,0.1))]', text: 'text-[var(--success)]' },
  warning: { bg: 'bg-[var(--warning-bg,rgba(251,191,36,0.1))]', text: 'text-[var(--warning)]' },
  danger:  { bg: 'bg-[var(--danger-bg,rgba(248,113,113,0.1))]', text: 'text-[var(--danger)]' },
};

export function SuperadminReportsKpiGrid({ kpiCards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {kpiCards.map((k, i) => {
        const Icon = ICON_MAP[k.icon] || TrendingUp;
        const TrendIcon = k.trendType === 'up' ? TrendingUp : TrendingDown;
        const style = STYLE_MAP[k.iconType] || STYLE_MAP.primary;
        const trendColor = k.trendType === 'up' ? 'text-[var(--success)] bg-[var(--success-bg,rgba(52,211,153,0.1))]' : 'text-[var(--danger)] bg-[var(--danger-bg,rgba(248,113,113,0.1))]';

        return (
          <div key={i} className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1 truncate">{k.label}</p>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2 truncate">{k.value}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${trendColor} whitespace-nowrap`}>
                <TrendIcon size={12} /> {k.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
