// RESPONSIBILITY: Renders the SuperadminAssetsTable component.
import React from 'react';
import { PackageOpen } from 'lucide-react';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';
import { SUPERADMIN_ASSETS_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_constants/SuperadminAssetsConstants';

import type { SuperadminAssetsTableProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminAssetsTable({ assets }: Props) {
    const table = useClientTable(assets);
  if (assets.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen size={48} className="text-text-disabled mb-4 opacity-50" />
        <p className="text-lg font-bold text-text-primary mb-1">No assets found.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden overflow-x-auto">
      <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-page/50 border-b border-border">
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Asset Name</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Category</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Purchase Date</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Purchase Value â‚¹</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Current Value â‚¹</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Location</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {table.paginatedData.map(a => (
            <tr key={a.id} className={`hover:bg-page/30 transition-colors ${a.status === 'disposed' ? 'opacity-50 grayscale' : ''}`}>
              <td className="py-3.5 px-4 text-sm font-extrabold text-text-primary">{a.name}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-input border border-border text-text-secondary">
                  {a.category}
                </span>
              </td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{a.purchaseDate}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary text-right">â‚¹{a.purchaseValue.toLocaleString()}</td>
              <td className="py-3.5 px-4 text-base font-extrabold text-text-primary tracking-tight text-right">â‚¹{a.currentValue.toLocaleString()}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{a.location}</td>
              <td className="py-3.5 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border border-transparent shadow-sm ${SUPERADMIN_ASSETS_STATUS_STYLES[a.status] || SUPERADMIN_ASSETS_STATUS_STYLES.disposed}`}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
    </div>
  );
}
