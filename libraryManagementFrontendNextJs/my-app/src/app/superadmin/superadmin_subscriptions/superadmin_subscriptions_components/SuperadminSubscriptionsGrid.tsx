// RESPONSIBILITY: Renders the SuperadminSubscriptionsGrid component.
'use client';
import React, { useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import type { SuperadminSubscription, SuperadminSubscriptionsGridProps } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

const FILTERS = ['All', 'Paid', 'Due Soon', 'Overdue'];

export function SuperadminSubscriptionsGrid({ subs, filteredSubs, filter, setFilter, onRowClick }: SuperadminSubscriptionsGridProps) {
  const gridRef = useRef<AgGridReact>(null);

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Tenant', field: 'tenant', flex: 2, minWidth: 160,
      cellRenderer: (p: ICellRendererParams<SuperadminSubscription>) => (
        <span className="font-extrabold text-text-primary">{p.data?.tenant}</span>
      )
    },
    { headerName: 'Plan', field: 'plan', flex: 1.5, minWidth: 140,
      cellRenderer: (p: ICellRendererParams<SuperadminSubscription>) => (
        <span className="text-sm font-semibold text-text-secondary">{p.data?.plan}</span>
      ) 
    },
    {
      headerName: 'Cycle & MRR', field: 'mrr', flex: 1, minWidth: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminSubscription>) => (
        <div className="flex flex-col justify-center h-full">
          <p className="text-sm font-bold text-primary">₹{p.data?.mrr.toLocaleString()}</p>
          <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">{p.data?.cycle}</p>
        </div>
      ),
    },
    { headerName: 'Next Invoice', field: 'nextInvoice', flex: 1, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<SuperadminSubscription>) => (
        <span className="text-sm font-medium text-text-secondary">{p.data?.nextInvoice}</span>
      )
    },
    {
      headerName: 'Status', field: 'status', flex: 1, minWidth: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminSubscription>) => (
        <div className="flex items-center h-full gap-1.5">
          {p.data?.status === 'Paid'     && <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={10} className="mr-1"/> Paid</span>}
          {p.data?.status === 'Due Soon' && <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-info-bg text-info"><Circle size={10} className="mr-1"/> Due Soon</span>}
          {p.data?.status === 'Overdue'  && <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-danger-bg text-danger"><AlertCircle size={10} className="mr-1"/> Overdue</span>}
        </div>
      ),
    },
  ], []);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-[var(--radius-md)] p-1">
          {FILTERS.map((f: string) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold rounded-[var(--radius-sm)] transition-all ${
                filter === f 
                  ? 'bg-bg-card text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card/50'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{filteredSubs.length} records</span>
      </div>
      <div style={{ height: 380 }}>
        <AgGridReact
          ref={gridRef}
          theme={superadmin_gridTheme}
          rowData={filteredSubs}
          columnDefs={colDefs}
          rowHeight={56}
          headerHeight={44}
          onGridReady={onGridReady}
          onRowClicked={p => onRowClick(p.data!)}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
      <div className="p-4 border-t border-border text-center bg-bg-page/30">
        <span className="text-sm font-semibold text-text-secondary">Showing {filteredSubs.length} of {subs.length} subscriptions</span>
      </div>
    </div>
  );
}
