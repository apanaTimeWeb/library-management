'use client';

// RESPONSIBILITY: Client view rendering accounting expenses table, search, category filters, and total value stats (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminAccountingExpenses -> AdminAccountingExpensesClient -> AG Grid / Add Dialog (`Rule 39`).

import { useState, useMemo } from 'react';
import { Search, Plus, Filter, IndianRupee, TrendingUp } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminAccountingExpenses } from '@/app/admin/admin_accounting/expenses/admin_accounting_expenses_hooks/useAdminAccountingExpenses';
import { AdminAccountingExpensesAddDialog } from '@/app/admin/admin_accounting/expenses/admin_accounting_expenses_components/AdminAccountingExpensesAddDialog';

ModuleRegistry.registerModules([AllCommunityModule]);

function ModeBadge({ value }: { value: string }) {
  if (!value) return null;
  const modeColors: Record<string, string> = {
    cash: 'admin-badge-success',
    upi: 'admin-badge-info',
    card: 'admin-badge-primary',
    bank: 'admin-badge-warning',
  };
  return (
    <span className={`admin-badge ${modeColors[value] || 'admin-badge-neutral'}`}>
      {value.toUpperCase()}
    </span>
  );
}

function CurrencyCell({ value }: { value: number }) {
  return <span className="font-semibold text-foreground flex items-center gap-0.5"><IndianRupee size={12} /> {value.toLocaleString('en-IN')}</span>;
}

export function AdminAccountingExpensesClient() {
  const {
    expenses,
    categories,
    totalValue,
    fetchState,
    searchInput,
    categoryFilter,
    setSearchInput,
    setCategoryFilter,
    handleCreateExpense,
    handleResetFilters,
  } = useAdminAccountingExpenses();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const colDefs = useMemo(() => [
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120, cellClass: 'text-xs text-muted-foreground' },
    { field: 'category', headerName: 'Category', flex: 1.5, minWidth: 150, cellClass: 'font-semibold text-foreground' },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 200 },
    { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'paidBy', headerName: 'Paid By', flex: 1, minWidth: 130 },
    { field: 'mode', headerName: 'Mode', flex: 1, minWidth: 100, cellRenderer: ModeBadge },
  ], []);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title text-2xl font-extrabold tracking-tight">Manual Expenses</h1>
          <p className="admin-page-subtitle text-muted-foreground mt-1">Log and track miscellaneous accounting expenses.</p>
        </div>
        <button type="button" onClick={() => setIsAddOpen(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Log Expense
        </button>
      </div>

      {/* Overview Stat */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total (Filtered)</h3>
          <p className="text-3xl font-extrabold text-foreground flex items-center tracking-tighter">
            <IndianRupee size={24} className="mr-1 text-danger" />
            {totalValue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-3 bg-danger/10 text-danger rounded-full">
          <TrendingUp size={24} />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9 w-full"
            placeholder="Search description or paid by…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <select
            className="admin-input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {(searchInput || categoryFilter !== 'all') && (
          <button onClick={handleResetFilters} className="text-xs text-info hover:underline font-medium">
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="admin-table-wrapper flex-1 min-h-[450px]">
        {fetchState === 'loading' && expenses.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading expenses…</div>
        ) : (
          <AgGridReact
            theme={gridTheme}
            rowData={expenses}
            columnDefs={colDefs}
            rowHeight={52}
            headerHeight={40}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false, sortable: true }}
            rowClass="hover:bg-muted/30 transition-colors"
          />
        )}
      </div>

      <AdminAccountingExpensesAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateExpense}
      />
    </div>
  );
}
