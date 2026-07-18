// RESPONSIBILITY: Modal dialog for creating or updating a membership plan using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminPlans -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { IndianRupee, Loader2 } from 'lucide-react';
import { adminPlanFormSchema, AdminPlanFormData, PlanRecord } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminPlansAddDialogProps } from "./AdminPlansAddDialog_types";

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
          <div className="flex items-center gap-2 text-primary font-semibold text-lg mb-1">
            <IndianRupee size={20} />
            <DialogTitle>{editingPlan ? 'Edit Membership Plan' : 'Create Membership Plan'}</DialogTitle>
          </div>
          <DialogDescription>
            Configure pricing, duration, and feature lists displayed to students during branch subscription selection.
          </DialogDescription>
        </DialogHeader>

        {/* Form (`Rule 16`) */}
        <form id="plan-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label htmlFor="plan-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Plan Name <span className="text-danger">*</span>
            </label>
            <Input
              id="plan-name"
              type="text"
              {...register('name')}
              placeholder="e.g. Monthly Standard"
              className={errors.name ? 'border-danger focus-visible:ring-danger font-medium' : 'font-medium'}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-danger font-medium">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="plan-price" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Price (₹ INR) <span className="text-danger">*</span>
              </label>
              <Input
                id="plan-price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="1000"
                className={errors.price ? 'border-danger focus-visible:ring-danger font-bold' : 'font-bold'}
                disabled={isSubmitting}
              />
              {errors.price && <p className="text-xs text-danger font-medium">{errors.price.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="plan-duration" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Duration Label <span className="text-danger">*</span>
              </label>
              <Input
                id="plan-duration"
                type="text"
                {...register('duration')}
                placeholder="e.g. 1 Month"
                className={errors.duration ? 'border-danger focus-visible:ring-danger' : ''}
                disabled={isSubmitting}
              />
              {errors.duration && <p className="text-xs text-danger font-medium">{errors.duration.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="plan-duration-days" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Validity in Days <span className="lowercase font-normal opacity-70">(for exact calculation)</span> <span className="text-danger">*</span>
            </label>
            <Input
              id="plan-duration-days"
              type="number"
              {...register('durationDays', { valueAsNumber: true })}
              placeholder="30"
              className={errors.durationDays ? 'border-danger focus-visible:ring-danger' : ''}
              disabled={isSubmitting}
            />
            {errors.durationDays && <p className="text-xs text-danger font-medium">{errors.durationDays.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="plan-features" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Features List <span className="lowercase font-normal opacity-70">(One feature per line)</span> <span className="text-danger">*</span>
            </label>
            <Textarea
              id="plan-features"
              rows={4}
              {...register('featuresText')}
              placeholder={'Any single shift\nLocker access\nWiFi included'}
              className={errors.featuresText ? 'border-danger focus-visible:ring-danger resize-none font-mono text-xs' : 'resize-none font-mono text-xs'}
              disabled={isSubmitting}
            />
            {errors.featuresText && <p className="text-xs text-danger font-medium">{errors.featuresText.message}</p>}
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
            form="plan-form"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? 'Saving…' : editingPlan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
