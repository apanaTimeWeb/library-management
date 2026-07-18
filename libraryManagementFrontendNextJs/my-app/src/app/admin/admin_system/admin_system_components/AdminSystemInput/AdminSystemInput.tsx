// RESPONSIBILITY: Renders the Input component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemInput -> DOM

import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';
import { InputProps } from "./AdminSystemInput_types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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

