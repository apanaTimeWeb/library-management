'use client';
// RESPONSIBILITY: Renders the WhatsappLogsClient component.
import type { ICellRendererParams } from 'ag-grid-community';
import { ChevronRight, X, MessageCircle, AlertTriangle } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useWhatsappLogsClient } from '@/app/superadmin/superadmin_communication/whatsapp-logs/_components/useWhatsappLogsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";

ModuleRegistry.registerModules([AllCommunityModule]);

const TYPE_BADGE: Record<string, string> = {
  welcome: 'bg-info/10 text-info', fee_reminder: 'bg-warning/10 text-warning',
  receipt: 'bg-success/10 text-success', notice: 'bg-primary/10 text-primary', renewal: 'bg-primary/10 text-primary',
};
const TYPE_LABEL: Record<string, string> = {
  welcome: 'Welcome', fee_reminder: 'Fee Reminder', receipt: 'Receipt', notice: 'Notice', renewal: 'Renewal',
};
const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning', Sent: 'bg-info/10 text-info', Delivered: 'bg-success/10 text-success', Failed: 'bg-danger/10 text-danger',
};

export function WhatsappLogsClient() {
    const [searchTerm, setSearchTerm] = useState('');
  const {
    typeFilter, setTypeFilter, statusFilter, setStatusFilter, search, setSearch,
    dateFrom, setDateFrom, dateTo, setDateTo, viewLog, setViewLog, filteredLogs
  } = useWhatsappLogsClient();

  const colDefs = [
    { field: 'dateTime', headerName: 'Date / Time', width: 160, cellRenderer: (p: ICellRendererParams) => <span className="text-text-secondary text-[14px]">{p.value}</span> },
    { field: 'phone', headerName: 'Phone', width: 130, cellRenderer: (p: ICellRendererParams) => <span className="font-mono font-medium text-[14px] text-text-primary">{p.value}</span> },
    { field: 'student', headerName: 'Student', flex: 1, minWidth: 150, cellRenderer: (p: ICellRendererParams) => <span className="font-bold text-text-primary">{p.value}</span> },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 130,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${TYPE_BADGE[p.value] || 'bg-input text-text-secondary'} mt-2 inline-block`}>
          {TYPE_LABEL[p.value]}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellRenderer: (p: ICellRendererParams) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${STATUS_BADGE[p.value] || 'bg-input text-text-secondary'} mt-2 inline-block`}>
          {p.value}
        </span>
      )
    },
    { field: 'error', headerName: 'Error', width: 180, cellRenderer: (p: ICellRendererParams) => <span className="text-danger font-medium text-[12px] truncate max-w-xs inline-block" title={p.value}>{p.value || '—'}</span> }
  ];

  return (
    <div className="relative p-2 sm:p-4">
      {/* View Message Modal */}
      {viewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-lg rounded-[var(--radius-xl)] shadow-2xl border border-border flex flex-col relative overflow-hidden">
            <button onClick={() => setViewLog(null)} className="absolute top-4 right-4 text-text-secondary hover:text-danger cursor-pointer"><X size={16} /></button>
            <div className="px-6 py-5 border-b border-border">
              <p className="text-[18px] font-bold text-primary flex items-center gap-2"><MessageCircle size={16} /> Message Details</p>
            </div>
            <div className="p-6">
              <div className="mb-6 flex gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${TYPE_BADGE[viewLog.type]}`}>{TYPE_LABEL[viewLog.type]}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-[12px] font-bold ${STATUS_BADGE[viewLog.status]}`}>{viewLog.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 bg-input p-4 rounded-[var(--radius-lg)]">
                {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{k}</p>
                    <p className="text-[14px] font-bold text-text-primary mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[12px] font-bold text-text-secondary mb-2 block">Message Content</label>
                <div className="bg-input p-4 rounded-[var(--radius-lg)] border border-border text-[14px] leading-relaxed text-text-primary whitespace-pre-wrap">{viewLog.message}</div>
              </div>
              {viewLog.error && (
                <div className="mt-4 p-3 bg-danger/10 text-danger rounded-[var(--radius-lg)] border border-danger/20 text-[14px] font-bold flex items-center gap-2"><AlertTriangle size={14} /> Error: {viewLog.error}</div>
              )}
            </div>
            <div className="px-6 py-4 bg-muted border-t border-border flex justify-end">
              <button onClick={() => setViewLog(null)} className="px-4 py-2 border border-border text-text-primary text-[14px] font-bold rounded-[var(--radius-md)] hover:bg-input transition-colors cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center text-[12px] font-bold text-text-secondary mb-2 space-x-2">
          <span>Communication</span><ChevronRight size={12} /><span>WhatsApp Logs</span>
        </div>
        <h1 className="text-[28px] font-extrabold text-text-primary flex items-center gap-2 tracking-tight"><MessageCircle size={24} /> WhatsApp Logs</h1>
        <p className="text-[14px] text-text-secondary mt-1">All outbound WhatsApp messages sent from the system.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col w-40">
            <label className="text-[12px] font-bold text-text-secondary mb-1">Message Type</label>
            <SuperadminSearchableDropdown
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Welcome', value: 'welcome' },
                { label: 'Fee Reminder', value: 'fee_reminder' },
                { label: 'Receipt', value: 'receipt' },
                { label: 'Notice', value: 'notice' },
                { label: 'Renewal', value: 'renewal' }
              ]}
              value={typeFilter}
              onChange={setTypeFilter}
            />
          </div>
          <div className="flex flex-col w-40">
            <label className="text-[12px] font-bold text-text-secondary mb-1">Status</label>
            <SuperadminSearchableDropdown
              options={[
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Sent', value: 'Sent' },
                { label: 'Delivered', value: 'Delivered' },
                { label: 'Failed', value: 'Failed' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text-text-secondary mb-1">From</label>
            <input type="date" className="bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text-text-secondary mb-1">To</label>
            <input type="date" className="bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[200px] flex flex-col">
            <label className="text-[12px] font-bold text-text-secondary mb-1">Search</label>
            <input className="w-full bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-[14px] font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm">
        {filteredLogs.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4"><MessageCircle size={48} className="text-text-secondary opacity-50" /></div>
            <p className="text-[16px] font-bold text-text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
<TableToolbar search={searchTerm} onSearch={setSearchTerm} />
      <div className="h-96 w-full">
            <AgGridReact
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchTerm}
              theme={superadmin_gridTheme}
              rowData={filteredLogs}
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
</div>
        )}
      </div>
    </div>
  );
}
