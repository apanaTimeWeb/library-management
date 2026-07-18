/**
 * RESPONSIBILITY: Renders the Refund Modal for Security Deposits.
 */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { refundSchema, RefundFormData } from './useSecurityDepositsClient';

interface SecurityDepositRefundModalProps {
  target: { id: string; name: string; amount: number } | null;
  onClose: () => void;
  onSubmit: (data: RefundFormData) => void;
  isProcessing: boolean;
}

export function SecurityDepositRefundModal({ target, onClose, onSubmit, isProcessing }: SecurityDepositRefundModalProps) {
  const form = useForm<RefundFormData>({
    resolver: zodResolver(refundSchema),
    defaultValues: { refundAmount: 0, deductionAmount: 0, deductionReason: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (target) {
      form.reset({ refundAmount: target.amount, deductionAmount: 0, deductionReason: '' });
    }
  }, [target, form]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-[var(--radius-xl)] shadow-2xl border border-border overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex justify-between items-center bg-page/50">
          <h2 className="text-[18px] font-bold text-text-primary">💸 Process Refund</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-lg leading-none">✕</button>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <p className="text-[14px] text-text-secondary mb-4">
            Processing refund for <strong className="text-text-primary">{target.name}</strong>.
          </p>

          <div>
            <label className="text-[12px] font-bold text-text-secondary block mb-1">Refund Amount <span className="text-danger">*</span></label>
            <input 
              type="number" 
              {...form.register('refundAmount', { valueAsNumber: true })}
              className={`w-full bg-input border ${form.formState.errors.refundAmount ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
            />
            {form.formState.errors.refundAmount && <p className="text-danger text-[11px] mt-1">{form.formState.errors.refundAmount.message}</p>}
          </div>

          <div>
            <label className="text-[12px] font-bold text-text-secondary block mb-1">Deduction Amount</label>
            <input 
              type="number" 
              {...form.register('deductionAmount', { valueAsNumber: true })}
              className={`w-full bg-input border ${form.formState.errors.deductionAmount ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
            />
            {form.formState.errors.deductionAmount && <p className="text-danger text-[11px] mt-1">{form.formState.errors.deductionAmount.message}</p>}
          </div>

          <div>
            <label className="text-[12px] font-bold text-text-secondary block mb-1">Deduction Reason</label>
            <input 
              {...form.register('deductionReason')}
              placeholder="e.g. Damages"
              className={`w-full bg-input border ${form.formState.errors.deductionReason ? 'border-danger' : 'border-border'} rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors`} 
            />
            {form.formState.errors.deductionReason && <p className="text-danger text-[11px] mt-1">{form.formState.errors.deductionReason.message}</p>}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-transparent border border-border text-text-primary rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-input transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isProcessing} className="px-4 py-2 bg-success text-success-foreground rounded-[var(--radius-md)] text-[12px] font-bold hover:brightness-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isProcessing ? 'Processing...' : 'Process Refund'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
