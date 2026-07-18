'use client';
// RESPONSIBILITY: Renders the SuperadminProgress component.
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminProgressProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminProgress({ value, max = 100, className, barClassName }: SuperadminProgressProps & { max?: number; className?: string; barClassName?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary/30', className)}>
      <div
        className={cn('h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out', barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
