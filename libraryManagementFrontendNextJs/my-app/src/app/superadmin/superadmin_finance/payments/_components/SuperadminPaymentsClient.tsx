'use client';
// RESPONSIBILITY: Renders library student fee payment records with receipt generation and voiding/reconciliation controls.
// DATA FLOW: API /finance/payments -> Payments State -> Table / Receipt Action
import React, { useState, useMemo } from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminPaymentsClient } from '@/app/superadmin/superadmin_finance/payments/_components/useSuperadminPaymentsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { Receipt, FileText, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const MODE_BADGE: Record<string, string> = {
  cash: 'bg-pay-cash-bg text-pay-cash border border-pay-cash-bg/20',
  upi:  'bg-pay-upi-bg text-pay-upi border border-pay-upi-bg/20',
  card: 'bg-pay-card-bg text-pay-card border border-pay-card-bg/20',
  bank: 'bg-pay-bank-bg text-pay-bank border border-pay-bank-bg/20',
};

export function SuperadminPaymentsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const {
    modeFilter, setModeFilter,
    showDeleted, setShowDeleted,
    deleteDialog, setDeleteDialog,
    deleteReason, setDeleteReason,
    isDeleting,
    visible,
    handleDelete,
    router
  } = useSuperadminPaymentsClient();

  const searchedPayments = useMemo(() => {
    if (!searchTerm) return visible;
    const lowerSearch = searchTerm.toLowerCase();
    return visible.filter(p => 
      p.receiptNumber?.toLowerCase().includes(lowerSearch) ||
      p.studentName?.toLowerCase().includes(lowerSearch) ||
      p.smartId?.toLowerCase().includes(lowerSearch) ||
      p.txnId?.toLowerCase().includes(lowerSearch)
    );
  }, [visible, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, modeFilter, showDeleted]);

  const totalPages = Math.ceil(searchedPayments.length / pageSize);
  const paginatedPayments = searchedPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Payment History</h1>
        <p className="text-xs text-text-secondary">Complete payment ledger with audit trail.</p>
      </div>

      <div className="flex items-center gap-3 bg-bg-card p-3 rounded-lg border border-border">
        <div className="w-48">
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
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${showDeleted ? 'bg-primary' : 'bg-input border border-border'}`}
            onClick={() => setShowDeleted((v: boolean) => !v)}
            type="button"
          >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${showDeleted ? 'translate-x-4' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm font-medium text-text-secondary">Show Deleted</span>
        </div>
        <button className="ml-auto bg-input text-text-primary border border-border px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          📤 Export
        </button>
      </div>

      <div className="bg-bg-card rounded-lg border border-border overflow-hidden flex flex-col">
        <div className="flex flex-col gap-4 w-full p-4">
          <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
          
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-bg-page/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Receipt #</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Student</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Amount</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Mode</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Txn ID</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Late Fee</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map((p, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-bg-page/50 transition-colors"
                    >
                      <TableCell>
                        <span className={`font-mono text-sm font-medium ${p.status === 'deleted' ? 'line-through opacity-50 text-text-secondary' : 'text-text-primary'}`}>
                          {p.receiptNumber}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-text-secondary">
                        {formatDate(p.date)}
                      </TableCell>
                      <TableCell>
                        <div className={`py-1 ${p.status === 'deleted' ? 'opacity-50' : ''}`}>
                          <div className="font-medium text-sm text-text-primary">{p.studentName}</div>
                          <div className="text-xs text-text-secondary">{p.smartId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-text-primary">
                        {formatCurrency(p.amount)}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center ${p.status === 'deleted' ? 'opacity-50' : ''}`}>
                          <span className={`${MODE_BADGE[p.mode] || 'bg-input text-text-primary border border-border'} px-2 py-0.5 rounded-full text-xs font-bold capitalize`}>
                            {p.mode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-text-secondary">
                        {p.txnId || '—'}
                      </TableCell>
                      <TableCell className={`text-right ${p.lateFee > 0 ? 'text-warning font-semibold' : 'text-text-secondary'}`}>
                        {formatCurrency(p.lateFee)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-center py-1">
                          {p.status === 'valid' ? (
                            <span className="bg-success-bg text-success border border-success/20 px-2 py-0.5 rounded-full text-xs font-bold self-start uppercase tracking-wider">Valid</span>
                          ) : (
                            <span className="bg-danger-bg text-danger border border-danger/20 px-2 py-0.5 rounded-full text-xs font-bold self-start uppercase tracking-wider">DELETED</span>
                          )}
                          {p.status === 'deleted' && p.deletionReason && (
                            <div className="text-xs text-text-secondary mt-1 leading-tight" title={p.deletionReason}>
                              {p.deletionReason.length > 15 ? p.deletionReason.substring(0, 15) + '...' : p.deletionReason}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {p.status === 'valid' && (
                            <>
                              <button
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                                onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_RECEIPT_ID(p.id))}
                                title="View Receipt"
                              >
                                <Receipt size={14} />
                              </button>
                              <button
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                                onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_INVOICE_ID(p.id))}
                                title="View Invoice"
                              >
                                <FileText size={14} />
                              </button>
                              <button
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-danger-bg text-danger border border-danger/20 hover:bg-danger hover:text-white transition-colors cursor-pointer"
                                onClick={() => setDeleteDialog({ id: p.id, receipt: p.receiptNumber })}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-text-secondary">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-bg-page/30">
          <span className="text-sm font-semibold text-text-secondary">
            Showing {paginatedPayments.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedPayments.length)} of {searchedPayments.length} payments
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-text-primary">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {deleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-bg-card w-full max-w-md rounded-xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">🗑️ Delete Payment — {deleteDialog.receipt}</h2>
            <button className="absolute top-4 right-4 text-text-secondary hover:text-text-primary" onClick={() => setDeleteDialog(null)}>✕</button>
            <p className="text-sm text-text-secondary mb-4">Soft-delete this payment? This action is permanent and logged in Audit Logs.</p>
            <div className="space-y-2 mt-4">
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Deletion reason <span className="text-danger">*</span></label>
              <textarea
                className="w-full bg-input border border-border rounded-md p-3 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                value={deleteReason}
                onChange={( e: React.ChangeEvent<HTMLTextAreaElement> ) => setDeleteReason(e.target.value)}
                placeholder="Enter reason for deletion..."
                rows={2}
              />
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button className="bg-input text-text-primary border border-border px-4 py-2 rounded-md text-sm font-bold hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => setDeleteDialog(null)}>Cancel</button>
              <button
                className="bg-danger-bg text-danger border border-danger/20 px-4 py-2 rounded-md text-sm font-bold hover:bg-danger hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
