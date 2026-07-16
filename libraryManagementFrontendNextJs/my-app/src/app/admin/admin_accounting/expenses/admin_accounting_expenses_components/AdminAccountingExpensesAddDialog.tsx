// RESPONSIBILITY: Modal dialog for recording an accounting expense with React Hook Form + Zod (`Rule 16`, `Rule 38`).
// DATA FLOW: Dialog Form -> useAdminAccountingExpenses -> Store -> Backend API (`Rule 39`).

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { IndianRupee, X, Loader2 } from 'lucide-react';
import { adminAccountingExpenseFormSchema, AdminAccountingExpenseFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';

interface AdminAccountingExpensesAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminAccountingExpenseFormData) => Promise<{ success: boolean; message: string }>;
}

export function AdminAccountingExpensesAddDialog({ isOpen, onClose, onSubmit }: AdminAccountingExpensesAddDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useReactHookForm<AdminAccountingExpenseFormData>({
    resolver: zodResolver(adminAccountingExpenseFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      category: 'Electricity',
      description: '',
      amount: 0,
      paidBy: '',
      mode: 'cash',
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

  const onFormSubmit = async (data: AdminAccountingExpenseFormData) => {
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
            <IndianRupee size={20} />
            <h2>Log Expense</h2>
          </div>
          <button type="button" onClick={handleModalClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Date *</label>
              <input type="date" {...register('date')} className="admin-input w-full" disabled={isSubmitting} />
              {errors.date && <p className="text-xs text-danger mt-1 font-medium">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Category *</label>
              <select {...register('category')} className="admin-input w-full" disabled={isSubmitting}>
                <option value="Electricity">Electricity</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stationery">Stationery</option>
                <option value="Internet">Internet</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Description</label>
            <input type="text" {...register('description')} placeholder="e.g. Monthly electricity bill" className="admin-input w-full" disabled={isSubmitting} />
            {errors.description && <p className="text-xs text-danger mt-1 font-medium">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Amount (₹) *</label>
              <input type="number" {...register('amount', { valueAsNumber: true })} placeholder="1000" className="admin-input w-full font-bold" disabled={isSubmitting} />
              {errors.amount && <p className="text-xs text-danger mt-1 font-medium">{errors.amount.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Paid By *</label>
              <input type="text" {...register('paidBy')} placeholder="Manager" className="admin-input w-full" disabled={isSubmitting} />
              {errors.paidBy && <p className="text-xs text-danger mt-1 font-medium">{errors.paidBy.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Mode *</label>
              <select {...register('mode')} className="admin-input w-full" disabled={isSubmitting}>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="bank">Bank</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button type="button" onClick={handleModalClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Saving…' : 'Log Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
