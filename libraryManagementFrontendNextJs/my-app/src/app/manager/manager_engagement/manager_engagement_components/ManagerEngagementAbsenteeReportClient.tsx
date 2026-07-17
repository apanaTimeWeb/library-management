'use client';

import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ChevronRight, Send, Mail, Phone } from 'lucide-react';
import { gridTheme , ManagerRecord } from '@/app/manager/manager_reusable/gridTheme';
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

// Data loaded from centralized constants

// RESPONSIBILITY: Renders the absentee report grid with filtering and notification actions.
import { useManagerEngagementAbsentee } from '@/app/manager/manager_engagement/manager_engagement_hooks/useManagerEngagementAbsentee';

export function ManagerEngagementAbsenteeReportClient() {
  const {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll
  } = useManagerEngagementAbsentee();

  const badgeClass = (d: number) => d >= 7 ? 'eng-badge--danger' : 'eng-badge--warning';
  
  const colDefs = [
    { 
      field: 'name', 
      headerName: 'Student', 
      flex: 1, 
      minWidth: 200,
      cellRenderer: (p: { value: string; data: AbsenteeRow }) => (
        <div className="eng-td-cell py-2">
          <div className="eng-att-avatar eng-avatar--sm mr-3">
            {p.data.initials}
          </div>
          <span className="eng-td-name font-medium">{p.value}</span>
        </div>
      )
    },
    { field: 'smartId', headerName: 'Smart ID', width: 120, cellRenderer: (p: { value: string }) => <span className="eng-td-mono">{p.value}</span> },
    { field: 'shift', headerName: 'Shift', width: 120, cellRenderer: (p: { value: string }) => <span className="eng-badge eng-badge--ghost mt-2 inline-block">{p.value}</span> },
    { 
      field: 'daysAbsent', 
      headerName: 'Days Absent', 
      width: 140,
      cellRenderer: (p: { value: number }) => (
        <span className={`eng-badge ${badgeClass(p.value)} eng-badge--lg mt-2 inline-block`}>
          {p.value} days
        </span>
      )
    },
    { field: 'lastSeen', headerName: 'Last Seen', width: 130, cellRenderer: (p: { value: string }) => <span className="eng-td-muted">{p.value}</span> },
    { 
      field: 'parentPhone', 
      headerName: 'Parent Contact', 
      width: 220,
      cellRenderer: (p: { value: string; data: AbsenteeRow }) => (
        <div className="eng-td-contact flex flex-col justify-center h-full space-y-1">
          <span className="eng-td-mono flex items-center text-xs">
            <Phone size={10} className="mr-1"/> {p.value}
          </span>
          <span className="eng-td-muted flex items-center text-xs">
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
        <div className="eng-row-actions h-full flex items-center">
          {params.data.notified ? (
            <span className="eng-badge eng-badge--success">✅ Notified</span>
          ) : (
            <button onClick={() => notify(params.data.id)} className="eng-btn eng-btn--ghost eng-btn--sm hover:bg-mgr-primary hover:text-white transition-colors duration-200">
              <Send size={12} className="mr-1"/> Alert
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="eng-page">
      {/* ── Toast ── */}
      {toast && (
        <div className="eng-toast-wrap">
          <div className={`eng-toast${toastType === 'info' ? ' eng-toast--info' : ''}`}>{toast}</div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="eng-breadcrumb">
        <Link href="/manager/manager_engagement/attendance">Engagement</Link>
        <ChevronRight size={12} className="eng-breadcrumb-sep"/>
        <span>Absentee Report</span>
      </div>

      {/* ── Page Header ── */}
      <div className="eng-page-header">
        <div className="eng-page-title-row">
          <div>
            <h1 className="eng-page-title">📋 Absentee Report</h1>
            <p className="eng-page-subtitle">Students with consecutive absences requiring attention.</p>
          </div>
          <div className="eng-page-actions">
            <button onClick={notifyAll} className="eng-btn eng-btn--primary">
              <Send size={14}/> Bulk Alert Parents
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="eng-stats-row">
        <div className="eng-stat-card">
          <div className="eng-stat-label">Total Absentees</div>
          <div className="eng-stat-value">{filtered.length}</div>
          <div className="eng-stat-sub">above {threshold === 'all' ? '0' : threshold} day threshold</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Critical (7+ days)</div>
          <div className="eng-stat-value eng-stat-value--danger">{critical.length}</div>
          <div className="eng-stat-sub">Immediate action needed</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Moderate (3–6 days)</div>
          <div className="eng-stat-value eng-stat-value--warning">{moderate.length}</div>
          <div className="eng-stat-sub">Monitoring required</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Parents Notified</div>
          <div className="eng-stat-value eng-stat-value--success">{filtered.filter(r=>r.notified).length}</div>
          <div className="eng-stat-sub">of {filtered.length} total</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="eng-card eng-card--flush eng-mb-6 p-4 border-b border-mgr-border">
        <div className="eng-filter-bar flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <div className="eng-filter-field flex flex-col">
              <span className="eng-label mb-1 text-xs font-semibold text-mgr-text-secondary">Days Threshold</span>
              <select className="eng-select eng-filter-select py-1 px-2 border rounded" value={threshold}
                onChange={e => setThreshold(e.target.value)}>
                <option value="3">3+ Days</option>
                <option value="5">5+ Days</option>
                <option value="7">7+ Days (Critical)</option>
                <option value="all">Show All</option>
              </select>
            </div>
            <div className="eng-filter-field flex flex-col">
              <span className="eng-label mb-1 text-xs font-semibold text-mgr-text-secondary">Shift</span>
              <select className="eng-select eng-filter-select py-1 px-2 border rounded" value={shift}
                onChange={e => setShift(e.target.value)}>
                <option>All</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
          <div className="eng-filter-badges flex gap-2">
            <span className="eng-badge eng-badge--danger px-2 py-1 rounded-full text-xs">{critical.length} critical</span>
            <span className="eng-badge eng-badge--warning px-2 py-1 rounded-full text-xs">{moderate.length} moderate</span>
            <span className="eng-badge eng-badge--success px-2 py-1 rounded-full text-xs">{filtered.filter(r=>r.notified).length} notified</span>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="eng-card eng-card--flush p-4">
        {filtered.length === 0 ? (
          <div className="eng-empty py-12 flex flex-col items-center justify-center text-center">
            <div className="eng-empty-icon text-4xl mb-4">🎉</div>
            <p className="eng-empty-title text-lg font-semibold text-mgr-text-primary mb-1">No absentees above threshold!</p>
            <p className="eng-empty-sub text-sm text-mgr-text-secondary">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
          <div className="mgr-table-wrapper h-[450px]">
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
                'bg-mgr-danger/5': (params: ManagerRecord) => params.data.daysAbsent >= 7,
                'bg-mgr-warning/5': (params: ManagerRecord) => params.data.daysAbsent >= 3 && params.data.daysAbsent < 7
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}


