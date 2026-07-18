// RESPONSIBILITY: Renders the SuperadminKpiCard component.
import React from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SuperadminKpiCardProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminKpiCard({ title, value, subtitle, icon, trend, trendLabel, className }: SuperadminKpiCardProps & { subtitle?: string; trend?: 'up' | 'down' | 'neutral'; trendLabel?: string; className?: string }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendCls  = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-secondary';

  const Icon = icon;

  return (
    <div className={cn('bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">{title}</span>
        {Icon && <span className="text-text-secondary flex items-center justify-center opacity-70"><Icon size={20} /></span>}
      </div>
      <div className="text-[28px] font-extrabold text-text-primary leading-none mt-3">{value}</div>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-3 text-[12px]">
          {trend && (
            <span className={cn('flex items-center gap-1 font-bold', trendCls)}>
              <TrendIcon size={14} />
              {trendLabel}
            </span>
          )}
          {subtitle && <span className="text-text-secondary">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
