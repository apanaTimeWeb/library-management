// RESPONSIBILITY: Modal dialog for creating a promotional discount coupon using React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminCoupons -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Tag, X, Loader2 } from 'lucide-react';
import { adminCouponFormSchema, AdminCouponFormData } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';

interface AdminCouponsAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCouponFormData) => Promise<{ success: boolean; message: string }>;
}

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

  if (!isOpen) return null;

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
            <Tag size={20} />
            <h2>Create Discount Coupon</h2>
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
          Create promotional discount codes that students can redeem during subscription checkout or fee payments.
        </p>

        {/* Form (`Rule 16`) */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="coupon-code" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Coupon Code (Uppercase) *
            </label>
            <input
              id="coupon-code"
              type="text"
              {...register('code')}
              placeholder="e.g. DIWALI100"
              className="admin-input w-full font-mono uppercase font-bold tracking-wide"
              disabled={isSubmitting}
            />
            {errors.code && <p className="text-xs text-danger mt-1 font-medium">{errors.code.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="coupon-type" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Discount Type *
              </label>
              <select
                id="coupon-type"
                {...register('type')}
                className="admin-input w-full font-medium"
                disabled={isSubmitting}
              >
                <option value="Flat">Flat (₹ INR)</option>
                <option value="Percent">Percentage (%)</option>
              </select>
            </div>

            <div>
              <label htmlFor="coupon-discount" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                {selectedType === 'Flat' ? 'Discount Amount (₹)' : 'Discount (%)'} *
              </label>
              <input
                id="coupon-discount"
                type="number"
                {...register('discount', { valueAsNumber: true })}
                placeholder={selectedType === 'Flat' ? '100' : '15'}
                className="admin-input w-full"
                disabled={isSubmitting}
              />
              {errors.discount && <p className="text-xs text-danger mt-1 font-medium">{errors.discount.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="coupon-max-uses" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Max Uses *
              </label>
              <input
                id="coupon-max-uses"
                type="number"
                {...register('maxUses', { valueAsNumber: true })}
                placeholder="100"
                className="admin-input w-full"
                disabled={isSubmitting}
              />
              {errors.maxUses && <p className="text-xs text-danger mt-1 font-medium">{errors.maxUses.message}</p>}
            </div>

            <div>
              <label htmlFor="coupon-expiry" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Expiry Date *
              </label>
              <input
                id="coupon-expiry"
                type="date"
                {...register('expiry')}
                className="admin-input w-full"
                disabled={isSubmitting}
              />
              {errors.expiry && <p className="text-xs text-danger mt-1 font-medium">{errors.expiry.message}</p>}
            </div>
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
              {isSubmitting ? 'Creating…' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
