// RESPONSIBILITY: Modal dialog for recording new operating expenses and categorization.
// DATA FLOW: User Input -> SuperadminExpensesAddDialog -> onSave callback

import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import type { SuperadminExpense, SuperadminExpenseMode } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';
import { logger } from '@/lib/logger';

interface Props {
  categories: string[];
  onClose: () => void;
  onSave: (exp: Omit<SuperadminExpense, 'id'>) => Promise<void>;
}

export function SuperadminExpensesAddDialog({ categories, onClose, onSave }: Props) {
  const [form, setForm] = useState({ 
    date: '', 
    category: categories[0] || 'Miscellaneous', 
    description: '', 
    amount: '', 
    paidBy: '', 
    mode: 'cash' as SuperadminExpenseMode 
  });
  
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.date || !form.description || !form.amount || !form.paidBy) return;
    setSaving(true);
    try {
      await onSave({
        date: form.date,
        category: form.category,
        description: form.description,
        amount: parseFloat(form.amount),
        paidBy: form.paidBy,
        mode: form.mode
      });
      onClose();
    } catch (err) {
      logger.error('Failed to save expense entry', err);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = form.date && form.description && form.amount && form.paidBy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-bg-card rounded-[var(--radius-lg)] shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-border bg-bg-page/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">➕ Add Expense</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Date <span className="text-danger">*</span></label>
            <input type="date" className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Category</label>
            <select className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Description <span className="text-danger">*</span></label>
            <input className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Enter description" value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Amount ₹ <span className="text-danger">*</span></label>
            <input type="number" className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="0" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Paid By <span className="text-danger">*</span></label>
            <input className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Name" value={form.paidBy} onChange={e => setForm(p => ({...p, paidBy: e.target.value}))} />
          </div>
          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">Mode</label>
            <select className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={form.mode} onChange={e => setForm(p => ({...p, mode: e.target.value as SuperadminExpenseMode}))}>
              <option value="cash">Cash</option><option value="upi">UPI</option><option value="card">Card</option><option value="bank">Bank Transfer</option>
            </select>
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
            className="flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-bold rounded-[var(--radius-md)] hover:bg-success/90 transition-colors disabled:opacity-50 shadow-sm" 
            onClick={handleSave}
            disabled={!isFormValid || saving}
          >
            {saving ? <><Loader size={14} className="animate-spin" /> Saving...</> : 'Save Expense'}
          </button>
        </div>
      </div>
    </div>
  );
}
