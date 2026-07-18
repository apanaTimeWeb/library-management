/**
 * RESPONSIBILITY: Renders the modal for adding a deduction to a refund.
 */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const deductSchema = z.object({
  amount: z.number({ invalid_type_error: 'Amount is required' }).min(1, 'Amount must be greater than 0'),
  reason: z.string().min(1, 'Reason is required'),
});

export type DeductFormData = z.infer<typeof deductSchema>;

interface RefundDeductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeductFormData) => void;
  studentName: string;
  isSubmitting: boolean;
}

export function RefundDeductModal({ isOpen, onClose, onSubmit, studentName, isSubmitting }: RefundDeductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeductFormData>({
    resolver: zodResolver(deductSchema),
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-[var(--radius-xl)] shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-[18px] font-bold text-text-primary mb-6 flex items-center gap-2">➕ Add Deduction — {studentName}</h2>
        <button className="absolute top-4 right-4 text-text-secondary hover:text-text-primary" onClick={handleClose} type="button">✕</button>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Deduction Amount <span className="text-danger">*</span></label>
            <input 
              type="number" 
              className="w-full bg-input border border-border rounded-[var(--radius-md)] p-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary transition-colors" 
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })} 
            />
            {errors.amount && <p className="text-danger text-[12px] mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="block text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Reason <span className="text-danger">*</span></label>
            <input 
              className="w-full bg-input border border-border rounded-[var(--radius-md)] p-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary transition-colors" 
              placeholder="Reason for deduction" 
              {...register('reason')} 
            />
            {errors.reason && <p className="text-danger text-[12px] mt-1">{errors.reason.message}</p>}
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-6 pt-2">
            <button type="button" className="bg-input text-text-primary border border-border px-4 py-2 rounded-[var(--radius-md)] text-[13px] font-bold hover:bg-primary/5 transition-colors cursor-pointer" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-warning/10 text-warning border border-warning/20 px-4 py-2 rounded-[var(--radius-md)] text-[13px] font-bold hover:bg-warning hover:text-warning-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Adding...' : 'Add Deduction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
