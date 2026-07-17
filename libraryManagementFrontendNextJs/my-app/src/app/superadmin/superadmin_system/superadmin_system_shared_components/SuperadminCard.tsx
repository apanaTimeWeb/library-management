// RESPONSIBILITY: Renders the SuperadminCard component.
'use client';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }

export function SuperadminCard({ children, className, ...props }: CardProps) {
  return <div className={cn('sys-card', className)} {...props}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('sys-card-header', className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn('sys-card-title', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={cn('sys-card-desc', className)}>{children}</p>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('sys-card-content', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn('sys-card-footer', className)}>{children}</div>;
}
