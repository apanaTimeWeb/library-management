'use client';
// RESPONSIBILITY: Renders the SuperadminDailySettlementGrid component.
import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { CheckCircle, ClipboardList } from 'lucide-react';
import type { SuperadminDailySettlementEntry } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_types/SuperadminDailySettlementTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

import type { SuperadminDailySettlementGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";

export function SuperadminDailySettlementGrid({ entries, onSettle }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
  const colDefs = useMemo<any[]>(() => [
    { 
      field: 'shift', 
      headerName: 'Shift', 
      flex: 1.2, 
      minWidth: 180, 
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="font-extrabold text-text-primary">{p.data?.shift}</span>
      )
    },
    { 
      field: 'openingBalance', 
      headerName: 'Opening ₹', 
      width: 120,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-medium text-text-disabled">₹{p.data?.openingBalance.toLocaleString()}</span>
      )
    },
    { 
      field: 'cashCollected', 
      headerName: 'Cash ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-success">₹{p.data?.cashCollected.toLocaleString()}</span>
      )
    },
    { 
      field: 'upiCollected', 
      headerName: 'UPI ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-info,#3B82F6">₹{p.data?.upiCollected.toLocaleString()}</span>
      )
    },
    { 
      field: 'expenses', 
      headerName: 'Expenses ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-danger">₹{p.data?.expenses.toLocaleString()}</span>
      )
    },
    { 
      field: 'closingBalance', 
      headerName: 'Closing ₹', 
      width: 120,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-base font-extrabold text-text-primary tracking-tight">₹{p.data?.closingBalance.toLocaleString()}</span>
      )
    },
    { 
      field: 'settledBy', 
      headerName: 'Settled By', 
      width: 140, 
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-xs font-bold text-text-secondary">{p.data?.settledBy}</span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mt-2 ${p.data?.status === 'settled' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
          {p.data?.status}
        </span>
      )
    },
    {
      headerName: 'Action',
      width: 120,
      sortable: false,
      filter: false,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => {
        if (p.data?.status === 'pending') {
          return (
            <div className="h-full flex justify-end items-center pr-2">
              <button 
                className="flex items-center gap-1.5 px-3 py-1 bg-success-bg text-success hover:bg-success hover:text-white text-xs font-bold rounded-sm transition-colors duration-200" 
                onClick={() => onSettle(p.data!.id)}
              >
                <CheckCircle size={14} /> Settle
              </button>
            </div>
          );
        }
        return null;
      }
    }
  ], [onSettle]);

  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg overflow-hidden shadow-sm">
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardList size={48} className="text-text-disabled mb-4 opacity-50" />
          <p className="text-lg font-bold text-text-primary mb-1">No settlement entries for this date.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
<TableToolbar search={searchTerm} onSearch={setSearchTerm} />
      <div style={{ height: 350 }}>
          <AgGridReact
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchTerm}
            theme={superadmin_gridTheme}
            rowData={entries}
            columnDefs={colDefs}
            rowHeight={56}
            headerHeight={48}
            pagination={false}
            suppressCellFocus={true}
            defaultColDef={{
              sortable: true,
              filter: false,
              resizable: true
            }}
          />
        </div>
</div>
      )}
    </div>
  );
}

