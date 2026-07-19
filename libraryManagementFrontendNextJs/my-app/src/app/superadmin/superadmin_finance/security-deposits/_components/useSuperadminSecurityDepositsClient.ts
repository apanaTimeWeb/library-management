/**
 * RESPONSIBILITY: Logic and state management for the SuperadminSecurityDepositsClient component.
 */
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { SuperadminFinanceSecurityDeposit } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_DEPOSITS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';


export type RefundFormData = z.infer<typeof refundSchema>;
export type DeductFormData = z.infer<typeof deductSchema>;

export const refundSchema = z.object({
  refundAmount: z.number().min(0, 'Cannot be negative'),
  deductionAmount: z.number().min(0, 'Cannot be negative'),
  deductionReason: z.string().optional(),
}).refine(data => {
  if (data.deductionAmount > 0 && (!data.deductionReason || data.deductionReason.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: 'Reason required if deduction > 0',
  path: ['deductionReason']
});
export const deductSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  reason: z.string().min(3, 'Reason must be at least 3 characters'),
});

export function useSuperadminSecurityDepositsClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [deposits, setDeposits] = useState<SuperadminFinanceSecurityDeposit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog state
  const [refundTarget, setRefundTarget] = useState<{ id: number; name: string; amount: number } | null>(null);
  const [deductTarget, setDeductTarget] = useState<{ id: number; name: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { 
      setDeposits(SUPERADMIN_FINANCE_MOCK_DEPOSITS as unknown as SuperadminFinanceSecurityDeposit[]); 
      setIsLoading(false); 
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = deposits.filter((d) => statusFilter === 'all' || d.status === statusFilter);

  const openRefund = (d: SuperadminFinanceSecurityDeposit) => {
    setRefundTarget({ id: d.id, name: d.studentName, amount: d.depositAmount - (d.deductionAmount || 0) });
  };

  const openDeduct = (d: SuperadminFinanceSecurityDeposit) => {
    setDeductTarget({ id: d.id, name: d.studentName });
  };

  const handleRefundSubmit = (data: RefundFormData) => {
    if (!refundTarget) return;
    setIsProcessing(true);
    setTimeout(() => {
      setDeposits((prev) =>
        prev.map((d) =>
          d.id === refundTarget.id
            ? { ...d, status: 'refunded', refundedDate: new Date().toISOString().split('T')[0], deductionAmount: data.deductionAmount || d.deductionAmount, deductionReason: data.deductionReason || d.deductionReason }
            : d
        )
      );
      toast.success(`💸 Deposit refund for ${refundTarget.name} processed.`);
      setRefundTarget(null);
      setIsProcessing(false);
    }, 600);
  };

  const handleDeductSubmit = (data: DeductFormData) => {
    if (!deductTarget) return;
    setIsProcessing(true);
    setTimeout(() => {
      setDeposits((prev) =>
        prev.map((d) =>
          d.id === deductTarget.id ? { ...d, deductionAmount: data.amount, deductionReason: data.reason } : d
        )
      );
      toast.success(`➕ Deduction added to ${deductTarget.name}'s deposit.`);
      setDeductTarget(null);
      setIsProcessing(false);
    }, 600);
  };

  return {
    statusFilter, setStatusFilter,
    filtered, isLoading,
    
    refundTarget, setRefundTarget, openRefund, handleRefundSubmit,
    deductTarget, setDeductTarget, openDeduct, handleDeductSubmit,
    
    isProcessing,
  };
}
