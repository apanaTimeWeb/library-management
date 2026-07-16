// RESPONSIBILITY: Modal dialog for recording an asset maintenance task with React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminAssetMaintenance -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Wrench, X, Loader2 } from 'lucide-react';
import { adminAssetMaintenanceFormSchema, AdminAssetMaintenanceFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';

interface AdminAssetMaintenanceAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAssetMaintenanceFormData) => Promise<{ success: boolean; message: string }>;
}

export function AdminAssetMaintenanceAddDialog({ isOpen, onClose, onSubmit }: AdminAssetMaintenanceAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminAssetMaintenanceFormData>({
    resolver: zodResolver(adminAssetMaintenanceFormSchema),
    defaultValues: {
      assetId: '',
      date: new Date().toISOString().split('T')[0],
      type: 'routine',
      cost: 0,
      vendor: '',
      status: 'scheduled',
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

  const onFormSubmit = async (data: AdminAssetMaintenanceFormData) => {
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
            <Wrench size={20} />
            <h2>Schedule Maintenance</h2>
          </div>
          <button type="button" onClick={handleModalClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Asset ID *</label>
            <input type="text" {...register('assetId')} placeholder="e.g. A1" className="admin-input w-full" disabled={isSubmitting} />
            {errors.assetId && <p className="text-xs text-danger mt-1 font-medium">{errors.assetId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Date *</label>
              <input type="date" {...register('date')} className="admin-input w-full" disabled={isSubmitting} />
              {errors.date && <p className="text-xs text-danger mt-1 font-medium">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Type *</label>
              <select {...register('type')} className="admin-input w-full" disabled={isSubmitting}>
                <option value="routine">Routine</option>
                <option value="repair">Repair</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Cost (₹) *</label>
              <input type="number" {...register('cost', { valueAsNumber: true })} placeholder="1200" className="admin-input w-full font-bold" disabled={isSubmitting} />
              {errors.cost && <p className="text-xs text-danger mt-1 font-medium">{errors.cost.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Status *</label>
              <select {...register('status')} className="admin-input w-full" disabled={isSubmitting}>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Vendor *</label>
            <input type="text" {...register('vendor')} placeholder="e.g. Cooling Experts" className="admin-input w-full" disabled={isSubmitting} />
            {errors.vendor && <p className="text-xs text-danger mt-1 font-medium">{errors.vendor.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button type="button" onClick={handleModalClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Saving…' : 'Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
