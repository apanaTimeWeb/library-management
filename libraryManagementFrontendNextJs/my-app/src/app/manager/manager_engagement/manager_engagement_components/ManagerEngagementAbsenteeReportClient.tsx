'use client';

import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ChevronRight, Send, Mail, Phone } from 'lucide-react';
import { gridTheme , ManagerRecord } from '@/app/manager/manager_reusable/gridTheme';
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';
import { useManagerEngagementAbsentee } from '@/app/manager/manager_engagement/manager_engagement_hooks/useManagerEngagementAbsentee';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

ModuleRegistry.registerModules([AllCommunityModule]);

// RESPONSIBILITY: Renders the absentee report grid with filtering and notification actions.

export function ManagerEngagementAbsenteeReportClient() {
  const {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll
  } = useManagerEngagementAbsentee();

  const badgeClass = (d: number) => d >= 7 ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger' : 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning';
  
  const colDefs = [
    { 
      field: 'name', 
      headerName: 'Student', 
      flex: 1, 
      minWidth: 200,
      cellRenderer: (p: { value: string; data: AbsenteeRow }) => (
        <div className="flex items-center py-2 h-full">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mr-3">
            {p.data.initials}
          </div>
          <span className="text-sm font-semibold text-text-primary truncate">{p.value}</span>
        </div>
      )
    },
    { field: 'smartId', headerName: 'Smart ID', width: 120, cellRenderer: (p: { value: string }) => <span className="font-mono text-[12px] text-text-primary tracking-tight">{p.value}</span> },
    { field: 'shift', headerName: 'Shift', width: 120, cellRenderer: (p: { value: string }) => <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-bg-elevated text-text-secondary mt-2 inline-block">{p.value}</span> },
    { 
      field: 'daysAbsent', 
      headerName: 'Days Absent', 
      width: 140,
      cellRenderer: (p: { value: number }) => (
        <span className={`${badgeClass(p.value)} mt-2 inline-block`}>
          {p.value} days
        </span>
      )
    },
    { field: 'lastSeen', headerName: 'Last Seen', width: 130, cellRenderer: (p: { value: string }) => <span className="text-xs text-text-secondary">{p.value}</span> },
    { 
      field: 'parentPhone', 
      headerName: 'Parent Contact', 
      width: 220,
      cellRenderer: (p: { value: string; data: AbsenteeRow }) => (
        <div className="flex flex-col justify-center h-full space-y-1">
          <span className="font-mono text-[12px] text-text-primary tracking-tight flex items-center">
            <Phone size={10} className="mr-1"/> {p.value}
          </span>
          <span className="text-xs text-text-secondary flex items-center">
            <Mail size={10} className="mr-1"/> {p.data.parentEmail}
          </span>
        </div>
      )
    },
    {
      headerName: 'Actions',
      width: 140,
      sortable: false,
      cellRenderer: (params: ManagerRecord) => (
        <div className="h-full flex items-center">
          {params.data.notified ? (
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success">✅ Notified</span>
          ) : (
            <button onClick={() => notify(params.data.id)} className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
              <Send size={12} className="mr-1"/> Alert
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`bg-bg-card border border-border shadow-lg rounded-xl px-4 py-3 text-sm text-text-primary ${toastType === 'info' ? 'bg-info-bg border-info text-info' : ''}`}>{toast}</div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Link href="/manager/manager_engagement/attendance">Engagement</Link>
        <ChevronRight size={12} className="mx-1"/>
        <span>Absentee Report</span>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-text-primary">📋 Absentee Report</h1>
            <p className="text-[13px] text-text-secondary mt-1.5">Students with consecutive absences requiring attention.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={notifyAll} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
              <Send size={14}/> Bulk Alert Parents
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Total Absentees</div>
          <div className="text-2xl font-bold text-text-primary">{filtered.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">above {threshold === 'all' ? '0' : threshold} day threshold</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Critical (7+ days)</div>
          <div className="text-2xl font-bold text-danger">{critical.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">Immediate action needed</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Moderate (3–6 days)</div>
          <div className="text-2xl font-bold text-warning">{moderate.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">Monitoring required</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Parents Notified</div>
          <div className="text-2xl font-bold text-success">{filtered.filter(r=>r.notified).length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">of {filtered.length} total</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-bg-card rounded-xl border border-border mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="block text-[13px] font-medium text-text-secondary mb-1.5">Days Threshold</span>
              <div style={{ width: 180 }}>
                <ManagerSearchableDropdown
                  value={threshold}
                  onChange={v => setThreshold(v)}
                  options={[
                    { label: '3+ Days', value: '3' },
                    { label: '5+ Days', value: '5' },
                    { label: '7+ Days (Critical)', value: '7' },
                    { label: 'Show All', value: 'all' },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="block text-[13px] font-medium text-text-secondary mb-1.5">Shift</span>
              <div style={{ width: 150 }}>
                <ManagerSearchableDropdown
                  value={shift}
                  onChange={v => setShift(v)}
                  options={[
                    { label: 'All', value: 'All' },
                    { label: 'Morning', value: 'Morning' },
                    { label: 'Afternoon', value: 'Afternoon' },
                    { label: 'Evening', value: 'Evening' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger">{critical.length} critical</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning">{moderate.length} moderate</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success">{filtered.filter(r=>r.notified).length} notified</span>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-bg-card rounded-xl border border-border p-4">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-lg font-semibold text-text-primary mb-1">No absentees above threshold!</p>
            <p className="text-sm text-text-secondary">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden border border-border rounded-xl mt-4 h-[450px]">
            <AgGridReact
              theme={gridTheme}
              rowData={filtered}
              columnDefs={colDefs as never[]}
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
                'bg-danger-bg': (params: ManagerRecord) => params.data.daysAbsent >= 7,
                'bg-warning-bg': (params: ManagerRecord) => params.data.daysAbsent >= 3 && params.data.daysAbsent < 7
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
