'use client';
// RESPONSIBILITY: Renders the SuperadminButton component.
import { forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminButtonProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const VARIANT: Record<string, string> = {
  primary:     'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost:       'hover:bg-bg-pageccent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  secondary:   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  link:        'text-primary underline-offset-4 hover:underline',
};

const SIZE: Record<string, string> = {
  sm:   'h-9 rounded-md px-3',
  md:   'h-10 px-4 py-2',
  lg:   'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const SuperadminButton = forwardRef<HTMLButtonElement, SuperadminButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        VARIANT[variant], 
        SIZE[size], 
        className
      )}
      {...props}
    />
  )
);

SuperadminButton.displayName = 'SuperadminButton';
export { SuperadminButton };
