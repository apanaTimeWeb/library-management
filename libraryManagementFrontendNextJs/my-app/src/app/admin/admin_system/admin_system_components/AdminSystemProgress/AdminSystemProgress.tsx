// RESPONSIBILITY: Renders the Progress component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemProgress -> DOM

import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';
import { ProgressProps } from "./AdminSystemProgress_types";

export function Progress({ value, max = 100, className, barClassName }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('sys-progress-track', className)}>
      <div
        className={cn('sys-progress-fill', barClassName)}
        className="w-[length:var(--w)]" style={{ '--w': `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

