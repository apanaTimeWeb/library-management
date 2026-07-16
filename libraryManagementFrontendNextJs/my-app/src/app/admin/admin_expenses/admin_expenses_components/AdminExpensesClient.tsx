'use client';

// RESPONSIBILITY: Client view component rendering expenses table, search filter, and branch context (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminExpenses -> AdminExpensesClient -> AG Grid (`Rule 39`).

import { useMemo } from 'react';
import { Search, Download, IndianRupee } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminExpenses } from '@/app/admin/admin_expenses/admin_expenses_hooks/useAdminExpenses';
import { AdminExpensesSkeleton } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesSkeleton';
import { AdminExpensesEmptyState } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesEmptyState';
import { ExpenseRecord } from '@/app/admin/admin_expenses/admin_expenses_types/admin_expenses_types';

ModuleRegistry.registerModules([AllCommunityModule]);

function AmountCell({ value }: { value: number }) {
  return (
    <span className="font-semibold text-foreground flex items-center gap-0.5">
      <IndianRupee size={12} /> {value.toLocaleString('en-IN')}
    </span>
  );
}

function StatusCell({ value }: { value: string }) {
  if (!value) return null;
  return (
    <span className={`admin-badge ${value === 'Approved' ? 'admin-badge-success' : value === 'Pending' ? 'admin-badge-warning' : 'admin-badge-danger'}`}>
      {value}
    </span>
  );
}

export function AdminExpensesClient() {
  const {
    expenses,
    totalCount,
    fetchState,
    searchInput,
    selectedBranch,
    setSearchInput,
    handleResetSearch,
  } = useAdminExpenses();

  const colDefs = useMemo(() => {
    const cols = [
      { field: 'date',       headerName: 'DATE',        flex: 1,   minWidth: 120, cellClass: 'text-xs text-muted-foreground' },
      { field: 'category',   headerName: 'CATEGORY',    flex: 1.5, minWidth: 150, cellClass: 'font-medium' },
      { field: 'recordedBy', headerName: 'RECORDED BY', flex: 1.5, minWidth: 150, cellClass: 'text-sm text-foreground' },
      { field: 'amount',     headerName: 'AMOUNT',      flex: 1,   minWidth: 120, cellRenderer: AmountCell },
      { field: 'status',     headerName: 'STATUS',      flex: 1,   minWidth: 120, cellRenderer: StatusCell },
    ];
    if (selectedBranch === 'All Branches') {
      cols.splice(1, 0, { field: 'branch', headerName: 'BRANCH', flex: 1.2, minWidth: 140, cellClass: 'text-xs font-semibold text-muted-foreground uppercase' });
    }
    return cols;
  }, [selectedBranch]);

  if (fetchState === 'loading' && expenses.length === 0) {
    return <AdminExpensesSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Expenses</p>
          <h1 className="admin-page-title">{selectedBranch} - Expenses</h1>
          <p className="admin-page-subtitle">Monitor expenses logged by managers during daily settlement for the selected branch.</p>
        </div>
        <button
          type="button"
          className="admin-btn-outline flex items-center gap-2"
          title="Export table data to CSV"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Search Bar (`Rule 15`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
            placeholder="Search category, branch, or manager…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Showing <strong className="text-foreground">{totalCount}</strong> expenses
        </div>
      </div>

      {/* Table or Empty State (`Rule 50`) */}
      {expenses.length === 0 ? (
        <AdminExpensesEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <div className="admin-table-wrapper flex-1 min-h-[450px]">
          <AgGridReact
            theme={gridTheme}
            rowData={expenses}
            columnDefs={colDefs as never}
            rowHeight={52}
            headerHeight={40}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false, sortable: true }}
            rowClass="hover:bg-muted/30 transition-colors"
          />
        </div>
      )}
    </div>
  );
}
