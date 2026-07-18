'use client';
// RESPONSIBILITY: Renders the SuperadminAuditLogsGrid component.
import React, { useRef, useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Eye } from 'lucide-react';
import type { SuperadminAuditLog, SuperadminAuditLogsGridProps as Props } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { TableToolbar } from "@/components/ui/table-toolbar";

ModuleRegistry.registerModules([AllCommunityModule]);

export function ActionBadge({ action }: { action: string }) {
  if (action === 'Created') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-success-bg text-success">CREATED</span>;
  if (action === 'Updated') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-info-bg text-info">UPDATED</span>;
  if (action === 'Deleted') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-danger-bg text-danger">DELETED</span>;
  if (action === 'Fee_Collected') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-warning-bg text-warning">FEE_COLLECTED</span>;
  return null;
}

export function SuperadminAuditLogsGrid({ logs, onRowClick, actionFilter, onFilterChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
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
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{p.data?.entity}:</span>
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
        <span className="font-mono text-xs text-text-disabled">{p.data?.ip}</span>
      )
    }
  ], [onRowClick]);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-bg-pageg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <input 
          type="text" 
          placeholder="Search by target or user..." 
          className="w-full sm:w-64 bg-bg-pageg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors placeholder-[var(--text-disabled)] shadow-inner"
          onChange={e => gridRef.current?.api.setGridOption('quickFilterText', e.target.value)} 
        />
        <div className="flex items-center gap-4 ml-auto">
          <div className="w-40">
            <SuperadminSearchableDropdown
              options={[
                { label: 'All Actions', value: 'All Actions' },
                { label: 'Created', value: 'Created' },
                { label: 'Updated', value: 'Updated' },
                { label: 'Deleted', value: 'Deleted' },
                { label: 'Fee_Collected', value: 'Fee_Collected' }
              ]}
              value={actionFilter}
              onChange={onFilterChange}
            />
          </div>
          <span className="text-xs font-bold text-text-disabled uppercase tracking-wider">{logs.length} entries</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
<TableToolbar search={searchTerm} onSearch={setSearchTerm} />
      <div style={{ height: 420 }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchTerm}
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
    </div>
  );
}
