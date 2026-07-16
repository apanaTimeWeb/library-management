// RESPONSIBILITY: Modal dialog for recording a new asset with React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminAssets -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Package, X, Loader2 } from 'lucide-react';
import { adminAssetFormSchema, AdminAssetFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';

interface AdminAssetsAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAssetFormData) => Promise<{ success: boolean; message: string }>;
}

export function AdminAssetsAddDialog({ isOpen, onClose, onSubmit }: AdminAssetsAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminAssetFormData>({
    resolver: zodResolver(adminAssetFormSchema),
    defaultValues: {
      name: '',
      category: 'Furniture',
      purchaseDate: '',
      purchaseValue: 0,
      location: '',
    },
  });

  // Intercept beforeunload (`Rule 48`)
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
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isOpen]);

  if (!isOpen) return null;

  const onFormSubmit = async (data: AdminAssetFormData) => {
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
      if (window.confirm('You have unsaved changes. Discard? (`Rule 48`)')) {
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
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5 text-primary font-semibold text-lg">
            <Package size={20} />
            <h2>Register Asset</h2>
          </div>
          <button type="button" onClick={handleModalClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Asset Name *</label>
            <input type="text" {...register('name')} placeholder="e.g. Study Tables (20)" className="admin-input w-full" disabled={isSubmitting} />
            {errors.name && <p className="text-xs text-danger mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Category *</label>
              <select {...register('category')} className="admin-input w-full" disabled={isSubmitting}>
                <option value="Furniture">Furniture</option>
                <option value="Appliance">Appliance</option>
                <option value="Security">Security</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Purchase Date *</label>
              <input type="date" {...register('purchaseDate')} className="admin-input w-full" disabled={isSubmitting} />
              {errors.purchaseDate && <p className="text-xs text-danger mt-1 font-medium">{errors.purchaseDate.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Purchase Value (₹) *</label>
              <input type="number" {...register('purchaseValue', { valueAsNumber: true })} placeholder="60000" className="admin-input w-full" disabled={isSubmitting} />
              {errors.purchaseValue && <p className="text-xs text-danger mt-1 font-medium">{errors.purchaseValue.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Location *</label>
              <input type="text" {...register('location')} placeholder="e.g. First Floor" className="admin-input w-full" disabled={isSubmitting} />
              {errors.location && <p className="text-xs text-danger mt-1 font-medium">{errors.location.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button type="button" onClick={handleModalClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Registering…' : 'Register Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
