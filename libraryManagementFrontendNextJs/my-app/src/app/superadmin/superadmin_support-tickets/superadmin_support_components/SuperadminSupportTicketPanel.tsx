'use client';
// RESPONSIBILITY: Renders the side panel for viewing and editing a support ticket.
import { useState } from 'react';
import { X, CheckCircle, Loader, Send } from 'lucide-react';
import { Ticket } from '../superadmin_support_types/SuperadminSupportTicketsClient_types';
import { SUPERADMIN_SUPPORT_TICKET_STATUSES } from '../superadmin_support_constants/SuperadminSupportConstants';

export function SuperadminSupportTicketPanel({ tkt, onClose, onSave }: { tkt: Ticket; onClose: () => void; onSave: (t: Ticket) => void }) {
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
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary bg-transparent hover:bg-page hover:text-text-primary transition-colors shrink-0" onClick={onClose}><X size={16} /></button>
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
            {SUPERADMIN_SUPPORT_TICKET_STATUSES.map(( s ) => (
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
