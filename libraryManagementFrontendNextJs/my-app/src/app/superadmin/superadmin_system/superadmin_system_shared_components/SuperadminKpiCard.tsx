// RESPONSIBILITY: Renders the SuperadminKpiCard component.
import React from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SuperadminKpiCardProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminKpiCard({ title, value, subtitle, icon, trend, trendLabel, className }: SuperadminKpiCardProps & { subtitle?: string; trend?: 'up' | 'down' | 'neutral'; trendLabel?: string; className?: string }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendCls  = trend === 'up' ? 'sys-kpi-card__trend--up' : trend === 'down' ? 'sys-kpi-card__trend--down' : '';

  return (
    <div className={cn('sys-kpi-card', className)}>
      <div className="flex items-center justify-between">
        <span className="sys-kpi-card__label">{title}</span>
        {icon && <span className="text-on-surface-variant flex items-center justify-center">{icon}</span>}
      </div>
      <div className="sys-kpi-card__val mt-2">{value}</div>
      {(subtitle || trend) && (
        <div className="sys-kpi-card__sub mt-2">
          {trend && (
            <span className={cn('flex items-center gap-1 font-medium', trendCls)}>
              <TrendIcon size={14} />
              {trendLabel}
            </span>
          )}
          {subtitle && <span className="text-on-surface-variant ml-2">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
