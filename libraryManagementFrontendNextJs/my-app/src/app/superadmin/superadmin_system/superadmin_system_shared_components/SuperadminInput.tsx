// RESPONSIBILITY: Renders the SuperadminInput component.
'use client';
import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

import { SuperadminInputProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

const SuperadminInput = forwardRef<HTMLInputElement, SuperadminInputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn('sys-input', className)}
      {...props}
    />
  )
);

SuperadminInput.displayName = 'SuperadminInput';
export { SuperadminInput };
