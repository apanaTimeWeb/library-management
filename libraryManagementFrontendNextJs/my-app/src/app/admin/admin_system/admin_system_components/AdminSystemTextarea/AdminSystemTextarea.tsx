// RESPONSIBILITY: Renders the Textarea component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemTextarea -> DOM

import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';


export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('sys-textarea', className)} {...props} />
  )
);

Textarea.displayName = 'Textarea';
export { Textarea };

