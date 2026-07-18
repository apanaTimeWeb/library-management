'use client';
// RESPONSIBILITY: Renders the SuperadminAddClient component.
import React from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminAddClient, CATEGORIES } from '@/app/superadmin/superadmin_accounting/expenses/add/_components/useSuperadminAddClient';

export function SuperadminAddClient() {
  const { form, setForm, saving, handleSave, handleCancel } = useSuperadminAddClient();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Add Expense</h1>
        <p className="text-xs text-text-secondary">Record a new operational expense.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Date <span className="text-danger">*</span></label>
          <input type="date" className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={form.date} onChange={e => setForm(p=>({...p,date:e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Category</label>
          <SuperadminSearchableDropdown
            options={CATEGORIES.map(c => ({ label: c, value: c }))}
            value={form.category}
            onChange={val => setForm(p=>({...p,category:val}))}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Description <span className="text-danger">*</span></label>
          <input className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Enter description" value={form.description} onChange={e => setForm(p=>({...p,description:e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Amount ₹ <span className="text-danger">*</span></label>
          <input type="number" className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="0" value={form.amount} onChange={e => setForm(p=>({...p,amount:e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Paid By <span className="text-danger">*</span></label>
          <input className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" placeholder="Name" value={form.paidBy} onChange={e => setForm(p=>({...p,paidBy:e.target.value}))} />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Payment Mode</label>
          <SuperadminSearchableDropdown
            options={[
              { label: 'Cash', value: 'cash' },
              { label: 'UPI', value: 'upi' },
              { label: 'Card', value: 'card' },
              { label: 'Bank Transfer', value: 'bank' }
            ]}
            value={form.mode}
            onChange={val => setForm(p=>({...p,mode:val}))}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-text-secondary block mb-1">Notes</label>
          <textarea className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" rows={2} placeholder="Optional notes..." value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))} />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-bold rounded-md hover:bg-input transition-colors duration-200 cursor-pointer" onClick={handleCancel}>Cancel</button>
        <button className="px-4 py-2 bg-success text-success-foreground text-sm font-bold rounded-md hover:brightness-95 transition-all duration-200 disabled:opacity-50 cursor-pointer" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Expense'}</button>
      </div>
    </div>
  );
}
