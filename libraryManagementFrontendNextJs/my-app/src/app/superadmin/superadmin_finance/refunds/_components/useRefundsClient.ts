/**
 * RESPONSIBILITY: Logic and state management for the RefundsClient component.
 */
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import type { SuperadminFinanceRefund } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_REFUNDS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import type { ProcessFormData } from '@/app/superadmin/superadmin_finance/refunds/_components/RefundProcessModal';
import type { DeductFormData } from '@/app/superadmin/superadmin_finance/refunds/_components/RefundDeductModal';

export function useRefundsClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [allRefunds, setAllRefunds] = useState<SuperadminFinanceRefund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [processDialog, setProcessDialog] = useState<{ id: number; name: string; amount: number } | null>(null);
  const [deductDialog, setDeductDialog] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.FINANCE_REFUNDS).then(( data: any ) => {
      const actualData = Array.isArray(data) ? data : data?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || String(actualData[0]?.id).startsWith('MOCK-')) {
        setAllRefunds(SUPERADMIN_FINANCE_MOCK_REFUNDS as SuperadminFinanceRefund[]);
        setIsLoading(false);
        return;
      }
      const mapped: SuperadminFinanceRefund[] = actualData.map(( r: Record<string, any> ) => ({
        id: parseInt(String(r.id || '0'), 10),
        studentName: String(r.name || 'Student'),
        smartId: 'S-001',
        depositHeld: 1000,
        deductionAmount: 0,
        netRefund: Number(r.amount) || 0,
        status: (r.status || 'pending') as SuperadminFinanceRefund['status'],
        requestedDate: r.date ? new Date(String(r.date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      }));
      setAllRefunds(mapped);
      setIsLoading(false);
    }).catch(err => {
      logger.error('Failed to load finance refunds', err);
      setIsLoading(false);
    });
  }, []);

  const filtered = allRefunds.filter((r) => statusFilter === 'all' || r.status === statusFilter);
  const totalRefunded = allRefunds.filter((r) => r.status === 'processed').reduce((s, r) => s + r.netRefund, 0);
  const pendingCount = allRefunds.filter((r) => r.status === 'pending').length;
  const approvedCount = allRefunds.filter((r) => r.status === 'approved').length;
  const rejectedCount = allRefunds.filter((r) => r.status === 'rejected').length;

  const handleProcess = (data: ProcessFormData) => {
    if (!processDialog) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map(( r ) =>
          r.id === processDialog.id
            ? { ...r, status: 'processed', processedDate: new Date().toISOString().split('T')[0], paymentMethod: data.paymentMethod.toUpperCase() }
            : r
        )
      );
      toast.success(`💸 Refund of ${formatCurrency(processDialog.amount)} for ${processDialog.name} processed.`);
      setProcessDialog(null); 
      setIsSubmitting(false);
    }, 700);
  };

  const handleDeduction = (data: DeductFormData) => {
    if (!deductDialog) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map(( r ) =>
          r.id === deductDialog.id
            ? { ...r, deductionAmount: data.amount, netRefund: r.depositHeld - data.amount }
            : r
        )
      );
      toast.success(`➕ Deduction added for ${deductDialog.name}.`);
      setDeductDialog(null); 
      setIsSubmitting(false);
    }, 600);
  };

  return {
    statusFilter, setStatusFilter,
    isLoading, isSubmitting,
    processDialog, setProcessDialog,
    deductDialog, setDeductDialog,
    filtered,
    totalRefunded,
    pendingCount,
    approvedCount,
    rejectedCount,
    handleProcess,
    handleDeduction,
  };
}
