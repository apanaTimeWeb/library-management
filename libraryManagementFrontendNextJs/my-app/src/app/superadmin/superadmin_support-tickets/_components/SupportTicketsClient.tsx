// RESPONSIBILITY: Renders the SupportTicketsClient component.
'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { superadmin_gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Eye, Clock, MessageSquare, AlertTriangle, X, CheckCircle, Loader, Send } from 'lucide-react';
import { SUPERADMIN_SUPPORT_MOCK_TICKETS } from '@/app/superadmin/superadmin_support-tickets/superadmin_support_constants/SuperadminSupportConstants';

ModuleRegistry.registerModules([AllCommunityModule]);



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
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-bg-elevated hover:text-text-primary transition-colors shrink-0" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="bg-bg-card rounded-xl border border-border shadow-sm p-4 mt-6">
          <p className="text-sm text-text-secondary leading-relaxed">{tkt.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {[['Tenant',tkt.tenant],['Priority',tkt.priority],['Age',`${tkt.age} ago`],['Replies',`${tkt.replies} replies`]].map(([label,val]) => (
            <div key={label} className="bg-bg-elevated p-3 rounded-lg border border-border">
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-text-primary">{val}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-[13px] font-medium text-text-secondary mb-2">Update Status</p>
          <div className="flex gap-2">
            {(['Open', 'In-Progress', 'Resolved'] as const).map(( s ) => (
              <button key={s} type="button" onClick={() => setStatus(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  status === s
                    ? s === 'Resolved'    ? 'bg-success-bg border-success text-success ring-1 ring-success'
                    : s === 'In-Progress' ? 'bg-info-bg border-info text-info ring-1 ring-info'
                    :                       'bg-danger-bg border-danger text-danger ring-1 ring-danger'
                    : 'border-border text-text-secondary bg-transparent hover:bg-bg-elevated'
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

export function SupportTicketsClient() {
  const [tickets, setTickets] = useState<Ticket[]>(SUPERADMIN_SUPPORT_MOCK_TICKETS);
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [toast, setToast]     = useState('');
  const gridRef = useRef<AgGridReact>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleSave = (updated: Ticket) => {
    setTickets(t => t.map(( x ) => x.id === updated.id ? updated : x));
    showToast(`${updated.id} updated to ${updated.status}`);
  };

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

  const colDefs = useMemo<any[]>(() => [
    {
      headerName: 'Subject / Ticket ID', field: 'subject', flex: 2, minWidth: 200,
      cellRenderer: (p: ICellRendererParams<typeof SUPERADMIN_SUPPORT_MOCK_TICKETS[0]>) => (
        <div className="flex flex-col justify-center h-full">
          <p className="font-medium text-text-primary leading-tight">{p.data?.subject}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-mono text-text-secondary">{p.data?.id}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 text-[11px] text-text-secondary">
              <MessageSquare size={10} /> {p.data?.replies} replies
            </span>
          </div>
        </div>
      ),
    },
    { headerName: 'Tenant', field: 'tenant', flex: 1.5, minWidth: 150,
      cellRenderer: (p: ICellRendererParams<typeof SUPERADMIN_SUPPORT_MOCK_TICKETS[0]>) => <span className="font-medium text-text-primary">{p.value}</span> },
    {
      headerName: 'Priority', field: 'priority', flex: 0.8, minWidth: 100,
      cellRenderer: (p: ICellRendererParams<typeof SUPERADMIN_SUPPORT_MOCK_TICKETS[0]>) => (
        <div className="flex items-center h-full">
          {p.data?.priority === 'High'   && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-1 bg-danger-bg text-danger"><AlertTriangle size={10} /> HIGH</span>}
          {p.data?.priority === 'Medium' && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-1 bg-warning-bg text-warning">MEDIUM</span>}
          {p.data?.priority === 'Low'    && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-1 bg-bg-elevated text-text-secondary border border-border">LOW</span>}
        </div>
      ),
    },
    {
      headerName: 'Status & Age', field: 'status', flex: 1, minWidth: 130,
      cellRenderer: (p: ICellRendererParams<typeof SUPERADMIN_SUPPORT_MOCK_TICKETS[0]>) => (
        <div className="flex flex-col justify-center h-full">
          <p className={`${
            p.data?.status === 'Resolved' ? 'text-[11px] font-semibold text-success' :
            p.data?.status === 'Open'     ? 'text-[11px] font-semibold text-danger' : 'text-[11px] font-semibold text-info'
          }`}>{p.data?.status}</p>
          <p className="flex items-center gap-1 text-[11px] text-text-secondary mt-0.5">
            <Clock size={10} /> {p.data?.age} ago
          </p>
        </div>
      ),
    }
  ], []);

  const onGridReady = useCallback((e: GridReadyEvent) => { e.api.sizeColumnsToFit(); }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen">
      {toast && <div className="fixed top-4 right-4 z-50 bg-bg-card border border-border shadow-lg rounded-lg px-4 py-3 text-sm font-medium text-text-primary flex items-center gap-2">{toast}</div>}
      {selected && <TicketPanel tkt={selected} onClose={() => setSelected(null)} onSave={handleSave} />}

      <div className="flex flex-col gap-1 mb-8">
        <div className="text-xs font-medium text-text-secondary flex items-center gap-2 mb-2 uppercase tracking-wider">
          <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span>Support Tickets</span>
        </div>
        <h1 className="text-[22px] font-bold text-text-primary">Support Escalations</h1>
      </div>

      <div className="bg-bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center p-4 border-b border-border bg-bg-card gap-2">
          {['All', 'Open', 'In-Progress', 'Resolved'].map(( f ) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-bg-elevated text-text-primary shadow-sm ring-1 ring-border' : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'}`}>{f}</button>
          ))}
          <span className="ml-auto text-xs text-text-secondary font-medium">{filtered.length} tickets</span>
        </div>
        <div className="w-full" style={{ height: 400 }}>
          <AgGridReact
            ref={gridRef}
            theme={superadmin_gridTheme}
            rowData={filtered}
            columnDefs={colDefs}
            rowHeight={60}
            headerHeight={44}
            onGridReady={onGridReady}
            onRowClicked={p => setSelected(p.data)}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
          />
        </div>
      </div>
    </div>
  );
}
