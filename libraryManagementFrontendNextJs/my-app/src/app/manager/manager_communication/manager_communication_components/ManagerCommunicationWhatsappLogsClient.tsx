'use client';
// RESPONSIBILITY: Renders the WhatsApp communication logs grid with filtering.
import { useState } from 'react';
import { ChevronRight, Eye, X } from 'lucide-react';
import { WaLog } from '@/app/manager/manager_communication/manager_communication_types/ManagerCommunicationTypes';
import { WA_LOGS_DATA } from '@/app/manager/manager_communication/manager_communication_constants/ManagerCommunicationConstants';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filtered = WA_LOGS_DATA.filter((l: WaLog) => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      if (!l.student.toLowerCase().includes(s) && !l.phone.includes(s) && !l.message.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const table = useClientTable(filtered, 10);

  return (
    <div className="p-6 min-h-screen relative">
      {/* View Message Modal */}
      {viewLog && (
        <div className="fixed inset-0 bg-bg-pagelack/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-pageg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-lg relative border border-border">
            <button onClick={() => setViewLog(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-danger-bg text-text-secondary hover:text-danger transition-colors"><X size={16} /></button>
            <p className="text-lg font-bold text-text-primary mb-4">📱 Message Details</p>
            <div className="flex gap-2 mb-6">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[viewLog.type]}`}>{TYPE_LABEL[viewLog.type]}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[viewLog.status]}`}>{viewLog.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 bg-bg-pageg-elevated p-4 rounded-lg border border-border/50">
              {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{k}</p>
                  <p className="text-sm text-text-primary font-medium mt-1">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-1.5 block">Message Content</label>
              <div className="bg-bg-pageg-input p-4 rounded-lg border border-border text-sm leading-relaxed text-text-primary whitespace-pre-wrap">{viewLog.message}</div>
            </div>
            {viewLog.error && (
              <div className="mt-4 p-3 bg-danger-bg text-danger rounded-lg border border-danger/20 text-sm font-medium">⚠️ Error: {viewLog.error}</div>
            )}
            <div className="flex justify-end mt-6">
              <button onClick={() => setViewLog(null)} className="px-5 py-2.5 bg-transparent border border-border text-text-primary font-medium text-sm rounded-lg hover:bg-bg-pageg-elevated transition-colors">Close</button>
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
      <div className="bg-bg-pageg-card mb-6 p-4 border border-border rounded-xl shadow-sm">
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
            <input type="date" className="bg-bg-pageg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">To</label>
            <input type="date" className="bg-bg-pageg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="flex flex-col flex-grow min-w-48">
            <label className="text-[13px] font-medium text-text-secondary mb-1.5">Search</label>
            <input className="w-full bg-bg-pageg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-pageg-card rounded-xl border border-border p-4 shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">📱</div>
            <p className="text-lg font-semibold text-text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto border border-border rounded-xl">
              <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-pageg-elevated border-b border-border">
                  <tr className="text-text-secondary text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Date / Time</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Error</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-bg-pageg-card">
                  {table.paginatedData.map((row) => (
                    <tr key={row.id} className="hover:bg-bg-pageg-page transition-colors">
                      <td className="px-4 py-4 text-text-secondary">{row.dateTime}</td>
                      <td className="px-4 py-4"><span className="font-mono text-[12px] text-text-primary tracking-tight">{row.phone}</span></td>
                      <td className="px-4 py-4"><span className="text-sm font-semibold text-text-primary">{row.student}</span></td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[row.type] || 'bg-info-bg text-info'}`}>
                          {TYPE_LABEL[row.type] || row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[row.status] || 'bg-info-bg text-info'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-danger text-xs truncate max-w-40 inline-block" title={row.error}>{row.error || '—'}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex gap-2 items-center justify-end">
                          <button onClick={() => setViewLog(row)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-primary hover:text-white transition-colors" title="View Message">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
            </div>
            {filtered.length > 0 && (
              <div className="mt-4">
                <TablePagination
                  page={page}
                  limit={limit}
                  totalItems={filtered.length}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
