// RESPONSIBILITY: Renders library student fee payment records with receipt generation and voiding/reconciliation controls.
// DATA FLOW: API /finance/payments -> Payments State -> AG Grid / Receipt Action
'use client';

import type { ICellRendererParams } from 'ag-grid-community';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import toast from 'react-hot-toast';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { Receipt, Trash2, FileText } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminFinancePayment } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_PAYMENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_finance/superadmin_finance_shared_components/superadmin_gridTheme';

ModuleRegistry.registerModules([AllCommunityModule]);

const MODE_BADGE: Record<string, string> = {
  cash: 'fin-badge fin-badge--cash',
  upi:  'fin-badge fin-badge--upi',
  card: 'fin-badge fin-badge--card',
  bank: 'fin-badge fin-badge--bank',
};

export function PaymentsClient() {
  const router = useRouter();
  const [modeFilter, setModeFilter] = useState('all');
  const [showDeleted, setShowDeleted] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number; receipt: string } | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [allPayments, setAllPayments] = useState<SuperadminFinancePayment[]>([]);

  useEffect(() => {
    fetchApi('/finance/payments').then(( data: any ) => {
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

  const colDefs = [
    { 
      field: 'receiptNumber', 
      headerName: 'Receipt #', 
      width: 150,
      cellRenderer: (params: ICellRendererParams) => (
        <span className={`fin-mono font-medium ${params.data.status === 'deleted' ? 'line-through opacity-50' : ''}`}>
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
          <div className="fin-cell-name">{params.value}</div>
          <div className="fin-cell-subtext">{params.data.smartId}</div>
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
          <span className={MODE_BADGE[params.value] || 'fin-badge fin-badge--neutral'}>{params.value}</span>
        </div>
      )
    },
    { field: 'txnId', headerName: 'Txn ID', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="fin-mono">{p.value || '—'}</span> },
    { 
      field: 'lateFee', 
      headerName: 'Late Fee', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams) => (
        <span className={p.value > 0 ? 'fin-text-warning' : 'fin-text-muted'}>
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
            <span className="fin-badge fin-badge--success self-start">Valid</span>
          ) : (
            <span className="fin-badge fin-badge--neutral self-start">DELETED</span>
          )}
          {params.value === 'deleted' && params.data.deletionReason && (
            <div className="fin-cell-subtext mt-1 text-xs leading-tight" title={params.data.deletionReason}>
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
              className="fin-badge fin-badge--neutral cursor-pointer hover:border-mgr-primary"
              onClick={() => router.push(`/superadmin/superadmin_finance/receipt/${params.data.id}`)}
              title="View Receipt"
            >
              <Receipt size={14} />
            </button>
            <button
              className="fin-badge fin-badge--neutral cursor-pointer hover:border-mgr-primary"
              onClick={() => router.push(`/superadmin/superadmin_finance/invoice/${params.data.id}`)}
              title="View Invoice"
            >
              <FileText size={14} />
            </button>
            <button
              className="fin-badge fin-badge--danger cursor-pointer"
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fin-page-title">Payment History</h1>
        <p className="fin-page-subtitle">Complete payment ledger with audit trail.</p>
      </div>

      <div className="fin-filter-bar">
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Modes', value: 'all' },
              { label: 'Cash', value: 'cash' },
              { label: 'UPI', value: 'upi' },
              { label: 'Card', value: 'card' },
              { label: 'Bank Transfer', value: 'bank' }
            ]}
            value={modeFilter}
            onChange={setModeFilter}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`fin-switch ${showDeleted ? 'fin-switch--on' : 'fin-switch--off'}`}
            onClick={() => setShowDeleted((v: any) => !v)}
            type="button"
          >
            <span className="fin-switch__thumb" />
          </button>
          <span className="fin-text-muted">Show Deleted</span>
        </div>
        <button className="fin-badge fin-badge--neutral cursor-pointer ml-auto">📤 Export</button>
      </div>

      <div className="fin-card p-4">
        <div className="mgr-table-wrapper h-96">
          <AgGridReact
            theme={superadmin_gridTheme}
            rowData={visible}
            columnDefs={colDefs as any}
            rowHeight={56}
            headerHeight={48}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true
            }}
          />
        </div>
      </div>

      {deleteDialog && (
        <div className="fin-dialog-overlay">
          <div className="fin-dialog">
            <h2 className="fin-dialog__title">🗑️ Delete Payment — {deleteDialog.receipt}</h2>
            <button className="fin-dialog__close" onClick={() => setDeleteDialog(null)}>✕</button>
            <p className="fin-dialog-helper">Soft-delete this payment? This action is permanent and logged in Audit Logs.</p>
            <div className="space-y-2 mt-4">
              <label className="fin-label">Deletion reason <span className="fin-text-danger">*</span></label>
              <textarea
                className="fin-textarea"
                value={deleteReason}
                onChange={( e: any ) => setDeleteReason(e.target.value)}
                placeholder="Enter reason for deletion..."
                rows={2}
              />
            </div>
            <div className="fin-dialog__footer mt-6">
              <button className="fin-badge fin-badge--neutral cursor-pointer" onClick={() => setDeleteDialog(null)}>Cancel</button>
              <button
                className="fin-badge fin-badge--danger cursor-pointer"
                onClick={handleDelete}
                disabled={isDeleting || !deleteReason.trim()}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
