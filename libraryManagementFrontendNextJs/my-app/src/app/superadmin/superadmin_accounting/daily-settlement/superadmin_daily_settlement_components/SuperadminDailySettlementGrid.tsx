'use client';
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '../../../../superadmin_reusable/gridTheme';
import { CheckCircle, ClipboardList } from 'lucide-react';
import type { SuperadminDailySettlementEntry } from '../superadmin_daily_settlement_types/SuperadminDailySettlementTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  entries: SuperadminDailySettlementEntry[];
  onSettle: (id: number) => void;
}

export function SuperadminDailySettlementGrid({ entries, onSettle }: Props) {
  const colDefs = useMemo<any[]>(() => [
    { 
      field: 'shift', 
      headerName: 'Shift', 
      flex: 1.2, 
      minWidth: 180, 
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="font-extrabold text-[var(--text-primary)]">{p.data?.shift}</span>
      )
    },
    { 
      field: 'openingBalance', 
      headerName: 'Opening ₹', 
      width: 120,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-medium text-[var(--text-disabled)]">₹{p.data?.openingBalance.toLocaleString()}</span>
      )
    },
    { 
      field: 'cashCollected', 
      headerName: 'Cash ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-[var(--success)]">₹{p.data?.cashCollected.toLocaleString()}</span>
      )
    },
    { 
      field: 'upiCollected', 
      headerName: 'UPI ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-[var(--info,#3B82F6)]">₹{p.data?.upiCollected.toLocaleString()}</span>
      )
    },
    { 
      field: 'expenses', 
      headerName: 'Expenses ₹', 
      width: 110,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-sm font-bold text-[var(--danger)]">₹{p.data?.expenses.toLocaleString()}</span>
      )
    },
    { 
      field: 'closingBalance', 
      headerName: 'Closing ₹', 
      width: 120,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-[15px] font-extrabold text-[var(--text-primary)] tracking-tight">₹{p.data?.closingBalance.toLocaleString()}</span>
      )
    },
    { 
      field: 'settledBy', 
      headerName: 'Settled By', 
      width: 140, 
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className="text-xs font-bold text-[var(--text-secondary)]">{p.data?.settledBy}</span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminDailySettlementEntry>) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-2 ${p.data?.status === 'settled' ? 'bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)]' : 'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-[var(--warning)]'}`}>
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
                className="flex items-center gap-1.5 px-3 py-1 bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)] hover:bg-[var(--success)] hover:text-white text-xs font-bold rounded-[var(--radius-sm)] transition-colors duration-200" 
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
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardList size={48} className="text-[var(--text-disabled)] mb-4 opacity-50" />
          <p className="text-lg font-bold text-[var(--text-primary)] mb-1">No settlement entries for this date.</p>
        </div>
      ) : (
        <div style={{ height: 350 }}>
          <AgGridReact
            theme={gridTheme}
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
      )}
    </div>
  );
}
