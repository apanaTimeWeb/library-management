'use client';
import { type LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const SuperadminLabel = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('sys-label', className)} {...props} />
  )
);

SuperadminLabel.displayName = 'SuperadminLabel';
export { SuperadminLabel };
