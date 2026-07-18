'use client';
// RESPONSIBILITY: Renders library student fee payment records with receipt generation and voiding/reconciliation controls.
// DATA FLOW: API /finance/payments -> Payments State -> AG Grid / Receipt Action
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_finance/superadmin_finance_shared_components/superadmin_gridTheme';
import { usePaymentsClient } from '@/app/superadmin/superadmin_finance/payments/_components/usePaymentsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";

ModuleRegistry.registerModules([AllCommunityModule]);

export function PaymentsClient() {
    const [searchTerm, setSearchTerm] = useState('');
  const {
    modeFilter, setModeFilter,
    showDeleted, setShowDeleted,
    deleteDialog, setDeleteDialog,
    deleteReason, setDeleteReason,
    isDeleting,
    visible,
    handleDelete,
    colDefs,
  } = usePaymentsClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Payment History</h1>
        <p className="text-xs text-text-secondary">Complete payment ledger with audit trail.</p>
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border">
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

      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col gap-4 w-full">
<TableToolbar search={searchTerm} onSearch={setSearchTerm} />
      <div className="h-96 w-full" style={{ width: '100%', height: '400px' }}>
          <AgGridReact
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchTerm}
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
      </div>

      {deleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-pagelack/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-xl shadow-2xl border border-border p-6 animate-in fade-in zoom-in duration-200">
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
                className="bg-danger/10 text-danger border border-danger/20 px-4 py-2 rounded-md text-sm font-bold hover:bg-danger hover:text-danger-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
