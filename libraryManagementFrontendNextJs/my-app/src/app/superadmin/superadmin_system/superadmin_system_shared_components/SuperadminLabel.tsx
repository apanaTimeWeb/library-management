// RESPONSIBILITY: Renders the SuperadminLabel component.
'use client';
import { type LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

import { SuperadminLabelProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const SuperadminLabel = forwardRef<HTMLLabelElement, SuperadminLabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('sys-label', className)} {...props} />
  )
);

SuperadminLabel.displayName = 'SuperadminLabel';
export { SuperadminLabel };
