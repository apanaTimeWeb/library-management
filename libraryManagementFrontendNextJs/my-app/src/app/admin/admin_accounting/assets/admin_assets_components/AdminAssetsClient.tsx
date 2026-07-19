'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminAssetsClient component.
import { useState } from 'react';
import { Search, Plus, Filter, IndianRupee } from 'lucide-react';
import { useAdminAssets } from '@/app/admin/admin_accounting/assets/admin_assets_hooks/useAdminAssets';
import { AdminAssetsAddDialog } from '@/app/admin/admin_accounting/assets/admin_assets_components/AdminAssetsAddDialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

function StatusBadge({ value }: { value: string }) {
  if (!value) return null;
  const statusClasses: Record<string, string> = {
    active: 'bg-success/10 text-success hover:bg-success/20',
    maintenance: 'bg-warning/10 text-warning hover:bg-warning/20',
    disposed: 'bg-muted text-muted-foreground',
  };
  return (
    <Badge variant="secondary" className={`${statusClasses[value] || 'bg-muted text-muted-foreground'} border-none font-bold tracking-wide`}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Badge>
  );
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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isAddOpen, setIsAddOpen] = useState(false);
    const table = useClientTable(assets, 10);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Asset Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">Track all library assets and their current valuation.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus size={16} /> Register Asset
        </Button>
      </div>

      {/* Overview Stat */}
      <Card className="p-6 shadow-none border-border">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Active Value</h3>
          <p className="text-3xl font-bold text-foreground flex items-center">
            <IndianRupee size={24} className="mr-1 text-primary" />
            {totalValue.toLocaleString('en-IN')}
          </p>
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 w-full"
            placeholder="Search by asset name or locationâ€¦"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <AdminSearchableDropdown
            className="flex h-10 w-44 items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </AdminSearchableDropdown>
        </div>

        {(searchInput || categoryFilter !== 'all') && (
          <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-info hover:text-info/80 hover:bg-info/10">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Grid */}
      <Card className="flex-1 shadow-none border-border overflow-hidden flex flex-col min-h-96">
        {fetchState === 'loading' && assets.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading assetsâ€¦</div>
        ) : (<>
            <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Asset Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Purchased On</th>
                  <th className="px-4 py-3">Current Val</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.paginatedData.map((asset, index) => (
                  <tr key={index} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-4 font-semibold text-foreground">{asset.name}</td>
                    <td className="px-4 py-4 text-muted-foreground font-medium">{asset.category}</td>
                    <td className="px-4 py-4 text-muted-foreground">{asset.location}</td>
                    <td className="px-4 py-4 text-muted-foreground text-xs">{asset.purchaseDate}</td>
                    <td className="px-4 py-4 font-semibold text-foreground flex items-center gap-0.5 mt-2">
                      <IndianRupee size={12} /> {asset.currentValue.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge value={asset.status} />
                    </td>
                  </tr>
                ))}
                {assets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={assets.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
          </>
        )}
      </Card>

      <AdminAssetsAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateAsset}
      />
    </div>
  );
}
