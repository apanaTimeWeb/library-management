'use client';
// RESPONSIBILITY: Renders the SuperadminSupportTicketsClient component.
import { useState, useMemo } from 'react';
import { Clock, MessageSquare, AlertTriangle, X, CheckCircle, Loader, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUPERADMIN_SUPPORT_MOCK_TICKETS, SUPERADMIN_SUPPORT_FILTER_OPTIONS } from '../superadmin_support_constants/SuperadminSupportConstants';
import { Ticket } from "../superadmin_support_types/SuperadminSupportTicketsClient_types";
import { SuperadminSupportTicketPanel } from "./SuperadminSupportTicketPanel";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";


export function SuperadminSupportTicketsClient() {
  const [tickets, setTickets] = useState<Ticket[]>(SUPERADMIN_SUPPORT_MOCK_TICKETS);
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [toast, setToast]     = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleSave = (updated: Ticket) => {
    setTickets(t => t.map(( x ) => x.id === updated.id ? updated : x));
    showToast(`${updated.id} updated to ${updated.status}`);
  };

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
  const table = useClientTable(filtered, 10);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen">
      {toast && <div className="fixed top-4 right-4 z-50 bg-bg-card border border-border shadow-lg rounded-lg px-4 py-3 text-sm font-medium text-text-primary flex items-center gap-2">{toast}</div>}
      {selected && <SuperadminSupportTicketPanel tkt={selected} onClose={() => setSelected(null)} onSave={handleSave} />}

      <div className="flex flex-col gap-1 mb-8">
        <div className="text-xs font-medium text-text-secondary flex items-center gap-2 mb-2 uppercase tracking-wider">
          <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span>Support Tickets</span>
        </div>
        <h1 className="text-xl font-bold text-text-primary">Support Escalations</h1>
      </div>

      <div className="bg-bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center p-4 border-b border-border bg-bg-card gap-2">
          {SUPERADMIN_SUPPORT_FILTER_OPTIONS.map(( f ) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-bg-input text-text-primary shadow-sm ring-1 ring-border' : 'text-text-secondary hover:text-text-primary hover:bg-bg-input'}`}>{f}</button>
          ))}
          <span className="ml-auto text-xs text-text-secondary font-medium">{table.totalItems} tickets</span>
        </div>
        
        <div className="flex flex-col gap-4 w-full p-4">
          <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
          
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-page/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Subject / Ticket ID</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Tenant</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Priority</TableHead>
                  <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status & Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.paginatedData.length > 0 ? (
                  table.paginatedData.map((tkt, index) => (
                    <TableRow 
                      key={index}
                      onClick={() => setSelected(tkt)}
                      className="cursor-pointer hover:bg-page/50 transition-colors"
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
        <TablePagination 
          totalItems={table.totalItems}
          page={table.page}
          limit={table.limit}
          onPageChange={table.setPage}
          onLimitChange={table.setLimit}
        />

      </div>
    </div>
  );
}

