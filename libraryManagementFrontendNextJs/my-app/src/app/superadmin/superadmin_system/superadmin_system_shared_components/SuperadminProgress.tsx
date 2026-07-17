// RESPONSIBILITY: Renders the SuperadminProgress component.
'use client';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminProgressProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminProgress({ value, max = 100, className, barClassName }: SuperadminProgressProps & { max?: number; className?: string; barClassName?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('sys-progress-track', className)}>
      <div
        className={cn('sys-progress-fill', barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
