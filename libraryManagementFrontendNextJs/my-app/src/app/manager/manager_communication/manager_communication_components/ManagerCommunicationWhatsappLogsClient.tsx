'use client';
// RESPONSIBILITY: Renders the WhatsApp communication logs grid with filtering.
import { useState } from 'react';
import { ChevronRight, Eye, X } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { ManagerRecord } from '@/app/manager/manager_reusable/gridTheme';
import { WaLog } from '@/app/manager/manager_communication/manager_communication_types/ManagerCommunicationTypes';
import { WA_LOGS_DATA } from '@/app/manager/manager_communication/manager_communication_constants/ManagerCommunicationConstants';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

type CellParams = { value: string; data?: WaLog };

ModuleRegistry.registerModules([AllCommunityModule]);

const TYPE_BADGE: Record<string, string> = {
  welcome: 'bg-info-bg text-info', 
  fee_reminder: 'bg-warning-bg text-warning',
  receipt: 'bg-success-bg text-success', 
  notice: 'bg-primary/10 text-primary', 
  renewal: 'bg-primary-subtle text-primary',
};
const TYPE_LABEL: Record<string, string> = {
  welcome: 'Welcome', fee_reminder: 'Fee Reminder', receipt: 'Receipt', notice: 'Notice', renewal: 'Renewal',
};
const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-warning-bg text-warning', 
  Sent: 'bg-info-bg text-info', 
  Delivered: 'bg-success-bg text-success', 
  Failed: 'bg-danger-bg text-danger',
};

export function ManagerCommunicationWhatsappLogsClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [viewLog,      setViewLog]      = useState<WaLog | null>(null);

  const filtered = WA_LOGS_DATA.filter((l: WaLog) => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  const colDefs: unknown[] = [
    { field: 'dateTime', headerName: 'Date / Time', width: 160, cellRenderer: (p: CellParams) => <span className="text-text-secondary text-sm">{p.value}</span> },
    { field: 'phone', headerName: 'Phone', width: 130, cellRenderer: (p: CellParams) => <span className="font-mono text-[12px] text-text-primary tracking-tight">{p.value}</span> },
    { field: 'student', headerName: 'Student', flex: 1, minWidth: 150, cellRenderer: (p: CellParams) => <span className="text-sm font-semibold text-text-primary">{p.value}</span> },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 130,
      cellRenderer: (p: CellParams) => (
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[String(p.value)] || 'bg-info-bg text-info'} inline-block mt-2`}>
          {TYPE_LABEL[String(p.value)] || p.value}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: CellParams) => (
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[String(p.value)] || 'bg-info-bg text-info'} inline-block mt-2`}>
          {p.value}
        </span>
      )
    },
    { field: 'error', headerName: 'Error', width: 180, cellRenderer: (p: CellParams) => <span className="text-danger text-xs truncate max-w-[160px] inline-block" title={p.value}>{p.value || '—'}</span> },
    {
      headerName: 'Actions',
      width: 100,
      sortable: false,
      cellRenderer: (params: CellParams) => (
        <div className="h-full flex items-center">
          <button onClick={() => setViewLog(params?.data as WaLog)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors" title="View Message">
            <Eye size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 min-h-screen relative">
      {/* View Message Modal */}
      {viewLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-lg relative border border-border">
            <button onClick={() => setViewLog(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-danger-bg text-text-secondary hover:text-danger transition-colors"><X size={16} /></button>
            <p className="text-lg font-bold text-text-primary mb-4">📱 Message Details</p>
            <div className="flex gap-2 mb-6">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[viewLog.type]}`}>{TYPE_LABEL[viewLog.type]}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[viewLog.status]}`}>{viewLog.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 bg-bg-elevated p-4 rounded-lg border border-border/50">
              {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{k}</p>
                  <p className="text-sm text-text-primary font-medium mt-1">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-1.5 block">Message Content</label>
              <div className="bg-bg-input p-4 rounded-lg border border-border text-sm leading-relaxed text-text-primary whitespace-pre-wrap">{viewLog.message}</div>
            </div>
            {viewLog.error && (
              <div className="mt-4 p-3 bg-danger-bg text-danger rounded-lg border border-danger/20 text-sm font-medium">⚠️ Error: {viewLog.error}</div>
            )}
            <div className="flex justify-end mt-6">
              <button onClick={() => setViewLog(null)} className="px-5 py-2.5 bg-transparent border border-border text-text-primary font-medium text-sm rounded-lg hover:bg-bg-elevated transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>Communication</span><ChevronRight size={12} className="mx-1" /><span>WhatsApp Logs</span>
        </div>
        <h1 className="text-[22px] font-bold text-text-primary">📱 WhatsApp Logs</h1>
        <p className="text-[13px] text-text-secondary mt-1.5">All outbound WhatsApp messages sent from the system.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-bg-card mb-6 p-4 border border-border rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">Message Type</label>
            <ManagerSearchableDropdown
              className="w-48"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Welcome', value: 'welcome' },
                { label: 'Fee Reminder', value: 'fee_reminder' },
                { label: 'Receipt', value: 'receipt' },
                { label: 'Notice', value: 'notice' },
                { label: 'Renewal', value: 'renewal' },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">Status</label>
            <ManagerSearchableDropdown
              className="w-32"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Sent', value: 'Sent' },
                { label: 'Delivered', value: 'Delivered' },
                { label: 'Failed', value: 'Failed' },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">From</label>
            <input type="date" className="bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">To</label>
            <input type="date" className="bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="flex flex-col flex-grow min-w-[200px]">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">Search</label>
            <input className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-card rounded-xl border border-border p-4 shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">📱</div>
            <p className="text-lg font-semibold text-text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden border border-border rounded-xl h-[450px]">
            <AgGridReact
              quickFilterText={searchTerm}
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
