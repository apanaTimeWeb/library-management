'use client';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Users2, Download } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { useStudentsList } from '@/app/manager/manager_students/manager_students_hooks/useStudentsList';
import { STUDENT_STATUS_OPTIONS, STUDENT_SHIFT_OPTIONS } from '@/app/manager/manager_students/manager_students_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import { NameCell, ShiftCell, StatusCell, DueCell, ActionsCell } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsTableCells';
import { ManagerStudentsEmptyState } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsEmptyState';

ModuleRegistry.registerModules([AllCommunityModule]);

// RESPONSIBILITY: Main Client view for the Manager Students directory.

export function ManagerStudentsClient() {
  const {
    students,
    filtered,
    status,
    error,
    search, setSearch,
    statusFilter, setStatusFilter,
    shiftFilter, setShiftFilter
  } = useStudentsList();

  const colDefs: ColDef[] = useMemo(() => [
    {
      field: 'smartId', headerName: 'SMART ID', width: 110,
      cellStyle: { color: 'var(--mgr-primary)', fontFamily: 'monospace', fontSize: '12px' },
    },
    { field: 'name',   headerName: 'STUDENT',      flex: 2, minWidth: 160, cellRenderer: NameCell },
    { field: 'shift',  headerName: 'SHIFT / SEAT', flex: 1, minWidth: 120, cellRenderer: ShiftCell },
    { field: 'status', headerName: 'STATUS',        width: 105, cellRenderer: StatusCell },
    { field: 'plan',   headerName: 'PLAN',          flex: 1, minWidth: 100, cellStyle: { color: 'var(--mgr-text-secondary)', fontSize: '13px', fontFamily: 'inherit' } },
    { field: 'due',    headerName: 'DUE',           width: 100, cellRenderer: DueCell },
    { field: 'joined', headerName: 'JOINED',        width: 100, cellStyle: { color: 'var(--mgr-text-secondary)', fontSize: '12px', fontFamily: 'inherit' } },
    {
      headerName: 'ACTIONS',
      width: 120,
      pinned: 'right' as const,
      sortable: false,
      resizable: false,
      cellRenderer: ActionsCell,
    },
  ], []);

  if (status === 'error') return <div className="p-8 text-danger">Failed to load: {error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Students</p>
          <h1 className="text-[22px] font-bold text-text-primary">Student Directory</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Manage admissions, seating, and billing for all active learners.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="bg-transparent border border-border text-text-primary rounded-lg h-10 px-4 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Download size={14} /> Export</button>
          <Link href={MANAGER_ROUTES.STUDENTS_GROUP} className="bg-transparent border border-border text-text-primary rounded-lg h-10 px-4 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
            <Users2 size={14} /> Group Admission
          </Link>
          <Link href={MANAGER_ROUTES.STUDENTS_NEW} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <UserPlus size={14} /> New Admission
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total',     value: students.length },
          { label: 'Active',    value: students.filter(s => s.status === 'Active').length },
          { label: 'Suspended', value: students.filter(s => s.status === 'Suspended').length },
          { label: 'Fee Due',   value: students.filter(s => s.due > 0).length },
        ].map(k => (
          <div key={k.label} className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
            <p className="text-[13px] font-medium text-text-secondary mb-1.5">{k.label}</p>
            <p className="text-2xl font-bold text-text-primary">{status === 'loading' ? '...' : k.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <input
          className="w-full max-w-sm bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Search name, phone, Smart ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {STUDENT_STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select className="bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none" style={{ width: 'auto' }} value={shiftFilter} onChange={e => setShiftFilter(e.target.value)}>
          {STUDENT_SHIFT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ height: 480 }}>
          {status === 'loading' ? (
             <div className="flex items-center justify-center h-full">Loading table...</div>
          ) : filtered.length === 0 ? (
             <div className="flex items-center justify-center h-full bg-bg-card">
               <ManagerStudentsEmptyState />
             </div>
          ) : (
            <AgGridReact
              theme={gridTheme}
              rowData={filtered}
              columnDefs={colDefs}
              rowHeight={56}
              headerHeight={38}
              suppressMovableColumns
              suppressCellFocus
              defaultColDef={{ resizable: true, sortable: true }}
              onRowClicked={() => {}}
              rowClass="cursor-pointer hover:bg-bg-elevated transition-colors"
            />
          )}
        </div>
      </div>
    </div>
  );
}


