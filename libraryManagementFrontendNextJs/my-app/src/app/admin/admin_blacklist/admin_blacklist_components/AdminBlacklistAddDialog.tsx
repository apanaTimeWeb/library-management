// RESPONSIBILITY: Modal dialog for adding a student to the blacklist using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminBlacklist / Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { AlertOctagon, Loader2 } from 'lucide-react';
import { adminBlacklistFormSchema, AdminBlacklistFormData } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminBlacklistAddDialogProps } from "./AdminBlacklistAddDialog_types";

export function AdminBlacklistAddDialog({ isOpen, onClose, onSubmit }: AdminBlacklistAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminBlacklistFormData>({
    resolver: zodResolver(adminBlacklistFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      reason: '',
      previousSeat: '',
    },
  });

  // Intercept beforeunload when form is modified (`Rule 48`)
  // Dependency array includes isDirty to register/unregister the browser unload warning when form state changes (`Rule 55`)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    if (isDirty && isOpen) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, isOpen]);

  const onFormSubmit = async (data: AdminBlacklistFormData) => {
    setIsSubmitting(true);
    try {
      const res = await onSubmit(data);
      if (res.success) {
        reset();
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = (open: boolean) => {
    if (open) return;
    if (isDirty) {
      if (window.confirm('You have unsaved changes in this form. Are you sure you want to discard them? (`Rule 48`)')) {
        reset();
        onClose();
      }
    } else {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-danger font-semibold text-lg mb-1">
            <AlertOctagon size={20} />
            <DialogTitle>Blacklist Student</DialogTitle>
          </div>
          <DialogDescription>
            Blacklisted students are permanently blocked from admission across all library branches unless removed from this list by an administrator.
          </DialogDescription>
        </DialogHeader>

        {/* Form (`Rule 16`) */}
        <form id="blacklist-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label htmlFor="blacklist-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Student Full Name <span className="text-danger">*</span>
            </label>
            <Input
              id="blacklist-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Vikram Patel"
              className={errors.name ? 'border-danger focus-visible:ring-danger font-medium' : 'font-medium'}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="blacklist-phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Phone Number (10 digits) <span className="text-danger">*</span>
            </label>
            <Input
              id="blacklist-phone"
              type="text"
              maxLength={10}
              {...register('phone')}
              placeholder="e.g. 9876501234"
              className={`font-mono ${errors.phone ? 'border-danger focus-visible:ring-danger' : ''}`}
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-xs text-danger font-medium">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="blacklist-seat" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Previous Seat Number (Optional)
            </label>
            <Input
              id="blacklist-seat"
              type="text"
              {...register('previousSeat')}
              placeholder="e.g. S-20"
              className="uppercase font-medium"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="blacklist-reason" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Reason for Blacklisting <span className="text-danger">*</span>
            </label>
            <Textarea
              id="blacklist-reason"
              rows={3}
              {...register('reason')}
              placeholder="Explain why this student is being banned (e.g. repeated fee default, property damage)…"
              className={errors.reason ? 'border-danger focus-visible:ring-danger resize-none' : 'resize-none'}
              disabled={isSubmitting}
            />
            {errors.reason && <p className="text-xs text-danger font-medium">{errors.reason.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleModalClose(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="blacklist-form"
            variant="destructive"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? 'Blacklisting…' : 'Confirm Blacklist'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
