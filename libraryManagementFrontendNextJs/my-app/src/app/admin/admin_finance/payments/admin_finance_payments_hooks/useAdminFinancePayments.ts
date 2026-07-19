// RESPONSIBILITY: Renders the useAdminFinancePayments.ts component/hook.
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';


export interface Payment {
  id: number;
  receiptNumber: string;
  date: string;
  studentName: string;
  smartId: string;
  amount: number;
  mode: PaymentMode;
  txnId?: string;
  lateFee: number;
  receivedBy: string;
  remark?: string;
  status: PaymentStatus;
  deletionReason?: string;
}
export type PaymentMode = 'cash' | 'upi' | 'card' | 'bank';
export type PaymentStatus = 'valid' | 'deleted';

export function useAdminFinancePayments() {
  const [allPayments, setAllPayments] = useState<Payment[]>([]);
  const [modeFilter, setModeFilter] = useState('all');
  const [showDeleted, setShowDeleted] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; receipt: string } | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchApi('/finance/payments').then((data: any) => {
      const mapped = data.map((p: Record<string, unknown>) => ({
        id: p.id || Math.random(),
        receiptNumber: 'REC-' + String(p.id || '').substring(0, 8),
        date: p.date ? new Date(p.date as string | number).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        studentName: p.studentName || p.name || 'Unknown Student',
        smartId: p.smartId || 'S-001',
        amount: Number(p.amount || 0),
        mode: p.mode || 'cash',
        lateFee: Number(p.lateFee || 0),
        receivedBy: p.receivedBy || 'Admin',
        status: p.status === 'completed' ? 'valid' : (p.status || 'valid'),
      }));
      setAllPayments(mapped);
      setIsLoading(false);
    }).catch(e => {
      logger.error('Payments fetch failed:', e);
      setIsLoading(false);
    });
  }, []);

  const visible = useMemo(() => {
    return allPayments.filter((p) => {
      const modeMatch = modeFilter === 'all' || p.mode === modeFilter;
      const deletedMatch = showDeleted || p.status !== 'deleted';
      return modeMatch && deletedMatch;
    });
  }, [allPayments, modeFilter, showDeleted]);

  const handleDelete = () => {
    if (!deleteDialog || !deleteReason.trim()) return;
    setIsDeleting(true);
    
    // Simulate API call for deletion
    setTimeout(() => {
      setAllPayments((prev) =>
        prev.map((p) =>
          p.id === deleteDialog.id ? { ...p, status: 'deleted', deletionReason: deleteReason } : p
        )
      );
      toast.success(`Payment ${deleteDialog.receipt} has been voided.`);
      setDeleteDialog(null);
      setDeleteReason('');
      setIsDeleting(false);
    }, 700);
  };

  return {
    allPayments,
    visible,
    modeFilter,
    setModeFilter,
    showDeleted,
    setShowDeleted,
    deleteDialog,
    setDeleteDialog,
    deleteReason,
    setDeleteReason,
    isDeleting,
    handleDelete,
    isLoading
  };
}




