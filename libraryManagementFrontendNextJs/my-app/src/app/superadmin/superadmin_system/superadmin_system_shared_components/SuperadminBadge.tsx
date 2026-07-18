// RESPONSIBILITY: Renders the SuperadminBadge component.
import React from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/Superadminsuperadmin_utils';
import { SuperadminBadgeProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const VARIANT_CLASS: Record<string, string> = {
  default:  'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  primary:  'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  success:  'border-transparent bg-success text-success-foreground hover:bg-success/80',
  warning:  'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
  danger:   'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  info:     'border-transparent bg-info text-info-foreground hover:bg-info/80',
  outline:  'text-foreground',
};

export function SuperadminBadge({ className, variant = 'default', ...props }: SuperadminBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        VARIANT_CLASS[variant] || VARIANT_CLASS.default,
        className
      )}
      {...props}
    />
  );
}
