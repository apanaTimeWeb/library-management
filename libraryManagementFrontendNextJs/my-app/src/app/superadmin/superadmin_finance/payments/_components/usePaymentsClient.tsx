/**
 * RESPONSIBILITY: Logic, state management, and AG Grid configuration for the PaymentsClient component.
 */
import { SUPERADMIN_ROUTES, SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Receipt, FileText, Trash2 } from 'lucide-react';
import type { ICellRendererParams } from 'ag-grid-community';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import type { SuperadminFinancePayment } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_PAYMENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export function usePaymentsClient() {
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

  const MODE_BADGE: Record<string, string> = {
    cash: 'bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/20',
    upi:  'bg-primary/10 text-primary border border-primary/20',
    card: 'bg-warning/10 text-warning border border-warning/20',
    bank: 'bg-info/10 text-info border border-info/20',
  };

  const colDefs = [
    { 
      field: 'receiptNumber', 
      headerName: 'Receipt #', 
      width: 150,
      cellRenderer: (params: ICellRendererParams) => (
        <span className={`font-mono text-[14px] font-medium ${params.data.status === 'deleted' ? 'line-through opacity-50 text-text-secondary' : 'text-text-primary'}`}>
          {params.value}
        </span>
      )
    },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 120,
      valueFormatter: (p: ICellRendererParams) => formatDate(p.value)
    },
    { 
      field: 'studentName', 
      headerName: 'Student', 
      flex: 1,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams) => (
        <div className={`py-1 ${params.data.status === 'deleted' ? 'opacity-50' : ''}`}>
          <div className="font-medium text-[14px] text-text-primary">{params.value}</div>
          <div className="text-[12px] text-text-secondary">{params.data.smartId}</div>
        </div>
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      width: 120,
      cellStyle: { textAlign: 'right', fontWeight: 600 },
      valueFormatter: (p: ICellRendererParams) => formatCurrency(p.value)
    },
    { 
      field: 'mode', 
      headerName: 'Mode', 
      width: 110,
      cellRenderer: (params: ICellRendererParams) => (
        <div className={`h-full flex items-center ${params.data.status === 'deleted' ? 'opacity-50' : ''}`}>
          <span className={`${MODE_BADGE[params.value] || 'bg-input text-text-primary border border-border'} px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold capitalize`}>
            {params.value}
          </span>
        </div>
      )
    },
    { field: 'txnId', headerName: 'Txn ID', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="font-mono text-[14px] text-text-secondary">{p.value || '—'}</span> },
    { 
      field: 'lateFee', 
      headerName: 'Late Fee', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams) => (
        <span className={p.value > 0 ? 'text-warning font-semibold' : 'text-text-secondary'}>
          {formatCurrency(p.value)}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="h-full flex flex-col justify-center py-1">
          {params.value === 'valid' ? (
            <span className="bg-success/10 text-success border border-success/20 px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold self-start uppercase tracking-wider">Valid</span>
          ) : (
            <span className="bg-danger/10 text-danger border border-danger/20 px-2 py-0.5 rounded-[var(--radius-full)] text-[11px] font-bold self-start uppercase tracking-wider">DELETED</span>
          )}
          {params.value === 'deleted' && params.data.deletionReason && (
            <div className="text-[11px] text-text-secondary mt-1 leading-tight" title={params.data.deletionReason}>
              {params.data.deletionReason.length > 15 ? params.data.deletionReason.substring(0, 15) + '...' : params.data.deletionReason}
            </div>
          )}
        </div>
      )
    },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        if (params.data.status !== 'valid') return null;
        return (
          <div className="flex items-center gap-2 h-full">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_RECEIPT_ID(params.data.id))}
              title="View Receipt"
            >
              <Receipt size={14} />
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_INVOICE_ID(params.data.id))}
              title="View Invoice"
            >
              <FileText size={14} />
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-danger/10 text-danger border border-danger/20 hover:bg-danger hover:text-danger-foreground transition-colors cursor-pointer"
              onClick={() => setDeleteDialog({ id: params.data.id, receipt: params.data.receiptNumber })}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      }
    }
  ];

  return {
    modeFilter, setModeFilter,
    showDeleted, setShowDeleted,
    deleteDialog, setDeleteDialog,
    deleteReason, setDeleteReason,
    isDeleting,
    visible,
    handleDelete,
    colDefs,
  };
}
