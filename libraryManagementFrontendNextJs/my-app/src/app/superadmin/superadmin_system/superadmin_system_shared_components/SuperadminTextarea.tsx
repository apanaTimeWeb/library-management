// RESPONSIBILITY: Renders the SuperadminTextarea component.
'use client';
import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

import { SuperadminTextareaProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const SuperadminTextarea = forwardRef<HTMLTextAreaElement, SuperadminTextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('sys-textarea', className)} {...props} />
  )
);

SuperadminTextarea.displayName = 'SuperadminTextarea';
export { SuperadminTextarea };
