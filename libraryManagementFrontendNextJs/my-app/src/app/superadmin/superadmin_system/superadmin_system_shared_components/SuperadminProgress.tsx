'use client';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
}

export function SuperadminProgress({ value, max = 100, className, barClassName }: ProgressProps) {
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
