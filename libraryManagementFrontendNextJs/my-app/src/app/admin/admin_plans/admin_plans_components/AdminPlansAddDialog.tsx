// RESPONSIBILITY: Modal dialog for creating or updating a membership plan using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminPlans -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { IndianRupee, X, Loader2 } from 'lucide-react';
import { adminPlanFormSchema, AdminPlanFormData, PlanRecord } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';

interface AdminPlansAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminPlanFormData, editingId?: string | null) => Promise<{ success: boolean; message: string }>;
  editingPlan?: PlanRecord | null;
}

export function AdminPlansAddDialog({ isOpen, onClose, onSubmit, editingPlan }: AdminPlansAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminPlanFormData>({
    resolver: zodResolver(adminPlanFormSchema),
    defaultValues: {
      name: '',
      price: 1000,
      duration: '1 Month',
      durationDays: 30,
      featuresText: 'Any single shift\nLocker access\nWiFi included\nID card',
    },
  });

  // Populate values when editing
  // Dependency array monitors editingPlan, isOpen, and reset to prepopulate form fields when editing starts (`Rule 55`)
  useEffect(() => {
    if (isOpen && editingPlan) {
      reset({
        name: editingPlan.name,
        price: editingPlan.price,
        duration: editingPlan.duration,
        durationDays: editingPlan.durationDays,
        featuresText: editingPlan.features.join('\n'),
      });
    } else if (isOpen && !editingPlan) {
      reset({
        name: '',
        price: 1000,
        duration: '1 Month',
        durationDays: 30,
        featuresText: 'Any single shift\nLocker access\nWiFi included\nID card',
      });
    }
  }, [editingPlan, isOpen, reset]);

  // Intercept beforeunload when form is modified (`Rule 48`)
  // Dependency array includes isDirty and isOpen (`Rule 55`)
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

  const onFormSubmit = async (data: AdminPlanFormData) => {
    setIsSubmitting(true);
    try {
      const res = await onSubmit(data, editingPlan?.id || null);
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
          <div className="flex items-center gap-2.5 text-primary font-semibold text-lg">
            <IndianRupee size={20} />
            <h2>{editingPlan ? 'Edit Membership Plan' : 'Create Membership Plan'}</h2>
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
          Configure pricing, duration, and feature lists displayed to students during branch subscription selection.
        </p>

        {/* Form (`Rule 16`) */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="plan-name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Plan Name *
            </label>
            <input
              id="plan-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Monthly Standard"
              className="admin-input w-full font-medium"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="plan-price" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Price (₹ INR) *
              </label>
              <input
                id="plan-price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="1000"
                className="admin-input w-full font-bold"
                disabled={isSubmitting}
              />
              {errors.price && <p className="text-xs text-danger mt-1 font-medium">{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="plan-duration" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Duration Label *
              </label>
              <input
                id="plan-duration"
                type="text"
                {...register('duration')}
                placeholder="e.g. 1 Month"
                className="admin-input w-full"
                disabled={isSubmitting}
              />
              {errors.duration && <p className="text-xs text-danger mt-1 font-medium">{errors.duration.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="plan-duration-days" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Validity in Days (for exact calculation) *
            </label>
            <input
              id="plan-duration-days"
              type="number"
              {...register('durationDays', { valueAsNumber: true })}
              placeholder="30"
              className="admin-input w-full"
              disabled={isSubmitting}
            />
            {errors.durationDays && <p className="text-xs text-danger mt-1 font-medium">{errors.durationDays.message}</p>}
          </div>

          <div>
            <label htmlFor="plan-features" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Features List (One feature per line) *
            </label>
            <textarea
              id="plan-features"
              rows={4}
              {...register('featuresText')}
              placeholder={'Any single shift\nLocker access\nWiFi included'}
              className="admin-input w-full resize-none py-2 font-mono text-xs"
              disabled={isSubmitting}
            />
            {errors.featuresText && <p className="text-xs text-danger mt-1 font-medium">{errors.featuresText.message}</p>}
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
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Saving…' : editingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
