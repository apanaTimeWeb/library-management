// RESPONSIBILITY: Entry page for the admin_communication module.
'use client';
// DATA FLOW: Next.js Router -> page -> Components

import { useState } from 'react';
import { ChevronRight, Eye, X } from 'lucide-react';
import { ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { TablePagination } from '@/components/ui/table-pagination';

interface WaLog {
  id: string; dateTime: string; phone: string; student: string;
  type: 'welcome' | 'fee_reminder' | 'receipt' | 'notice' | 'renewal';
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  error: string; message: string;
}

const TYPE_BADGE: Record<string, string> = {
  welcome: 'bg-info/10 text-info hover:bg-info/20', 
  fee_reminder: 'bg-warning/10 text-warning hover:bg-warning/20',
  receipt: 'bg-success/10 text-success hover:bg-success/20', 
  notice: 'bg-info/10 text-info hover:bg-info/20', 
  renewal: 'bg-primary/10 text-primary hover:bg-primary/20',
};
const TYPE_LABEL: Record<string, string> = {
  welcome: 'Welcome', fee_reminder: 'Fee Reminder', receipt: 'Receipt', notice: 'Notice', renewal: 'Renewal',
};
const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning hover:bg-warning/20', 
  Sent: 'bg-info/10 text-info hover:bg-info/20', 
  Delivered: 'bg-success/10 text-success hover:bg-success/20', 
  Failed: 'bg-danger/10 text-danger hover:bg-danger/20',
};

export function AdminCommunicationWhatsappLogsClient() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [viewLog,      setViewLog]      = useState<WaLog | null>(null);

  const filtered = (ADMIN_COMMUNICATION_MOCK_WHATSAPP_LOGS as WaLog[]).filter(l => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    if (dateFrom && l.dateTime.split(' ')[0] < dateFrom) return false;
    if (dateTo && l.dateTime.split(' ')[0] > dateTo) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Communication <ChevronRight size={12} /> WhatsApp Logs
          </p>
          <h1 className="text-2xl font-bold tracking-tight">📱 WhatsApp Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">All outbound WhatsApp messages sent from the system.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 border-border shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Message Type</label>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="flex h-10 w-36 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="All">All Types</option>
              <option value="welcome">Welcome</option>
              <option value="fee_reminder">Fee Reminder</option>
              <option value="receipt">Receipt</option>
              <option value="notice">Notice</option>
              <option value="renewal">Renewal</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="flex h-10 w-28 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="All">All</option>
              <option>Pending</option><option>Sent</option>
              <option>Delivered</option><option>Failed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">From</label>
            <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-auto" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">To</label>
            <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-auto" />
          </div>
          <div className="flex flex-col flex-grow min-w-48">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Search</label>
            <Input placeholder="Student name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-x-auto shadow-sm border-border">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <div className="text-4xl mb-4">📱</div>
            <p className="font-medium text-foreground">No WhatsApp messages found.</p>
          </div>
        ) : (
          <>
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Error</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.slice((page - 1) * limit, page * limit).map((l) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 text-muted-foreground text-xs">{l.dateTime}</td>
                  <td className="py-4 px-4 font-mono font-medium text-foreground">{l.phone}</td>
                  <td className="py-4 px-4 font-bold text-foreground">{l.student}</td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className={`${TYPE_BADGE[l.type] || 'bg-info/10 text-info'} border-none font-bold tracking-wide`}>
                      {TYPE_LABEL[l.type] || l.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className={`${STATUS_BADGE[l.status] || 'bg-info/10 text-info'} border-none font-bold tracking-wide`}>
                      {l.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-danger font-medium text-xs max-w-40 truncate block" title={l.error}>{l.error || '—'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <Button variant="ghost" size="icon" onClick={() => setViewLog(l)} className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="View Message">
                        <Eye size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

      <TablePagination 
        totalItems={100} 
        page={page} 
        limit={limit} 
        onPageChange={setPage} 
        onLimitChange={setLimit} 
      />
          </>
        )}
      </Card>

      {/* View Message Modal */}
      <Dialog open={!!viewLog} onOpenChange={() => setViewLog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>📱 Message Details</DialogTitle>
          </DialogHeader>
          {viewLog && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`${TYPE_BADGE[viewLog.type]} border-none font-bold tracking-wide`}>{TYPE_LABEL[viewLog.type]}</Badge>
                <Badge variant="secondary" className={`${STATUS_BADGE[viewLog.status]} border-none font-bold tracking-wide`}>{viewLog.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg border border-border">
                {([['To', viewLog.phone], ['Student', viewLog.student], ['Sent At', viewLog.dateTime]] as [string, string][]).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{k}</p>
                    <p className="text-foreground font-medium mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block uppercase tracking-wider">Message Content</label>
                <div className="bg-muted/30 p-4 rounded-lg border border-border text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {viewLog.message}
                </div>
              </div>
              {viewLog.error && (
                <div className="mt-4 p-3 bg-danger/10 text-danger rounded-lg border border-danger/20 text-sm font-medium">
                  ⚠️ Error: {viewLog.error}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setViewLog(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
