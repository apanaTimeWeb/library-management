/**
 * RESPONSIBILITY: Renders the Deduct Modal for Security Deposits.
 */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deductSchema, DeductFormData } from './useSecurityDepositsClient';

interface SecurityDepositDeductModalProps {
  target: { id: string; name: string } | null;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  isProcessing: boolean;
}

export function SecurityDepositDeductModal({ target, onClose, onSubmit, isProcessing }: SecurityDepositDeductModalProps) {
  const form = useForm<DeductFormData>({
    resolver: zodResolver(deductSchema),
    defaultValues: { amount: 0, reason: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (target) {
      form.reset({ amount: 0, reason: '' });
    }
  }, [target, form]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-[var(--radius-xl)] shadow-2xl border border-border overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex justify-between items-center bg-page/50">
          <h2 className="text-[18px] font-bold text-text-primary">➕ Add Deduction</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-lg leading-none">✕</button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <p className="text-[14px] text-text-secondary mb-4">
            Adding deduction for <strong className="text-text-primary">{target.name}</strong>.
          </p>

          <div>
            <label className="text-[12px] font-bold text-text-secondary block mb-1">Amount <span className="text-danger">*</span></label>
            <input 
              type="number" 
              {...form.register('amount', { valueAsNumber: true })}
              className={`w-full bg-input border ${form.formState.errors.amount ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
            />
            {form.formState.errors.amount && <p className="text-danger text-[11px] mt-1">{form.formState.errors.amount.message}</p>}
          </div>

          <div>
            <label className="text-[12px] font-bold text-text-secondary block mb-1">Reason <span className="text-danger">*</span></label>
            <input 
              {...form.register('reason')}
              placeholder="e.g. Lost ID card"
              className={`w-full bg-input border ${form.formState.errors.reason ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
            />
            {form.formState.errors.reason && <p className="text-danger text-[11px] mt-1">{form.formState.errors.reason.message}</p>}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-transparent border border-border text-text-primary rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-input transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isProcessing} className="px-4 py-2 bg-warning text-warning-foreground rounded-[var(--radius-md)] text-[12px] font-bold hover:brightness-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isProcessing ? 'Saving...' : 'Add Deduction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
