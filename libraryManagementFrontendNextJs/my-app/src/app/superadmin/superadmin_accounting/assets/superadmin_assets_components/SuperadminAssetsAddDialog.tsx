import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';

interface Props {
  categories: string[];
  onClose: () => void;
  onSave: (asset: Omit<SuperadminAsset, 'id' | 'status' | 'currentValue'>) => Promise<void>;
}

export function SuperadminAssetsAddDialog({ categories, onClose, onSave }: Props) {
  const [form, setForm] = useState({ 
    name: '', 
    category: categories[0] || 'Furniture', 
    purchaseDate: '', 
    purchaseValue: '', 
    location: '' 
  });
  
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.purchaseDate || !form.purchaseValue || !form.location) return;
    setSaving(true);
    try {
      await onSave({
        name: form.name,
        category: form.category,
        purchaseDate: form.purchaseDate,
        purchaseValue: parseFloat(form.purchaseValue),
        location: form.location
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = form.name && form.purchaseDate && form.purchaseValue && form.location;
  const allCategories = Array.from(new Set([...categories, 'Other']));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-bg-card rounded-[var(--radius-lg)] shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-border bg-bg-page/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">➕ Add Asset</h2>
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
              value={form.name} 
              onChange={e => setForm(p => ({...p, name: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Category</label>
            <select 
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              value={form.category} 
              onChange={e => setForm(p => ({...p, category: e.target.value}))}
            >
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Purchase Date <span className="text-danger">*</span></label>
            <input 
              type="date"
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              value={form.purchaseDate} 
              onChange={e => setForm(p => ({...p, purchaseDate: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Purchase Value ₹ <span className="text-danger">*</span></label>
            <input 
              type="number"
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="0" 
              value={form.purchaseValue} 
              onChange={e => setForm(p => ({...p, purchaseValue: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Location <span className="text-danger">*</span></label>
            <input 
              className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
              placeholder="e.g. Ground Floor" 
              value={form.location} 
              onChange={e => setForm(p => ({...p, location: e.target.value}))} 
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
            {saving ? <><Loader size={14} className="animate-spin" /> Saving...</> : 'Save Asset'}
          </button>
        </div>
      </div>
    </div>
  );
}
