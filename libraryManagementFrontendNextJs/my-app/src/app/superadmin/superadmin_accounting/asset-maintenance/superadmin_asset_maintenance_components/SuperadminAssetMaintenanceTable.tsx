// RESPONSIBILITY: Renders the SuperadminAssetMaintenanceTable component.
import React from 'react';
import { Wrench, CheckCircle } from 'lucide-react';
import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';
import { SUPERADMIN_ASSET_MAINTENANCE_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_constants/SuperadminAssetMaintenanceConstants';

import type { SuperadminAssetMaintenanceTableProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminAssetMaintenanceTable({ logs, onComplete }: Props) {
    const table = useClientTable(logs);
  if (logs.length === 0) {
    return (
      <div className="bg-bg-pageg-card border border-border rounded-lg shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <Wrench size={48} className="text-text-disabled mb-4 opacity-50" />
        <p className="text-lg font-bold text-text-primary mb-1">No maintenance records found.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg shadow-sm overflow-hidden overflow-x-auto">
      <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-pageg-page/50 border-b border-border">
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Asset Name</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Issue</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Reported</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Scheduled</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Vendor</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Cost ₹</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Status</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {table.paginatedData.map(l => (
            <tr key={l.id} className="hover:bg-bg-pageg-page/30 transition-colors">
              <td className="py-3.5 px-4 text-sm font-extrabold text-text-primary">{l.assetName}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-primary max-w-xs truncate" title={l.issue}>{l.issue}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{l.reportedDate}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{l.scheduledDate}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{l.vendor}</td>
              <td className="py-3.5 px-4 text-base font-extrabold text-text-primary tracking-tight text-right">₹{l.cost.toLocaleString()}</td>
              <td className="py-3.5 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${SUPERADMIN_ASSET_MAINTENANCE_STATUS_STYLES[l.status]}`}>
                  {l.status}
                </span>
              </td>
              <td className="py-3.5 px-4 text-right">
                {l.status !== 'completed' && (
                  <button 
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-success-bg text-success hover:bg-success hover:text-white text-xs font-bold rounded-sm transition-colors duration-200"
                    onClick={() => onComplete(l.id)}
                  >
                    <CheckCircle size={14} /> Done
                  </button>
                )}
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

