// RESPONSIBILITY: Modal dialog for creating budget allocations across new expense categories.
// DATA FLOW: User Input -> SuperadminExpenseCategoriesAddDialog -> onSave callback

import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import type { SuperadminExpenseCategory } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_types/SuperadminExpenseCategoriesTypes';
import { logger } from '@/lib/logger';

import type { SuperadminExpenseCategoriesAddDialogProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminExpenseCategoriesAddDialog({ availableColors, onClose, onSave }: Props) {
  const [form, setForm] = useState({ 
    name: '', 
    budget: '', 
    color: availableColors[0] || 'var(--primary)'
  });
  
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.budget) return;
    setSaving(true);
    try {
      await onSave({
        name: form.name,
        budget: parseFloat(form.budget),
        color: form.color
      });
      onClose();
    } catch (err) {
      logger.error('Failed to save expense category', err);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = form.name && form.budget;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-lg shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-border bg-page/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">âž• Add Category</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-danger hover:bg-danger-bg transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Category Name <span className="text-danger">*</span></label>
            <input 
              className="w-full bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
              placeholder="e.g. Office Supplies" 
              value={form.name} 
              onChange={e => setForm(p => ({...p, name: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Monthly Budget â‚¹ <span className="text-danger">*</span></label>
            <input 
              type="number" 
              className="w-full bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
              placeholder="0" 
              value={form.budget} 
              onChange={e => setForm(p => ({...p, budget: e.target.value}))} 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">Category Color</label>
            <div className="flex gap-3 flex-wrap">
              {availableColors.map(col => (
                <button 
                  key={col} 
                  onClick={() => setForm(p => ({...p, color: col}))} 
                  className={`w-8 h-8 rounded-full border-[3px] transition-all shadow-sm ${form.color === col ? 'border-white scale-110 shadow-md ring-2 ring-[var(--primary)]' : 'border-transparent hover:scale-105'}`} 
                  style={{ backgroundColor: col }} 
                  title={col}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-border bg-page/50 flex justify-end gap-3">
          <button 
            className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-bold rounded-md hover:bg-input transition-colors" 
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-bold rounded-md hover:bg-success-hover transition-colors disabled:opacity-50 shadow-sm" 
            onClick={handleSave}
            disabled={!isFormValid || saving}
          >
            {saving ? <><Loader size={14} className="animate-spin" /> Saving...</> : 'Save Category'}
          </button>
        </div>
      </div>
    </div>
  );
}


