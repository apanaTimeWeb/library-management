// RESPONSIBILITY: Component or Page.
/**
 * RESPONSIBILITY: Renders the modal for processing a student refund.
 */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { RefundProcessModalProps, ProcessFormData, processSchema } from "./RefundProcessModal_types";



export function RefundProcessModal({ isOpen, onClose, onSubmit, studentName, amount, isSubmitting }: RefundProcessModalProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProcessFormData>({
    resolver: zodResolver(processSchema),
    defaultValues: { paymentMethod: 'upi' },
  });

  const paymentMethod = watch('paymentMethod');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-pagelack/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">💸 Process Refund — {studentName}</h2>
        <button className="absolute top-4 right-4 text-text-secondary hover:text-text-primary" onClick={onClose} type="button">✕</button>
        <p className="text-sm text-text-secondary mb-4">Processing refund of <span className="font-bold text-success">{formatCurrency(amount)}</span></p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Payment Method</label>
            <SuperadminSearchableDropdown
              options={[
                { label: 'UPI', value: 'upi' },
                { label: 'Bank Transfer', value: 'bank' },
                { label: 'Cash', value: 'cash' },
                { label: 'Cheque', value: 'cheque' }
              ]}
              value={paymentMethod}
              onChange={(v) => setValue('paymentMethod', v as any)}
            />
            {errors.paymentMethod && <p className="text-danger text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-6">
            <button type="button" className="bg-input text-text-primary border border-border px-4 py-2 rounded-md text-sm font-bold hover:bg-primary/5 transition-colors cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-success/10 text-success border border-success/20 px-4 py-2 rounded-md text-sm font-bold hover:bg-success hover:text-success-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Processing...' : 'Mark as Processed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
