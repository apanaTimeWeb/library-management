// RESPONSIBILITY: Renders the AdminAssetMaintenanceAddDialog component.
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { Wrench, X, Loader2 } from 'lucide-react';
import { adminAssetMaintenanceFormSchema, AdminAssetMaintenanceFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      if (window.confirm('You have unsaved changes. Discard?')) {
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
          <Button variant="ghost" size="icon" onClick={handleModalClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X size={18} />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Asset ID *</label>
            <Input type="text" {...register('assetId')} placeholder="e.g. A1" className="w-full" disabled={isSubmitting} />
            {errors.assetId && <p className="text-xs text-danger mt-1 font-medium">{errors.assetId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Date *</label>
              <Input type="date" {...register('date')} className="w-full" disabled={isSubmitting} />
              {errors.date && <p className="text-xs text-danger mt-1 font-medium">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Type *</label>
              <select {...register('type')} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="routine">Routine</option>
                <option value="repair">Repair</option>
                <option value="upgrade">Upgrade</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Cost (₹) *</label>
              <Input type="number" {...register('cost', { valueAsNumber: true })} placeholder="1200" className="w-full font-bold" disabled={isSubmitting} />
              {errors.cost && <p className="text-xs text-danger mt-1 font-medium">{errors.cost.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Status *</label>
              <select {...register('status')} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Vendor *</label>
            <Input type="text" {...register('vendor')} placeholder="e.g. Cooling Experts" className="w-full" disabled={isSubmitting} />
            {errors.vendor && <p className="text-xs text-danger mt-1 font-medium">{errors.vendor.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button variant="ghost" type="button" onClick={handleModalClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Saving…' : 'Schedule'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
