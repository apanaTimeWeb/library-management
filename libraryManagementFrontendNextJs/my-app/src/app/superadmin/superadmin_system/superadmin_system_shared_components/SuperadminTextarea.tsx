'use client';
import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const SuperadminTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('sys-textarea', className)} {...props} />
  )
);

Textarea.displayName = 'Textarea';
export { SuperadminTextarea };
