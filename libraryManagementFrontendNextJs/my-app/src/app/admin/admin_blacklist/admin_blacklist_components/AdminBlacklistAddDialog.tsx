// RESPONSIBILITY: Modal dialog for adding a student to the blacklist using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminBlacklist / Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { useForm } from 'react-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { AlertOctagon, X, Loader2 } from 'lucide-react';
import { adminBlacklistFormSchema, AdminBlacklistFormData } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';

interface AdminBlacklistAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminBlacklistFormData) => Promise<{ success: boolean; message: string }>;
}

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

  if (!isOpen) return null;

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

  const handleModalClose = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5 text-danger font-semibold text-lg">
            <AlertOctagon size={20} />
            <h2>Blacklist Student</h2>
          </div>
          <button
            type="button"
            onClick={handleModalClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-muted-foreground m-0">
          Blacklisted students are permanently blocked from admission across all library branches unless removed from this list by an administrator.
        </p>

        {/* Form (`Rule 16`) */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="blacklist-name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Student Full Name *
            </label>
            <input
              id="blacklist-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Vikram Patel"
              className="admin-input w-full"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="blacklist-phone" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Phone Number (10 digits) *
            </label>
            <input
              id="blacklist-phone"
              type="text"
              maxLength={10}
              {...register('phone')}
              placeholder="e.g. 9876501234"
              className="admin-input w-full font-mono"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-xs text-danger mt-1 font-medium">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="blacklist-seat" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Previous Seat Number (Optional)
            </label>
            <input
              id="blacklist-seat"
              type="text"
              {...register('previousSeat')}
              placeholder="e.g. S-20"
              className="admin-input w-full uppercase"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="blacklist-reason" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Reason for Blacklisting *
            </label>
            <textarea
              id="blacklist-reason"
              rows={3}
              {...register('reason')}
              placeholder="Explain why this student is being banned (e.g. repeated fee default, property damage)…"
              className="admin-input w-full resize-none py-2"
              disabled={isSubmitting}
            />
            {errors.reason && <p className="text-xs text-danger mt-1 font-medium">{errors.reason.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-danger text-danger-foreground hover:bg-danger/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Blacklisting…' : 'Confirm Blacklist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
