'use client';
// RESPONSIBILITY: Renders the SuperadminDashboardRecentLibrariesTable component.
import React, { useRef, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { ExternalLink } from 'lucide-react';
import type { SuperadminDashboardRecentLibrary as Library, SuperadminDashboardRecentLibrariesTableProps as Props } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

ModuleRegistry.registerModules([AllCommunityModule]);

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  active:   { label: 'Active',    bg: 'bg-success-bg', text: 'text-success' },
  setup:    { label: 'Setup Due', bg: 'bg-warning-bg', text: 'text-warning' },
  inactive: { label: 'Inactive',  bg: 'bg-danger-bg', text: 'text-danger' },
};

const PLAN_CLS: Record<string, { bg: string; text: string }> = {
  Basic:      { bg: 'bg-info-bg', text: 'text-info' },
  Pro:        { bg: 'bg-primary-subtle', text: 'text-primary' },
  Enterprise: { bg: 'bg-input', text: 'text-text-primary' },
};

export function SuperadminDashboardRecentLibrariesTable({ data }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
  const gridRef = useRef<AgGridReact>(null);

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Library', field: 'name', flex: 2, minWidth: 180,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <div className="flex items-center gap-3 h-full">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            {p.data?.initials}
          </div>
          <span className="font-medium text-text-primary text-sm">{p.data?.name}</span>
        </div>
      ),
    },
    { headerName: 'Owner', field: 'owner', flex: 1.5, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="text-text-secondary text-sm">{p.data?.owner}</span>
      )
    },
    {
      headerName: 'Students', field: 'students', flex: 0.8, minWidth: 90,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="font-bold text-text-primary text-sm">{p.data?.students}</span>
      ),
    },
    {
      headerName: 'Plan', field: 'plan', flex: 0.8, minWidth: 100,
      cellRenderer: (p: ICellRendererParams<Library>) => {
        const cls = PLAN_CLS[p.data?.plan ?? ''] ?? PLAN_CLS.Basic;
        return <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${cls.bg} ${cls.text}`}>{p.data?.plan}</span>;
      },
    },
    {
      headerName: 'Status', field: 'status', flex: 0.9, minWidth: 100,
      cellRenderer: (p: ICellRendererParams<Library>) => {
        const s = STATUS_CONFIG[p.data?.status ?? 'inactive'];
        return <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${s.bg} ${s.text}`}>{s.label}</span>;
      },
    },
    { headerName: 'Joined', field: 'joinedAt', flex: 0.9, minWidth: 100,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="text-text-disabled text-xs">{p.data?.joinedAt}</span>
      )
    },
  ], []);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-6 flex items-center justify-between border-b border-border bg-bg-page/30">
        <h2 className="text-base font-bold text-text-primary">Recently Registered Libraries</h2>
        <Link href={SUPERADMIN_ROUTES.LIBRARIES} className="text-primary text-xs font-bold flex items-center gap-1 hover:text-primary-hover transition-colors">
          View All <ExternalLink size={12} />
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full">
<TableToolbar search={searchTerm} onSearch={setSearchTerm} />
      <div style={{ height: 300 }}>
        <AgGridReact
          ref={gridRef}
          theme={superadmin_gridTheme}
          rowData={data}
          columnDefs={colDefs as any}
          rowHeight={52}
          headerHeight={44}
          onGridReady={onGridReady}
          suppressCellFocus={true}
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchTerm}
        />
      </div>
</div>
    </div>
  );
}
