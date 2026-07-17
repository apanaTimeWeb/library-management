'use client';
// RESPONSIBILITY: Renders the Input component for the admin_system module.
// DATA FLOW: Parent -> AdminSystemInput -> DOM

import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn('sys-input', className)}
      {...props}
    />
  )
);

Input.displayName = 'Input';
export { Input };

