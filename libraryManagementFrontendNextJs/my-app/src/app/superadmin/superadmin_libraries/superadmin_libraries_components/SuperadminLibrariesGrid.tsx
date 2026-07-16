'use client';
import React, { useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Edit2, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import type { SuperadminLibrary as Library } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  libraries: Library[];
  onRowClick: (lib: Library, mode: 'view' | 'edit') => void;
  onSuspend: (id: string) => void;
}

export function SuperadminLibrariesGrid({ libraries, onRowClick, onSuspend }: Props) {
  const gridRef = useRef<AgGridReact>(null);

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Library Name', field: 'name', flex: 2, minWidth: 180,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <div className="h-full flex flex-col justify-center">
          <p className="font-medium text-text-primary leading-tight">{p.data?.name}</p>
          <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wide mt-0.5">{p.data?.plan} Plan</p>
        </div>
      ),
    },
    { headerName: 'Location', field: 'location', flex: 1.5, minWidth: 160, 
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="text-sm text-text-secondary">{p.data?.location}</span>
      )
    },
    {
      headerName: 'Seats', field: 'occupied', flex: 1, minWidth: 120,
      cellRenderer: (p: ICellRendererParams<Library>) => {
        if (!p.data) return null;
        const pct = Math.round((p.data.occupied / p.data.seats) * 100);
        return (
          <div className="flex flex-col gap-1.5 justify-center h-full">
            <span className="text-sm font-medium text-text-primary">
              {p.data.occupied}<span className="text-text-disabled">/{p.data.seats}</span>
            </span>
            <div className="h-1.5 w-20 bg-bg-input rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${pct > 90 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      headerName: 'Status', field: 'status', flex: 1, minWidth: 120,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        p.data?.status === 'Active'
          ? <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={12} /> Active</span>
          : <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-warning-bg text-warning"><AlertTriangle size={12} /> Maintenance</span>
      ),
    },
    {
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <div className="flex items-center gap-2 h-full">
          <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-success hover:bg-success-bg transition-colors" onClick={e => { e.stopPropagation(); onRowClick(p.data!, 'edit'); }}><Edit2 size={15} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-danger hover:bg-danger-bg transition-colors" onClick={e => { e.stopPropagation(); onSuspend(p.data!.id); }}><ShieldAlert size={15} /></button>
        </div>
      ),
    },
  ], [onRowClick, onSuspend]);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between">
        <input 
          type="text" 
          placeholder="Search by name or location..." 
          className="w-72 bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
          onChange={e => gridRef.current?.api.setGridOption('quickFilterText', e.target.value)} 
        />
        <span className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{libraries.length} libraries</span>
      </div>
      <div style={{ height: 420 }}>
        <AgGridReact
          ref={gridRef}
          theme={superadmin_gridTheme}
          rowData={libraries}
          columnDefs={colDefs}
          rowHeight={60}
          headerHeight={44}
          onGridReady={onGridReady}
          onRowClicked={p => { onRowClick(p.data!, 'view'); }}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
}
