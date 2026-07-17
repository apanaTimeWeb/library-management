// RESPONSIBILITY: Renders the WhatsappLogsClient component.
'use client';

import type { ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';
import { ChevronRight, Eye, X, MessageCircle, AlertTriangle } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { SUPERADMIN_COMMUNICATION_MOCK_WA_LOGS } from '@superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';

ModuleRegistry.registerModules([AllCommunityModule]);

interface WaLog {
  id: string; dateTime: string; phone: string; student: string;
  type: 'welcome' | 'fee_reminder' | 'receipt' | 'notice' | 'renewal';
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  error: string; message: string;
}



const TYPE_BADGE: Record<string, string> = {
  welcome: 'eng-badge--info', fee_reminder: 'eng-badge--warning',
  receipt: 'eng-badge--success', notice: 'eng-badge--purple', renewal: 'eng-badge--primary',
};
const TYPE_LABEL: Record<string, string> = {
  welcome: 'Welcome', fee_reminder: 'Fee Reminder', receipt: 'Receipt', notice: 'Notice', renewal: 'Renewal',
};
const STATUS_BADGE: Record<string, string> = {
  Pending: 'eng-badge--warning', Sent: 'eng-badge--info', Delivered: 'eng-badge--success', Failed: 'eng-badge--danger',
};

export function WhatsappLogsClient() {
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [viewLog,      setViewLog]      = useState<WaLog | null>(null);

  const filtered = (SUPERADMIN_COMMUNICATION_MOCK_WA_LOGS as WaLog[]).filter(l => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  const colDefs = [
    { field: 'dateTime', headerName: 'Date / Time', width: 160, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-muted text-sm">{p.value}</span> },
    { field: 'phone', headerName: 'Phone', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-mono font-medium">{p.value}</span> },
    { field: 'student', headerName: 'Student', flex: 1, minWidth: 150, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-bold">{p.value}</span> },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 130,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`eng-badge ${TYPE_BADGE[p.value]} inline-block mt-2 text-xs`}>
          {TYPE_LABEL[p.value]}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`eng-badge ${STATUS_BADGE[p.value]} inline-block mt-2 text-xs`}>
          {p.value}
        </span>
      )
    },
    { field: 'error', headerName: 'Error', width: 180, cellRenderer: (p: ICellRendererParams) => <span className="eng-td-danger text-xs truncate max-w-xs inline-block" title={p.value}>{p.value || '—'}</span> }
  ];

  return (
    <div className="eng-page">
      {/* View Message Modal */}
      {viewLog && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--lg bg-card">
            <button onClick={() => setViewLog(null)} className="eng-modal-close hover:text-red-500"><X size={16} /></button>
            <p className="eng-modal-title mb-4 font-bold text-primary flex items-center gap-2"><MessageCircle size={16} /> Message Details</p>
            <div className="eng-modal-badge-row mb-6 flex gap-2">
              <span className={`eng-badge ${TYPE_BADGE[viewLog.type]}`}>{TYPE_LABEL[viewLog.type]}</span>
              <span className={`eng-badge ${STATUS_BADGE[viewLog.status]}`}>{viewLog.status}</span>
            </div>
            <div className="eng-msg-detail-grid grid grid-cols-2 gap-4 mb-6 bg-input p-4 rounded-lg">
              {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                <div key={k} className="eng-msg-detail-item">
                  <p className="eng-msg-detail-key text-xs font-semibold text-secondary uppercase tracking-wider">{k}</p>
                  <p className="eng-msg-detail-val text-primary font-medium mt-1">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="eng-label text-sm font-semibold mb-2 block">Message Content</label>
              <div className="eng-msg-body-box bg-input p-4 rounded-lg border border-border text-sm leading-relaxed text-primary whitespace-pre-wrap">{viewLog.message}</div>
            </div>
            {viewLog.error && (
              <div className="eng-warn-box mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm font-medium flex items-center gap-2"><AlertTriangle size={14} /> Error: {viewLog.error}</div>
            )}
            <div className="eng-modal-footer mt-6 flex justify-end">
              <button onClick={() => setViewLog(null)} className="px-4 py-2 bg-input border border-border text-primary rounded hover:bg-border transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>WhatsApp Logs</span>
        </div>
        <h1 className="eng-page-title flex items-center gap-2"><MessageCircle size={24} /> WhatsApp Logs</h1>
        <p className="eng-page-subtitle">All outbound WhatsApp messages sent from the system.</p>
      </div>

      {/* Filter Bar */}
      <div className="eng-card mb-6 p-4 border border-mgr-border rounded-lg">
        <div className="eng-filter-row flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">Message Type</label>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="eng-select py-2 px-3 border rounded">
              <option value="All">All Types</option>
              <option value="welcome">Welcome</option>
              <option value="fee_reminder">Fee Reminder</option>
              <option value="receipt">Receipt</option>
              <option value="notice">Notice</option>
              <option value="renewal">Renewal</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">Status</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="eng-select py-2 px-3 border rounded">
              <option value="All">All</option>
              <option>Pending</option><option>Sent</option>
              <option>Delivered</option><option>Failed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">From</label>
            <input type="date" className="eng-input py-2 px-3 border rounded" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">To</label>
            <input type="date" className="eng-input py-2 px-3 border rounded" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="eng-flex-1 flex flex-col flex-grow min-w-48">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">Search</label>
            <input className="eng-input py-2 px-3 border rounded w-full" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="eng-card eng-card--flush p-4">
        {filtered.length === 0 ? (
          <div className="eng-empty py-12 flex flex-col items-center justify-center text-center">
            <div className="eng-empty__icon mb-4"><MessageCircle size={48} className="text-secondary" /></div>
            <p className="eng-empty__title text-lg font-semibold text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <div className="mgr-table-wrapper h-96">
            <AgGridReact
              theme={superadmin_gridTheme}
              rowData={filtered}
              columnDefs={colDefs as any}
              rowHeight={56}
              headerHeight={48}
              pagination={true}
              paginationPageSize={10}
              onRowClicked={p => p.data ? setViewLog(p.data) : null}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
