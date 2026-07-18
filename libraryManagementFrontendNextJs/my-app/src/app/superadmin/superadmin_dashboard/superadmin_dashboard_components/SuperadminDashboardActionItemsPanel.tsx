// RESPONSIBILITY: Renders the SuperadminDashboardActionItemsPanel component.
import React from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { AlertTriangle, CreditCard, Headphones, CloudUpload, ChevronRight, Lightbulb, ExternalLink } from 'lucide-react';
import type { SuperadminDashboardActionItem, SuperadminDashboardActionItemsPanelProps as Props } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

const ICON_MAP: Record<string, React.ElementType> = {
  warning:         AlertTriangle,
  credit_card_off: CreditCard,
  support_agent:   Headphones,
  cloud_upload:    CloudUpload,
};

const ACTION_LINKS: Record<string, string> = {
  'warning':         SUPERADMIN_ROUTES.LIBRARIES,
  'credit_card_off': SUPERADMIN_ROUTES.SUBSCRIPTIONS,
  'support_agent':   SUPERADMIN_ROUTES.PREFIX + '_support-tickets',
  'cloud_upload':    SUPERADMIN_ROUTES.SYSTEM_HEALTH,
};

export function SuperadminDashboardActionItemsPanel({ data }: Props) {
  return (
    <div className="col-span-12 lg:col-span-5 bg-bg-card border border-border rounded-[var(--radius-lg)] flex flex-col overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border bg-bg-page/30">
        <h2 className="text-base font-bold text-text-primary">Action Items</h2>
      </div>

      <div className="p-6 space-y-3 flex-1">
        {data.map((item, i) => {
          const isError = item.type === 'error';
          const Icon = ICON_MAP[item.icon] ?? AlertTriangle;
          const href = ACTION_LINKS[item.icon] ?? (SUPERADMIN_ROUTES.PREFIX + '_dashboard');
          return (
            <Link key={i} href={href}
              className={`flex items-center justify-between p-4 rounded-[var(--radius-md)] border hover:-translate-y-0.5 transition-all duration-200 ${
                isError 
                  ? 'bg-danger-bg border-danger/20 hover:border-danger/50' 
                  : 'bg-info-bg border-info/20 hover:border-info/50'
              }`}>
              <div className="flex items-center gap-3">
                <Icon size={16} className={isError ? 'text-danger' : 'text-info'} />
                <span className="text-sm font-semibold text-text-primary">{item.text}</span>
              </div>
              <ChevronRight size={15} className="text-text-disabled" />
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-6 border-t border-border bg-bg-page/30">
        <div className="flex items-start gap-3 mb-4 p-3 rounded-[var(--radius-md)] bg-primary-subtle border border-primary/20">
          <div className="bg-primary text-white p-1 rounded-full shrink-0 mt-0.5">
            <Lightbulb size={12} />
          </div>
          <p className="text-xs text-text-secondary leading-relaxed font-medium">
            5 newly registered libraries are yet to complete their initial setup wizard.
          </p>
        </div>
        <Link href={SUPERADMIN_ROUTES.LIBRARIES} className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
          <ExternalLink size={13} /> View All Activities
        </Link>
      </div>
    </div>
  );
}
