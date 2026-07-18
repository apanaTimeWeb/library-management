// RESPONSIBILITY: Renders the useAdminFinanceSecurityDeposits.ts component/hook.
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_FINANCE_MOCK_DEPOSITS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { Deposit } from "./useAdminFinanceSecurityDeposits_types";

export function useAdminFinanceSecurityDeposits() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [refundDialog, setRefundDialog] = useState<{ id: number; name: string; amount: number } | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [deductionAmount, setDeductionAmount] = useState('');
  const [deductionReason, setDeductionReason] = useState('');
  
  const [deductDialog, setDeductDialog] = useState<{ id: number; name: string } | null>(null);
  const [deductAmt, setDeductAmt] = useState('');
  const [deductReason, setDeductReason] = useState('');

  useEffect(() => {
    const t = setTimeout(() => { 
      setDeposits(ADMIN_FINANCE_MOCK_DEPOSITS as Deposit[]); 
      setIsLoading(false); 
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return deposits.filter((d) => statusFilter === 'all' || d.status === statusFilter);
  }, [deposits, statusFilter]);

  const handleRefund = () => {
    if (!refundDialog) return;
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === refundDialog.id
          ? { 
              ...d, 
              status: 'refunded', 
              refundedDate: new Date().toISOString().split('T')[0], 
              deductionAmount: parseFloat(deductionAmount) || d.deductionAmount, 
              deductionReason: deductionReason || d.deductionReason 
            }
          : d
      )
    );
    toast.success(`💸 Deposit refund for ${refundDialog.name} processed.`);
    setRefundDialog(null); 
    setRefundAmount(''); 
    setDeductionAmount(''); 
    setDeductionReason('');
  };

  const handleDeduction = () => {
    if (!deductDialog || !deductAmt || !deductReason) return;
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === deductDialog.id 
          ? { ...d, deductionAmount: parseFloat(deductAmt), deductionReason: deductReason } 
          : d
      )
    );
    toast.success(`➕ Deduction added to ${deductDialog.name}'s deposit.`);
    setDeductDialog(null); 
    setDeductAmt(''); 
    setDeductReason('');
  };

  return {
    statusFilter,
    setStatusFilter,
    filtered,
    isLoading,
    refundDialog,
    setRefundDialog,
    refundAmount,
    setRefundAmount,
    deductionAmount,
    setDeductionAmount,
    deductionReason,
    setDeductionReason,
    deductDialog,
    setDeductDialog,
    deductAmt,
    setDeductAmt,
    deductReason,
    setDeductReason,
    handleRefund,
    handleDeduction
  };
}
