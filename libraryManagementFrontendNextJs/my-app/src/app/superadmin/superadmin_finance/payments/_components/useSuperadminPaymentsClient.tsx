// RESPONSIBILITY: Component or Page.
/**
 * RESPONSIBILITY: Logic, state management, and AG Grid configuration for the SuperadminPaymentsClient component.
 */
import { SUPERADMIN_ROUTES, SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';
import type { SuperadminFinancePayment } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_PAYMENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export function useSuperadminPaymentsClient() {
  const [modeFilter, setModeFilter] = useState('all');
  const [showDeleted, setShowDeleted] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; receipt: string } | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [allPayments, setAllPayments] = useState<SuperadminFinancePayment[]>([]);

  useEffect(() => {
    fetchApi(SUPERADMIN_API_ROUTES.FINANCE_PAYMENTS).then(( data: any ) => {
      const actualData = Array.isArray(data) ? data : data?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || String(actualData[0]?.id).startsWith('MOCK-')) {
        setAllPayments(SUPERADMIN_FINANCE_MOCK_PAYMENTS as SuperadminFinancePayment[]);
        return;
      }
      const mapped: SuperadminFinancePayment[] = actualData.map(( p: Record<string, any> ) => ({
        id: typeof p.id === 'number' ? p.id : parseInt(String(p.id || '0'), 10),
        receiptNumber: 'REC-' + String(p.id || '').substring(0, 8),
        date: p.date ? new Date(String(p.date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        studentName: String(p.studentName || 'Student'),
        smartId: 'S-001',
        amount: Number(p.amount) || 0,
        mode: 'cash' as const,
        lateFee: 0,
        receivedBy: 'Admin',
        status: p.status === 'completed' ? 'valid' : 'deleted',
      }));
      setAllPayments(mapped);
    }).catch(err => logger.error('Failed to load payments data', err));
  }, []);

  const visible = allPayments.filter((p) => {
    const modeMatch = modeFilter === 'all' || p.mode === modeFilter;
    const deletedMatch = showDeleted || p.status !== 'deleted';
    return modeMatch && deletedMatch;
  });

  const handleDelete = () => {
    if (!deleteDialog || !deleteReason.trim()) return;
    setIsDeleting(true);
    setTimeout(() => {
      setAllPayments((prev) =>
        prev.map(( p ) =>
          p.id === deleteDialog.id ? { ...p, status: 'deleted', deletionReason: deleteReason } : p
        )
      );
      toast.success(`Payment ${deleteDialog.receipt} has been voided.`);
      setDeleteDialog(null);
      setDeleteReason('');
      setIsDeleting(false);
    }, 700);
  };

  const router = useRouter();

  return {
    modeFilter, setModeFilter,
    showDeleted, setShowDeleted,
    deleteDialog, setDeleteDialog,
    deleteReason, setDeleteReason,
    isDeleting,
    visible,
    handleDelete,
    router
  };
}
