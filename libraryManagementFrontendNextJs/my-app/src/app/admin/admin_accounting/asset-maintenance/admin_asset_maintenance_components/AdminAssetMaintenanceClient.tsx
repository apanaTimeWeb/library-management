'use client';

// RESPONSIBILITY: Client view rendering asset maintenance table, search, type filters, and total cost stats (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminAssetMaintenance -> AdminAssetMaintenanceClient -> AG Grid / Add Dialog (`Rule 39`).

import { useState, useMemo } from 'react';
import { Search, Plus, Filter, IndianRupee } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminAssetMaintenance } from '@/app/admin/admin_accounting/asset-maintenance/admin_asset_maintenance_hooks/useAdminAssetMaintenance';
import { AdminAssetMaintenanceAddDialog } from '@/app/admin/admin_accounting/asset-maintenance/admin_asset_maintenance_components/AdminAssetMaintenanceAddDialog';

ModuleRegistry.registerModules([AllCommunityModule]);

function StatusBadge({ value }: { value: string }) {
  if (!value) return null;
  const statusColors: Record<string, string> = {
    scheduled: 'admin-badge-warning',
    completed: 'admin-badge-success',
    pending: 'admin-badge-neutral',
  };
  return (
    <span className={`admin-badge ${statusColors[value] || 'admin-badge-neutral'}`}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}

function TypeBadge({ value }: { value: string }) {
  if (!value) return null;
  const typeColors: Record<string, string> = {
    routine: 'admin-badge-info',
    repair: 'admin-badge-danger',
    upgrade: 'admin-badge-primary',
  };
  return (
    <span className={`admin-badge ${typeColors[value] || 'admin-badge-neutral'}`}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}

function CurrencyCell({ value }: { value: number }) {
  return <span className="font-semibold text-foreground flex items-center gap-0.5"><IndianRupee size={12} /> {value.toLocaleString('en-IN')}</span>;
}

export function AdminAssetMaintenanceClient() {
  const {
    maintenance,
    totalCost,
    fetchState,
    searchInput,
    typeFilter,
    setSearchInput,
    setTypeFilter,
    handleCreateMaintenance,
    handleResetFilters,
  } = useAdminAssetMaintenance();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const colDefs = useMemo(() => [
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120, cellClass: 'text-xs text-muted-foreground' },
    { field: 'assetName', headerName: 'Asset Name', flex: 1.5, minWidth: 160, cellClass: 'font-semibold text-foreground' },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 120, cellRenderer: TypeBadge },
    { field: 'vendor', headerName: 'Vendor', flex: 1.5, minWidth: 140 },
    { field: 'cost', headerName: 'Cost', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, cellRenderer: StatusBadge },
  ], []);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title text-2xl font-extrabold tracking-tight">Asset Maintenance</h1>
          <p className="admin-page-subtitle text-muted-foreground mt-1">Schedule and track maintenance for library assets.</p>
        </div>
        <button type="button" onClick={() => setIsAddOpen(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Schedule Maintenance
        </button>
      </div>

      {/* Overview Stat */}
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Maintenance Cost</h3>
          <p className="text-3xl font-extrabold text-foreground flex items-center tracking-tighter">
            <IndianRupee size={24} className="mr-1 text-danger" />
            {totalCost.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9 w-full"
            placeholder="Search asset or vendor…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <select
            className="admin-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="routine">Routine</option>
            <option value="repair">Repair</option>
            <option value="upgrade">Upgrade</option>
          </select>
        </div>

        {(searchInput || typeFilter !== 'all') && (
          <button onClick={handleResetFilters} className="text-xs text-info hover:underline font-medium">
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="admin-table-wrapper flex-1 min-h-[450px]">
        {fetchState === 'loading' && maintenance.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading maintenance tasks…</div>
        ) : (
          <AgGridReact
            theme={gridTheme}
            rowData={maintenance}
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

      <AdminAssetMaintenanceAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateMaintenance}
      />
    </div>
  );
}
