// RESPONSIBILITY: Renders the SuperadminSubscriptionsKpiGrid component.
import React from 'react';
import { Users, ReceiptText, TrendingDown } from 'lucide-react';
import type { SuperadminSubscriptionKpi } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';

interface Props {
  kpis: SuperadminSubscriptionKpi[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  receipt_text: ReceiptText,
  trending_down: TrendingDown,
};

const STYLE_MAP = {
  primary: { bg: 'bg-primary-subtle', text: 'text-primary' },
  success: { bg: 'bg-success-bg', text: 'text-success' },
  warning: { bg: 'bg-warning-bg', text: 'text-warning' },
  danger:  { bg: 'bg-danger-bg', text: 'text-danger' },
};

export function SuperadminSubscriptionsKpiGrid({ kpis }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpis.map((k, i) => {
        const Icon = ICON_MAP[k.icon] || Users;
        const style = STYLE_MAP[k.colorType] || STYLE_MAP.primary;
        const trendColor = k.trendType === 'success' ? 'text-success' : k.trendType === 'warning' ? 'text-warning' : 'text-danger';

        return (
          <div key={i} className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                <Icon size={18} />
              </div>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right max-w-3/5">{k.label}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-text-primary leading-tight tracking-tight">{k.val}</h2>
              <p className={`text-xs mt-1.5 font-bold ${trendColor}`}>{k.trend}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
