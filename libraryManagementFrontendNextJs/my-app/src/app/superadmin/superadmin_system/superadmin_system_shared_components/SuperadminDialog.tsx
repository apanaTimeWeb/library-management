'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';

export const SuperadminDialog        = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose   = DialogPrimitive.Close;

export function DialogOverlay({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <SuperadminDialogPrimitive.Overlay
      className={cn('sys-dialog-overlay', className)}
      {...props}
    />
  );
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <SuperadminDialogPrimitive.Portal>
      <SuperadminDialogOverlay />
      <SuperadminDialogPrimitive.Content className={cn('sys-dialog-content', className)} {...props}>
        {children}
        <SuperadminDialogPrimitive.Close className="sys-dialog-close">
          <X size={16} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('sys-dialog-header', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return <SuperadminDialogPrimitive.Title className={cn('sys-dialog-title', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return <SuperadminDialogPrimitive.Description className={cn('sys-dialog-desc', className)} {...props} />;
}
