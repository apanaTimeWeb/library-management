'use client';
// RESPONSIBILITY: Renders library student fee payment records with receipt generation and voiding/reconciliation controls.
// DATA FLOW: API /finance/payments -> Payments State -> Table / Receipt Action
import React, { useState, useMemo } from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminPaymentsClient } from '@/app/superadmin/superadmin_finance/payments/superadmin_payments_components/useSuperadminPaymentsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { Receipt, FileText, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/SuperadminFormat';
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  SUPERADMIN_PAYMENTS_MODE_BADGES, 
  SUPERADMIN_PAYMENTS_MODE_OPTIONS 
} from '../superadmin_payments_constants/SuperadminPaymentsConstants';

export function SuperadminPaymentsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const table = useClientTable(searchedPayments, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Payment History</h1>
        <p className="text-xs text-text-secondary">Complete payment ledger with audit trail.</p>
      </div>

      <div className="flex items-center gap-3 bg-bg-card p-3 rounded-lg border border-border">
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={SUPERADMIN_PAYMENTS_MODE_OPTIONS}
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
              <TableHeader className="bg-page/50">
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
                {table.paginatedData.length > 0 ? (
                  table.paginatedData.map((p, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-page/50 transition-colors cursor-pointer"
                      onClick={() => {
                        if (p.status === 'valid') {
                          router.push(SUPERADMIN_ROUTES.FINANCE_RECEIPT_ID(p.id.toString()));
                        }
                      }}
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
                          <span className={`${SUPERADMIN_PAYMENTS_MODE_BADGES[p.mode] || 'bg-input text-text-primary border border-border'} px-2 py-0.5 rounded-full text-xs font-bold capitalize`}>
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-xs text-text-secondary mt-1 leading-tight max-w-[150px] truncate cursor-help">
                                    {p.deletionReason}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm max-w-xs">{p.deletionReason}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {p.status === 'valid' && (
                            <>
                              <button
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(SUPERADMIN_ROUTES.FINANCE_INVOICE_ID(p.id.toString()));
                                }}
                                title="View Invoice"
                              >
                                <FileText size={14} />
                              </button>
                              <button
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-danger-bg text-danger border border-danger/20 hover:bg-danger hover:text-white transition-colors cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteDialog({ id: p.id, receipt: p.receiptNumber });
                                }}
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

        <TablePagination 
          page={table.page}
          totalItems={table.totalItems}
          onPageChange={table.setPage}
          limit={table.limit}
          onLimitChange={table.setLimit}
        />
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

