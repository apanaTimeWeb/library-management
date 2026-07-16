'use client';
import React, { useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/superadmin/superadmin_shared_components/gridTheme';
import { ExternalLink } from 'lucide-react';
import type { SuperadminDashboardRecentLibrary as Library } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props { data: Library[]; }

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  active:   { label: 'Active',    bg: 'bg-[var(--success-bg,rgba(52,211,153,0.1))]', text: 'text-[var(--success)]' },
  setup:    { label: 'Setup Due', bg: 'bg-[var(--warning-bg,rgba(251,191,36,0.1))]', text: 'text-[var(--warning)]' },
  inactive: { label: 'Inactive',  bg: 'bg-[var(--danger-bg,rgba(248,113,113,0.1))]', text: 'text-[var(--danger)]' },
};

const PLAN_CLS: Record<string, { bg: string; text: string }> = {
  Basic:      { bg: 'bg-[rgba(59,130,246,0.1)]', text: 'text-[var(--info,#3B82F6)]' },
  Pro:        { bg: 'bg-[var(--primary-subtle,rgba(99,102,241,0.1))]', text: 'text-[var(--primary)]' },
  Enterprise: { bg: 'bg-[var(--bg-input)]', text: 'text-[var(--text-primary)]' },
};

export function SuperadminDashboardRecentLibrariesTable({ data }: Props) {
  const gridRef = useRef<AgGridReact>(null);

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Library', field: 'name', flex: 2, minWidth: 180,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <div className="flex items-center gap-3 h-full">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            {p.data?.initials}
          </div>
          <span className="font-medium text-[var(--text-primary)] text-sm">{p.data?.name}</span>
        </div>
      ),
    },
    { headerName: 'Owner', field: 'owner', flex: 1.5, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="text-[var(--text-secondary)] text-sm">{p.data?.owner}</span>
      )
    },
    {
      headerName: 'Students', field: 'students', flex: 0.8, minWidth: 90,
      cellRenderer: (p: ICellRendererParams<Library>) => (
        <span className="font-bold text-[var(--text-primary)] text-sm">{p.data?.students}</span>
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
        <span className="text-[var(--text-disabled)] text-xs">{p.data?.joinedAt}</span>
      )
    },
  ], []);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-6 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-page)]/30">
        <h2 className="text-base font-bold text-[var(--text-primary)]">Recently Registered Libraries</h2>
        <Link href="/superadmin/superadmin_libraries" className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 hover:text-[var(--primary-hover)] transition-colors">
          View All <ExternalLink size={12} />
        </Link>
      </div>
      <div style={{ height: 300 }}>
        <AgGridReact
          ref={gridRef}
          theme={gridTheme}
          rowData={data}
          columnDefs={colDefs as any}
          rowHeight={52}
          headerHeight={44}
          onGridReady={onGridReady}
          suppressCellFocus={true}
          suppressPaginationPanel={true}
        />
      </div>
    </div>
  );
}
