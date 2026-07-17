// RESPONSIBILITY: Renders the SuperadminButton component.
'use client';
import { forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminButtonProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

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

const SuperadminButton = forwardRef<HTMLButtonElement, SuperadminButtonProps>(
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
