// RESPONSIBILITY: Renders the AbsenteeReportClient component.
'use client';

import type { ICellRendererParams } from 'ag-grid-community';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ChevronRight, Send, Mail, Phone, CheckCircle } from 'lucide-react';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useAbsenteeReportClient } from './useAbsenteeReportClient';

ModuleRegistry.registerModules([AllCommunityModule]);

export function AbsenteeReportClient() {
  const {
    threshold, setThreshold, shift, setShift, toast, toastType,
    filtered, critical, moderate, notify, notifyAll
  } = useAbsenteeReportClient();

  const badgeClass = (d: number) => d >= 7 ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning';
  
  const colDefs = [
    { 
      field: 'name', 
      headerName: 'Student', 
      flex: 1, 
      minWidth: 200,
      cellRenderer: (p: ICellRendererParams) => (
        <div className="flex items-center py-2 h-full">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center text-[12px] font-bold mr-3">
            {p.data.initials}
          </div>
          <span className="text-[14px] font-bold text-text-primary truncate">{p.value}</span>
        </div>
      )
    },
    { field: 'smartId', headerName: 'Smart ID', width: 120, cellRenderer: (p: ICellRendererParams) => <span className="font-mono text-[14px] text-text-secondary">{p.value}</span> },
    { field: 'shift', headerName: 'Shift', width: 120, cellRenderer: (p: ICellRendererParams) => <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-input text-text-secondary mt-2 inline-block">{p.value}</span> },
    { 
      field: 'daysAbsent', 
      headerName: 'Days Absent', 
      width: 140,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${badgeClass(p.value)} mt-2 inline-block`}>
          {p.value} days
        </span>
      )
    },
    { field: 'lastSeen', headerName: 'Last Seen', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="text-[14px] text-text-secondary">{p.value}</span> },
    { 
      field: 'parentPhone', 
      headerName: 'Parent Contact', 
      width: 220,
      cellRenderer: (p: ICellRendererParams) => (
        <div className="flex flex-col justify-center h-full space-y-1">
          <span className="font-mono text-[12px] text-text-primary flex items-center">
            <Phone size={10} className="mr-1 text-text-secondary"/> {p.value}
          </span>
          <span className="text-[12px] text-text-secondary flex items-center">
            <Mail size={10} className="mr-1"/> {p.data.parentEmail}
          </span>
        </div>
      )
    },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => (
        <div className="h-full flex items-center">
          {params.data.notified ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold bg-success/10 text-success"><CheckCircle size={12} /> Notified</span>
          ) : (
            <button onClick={() => notify(params.data.id)} className="flex items-center gap-1.5 px-3 py-1 bg-transparent border border-border text-text-primary text-[12px] font-bold rounded-[var(--radius-md)] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer">
              <Send size={12} className="mr-1"/> Alert
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="relative p-2 sm:p-4">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className={`text-[14px] font-bold ${toastType === 'info' ? 'text-info' : 'text-text-primary'}`}>{toast}</span>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="flex items-center text-[12px] font-bold text-text-secondary mb-2 space-x-2">
        <Link href="/superadmin/superadmin_engagement/attendance" className="hover:text-primary transition-colors">Engagement</Link>
        <ChevronRight size={12} />
        <span className="text-primary">Absentee Report</span>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-text-primary flex items-center gap-2 tracking-tight">📋 Absentee Report</h1>
          <p className="text-[14px] text-text-secondary mt-1">Students with consecutive absences requiring attention.</p>
        </div>
        <button onClick={notifyAll} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-[14px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-all shadow-sm cursor-pointer">
          <Send size={14}/> Bulk Alert Parents
        </button>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Total Absentees</div>
          <div className="text-[28px] font-extrabold text-text-primary leading-none mb-1">{filtered.length}</div>
          <div className="text-[12px] text-text-secondary">above {threshold === 'all' ? '0' : threshold} day threshold</div>
        </div>
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Critical (7+ days)</div>
          <div className="text-[28px] font-extrabold text-danger leading-none mb-1">{critical.length}</div>
          <div className="text-[12px] text-text-secondary">Immediate action needed</div>
        </div>
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Moderate (3–6 days)</div>
          <div className="text-[28px] font-extrabold text-warning leading-none mb-1">{moderate.length}</div>
          <div className="text-[12px] text-text-secondary">Monitoring required</div>
        </div>
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Parents Notified</div>
          <div className="text-[28px] font-extrabold text-success leading-none mb-1">{filtered.filter(r=>r.notified).length}</div>
          <div className="text-[12px] text-text-secondary">of {filtered.length} total</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-card border border-border rounded-t-[var(--radius-lg)] p-4 border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <div className="flex flex-col w-40">
              <span className="text-[12px] font-bold text-text-secondary mb-1">Days Threshold</span>
              <SuperadminSearchableDropdown
                options={[
                  { label: '3+ Days', value: '3' },
                  { label: '5+ Days', value: '5' },
                  { label: '7+ Days (Critical)', value: '7' },
                  { label: 'Show All', value: 'all' }
                ]}
                value={threshold}
                onChange={setThreshold}
              />
            </div>
            <div className="flex flex-col w-40">
              <span className="text-[12px] font-bold text-text-secondary mb-1">Shift</span>
              <SuperadminSearchableDropdown
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Morning', value: 'Morning' },
                  { label: 'Afternoon', value: 'Afternoon' },
                  { label: 'Evening', value: 'Evening' }
                ]}
                value={shift}
                onChange={setShift}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-[12px] font-bold bg-danger/10 text-danger">{critical.length} critical</span>
            <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-[12px] font-bold bg-warning/10 text-warning">{moderate.length} moderate</span>
            <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-[12px] font-bold bg-success/10 text-success">{filtered.filter(r=>r.notified).length} notified</span>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-card border border-border border-t-0 rounded-b-[var(--radius-lg)] p-4 shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="text-[48px] mb-4">🎉</div>
            <p className="text-[16px] font-bold text-text-primary mb-1">No absentees above threshold!</p>
            <p className="text-[14px] text-text-secondary">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
          <div className="h-96 w-full">
            <AgGridReact
              theme={superadmin_gridTheme}
              rowData={filtered}
              columnDefs={colDefs as any}
              rowHeight={64}
              headerHeight={48}
              pagination={true}
              paginationPageSize={10}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
              rowClassRules={{
                'bg-[color-mix(in_srgb,var(--danger)_5%,transparent)]': (params: unknown) => (params as any).data.daysAbsent >= 7,
                'bg-[color-mix(in_srgb,var(--warning)_5%,transparent)]': (params: unknown) => (params as any).data.daysAbsent >= 3 && (params as any).data.daysAbsent < 7
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
