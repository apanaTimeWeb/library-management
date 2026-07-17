// RESPONSIBILITY: Renders the SuperadminAuditLogsGrid component.
'use client';
import React, { useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Eye } from 'lucide-react';
import type { SuperadminAuditLog } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  logs: SuperadminAuditLog[];
  onRowClick: (log: SuperadminAuditLog) => void;
  actionFilter: string;
  onFilterChange: (val: string) => void;
}

export function ActionBadge({ action }: { action: string }) {
  if (action === 'Created') return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-success-bg text-success">CREATED</span>;
  if (action === 'Updated') return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-info-bg text-info">UPDATED</span>;
  if (action === 'Deleted') return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-danger-bg text-danger">DELETED</span>;
  if (action === 'Fee_Collected') return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-warning-bg text-warning">FEE_COLLECTED</span>;
  return null;
}

export function SuperadminAuditLogsGrid({ logs, onRowClick, actionFilter, onFilterChange }: Props) {
  const gridRef = useRef<AgGridReact>(null);

  const colDefs = useMemo<any[]>(() => [
    { 
      headerName: 'Timestamp', field: 'time', flex: 1.2, minWidth: 150,
      cellRenderer: (p: ICellRendererParams<SuperadminAuditLog>) => (
        <span className="font-mono text-xs text-text-disabled tracking-tight">{p.data?.time}</span>
      )
    },
    { 
      headerName: 'Performed By', field: 'user', flex: 1, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<SuperadminAuditLog>) => (
        <span className="font-bold text-text-primary">{p.data?.user}</span>
      )
    },
    {
      headerName: 'Target Entity', field: 'target', flex: 1.5, minWidth: 160,
      cellRenderer: (p: ICellRendererParams<SuperadminAuditLog>) => (
        <div className="flex items-center gap-1.5 h-full">
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">{p.data?.entity}:</span>
          <span className="text-sm font-semibold text-text-primary">{p.data?.target}</span>
        </div>
      ),
    },
    {
      headerName: 'Action', field: 'action', flex: 1, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<SuperadminAuditLog>) => (
        <div className="flex items-center h-full">
          <ActionBadge action={p.data?.action ?? ''} />
        </div>
      )
    },
    { 
      headerName: 'IP Address', field: 'ip', flex: 0.9, minWidth: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminAuditLog>) => (
        <span className="font-mono text-[11px] text-text-disabled">{p.data?.ip}</span>
      )
    }
  ], [onRowClick]);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <input 
          type="text" 
          placeholder="Search by target or user..." 
          className="w-full sm:w-64 bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors placeholder-[var(--text-disabled)] shadow-inner"
          onChange={e => gridRef.current?.api.setGridOption('quickFilterText', e.target.value)} 
        />
        <div className="flex items-center gap-4 ml-auto">
          <select 
            className="bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
            value={actionFilter} 
            onChange={e => onFilterChange(e.target.value)}
          >
            <option>All Actions</option>
            <option>Created</option>
            <option>Updated</option>
            <option>Deleted</option>
            <option>Fee_Collected</option>
          </select>
          <span className="text-[11px] font-bold text-text-disabled uppercase tracking-wider">{logs.length} entries</span>
        </div>
      </div>
      <div style={{ height: 420 }}>
        <AgGridReact
          ref={gridRef}
          theme={superadmin_gridTheme}
          rowData={logs}
          columnDefs={colDefs}
          rowHeight={52}
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
