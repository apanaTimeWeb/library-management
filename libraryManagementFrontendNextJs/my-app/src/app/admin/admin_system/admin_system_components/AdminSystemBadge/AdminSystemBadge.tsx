'use client';
// RESPONSIBILITY: Renders the Badge component for the admin_system module.
// DATA FLOW: Parent -> AdminSystemBadge -> DOM

import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';
import { BadgeProps } from "./AdminSystemBadge_types";

const VARIANT_CLASS: Record<string, string> = {
  default:  'sys-badge--outline',
  primary:  'sys-badge--primary',
  success:  'sys-badge--success',
  warning:  'sys-badge--warning',
  danger:   'sys-badge--danger',
  info:     'sys-badge--info',
  outline:  'sys-badge--outline',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn('sys-badge', VARIANT_CLASS[variant] ?? 'sys-badge--outline', className)}
      {...props}
    />
  );
}

