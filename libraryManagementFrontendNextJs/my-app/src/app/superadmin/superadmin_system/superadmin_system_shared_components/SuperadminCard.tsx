// RESPONSIBILITY: Renders the SuperadminCard component.
'use client';
import React from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminCardProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminCard({ children, className, ...props }: SuperadminCardProps) {
  return <div className={cn('sys-card', className)} {...props}>{children}</div>;
}

export function CardHeader({ children, className }: SuperadminCardProps) {
  return <div className={cn('sys-card-header', className)}>{children}</div>;
}

export function CardTitle({ children, className }: SuperadminCardProps) {
  return <h3 className={cn('sys-card-title', className)}>{children}</h3>;
}

export function CardContent({ children, className }: SuperadminCardProps) {
  return <div className={cn('sys-card-content', className)}>{children}</div>;
}
