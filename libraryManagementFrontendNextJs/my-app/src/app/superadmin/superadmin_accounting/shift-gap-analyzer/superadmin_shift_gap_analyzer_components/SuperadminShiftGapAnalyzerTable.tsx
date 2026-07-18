// RESPONSIBILITY: Renders the SuperadminShiftGapAnalyzerTable component.
import React from 'react';
import { CalendarX2 } from 'lucide-react';
import type { SuperadminDayGap } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_types/SuperadminShiftGapAnalyzerTypes';

import type { SuperadminShiftGapAnalyzerTableProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminShiftGapAnalyzerTable({ days }: Props) {
    const table = useClientTable(days);
  if (days.length === 0) {
    return (
      <div className="bg-bg-pageg-card border border-border rounded-lg shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <CalendarX2 size={48} className="text-text-disabled mb-4 opacity-50" />
        <p className="text-lg font-bold text-text-primary mb-1">No day-wise gaps found.</p>
        <p className="text-sm font-medium text-text-secondary">The selected shift does not have any recorded day-wise gaps.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg shadow-sm overflow-hidden overflow-x-auto">
      <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-pageg-page/50 border-b border-border">
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Date</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Shift</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider">Seat No</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Gap Days</th>
            <th className="py-3.5 px-4 text-xs font-bold text-text-disabled uppercase tracking-wider text-right">Revenue Loss ₹</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {table.paginatedData.map((d, i) => (
            <tr key={i} className="hover:bg-bg-pageg-page/30 transition-colors">
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{d.date}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-bg-pageg-input border border-border text-text-secondary shadow-sm">
                  {d.shift}
                </span>
              </td>
              <td className="py-3.5 px-4 text-sm font-extrabold text-text-primary">{d.seatNo}</td>
              <td className={`py-3.5 px-4 text-base font-extrabold tracking-tight text-right ${d.gapDays > 20 ? 'text-danger' : 'text-warning'}`}>
                {d.gapDays}d
              </td>
              <td className="py-3.5 px-4 text-base font-extrabold text-danger tracking-tight text-right">₹{d.loss.toLocaleString()}</td>
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
