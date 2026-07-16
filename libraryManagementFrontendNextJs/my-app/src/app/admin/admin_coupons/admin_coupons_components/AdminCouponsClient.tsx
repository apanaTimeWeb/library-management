'use client';

// RESPONSIBILITY: Client view component rendering coupons table, KPIs, search bar, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 49`).
// DATA FLOW: useAdminCoupons -> AdminCouponsClient -> AG Grid / Add Dialog / Detail Drawer (`Rule 39`).

import { useState, useMemo, useCallback } from 'react';
import { Search, Plus, Trash2, Tag, Copy, Check, X, Percent, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminCoupons } from '@/app/admin/admin_coupons/admin_coupons_hooks/useAdminCoupons';
import { AdminCouponsSkeleton } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsSkeleton';
import { AdminCouponsEmptyState } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsEmptyState';
import { AdminCouponsAddDialog } from '@/app/admin/admin_coupons/admin_coupons_components/AdminCouponsAddDialog';
import { CouponRecord } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';
import { COUPON_STATUS_BADGES } from '@/app/admin/admin_coupons/admin_coupons_constants/admin_coupons_constants';
import toast from 'react-hot-toast';

ModuleRegistry.registerModules([AllCommunityModule]);

function CodeCell({ value }: { value: string }) {
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
      {data.type === 'Flat' ? `₹${data.discount}` : `${data.discount}%`} off
    </span>
  );
}

function UsageCell({ data }: { data: CouponRecord }) {
  if (!data || !data.maxUses) return null;
  const pct = Math.min(100, Math.round((data.usedCount / data.maxUses) * 100));
  return (
    <div className="flex items-center gap-2.5 h-full w-full max-w-[180px]">
      <span className="text-xs font-mono text-muted-foreground w-12 text-right shrink-0">
        {data.usedCount}/{data.maxUses}
      </span>
      <div className="admin-progress-track flex-1 h-2 rounded-full overflow-hidden bg-muted">
        <div
          className={`admin-progress-fill h-full transition-all duration-300 ${
            pct >= 100 ? 'bg-danger' : pct >= 75 ? 'bg-warning' : 'bg-primary'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusCell({ value }: { value: string }) {
  if (!value) return null;
  const badgeClass = COUPON_STATUS_BADGES[value] || 'admin-badge admin-badge-info';
  return (
    <span className={badgeClass}>
      {value === 'Active' ? '✅ Active' : value === 'Expired' ? '🔴 Expired' : '⚠️ Exhausted'}
    </span>
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
  } = useAdminCoupons();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const colDefs = useMemo(() => [
    { field: 'code',      headerName: 'CODE',     flex: 1.5, minWidth: 160, cellRenderer: CodeCell },
    { field: 'discount',  headerName: 'DISCOUNT', flex: 1,   minWidth: 130, cellRenderer: DiscountCell },
    { field: 'usedCount', headerName: 'USAGE',    flex: 1.6, minWidth: 170, cellRenderer: UsageCell },
    { field: 'expiry',    headerName: 'EXPIRY',   flex: 1,   minWidth: 120, cellClass: 'text-xs text-muted-foreground' },
    { field: 'status',    headerName: 'STATUS',   flex: 1,   minWidth: 130, cellRenderer: StatusCell },
    {
      headerName: 'ACTIONS', flex: 0.8, minWidth: 90, sortable: false,
      cellRenderer: ({ data }: { data: CouponRecord }) => {
        if (!data) return null;
        return (
          <div className="flex items-center h-full">
            <button
              type="button"
              className="p-1.5 rounded-md text-danger hover:bg-danger/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete the coupon code "${data.code}"?`)) {
                  handleDeleteCoupon(data.id);
                }
              }}
              title="Delete Coupon"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      },
    },
  ], [handleDeleteCoupon]);

  const handleRowClick = useCallback((event: { data?: CouponRecord }) => {
    if (event.data) {
      setSelectedCoupon(event.data); (`Rule 19`)
    }
  }, [setSelectedCoupon]);

  if (fetchState === 'loading' && coupons.length === 0) {
    return <AdminCouponsSkeleton />;
  }

  const kpiCards = [
    { label: 'Total Coupons', value: kpis.totalCount,   iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { label: 'Active',        value: kpis.activeCount,  iconBg: 'bg-success/10', iconColor: 'text-success' },
    { label: 'Expired/Full',  value: kpis.expiredCount, iconBg: 'bg-danger/10',  iconColor: 'text-danger'  },
    { label: 'Total Redemptions', value: kpis.totalUses, iconBg: 'bg-warning/10', iconColor: 'text-warning' },
  ];

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Coupons</p>
          <h1 className="admin-page-title">Coupons</h1>
          <p className="admin-page-subtitle">Create and track promotional discount coupon codes.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* KPI Cards (`Rule 1 / Rule 4`) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="p-4 rounded-lg border border-border bg-card flex items-center gap-4">
            <div className={`p-3 rounded-lg ${kpi.iconBg} ${kpi.iconColor}`}>
              <Tag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar (`Rule 15: Debounced search`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
            placeholder="Search code or status…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* AG Grid Table or Empty State (`Rule 50`) */}
      {coupons.length === 0 ? (
        <AdminCouponsEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <div className="admin-table-wrapper flex-1 min-h-[450px]">
          <AgGridReact
            theme={gridTheme}
            rowData={coupons}
            columnDefs={colDefs as never}
            rowHeight={54}
            headerHeight={40}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false, sortable: true }}
            onRowClicked={handleRowClick}
            rowClass="cursor-pointer hover:bg-muted/30 transition-colors"
          />
        </div>
      )}

      {/* Add Dialog Modal (`Rule 16, 48`) */}
      <AdminCouponsAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateCoupon}
      />

      {/* Detail Drawer Modal (`Rule 19`) */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-primary" />
                <h3 className="font-mono font-bold text-lg text-foreground">{selectedCoupon.code}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCoupon(null)}
                aria-label="Close details"
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discount Value</span>
                <p className="font-bold text-base text-primary mt-0.5">
                  {selectedCoupon.type === 'Flat' ? `₹${selectedCoupon.discount}` : `${selectedCoupon.discount}%`} off
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

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete coupon code "${selectedCoupon.code}"?`)) {
                    handleDeleteCoupon(selectedCoupon.id);
                    setSelectedCoupon(null);
                  }
                }}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-danger/10 text-danger hover:bg-danger/20 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete Coupon
              </button>
              <button
                type="button"
                onClick={() => setSelectedCoupon(null)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
