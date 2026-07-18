'use client';
// RESPONSIBILITY: Renders the SuperadminSupportTicketsClient component.
import { useState, useMemo } from 'react';
import { Clock, MessageSquare, AlertTriangle, X, CheckCircle, Loader, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUPERADMIN_SUPPORT_MOCK_TICKETS } from '@/app/superadmin/superadmin_support-tickets/superadmin_support_constants/SuperadminSupportConstants';
import { Ticket } from "./SuperadminSupportTicketsClient_types";
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function TicketPanel({ tkt, onClose, onSave }: { tkt: Ticket; onClose: () => void; onSave: (t: Ticket) => void }) {
  const [status, setStatus] = useState(tkt.status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ ...tkt, status });
      setSaving(false);
      setSaved(true);
      setTimeout(() => { setSaved(false); onClose(); }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-bg-card h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300 border-l border-border overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-xs text-text-secondary">{tkt.id}</span>
            <h2 className="text-base font-bold text-text-primary mt-1 leading-snug">{tkt.subject}</h2>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-bg-page hover:text-text-primary transition-colors shrink-0" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="bg-bg-card rounded-xl border border-border shadow-sm p-4 mt-6">
          <p className="text-sm text-text-secondary leading-relaxed">{tkt.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {[['Tenant',tkt.tenant],['Priority',tkt.priority],['Age',`${tkt.age} ago`],['Replies',`${tkt.replies} replies`]].map(([label,val]) => (
            <div key={label} className="bg-bg-input p-3 rounded-lg border border-border">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-text-primary">{val}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-text-secondary mb-2">Update Status</p>
          <div className="flex gap-2">
            {(['Open', 'In-Progress', 'Resolved'] as const).map(( s ) => (
              <button key={s} type="button" onClick={() => setStatus(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  status === s
                    ? s === 'Resolved'    ? 'bg-success-bg border-success text-success ring-1 ring-success'
                    : s === 'In-Progress' ? 'bg-info-bg border-info text-info ring-1 ring-info'
                    :                       'bg-danger-bg border-danger text-danger ring-1 ring-danger'
                    : 'border-border text-text-secondary bg-transparent hover:bg-bg-input'
                }`}>
                {s === 'Resolved'    ? <><CheckCircle size={11} className="inline mr-1" />{s}</>
                 : s === 'In-Progress' ? <><Loader size={11} className="inline mr-1" />{s}</>
                 : s}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 mt-auto disabled:opacity-50 disabled:cursor-not-allowed w-full" onClick={handleSave} disabled={saving || saved}>
          {saved    ? <><CheckCircle size={14} /> Saved & Notified!</>
           : saving ? <><span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2 inline-block" /> Saving...</>
           : <><Send size={14} /> Save & Notify Tenant</>}
        </button>
      </div>
    </div>
  );
}

export function SuperadminSupportTicketsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>(SUPERADMIN_SUPPORT_MOCK_TICKETS);
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [toast, setToast]     = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleSave = (updated: Ticket) => {
    setTickets(t => t.map(( x ) => x.id === updated.id ? updated : x));
    showToast(`${updated.id} updated to ${updated.status}`);
  };

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

  const searchedTickets = useMemo(() => {
    if (!searchTerm) return filtered;
    const lowerSearch = searchTerm.toLowerCase();
    return filtered.filter(t => 
      t.subject?.toLowerCase().includes(lowerSearch) ||
      t.tenant?.toLowerCase().includes(lowerSearch) ||
      t.id?.toLowerCase().includes(lowerSearch)
    );
  }, [filtered, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(searchedTickets.length / pageSize);
  const paginatedTickets = searchedTickets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen">
      {toast && <div className="fixed top-4 right-4 z-50 bg-bg-card border border-border shadow-lg rounded-lg px-4 py-3 text-sm font-medium text-text-primary flex items-center gap-2">{toast}</div>}
      {selected && <TicketPanel tkt={selected} onClose={() => setSelected(null)} onSave={handleSave} />}

      <div className="flex flex-col gap-1 mb-8">
        <div className="text-xs font-medium text-text-secondary flex items-center gap-2 mb-2 uppercase tracking-wider">
          <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span>Support Tickets</span>
        </div>
        <h1 className="text-xl font-bold text-text-primary">Support Escalations</h1>
      </div>

      <div className="bg-bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center p-4 border-b border-border bg-bg-card gap-2">
          {['All', 'Open', 'In-Progress', 'Resolved'].map(( f ) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-bg-input text-text-primary shadow-sm ring-1 ring-border' : 'text-text-secondary hover:text-text-primary hover:bg-bg-input'}`}>{f}</button>
          ))}
          <span className="ml-auto text-xs text-text-secondary font-medium">{searchedTickets.length} tickets</span>
        </div>
        
        <div className="flex flex-col gap-4 w-full p-4">
          <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
          
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-bg-page/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Subject / Ticket ID</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Tenant</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Priority</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status & Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTickets.length > 0 ? (
                  paginatedTickets.map((tkt, index) => (
                    <TableRow 
                      key={index}
                      onClick={() => setSelected(tkt)}
                      className="cursor-pointer hover:bg-bg-page/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex flex-col justify-center">
                          <p className="font-medium text-text-primary leading-tight">{tkt.subject}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-text-secondary">{tkt.id}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="flex items-center gap-1 text-xs text-text-secondary">
                              <MessageSquare size={10} /> {tkt.replies} replies
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-text-primary">
                        {tkt.tenant}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center h-full">
                          {tkt.priority === 'High'   && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 bg-danger-bg text-danger"><AlertTriangle size={10} /> HIGH</span>}
                          {tkt.priority === 'Medium' && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 bg-warning-bg text-warning">MEDIUM</span>}
                          {tkt.priority === 'Low'    && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 bg-bg-input text-text-secondary border border-border">LOW</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-center">
                          <p className={`${
                            tkt.status === 'Resolved' ? 'text-xs font-semibold text-success' :
                            tkt.status === 'Open'     ? 'text-xs font-semibold text-danger' : 'text-xs font-semibold text-info'
                          }`}>{tkt.status}</p>
                          <p className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
                            <Clock size={10} /> {tkt.age} ago
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-text-secondary">
                      No tickets found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-bg-page/30">
          <span className="text-sm font-semibold text-text-secondary">
            Showing {paginatedTickets.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedTickets.length)} of {searchedTickets.length} tickets
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
    </div>
  );
}
