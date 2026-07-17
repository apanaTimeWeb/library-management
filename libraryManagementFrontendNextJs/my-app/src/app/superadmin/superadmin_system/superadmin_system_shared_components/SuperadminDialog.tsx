// RESPONSIBILITY: Renders the SuperadminDialog component.
'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

export const SuperadminDialog        = DialogPrimitive.Root;
export const SuperadminDialogTrigger = DialogPrimitive.Trigger;
export const SuperadminDialogClose   = DialogPrimitive.Close;

export function SuperadminDialogOverlay({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn('sys-dialog-overlay', className)}
      {...props}
    />
  );
}

export function SuperadminDialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <SuperadminDialogOverlay />
      <DialogPrimitive.Content className={cn('sys-dialog-content', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="sys-dialog-close">
          <X size={16} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SuperadminDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('sys-dialog-header', className)} {...props} />;
}

export function SuperadminDialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn('sys-dialog-title', className)} {...props} />;
}

export function SuperadminDialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn('sys-dialog-desc', className)} {...props} />;
}
