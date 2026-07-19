'use client';
// RESPONSIBILITY: Renders the SuperadminLabel component.
import { type LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminUtils';

import { SuperadminLabelProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const SuperadminLabel = forwardRef<HTMLLabelElement, SuperadminLabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('text-sm font-bold text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
  )
);

SuperadminLabel.displayName = 'SuperadminLabel';
export { SuperadminLabel };
