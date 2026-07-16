'use client';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

const VARIANT: Record<string, string> = {
  primary:     'sys-btn-primary',
  ghost:       'sys-btn-ghost',
  destructive: 'sys-btn-danger',
  secondary:   'sys-btn-ghost',
  link:        'sys-btn-link',
};

const SIZE: Record<string, string> = {
  sm:   'sys-btn--sm',
  md:   '',
  lg:   'sys-btn--lg',
  icon: 'sys-btn--icon',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
}

const SuperadminButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(VARIANT[variant], SIZE[size], className)}
      {...props}
    />
  )
);

SuperadminButton.displayName = 'SuperadminButton';
export { SuperadminButton };
