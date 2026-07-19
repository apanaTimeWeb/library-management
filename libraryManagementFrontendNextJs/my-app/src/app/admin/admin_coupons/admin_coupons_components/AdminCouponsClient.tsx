'use client';
// RESPONSIBILITY: Client view component rendering coupons table, KPIs, search bar, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 49`).
// DATA FLOW: useAdminCoupons -> AdminCouponsClient -> Table / Add Dialog / Detail Drawer (`Rule 39`).

import { useState, useCallback } from 'react';
import { Search, Plus, Trash2, Tag, Copy, Check, X, Calendar } from 'lucide-react';
import { useAdminCoupons } from '@/app/admin/admin_coupons/admin_coupons_hooks/useAdminCoupons';
import { AdminCouponsSkeleton } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsSkeleton';
import { AdminCouponsEmptyState } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsEmptyState';
import { AdminCouponsAddDialog } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsAddDialog';
import { CouponRecord } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

function CodeCell({ value }: { value: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value || '');
    setCopied(true);
    toast.success('Coupon code copied to clipboard (`Rule 49`)');
    setTimeout(() => setCopied(false), 2000);
  }, [value]);
  return (
    <div className="flex items-center gap-2 font-mono font-bold text-foreground">
      <span>{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy coupon code"
        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Copy Code"
      >
        {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
      </button>
    </div>
  );
}

function DiscountCell({ data }: { data: CouponRecord }) {
  if (!data) return null;
  return (
    <span className="font-semibold text-primary">
      {data.type === 'Flat' ? `â‚¹${data.discount}` : `${data.discount}%`} off
    </span>
  );
}

function UsageCell({ data }: { data: CouponRecord }) {
  if (!data || !data.maxUses) return null;
  const pct = Math.min(100, Math.round((data.usedCount / data.maxUses) * 100));
  return (
    <div className="flex items-center gap-2.5 w-full max-w-xs">
      <span className="text-xs font-mono text-muted-foreground w-12 text-right shrink-0">
        {data.usedCount}/{data.maxUses}
      </span>
      <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted">
        <div
          className={`h-full transition-all duration-300 ${
            pct >= 100 ? 'bg-danger' : pct >= 75 ? 'bg-warning' : 'bg-primary'
          } w-[length:var(--w)]`} style={{ '--w': `${pct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function StatusCell({ value }: { value: string }) {
  if (!value) return null;
  return (
    <Badge 
      variant="secondary" 
      className={`border-none ${
        value === 'Active' ? 'bg-success/10 text-success' : 
        value === 'Expired' ? 'bg-danger/10 text-danger' : 
        'bg-warning/10 text-warning'
      }`}
    >
      {value === 'Active' ? 'âœ… Active' : value === 'Expired' ? 'ðŸ”´ Expired' : 'âš ï¸ Exhausted'}
    </Badge>
  );
}

export function AdminCouponsClient() {

  const {
    coupons,
    kpis,
    fetchState,
    searchInput,
    selectedCoupon,
    setSearchInput,
    setSelectedCoupon,
    handleCreateCoupon,
    handleDeleteCoupon,
    handleResetSearch,
    page,
    limit,
    totalCoupons,
    setPage,
    setLimit,
  } = useAdminCoupons();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleRowClick = useCallback((coupon: CouponRecord) => {
    setSelectedCoupon(coupon);
  }, [setSelectedCoupon]);

  const kpiCards = [
    { label: 'Total Coupons', value: kpis.totalCount,   iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { label: 'Active',        value: kpis.activeCount,  iconBg: 'bg-success/10', iconColor: 'text-success' },
    { label: 'Expired/Full',  value: kpis.expiredCount, iconBg: 'bg-danger/10',  iconColor: 'text-danger'  },
    { label: 'Total Redemptions', value: kpis.totalUses, iconBg: 'bg-warning/10', iconColor: 'text-warning' },
  ];

  const table = useClientTable(kpiCards, 10);

  if (fetchState === 'loading' && coupons.length === 0) {
    return <AdminCouponsSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="border-b border-border pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">â€º</span> Admin <span className="opacity-50">â€º</span> Coupons
          </p>
          <h1 className="text-text-primary text-xl font-bold tracking-tight text-foreground">Coupons</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and track promotional discount coupon codes.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus size={16} /> Create Coupon
        </Button>
      </div>

      {/* KPI Cards (`Rule 1 / Rule 4`) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {table.paginatedData.map((kpi) => (
          <Card key={kpi.label} className="p-4 shadow-sm border-border bg-card flex items-center gap-4">
            <div className={`p-3 rounded-lg ${kpi.iconBg} ${kpi.iconColor}`}>
              <Tag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5">{kpi.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search Bar (`Rule 15: Debounced search`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search code or statusâ€¦"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Table or Empty State (`Rule 50`) */}
      {coupons.length === 0 ? (
        <AdminCouponsEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <Card className="flex-1 min-h-96 shadow-sm border-border bg-card overflow-hidden flex flex-col">
          <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold">Code</th>
                  <th className="px-6 py-3 font-semibold">Discount</th>
                  <th className="px-6 py-3 font-semibold">Usage</th>
                  <th className="px-6 py-3 font-semibold">Expiry</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {coupons.map((coupon) => (
                  <tr 
                    key={coupon.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => handleRowClick(coupon)}
                  >
                    <td className="px-6 py-3">
                      <CodeCell value={coupon.code} />
                    </td>
                    <td className="px-6 py-3">
                      <DiscountCell data={coupon} />
                    </td>
                    <td className="px-6 py-3">
                      <UsageCell data={coupon} />
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">
                      {coupon.expiry}
                    </td>
                    <td className="px-6 py-3">
                      <StatusCell value={coupon.status} />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-danger hover:bg-danger/10 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to delete the coupon code "${coupon.code}"?`)) {
                            handleDeleteCoupon(coupon.id);
                          }
                        }}
                        title="Delete Coupon"
                      >
                        <Trash2 size={15} />
                      </Button>
                    </td>
                  </tr>
                ))}
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
            totalItems={totalCoupons}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      )}

      {/* Add Dialog Modal (`Rule 16, 48`) */}
      <AdminCouponsAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateCoupon}
      />

      {/* Detail Drawer Modal (`Rule 19`) */}
      <Dialog open={!!selectedCoupon} onOpenChange={(open) => !open && setSelectedCoupon(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedCoupon && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-primary" />
                  <DialogTitle className="font-mono">{selectedCoupon.code}</DialogTitle>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4 text-sm py-4">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discount Value</span>
                  <p className="font-bold text-base text-primary mt-0.5">
                    {selectedCoupon.type === 'Flat' ? `â‚¹${selectedCoupon.discount}` : `${selectedCoupon.discount}%`} off
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Status</span>
                  <div className="mt-1">
                    <StatusCell value={selectedCoupon.status} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Redemptions Used</span>
                  <p className="font-mono font-medium text-foreground mt-0.5">
                    {selectedCoupon.usedCount} of {selectedCoupon.maxUses} max uses
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expiry Date</span>
                  <p className="font-medium text-foreground mt-0.5 flex items-center gap-1.5">
                    <Calendar size={14} className="text-muted-foreground" /> {selectedCoupon.expiry}
                  </p>
                </div>
              </div>

              <DialogFooter className="flex-row items-center justify-between sm:justify-between border-t border-border pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete coupon code "${selectedCoupon.code}"?`)) {
                      handleDeleteCoupon(selectedCoupon.id);
                      setSelectedCoupon(null);
                    }
                  }}
                  className="text-danger hover:bg-danger/10 hover:text-danger gap-1.5"
                >
                  <Trash2 size={14} /> Delete Coupon
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCoupon(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
