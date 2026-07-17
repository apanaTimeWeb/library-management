import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { ADMIN_FINANCE_MOCK_REFUNDS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'processed';

export type Refund = {
  id: number;
  studentName: string;
  smartId: string;
  exitDate?: string;
  depositHeld: number;
  deductionAmount: number;
  netRefund: number;
  status: RefundStatus;
  requestedDate: string;
  processedDate?: string;
  paymentMethod?: string;
  rejectionReason?: string;
};

export function useFinanceRefunds() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [allRefunds, setAllRefunds] = useState<Refund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processDialog, setProcessDialog] = useState<{ id: number; name: string; amount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const [deductDialog, setDeductDialog] = useState<{ id: number; name: string } | null>(null);
  const [deductAmt, setDeductAmt] = useState('');
  const [deductReason, setDeductReason] = useState('');

  useEffect(() => {
    fetchApi('/finance/refunds')
      .then(data => {
        const mapped = data.map((r: Record<string, unknown>) => ({
          id: typeof r.id === 'number' ? r.id : (parseInt(String(r.id).replace(/\D/g, '')) || Math.floor(Math.random() * 10000)),
          studentName: r.name || r.studentName || 'Unknown Student',
          smartId: r.smartId || 'S-001',
          depositHeld: Number(r.depositHeld || 1000),
          deductionAmount: Number(r.deductionAmount || 0),
          netRefund: Number(r.amount || r.netRefund || 0),
          status: r.status || 'pending',
          requestedDate: (r.date || r.requestedDate) ? new Date((r.date || r.requestedDate) as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
        setAllRefunds(mapped);
      })
      .catch(e => {
        logger.error('Refunds fetch error, using fallback:', e);
        setAllRefunds(ADMIN_FINANCE_MOCK_REFUNDS as Refund[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredRefunds = useMemo(() => {
    return allRefunds.filter((r) => statusFilter === 'all' || r.status === statusFilter);
  }, [allRefunds, statusFilter]);

  const kpiData = useMemo(() => {
    return {
      totalRefunded: allRefunds.filter((r) => r.status === 'processed').reduce((s, r) => s + r.netRefund, 0),
      pendingCount: allRefunds.filter((r) => r.status === 'pending').length,
      approvedCount: allRefunds.filter((r) => r.status === 'approved').length,
      rejectedCount: allRefunds.filter((r) => r.status === 'rejected').length
    };
  }, [allRefunds]);

  const handleProcess = () => {
    if (!processDialog) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map((r) =>
          r.id === processDialog.id
            ? { ...r, status: 'processed', processedDate: new Date().toISOString().split('T')[0], paymentMethod: paymentMethod.toUpperCase() }
            : r
        )
      );
      toast.success(`💸 Refund of ${formatCurrency(processDialog.amount)} for ${processDialog.name} processed.`);
      setProcessDialog(null); 
      setPaymentMethod('upi'); 
      setIsSubmitting(false);
    }, 700);
  };

  const handleDeduction = () => {
    if (!deductDialog || !deductAmt || !deductReason) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map((r) =>
          r.id === deductDialog.id
            ? { ...r, deductionAmount: parseFloat(deductAmt), netRefund: r.depositHeld - parseFloat(deductAmt) }
            : r
        )
      );
      toast.success(`➕ Deduction added for ${deductDialog.name}.`);
      setDeductDialog(null); 
      setDeductAmt(''); 
      setDeductReason(''); 
      setIsSubmitting(false);
    }, 600);
  };

  return {
    statusFilter,
    setStatusFilter,
    filteredRefunds,
    kpiData,
    isLoading,
    isSubmitting,
    processDialog,
    setProcessDialog,
    paymentMethod,
    setPaymentMethod,
    deductDialog,
    setDeductDialog,
    deductAmt,
    setDeductAmt,
    deductReason,
    setDeductReason,
    handleProcess,
    handleDeduction
  };
}
