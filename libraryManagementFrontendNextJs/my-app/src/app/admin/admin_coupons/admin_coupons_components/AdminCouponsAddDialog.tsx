import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';
// RESPONSIBILITY: Modal dialog for creating a promotional discount coupon using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminCoupons -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Tag, Loader2 } from 'lucide-react';
import { adminCouponFormSchema, AdminCouponFormData } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminCouponsAddDialogProps } from "./AdminCouponsAddDialog_types";

export function AdminCouponsAddDialog({ isOpen, onClose, onSubmit }: AdminCouponsAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminCouponFormData>({
    resolver: zodResolver(adminCouponFormSchema),
    defaultValues: {
      code: '',
      discount: 10,
      type: 'Flat',
      maxUses: 100,
      expiry: '',
    },
  });

  const selectedType = watch('type');

  // Intercept beforeunload when form is modified (`Rule 48`)
  // Dependency array includes isDirty and isOpen to manage the window unload listener whenever form state changes (`Rule 55`)
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

  const onFormSubmit = async (data: AdminCouponFormData) => {
    setIsSubmitting(true);
    try {
      const res = await onSubmit({
        ...data,
        code: data.code.toUpperCase().trim(),
      });
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
            <Tag size={20} />
            <DialogTitle>Create Discount Coupon</DialogTitle>
          </div>
          <DialogDescription>
            Create promotional discount codes that students can redeem during subscription checkout or fee payments.
          </DialogDescription>
        </DialogHeader>

        {/* Form (`Rule 16`) */}
        <form id="coupon-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label htmlFor="coupon-code" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Coupon Code (Uppercase) <span className="text-danger">*</span>
            </label>
            <Input
              id="coupon-code"
              type="text"
              {...register('code')}
              placeholder="e.g. DIWALI100"
              className={`font-mono uppercase font-bold tracking-wide ${errors.code ? 'border-danger focus-visible:ring-danger' : ''}`}
              disabled={isSubmitting}
            />
            {errors.code && <p className="text-xs text-danger font-medium">{errors.code.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="coupon-type" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Discount Type <span className="text-danger">*</span>
              </label>
              <AdminSearchableDropdown
                id="coupon-type"
                {...register('type')}
                className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-bg-pageg-input px-3 py-2 text-sm font-medium ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="Flat">Flat (₹ INR)</option>
                <option value="Percent">Percentage (%)</option>
              </AdminSearchableDropdown>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="coupon-discount" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {selectedType === 'Flat' ? 'Discount Amount (₹)' : 'Discount (%)'} <span className="text-danger">*</span>
              </label>
              <Input
                id="coupon-discount"
                type="number"
                {...register('discount', { valueAsNumber: true })}
                placeholder={selectedType === 'Flat' ? '100' : '15'}
                className={errors.discount ? 'border-danger focus-visible:ring-danger' : ''}
                disabled={isSubmitting}
              />
              {errors.discount && <p className="text-xs text-danger font-medium">{errors.discount.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="coupon-max-uses" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Max Uses <span className="text-danger">*</span>
              </label>
              <Input
                id="coupon-max-uses"
                type="number"
                {...register('maxUses', { valueAsNumber: true })}
                placeholder="100"
                className={errors.maxUses ? 'border-danger focus-visible:ring-danger' : ''}
                disabled={isSubmitting}
              />
              {errors.maxUses && <p className="text-xs text-danger font-medium">{errors.maxUses.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="coupon-expiry" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Expiry Date <span className="text-danger">*</span>
              </label>
              <Input
                id="coupon-expiry"
                type="date"
                {...register('expiry')}
                className={errors.expiry ? 'border-danger focus-visible:ring-danger' : ''}
                disabled={isSubmitting}
              />
              {errors.expiry && <p className="text-xs text-danger font-medium">{errors.expiry.message}</p>}
            </div>
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
            form="coupon-form"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? 'Creating…' : 'Create Coupon'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
