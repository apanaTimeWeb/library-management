'use client';
import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SuperadminInput = forwardRef<HTMLInputElement, InputProps>(
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
