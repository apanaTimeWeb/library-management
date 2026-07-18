// RESPONSIBILITY: Renders the Label component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemLabel -> DOM

import { type LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';


export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('sys-label', className)} {...props} />
  )
);

Label.displayName = 'Label';
export { Label };

