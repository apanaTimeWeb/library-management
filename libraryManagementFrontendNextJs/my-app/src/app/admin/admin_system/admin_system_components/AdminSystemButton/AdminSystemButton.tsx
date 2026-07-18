// RESPONSIBILITY: Renders the Button component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemButton -> DOM

import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
}

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
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(VARIANT[variant], SIZE[size], className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
export { Button };

