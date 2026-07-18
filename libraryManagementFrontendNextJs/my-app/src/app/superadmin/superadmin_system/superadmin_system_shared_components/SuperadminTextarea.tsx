'use client';
// RESPONSIBILITY: Renders the SuperadminTextarea component.
import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/Superadminsuperadmin_utils';

import { SuperadminTextareaProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const SuperadminTextarea = forwardRef<HTMLTextAreaElement, SuperadminTextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(
      'flex min-h-20 w-full rounded-md border border-input bg-bg-pageackground px-3 py-2 text-sm text-text-primary ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none',
      className
    )} {...props} />
  )
);

SuperadminTextarea.displayName = 'SuperadminTextarea';
export { SuperadminTextarea };
