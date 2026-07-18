// RESPONSIBILITY: Renders the AdminAccountingExpensesAddDialog component.
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { IndianRupee, X, Loader2 } from 'lucide-react';
import { adminAccountingExpenseFormSchema, AdminAccountingExpenseFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminAccountingExpensesAddDialogProps } from "./AdminAccountingExpensesAddDialog_types";

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
            <IndianRupee size={20} />
            <h2>Log Expense</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={handleModalClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X size={18} />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Date *</label>
              <Input type="date" {...register('date')} className="w-full" disabled={isSubmitting} />
              {errors.date && <p className="text-xs text-danger mt-1 font-medium">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Category *</label>
              <select {...register('category')} className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
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
            <Input type="text" {...register('description')} placeholder="e.g. Monthly electricity bill" className="w-full" disabled={isSubmitting} />
            {errors.description && <p className="text-xs text-danger mt-1 font-medium">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Amount (₹) *</label>
              <Input type="number" {...register('amount', { valueAsNumber: true })} placeholder="1000" className="w-full font-bold" disabled={isSubmitting} />
              {errors.amount && <p className="text-xs text-danger mt-1 font-medium">{errors.amount.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Paid By *</label>
              <Input type="text" {...register('paidBy')} placeholder="Manager" className="w-full" disabled={isSubmitting} />
              {errors.paidBy && <p className="text-xs text-danger mt-1 font-medium">{errors.paidBy.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Mode *</label>
              <select {...register('mode')} className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="bank">Bank</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button variant="ghost" type="button" onClick={handleModalClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 size={15} className="animate-spin" />}
              {isSubmitting ? 'Saving…' : 'Log Expense'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
