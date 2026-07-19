'use client';
// RESPONSIBILITY: Renders the SuperadminCard component.
import React from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminUtils';
import { SuperadminCardProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminCard({ children, className, ...props }: SuperadminCardProps) {
  return <div className={cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm', className)} {...props}>{children}</div>;
}

export function CardHeader({ children, className }: SuperadminCardProps) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>;
}

export function CardTitle({ children, className }: SuperadminCardProps) {
  return <h3 className={cn('text-lg font-extrabold leading-none tracking-tight text-text-primary', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: SuperadminCardProps) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

export function CardContent({ children, className }: SuperadminCardProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export function CardFooter({ children, className }: SuperadminCardProps) {
  return <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>;
}
