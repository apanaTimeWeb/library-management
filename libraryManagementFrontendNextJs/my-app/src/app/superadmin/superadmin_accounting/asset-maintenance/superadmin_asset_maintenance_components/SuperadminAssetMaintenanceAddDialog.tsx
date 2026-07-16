import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';

interface Props {
  onClose: () => void;
  onSave: (log: Omit<SuperadminMaintenanceLog, 'id' | 'status'>) => Promise<void>;
}

export function SuperadminAssetMaintenanceAddDialog({ onClose, onSave }: Props) {
  const [form, setForm] = useState({ 
    assetName: '', 
    issue: '', 
    reportedDate: '', 
    scheduledDate: '', 
    vendor: '', 
    cost: '' 
  });
  
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.assetName || !form.issue || !form.reportedDate || !form.scheduledDate) return;
    setSaving(true);
    try {
      await onSave({
        assetName: form.assetName,
        issue: form.issue,
        reportedDate: form.reportedDate,
        scheduledDate: form.scheduledDate,
        vendor: form.vendor || '—',
        cost: parseFloat(form.cost) || 0
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = form.assetName && form.issue && form.reportedDate && form.scheduledDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-bg-card rounded-[var(--radius-lg)] shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-border bg-bg-page/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">🔧 Log Maintenance Request</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-danger hover:bg-[var(--danger-bg,rgba(248,113,113,0.1))] transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Asset Name <span className="text-danger">*</span></label>
            <input 
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="e.g. AC Unit" 
              value={form.assetName} 
              onChange={e => setForm(p => ({...p, assetName: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Issue <span className="text-danger">*</span></label>
            <input 
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="Describe the issue" 
              value={form.issue} 
              onChange={e => setForm(p => ({...p, issue: e.target.value}))} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Reported Date <span className="text-danger">*</span></label>
              <input 
                type="date"
                className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
                value={form.reportedDate} 
                onChange={e => setForm(p => ({...p, reportedDate: e.target.value}))} 
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Scheduled Date <span className="text-danger">*</span></label>
              <input 
                type="date"
                className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
                value={form.scheduledDate} 
                onChange={e => setForm(p => ({...p, scheduledDate: e.target.value}))} 
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Vendor</label>
            <input 
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="Vendor name" 
              value={form.vendor} 
              onChange={e => setForm(p => ({...p, vendor: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Estimated Cost ₹</label>
            <input 
              type="number"
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="0" 
              value={form.cost} 
              onChange={e => setForm(p => ({...p, cost: e.target.value}))} 
            />
          </div>
        </div>

        <div className="p-5 border-t border-border bg-bg-page/50 flex justify-end gap-3">
          <button 
            className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-bold rounded-[var(--radius-md)] hover:bg-bg-input transition-colors" 
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-bold rounded-[var(--radius-md)] hover:bg-[var(--success-hover,rgba(16,185,129,0.9))] transition-colors disabled:opacity-50 shadow-sm" 
            onClick={handleSave}
            disabled={!isFormValid || saving}
          >
            {saving ? <><Loader size={14} className="animate-spin" /> Saving...</> : 'Save Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
