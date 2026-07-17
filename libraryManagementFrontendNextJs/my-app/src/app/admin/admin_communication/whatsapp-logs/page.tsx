'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState } from 'react';
import { ChevronRight, Eye, X } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme , AdminGridCell } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';

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

export default function WhatsappLogsPage() {
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [viewLog,      setViewLog]      = useState<any | null>(null);

  const filtered = (ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS as WaLog[]).filter(l => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  const colDefs: any[] = [
    { field: 'dateTime', headerName: 'Date / Time', width: 160, cellRenderer: (p: any) => <span className="eng-td-muted text-sm">{p.value}</span> },
    { field: 'phone', headerName: 'Phone', width: 130, cellRenderer: (p: any) => <span className="eng-td-mono font-medium">{p.value}</span> },
    { field: 'student', headerName: 'Student', flex: 1, minWidth: 150, cellRenderer: (p: any) => <span className="eng-td-bold">{p.value}</span> },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 130,
      cellRenderer: (p: any) => (
        <span className={`eng-badge ${TYPE_BADGE[String(p.value)] || 'eng-badge--info'} inline-block mt-2 text-xs`}>
          {TYPE_LABEL[String(p.value)] || p.value}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: any) => (
        <span className={`eng-badge ${STATUS_BADGE[String(p.value)] || 'eng-badge--info'} inline-block mt-2 text-xs`}>
          {p.value}
        </span>
      )
    },
    { field: 'error', headerName: 'Error', width: 180, cellRenderer: (p: any) => <span className="eng-td-danger text-xs truncate max-w-[160px] inline-block" title={p.value}>{p.value || '—'}</span> },
    {
      headerName: 'Actions',
      width: 100,
      sortable: false,
      cellRenderer: (params: any) => (
        <div className="h-full flex items-center">
          <button onClick={() => setViewLog(params.data)} className="eng-btn-icon hover:bg-mgr-primary hover:text-white transition-colors duration-200" title="View Message">
            <Eye size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="eng-page">
      {/* View Message Modal */}
      {viewLog && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--lg bg-mgr-bg-card">
            <button onClick={() => setViewLog(null)} className="eng-modal-close hover:text-red-500"><X size={16} /></button>
            <p className="eng-modal-title mb-4 font-bold text-mgr-text-primary">📱 Message Details</p>
            <div className="eng-modal-badge-row mb-6 flex gap-2">
              <span className={`eng-badge ${TYPE_BADGE[viewLog.type]}`}>{TYPE_LABEL[viewLog.type]}</span>
              <span className={`eng-badge ${STATUS_BADGE[viewLog.status]}`}>{viewLog.status}</span>
            </div>
            <div className="eng-msg-detail-grid grid grid-cols-2 gap-4 mb-6 bg-mgr-bg p-4 rounded-lg">
              {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                <div key={k} className="eng-msg-detail-item">
                  <p className="eng-msg-detail-key text-xs font-semibold text-mgr-text-secondary uppercase tracking-wider">{k}</p>
                  <p className="eng-msg-detail-val text-mgr-text-primary font-medium mt-1">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="eng-label text-sm font-semibold mb-2 block">Message Content</label>
              <div className="eng-msg-body-box bg-mgr-bg p-4 rounded-lg border border-mgr-border text-sm leading-relaxed text-mgr-text-primary whitespace-pre-wrap">{viewLog.message}</div>
            </div>
            {viewLog.error && (
              <div className="eng-warn-box mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm font-medium">⚠️ Error: {viewLog.error}</div>
            )}
            <div className="eng-modal-footer mt-6 flex justify-end">
              <button onClick={() => setViewLog(null)} className="px-4 py-2 bg-mgr-bg border border-mgr-border text-mgr-text-primary rounded hover:bg-mgr-border transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>WhatsApp Logs</span>
        </div>
        <h1 className="eng-page-title">📱 WhatsApp Logs</h1>
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
          <div className="eng-flex-1 flex flex-col flex-grow min-w-[200px]">
            <label className="eng-label text-xs mb-1 font-semibold text-mgr-text-secondary">Search</label>
            <input className="eng-input py-2 px-3 border rounded w-full" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="eng-card eng-card--flush p-4">
        {filtered.length === 0 ? (
          <div className="eng-empty py-12 flex flex-col items-center justify-center text-center">
            <div className="eng-empty__icon text-4xl mb-4">📱</div>
            <p className="eng-empty__title text-lg font-semibold text-mgr-text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <div className="mgr-table-wrapper h-[450px]">
            <AgGridReact
              theme={gridTheme}
              rowData={filtered}
              columnDefs={colDefs as never}
              rowHeight={56}
              headerHeight={48}
              pagination={true}
              paginationPageSize={10}
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

