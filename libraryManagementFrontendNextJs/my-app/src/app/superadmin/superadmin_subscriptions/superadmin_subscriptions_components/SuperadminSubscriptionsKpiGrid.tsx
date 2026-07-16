import React from 'react';
import { Users, ReceiptText, TrendingDown } from 'lucide-react';
import type { SuperadminSubscriptionKpi } from '../superadmin_subscriptions_types/SuperadminSubscriptionsTypes';

interface Props {
  kpis: SuperadminSubscriptionKpi[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  receipt_text: ReceiptText,
  trending_down: TrendingDown,
};

const STYLE_MAP = {
  primary: { bg: 'bg-[var(--primary-subtle,rgba(99,102,241,0.1))]', text: 'text-[var(--primary)]' },
  success: { bg: 'bg-[var(--success-bg,rgba(52,211,153,0.1))]', text: 'text-[var(--success)]' },
  warning: { bg: 'bg-[var(--warning-bg,rgba(251,191,36,0.1))]', text: 'text-[var(--warning)]' },
  danger:  { bg: 'bg-[var(--danger-bg,rgba(248,113,113,0.1))]', text: 'text-[var(--danger)]' },
};

export function SuperadminSubscriptionsKpiGrid({ kpis }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpis.map((k, i) => {
        const Icon = ICON_MAP[k.icon] || Users;
        const style = STYLE_MAP[k.colorType] || STYLE_MAP.primary;
        const trendColor = k.trendType === 'success' ? 'text-[var(--success)]' : k.trendType === 'warning' ? 'text-[var(--warning)]' : 'text-[var(--danger)]';

        return (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                <Icon size={18} />
              </div>
              <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest text-right max-w-[60%]">{k.label}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">{k.val}</h2>
              <p className={`text-xs mt-1.5 font-bold ${trendColor}`}>{k.trend}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
