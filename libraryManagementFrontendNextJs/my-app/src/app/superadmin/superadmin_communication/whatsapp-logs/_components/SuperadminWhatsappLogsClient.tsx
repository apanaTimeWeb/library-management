'use client';
// RESPONSIBILITY: Renders the SuperadminWhatsappLogsClient component.
import { useState, useMemo } from 'react';
import { ChevronRight, X, MessageCircle, AlertTriangle, ChevronLeft } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminWhatsappLogsClient } from '@/app/superadmin/superadmin_communication/whatsapp-logs/_components/useSuperadminWhatsappLogsClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const TYPE_BADGE: Record<string, string> = {
  welcome: 'bg-info-bg text-info', fee_reminder: 'bg-warning-bg text-warning',
  receipt: 'bg-success-bg text-success', notice: 'bg-purple-bg text-purple', renewal: 'bg-purple-bg text-purple',
};
const TYPE_LABEL: Record<string, string> = {
  welcome: 'Welcome', fee_reminder: 'Fee Reminder', receipt: 'Receipt', notice: 'Notice', renewal: 'Renewal',
};
const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-warning-bg text-warning', Sent: 'bg-info-bg text-info', Delivered: 'bg-success-bg text-success', Failed: 'bg-danger-bg text-danger',
};

export function SuperadminWhatsappLogsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const {
    typeFilter, setTypeFilter, statusFilter, setStatusFilter, search, setSearch,
    dateFrom, setDateFrom, dateTo, setDateTo, viewLog, setViewLog, filteredLogs
  } = useSuperadminWhatsappLogsClient();

  const searchedLogs = useMemo(() => {
    if (!searchTerm) return filteredLogs;
    const lowerSearch = searchTerm.toLowerCase();
    return filteredLogs.filter(log => 
      log.student?.toLowerCase().includes(lowerSearch) ||
      log.phone?.toLowerCase().includes(lowerSearch) ||
      log.message?.toLowerCase().includes(lowerSearch) ||
      log.error?.toLowerCase().includes(lowerSearch)
    );
  }, [filteredLogs, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter, search, dateFrom, dateTo]);

  const totalPages = Math.ceil(searchedLogs.length / pageSize);
  const paginatedLogs = searchedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="relative p-2 sm:p-4">
      {/* View Message Modal */}
      {viewLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border flex flex-col relative overflow-hidden">
            <button onClick={() => setViewLog(null)} className="absolute top-4 right-4 text-text-secondary hover:text-danger cursor-pointer"><X size={16} /></button>
            <div className="px-6 py-5 border-b border-border">
              <p className="text-lg font-bold text-primary flex items-center gap-2"><MessageCircle size={16} /> Message Details</p>
            </div>
            <div className="p-6">
              <div className="mb-6 flex gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${TYPE_BADGE[viewLog.type] || 'bg-bg-input text-text-secondary'}`}>{TYPE_LABEL[viewLog.type]}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_BADGE[viewLog.status] || 'bg-bg-input text-text-secondary'}`}>{viewLog.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 bg-bg-input p-4 rounded-lg">
                {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">{k}</p>
                    <p className="text-sm font-bold text-text-primary mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-bold text-text-secondary mb-2 block">Message Content</label>
                <div className="bg-bg-input p-4 rounded-lg border border-border text-sm leading-relaxed text-text-primary whitespace-pre-wrap">{viewLog.message}</div>
              </div>
              {viewLog.error && (
                <div className="mt-4 p-3 bg-danger-bg text-danger rounded-lg border border-danger/20 text-sm font-bold flex items-center gap-2"><AlertTriangle size={14} /> Error: {viewLog.error}</div>
              )}
            </div>
            <div className="px-6 py-4 bg-page border-t border-border flex justify-end">
              <button onClick={() => setViewLog(null)} className="px-4 py-2 border border-border text-text-primary text-sm font-bold rounded-md hover:bg-bg-input transition-colors cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center text-xs font-bold text-text-secondary mb-2 space-x-2">
          <span>Communication</span><ChevronRight size={12} /><span>WhatsApp Logs</span>
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2 tracking-tight"><MessageCircle size={24} /> WhatsApp Logs</h1>
        <p className="text-sm text-text-secondary mt-1">All outbound WhatsApp messages sent from the system.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col w-40">
            <label className="text-xs font-bold text-text-secondary mb-1">Message Type</label>
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
            <label className="text-xs font-bold text-text-secondary mb-1">Status</label>
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
            <label className="text-xs font-bold text-text-secondary mb-1">From</label>
            <input type="date" className="bg-bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-text-secondary mb-1">To</label>
            <input type="date" className="bg-bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div className="flex-1 min-w-48 flex flex-col">
            <label className="text-xs font-bold text-text-secondary mb-1">Search</label>
            <input className="w-full bg-bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors h-10" placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4"><MessageCircle size={48} className="text-text-secondary opacity-50" /></div>
            <p className="text-base font-bold text-text-primary">No WhatsApp messages found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Date / Time</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Phone</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Student</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Type</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.length > 0 ? (
                    paginatedLogs.map((log, index) => (
                      <TableRow 
                        key={index}
                        onClick={() => setViewLog(log)}
                        className="cursor-pointer hover:bg-page/50 transition-colors"
                      >
                        <TableCell className="text-text-secondary text-sm">
                          {log.dateTime}
                        </TableCell>
                        <TableCell className="font-mono font-medium text-sm text-text-primary">
                          {log.phone}
                        </TableCell>
                        <TableCell className="font-bold text-text-primary">
                          {log.student}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${TYPE_BADGE[log.type] || 'bg-bg-input text-text-secondary'} mt-2 inline-block`}>
                            {TYPE_LABEL[log.type]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_BADGE[log.status] || 'bg-bg-input text-text-secondary'} mt-2 inline-block`}>
                            {log.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-danger font-medium text-xs truncate max-w-xs inline-block" title={log.error}>
                            {log.error || '—'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-text-secondary">
                        No logs match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-text-secondary">
                Showing {paginatedLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedLogs.length)} of {searchedLogs.length} logs
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-text-primary">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

