'use client';
import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, AlertCircle, Send, Loader } from 'lucide-react';
import type { SuperadminBillingInvoice } from '../superadmin_billing_types/SuperadminBillingTypes';

interface Props {
  inv: SuperadminBillingInvoice;
  onClose: () => void;
  onMarkPaid: (id: string) => Promise<void>;
}

export function SuperadminBillingPanel({ inv, onClose, onMarkPaid }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded]   = useState(false);
  const [reminding, setReminding]     = useState(false);
  const [reminded, setReminded]       = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);
  const [markedPaid, setMarkedPaid]   = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => { 
      setDownloading(false); 
      setDownloaded(true); 
      setTimeout(() => setDownloaded(false), 2000); 
    }, 1500);
  };

  const handleReminder = () => { 
    setReminding(true);
    setTimeout(() => {
      setReminding(false);
      setReminded(true); 
      setTimeout(() => setReminded(false), 2000);
    }, 1000);
  };

  const handleMarkPaid = async () => {
    setMarkingPaid(true);
    try {
      await onMarkPaid(inv.id);
      setMarkedPaid(true);
      setTimeout(() => { setMarkedPaid(false); onClose(); }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingPaid(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-[var(--bg-page)]/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-[var(--bg-card)] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-[var(--border)] overflow-y-auto animate-in slide-in-from-right duration-300" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <FileText size={16} className="text-[var(--primary)]" />
                <span className="text-[13px] font-bold text-[var(--text-secondary)] tracking-wide">{inv.id}</span>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{inv.tenant}</h2>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="bg-[var(--bg-page)] rounded-[var(--radius-lg)] p-6 border border-[var(--border)] text-center shadow-inner">
            <p className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider mb-2">Invoice Amount</p>
            <p className="text-4xl font-extrabold text-[var(--primary)] tracking-tight mb-3">₹{inv.amount.toLocaleString()}</p>
            <div className="flex justify-center">
              {inv.status === 'Paid'
                ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)]"><CheckCircle size={14} /> Paid</span>
                : <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)]"><AlertCircle size={14} /> Overdue</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[['Date',inv.date],['Method',inv.method],['GST Number',inv.gst],['Status',inv.status]].map(([label,val]) => (
              <div key={label} className="bg-[var(--bg-input)] p-3 rounded-[var(--radius-md)] border border-[var(--border)] flex flex-col gap-1">
                <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">{label}</p>
                <p className="text-[13px] font-bold text-[var(--text-primary)] truncate">{val}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2 flex-wrap border-t border-[var(--border)] mt-4 pt-6">
            <button 
              className={`flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(99,102,241,0.2)] ${downloaded ? 'bg-[var(--success)] hover:bg-[var(--success-hover)]' : 'bg-[var(--primary)] hover:bg-[var(--primary-hover)]'}`} 
              onClick={handleDownload} 
              disabled={downloading || downloaded}
            >
              {downloaded ? <><CheckCircle size={16} /> Downloaded!</>
                : downloading ? <><Loader size={16} className="animate-spin" /> Generating...</>
                : <><Download size={16} /> Download PDF</>}
            </button>
            
            {inv.status === 'Overdue' && (
              <button 
                className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-colors disabled:opacity-70" 
                onClick={handleReminder}
                disabled={reminding || reminded}
              >
                {reminding ? <><Loader size={16} className="animate-spin" /> Sending...</>
                  : reminded ? <><CheckCircle size={16} /> Sent!</> 
                  : <><Send size={16} /> Send Reminder</>}
              </button>
            )}
          </div>

          {inv.status === 'Overdue' && (
            <button 
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-[var(--success)] text-[var(--success)] hover:bg-[var(--success-bg,rgba(52,211,153,0.1))] text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-colors disabled:opacity-70 mt-2" 
              onClick={handleMarkPaid}
              disabled={markingPaid || markedPaid}
            >
              {markingPaid ? <><Loader size={16} className="animate-spin" /> Updating...</>
                : markedPaid ? <><CheckCircle size={16} /> Marked Paid!</> 
                : <><CheckCircle size={16} /> Mark as Paid</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
