// RESPONSIBILITY: Renders the SuperadminBillingGrid component.
'use client';
import React, { useRef, useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Download, FileText, CheckCircle } from 'lucide-react';
import type { SuperadminBillingInvoice, SuperadminBillingGridProps as Props } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

export function SuperadminBillingGrid({ invoices, onRowClick, onExport }: Props) {
  const gridRef = useRef<AgGridReact>(null);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    onExport();
    setTimeout(() => setExported(false), 2000);
  };

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Invoice ID', field: 'id', flex: 1.2, minWidth: 150,
      cellRenderer: (p: ICellRendererParams<SuperadminBillingInvoice>) => (
        <div className="flex items-center gap-2 h-full">
          <FileText size={14} className="text-primary" />
          <span className="text-sm font-bold text-text-primary tracking-wide">{p.data?.id}</span>
        </div>
      ),
    },
    { headerName: 'Tenant', field: 'tenant', flex: 2, minWidth: 160,
      cellRenderer: (p: ICellRendererParams<SuperadminBillingInvoice>) => (
        <span className="font-extrabold text-text-primary">{p.data?.tenant}</span>
      )
    },
    {
      headerName: 'Date & Method', field: 'date', flex: 1.2, minWidth: 140,
      cellRenderer: (p: ICellRendererParams<SuperadminBillingInvoice>) => (
        <div className="flex flex-col justify-center h-full">
          <p className="text-[13px] font-bold text-text-secondary">{p.data?.date}</p>
          <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">{p.data?.method}</p>
        </div>
      ),
    },
    {
      headerName: 'Amount', field: 'amount', flex: 1, minWidth: 110,
      cellRenderer: (p: ICellRendererParams<SuperadminBillingInvoice>) => (
        <span className="text-[15px] font-extrabold text-text-primary tracking-tight">₹{p.data?.amount.toLocaleString()}</span>
      ),
    },
    {
      headerName: 'Status', field: 'status', flex: 1, minWidth: 110,
      cellRenderer: (p: ICellRendererParams<SuperadminBillingInvoice>) => (
        <div className="flex items-center h-full">
          {p.data?.status === 'Paid'
            ? <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-bg text-success">✅ Paid</span>
            : <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-danger-bg text-danger">🔴 Overdue</span>}
        </div>
      ),
    },
  ], []);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <input 
          type="text" 
          placeholder="Search Invoice ID or tenant..." 
          className="w-full sm:w-64 bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors placeholder-[var(--text-disabled)] shadow-inner"
          onChange={e => gridRef.current?.api.setGridOption('quickFilterText', e.target.value)} 
        />
        <button 
          className="flex items-center gap-2 bg-transparent border border-border hover:bg-bg-input text-text-primary text-[13px] font-bold py-2 px-3 rounded-[var(--radius-md)] transition-colors" 
          onClick={handleExport}
        >
          {exported ? <><CheckCircle size={14} className="text-success" /> Exported!</> : <><Download size={14} /> Export CSV</>}
        </button>
      </div>
      <div style={{ height: 360 }}>
        <AgGridReact
          ref={gridRef}
          theme={superadmin_gridTheme}
          rowData={invoices}
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
    </div>
  );
}

