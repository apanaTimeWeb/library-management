'use client';

// RESPONSIBILITY: Client view rendering asset table, search, category filters, and total value stats (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminAssets -> AdminAssetsClient -> AG Grid / Add Dialog (`Rule 39`).

import { useState, useMemo } from 'react';
import { Search, Plus, Filter, IndianRupee } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminAssets } from '@/app/admin/admin_accounting/assets/admin_assets_hooks/useAdminAssets';
import { AdminAssetsAddDialog } from '@/app/admin/admin_accounting/assets/admin_assets_components/AdminAssetsAddDialog';

ModuleRegistry.registerModules([AllCommunityModule]);

function StatusBadge({ value }: { value: string }) {
  if (!value) return null;
  const statusColors: Record<string, string> = {
    active: 'admin-badge-success',
    maintenance: 'admin-badge-warning',
    disposed: 'admin-badge-neutral',
  };
  return (
    <span className={`admin-badge ${statusColors[value] || 'admin-badge-neutral'}`}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}

function CurrencyCell({ value }: { value: number }) {
  return <span className="font-semibold text-foreground flex items-center gap-0.5"><IndianRupee size={12} /> {value.toLocaleString('en-IN')}</span>;
}

export function AdminAssetsClient() {
  const {
    assets,
    categories,
    totalValue,
    fetchState,
    searchInput,
    categoryFilter,
    setSearchInput,
    setCategoryFilter,
    handleCreateAsset,
    handleResetFilters,
  } = useAdminAssets();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const colDefs = useMemo(() => [
    { field: 'name', headerName: 'Asset Name', flex: 1.5, minWidth: 160, cellClass: 'font-semibold text-foreground' },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 130 },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 130 },
    { field: 'purchaseDate', headerName: 'Purchased On', flex: 1, minWidth: 120, cellClass: 'text-muted-foreground text-xs' },
    { field: 'currentValue', headerName: 'Current Val', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, cellRenderer: StatusBadge },
  ], []);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title text-2xl font-extrabold tracking-tight">Asset Manager</h1>
          <p className="admin-page-subtitle text-muted-foreground mt-1">Track all library assets and their current valuation.</p>
        </div>
        <button type="button" onClick={() => setIsAddOpen(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Register Asset
        </button>
      </div>

      {/* Overview Stat */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Active Value</h3>
          <p className="text-3xl font-extrabold text-foreground flex items-center tracking-tighter">
            <IndianRupee size={24} className="mr-1 text-primary" />
            {totalValue.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9 w-full"
            placeholder="Search by asset name or location…"
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
        {fetchState === 'loading' && assets.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading assets…</div>
        ) : (
          <AgGridReact
            theme={gridTheme}
            rowData={assets}
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

      <AdminAssetsAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateAsset}
      />
    </div>
  );
}
