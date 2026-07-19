'use client';
// RESPONSIBILITY: Side-drawer inspection panel for managing library subscription plans, renewals, and billing history.
// DATA FLOW: Props (sub, onUpdate, onRenew) -> SuperadminSubscriptionsPanel -> API callbacks

import React, { useState } from 'react';
import { X, Calendar, IndianRupee, CheckCircle, Edit2, Save, Loader, AlertCircle } from 'lucide-react';
import type { SuperadminSubscription, SuperadminSubscriptionsPanelProps } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';
import { SUPERADMIN_SUBSCRIPTIONS_PLANS } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_constants/SuperadminSubscriptionsConstants';
import { logger } from '@/lib/logger';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

export function SuperadminSubscriptionsPanel({ sub, onClose, onUpdate, onRenew }: SuperadminSubscriptionsPanelProps) {
  const [editing, setEditing] = useState(false);
  const [plan, setPlan] = useState(sub.plan);
  const [renewing, setRenewing] = useState(false);
  const [renewed, setRenewed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleRenew = async () => {
    setRenewing(true);
    try {
      await onRenew(sub.id);
      setRenewed(true);
      setTimeout(() => setRenewed(false), 2000);
    } catch (err) {
      logger.error('Failed to renew subscription', err);
    } finally {
      setRenewing(false);
    }
  };

  const handleSavePlan = async () => {
    setSaving(true);
    try {
      await onUpdate({ ...sub, plan });
      setSaved(true);
      setTimeout(() => { setSaved(false); setEditing(false); }, 1200);
    } catch (err) {
      logger.error('Failed to save plan changes', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-page/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-card shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-border overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">{sub.tenant}</h2>
              <p className="text-sm font-semibold text-text-secondary mt-1">{sub.plan}</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-input transition-colors" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-page rounded-md p-4 border border-border">
            {[['Billing Cycle',sub.cycle],['Start Date',sub.startDate],['Next Invoice',sub.nextInvoice],['Seats',`${sub.seats} seats`]].map(([label,val]) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-xs font-bold text-text-disabled uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-text-primary">{val}</p>
              </div>
            ))}
          </div>

          <div className="bg-input rounded-md p-5 border border-border flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2 text-text-secondary">
              <IndianRupee size={16} /> <span className="text-sm font-bold uppercase tracking-wider">Monthly Value</span>
            </div>
            <span className="text-text-primary text-xl font-extrabold text-primary tracking-tight">₹{sub.mrr.toLocaleString()}</span>
          </div>

          {editing ? (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Change Plan</label>
                <SuperadminSearchableDropdown
                  options={SUPERADMIN_SUBSCRIPTIONS_PLANS.map((p: string) => ({ label: p, value: p }))}
                  value={plan}
                  onChange={setPlan}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
                  onClick={handleSavePlan}
                  disabled={saving}
                >
                  {saving ? <><Loader size={16} className="animate-spin" /> Saving...</>
                    : saved ? <><CheckCircle size={16} /> Saved!</> 
                    : <><Save size={16} /> Save Plan</>}
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-input text-text-primary text-sm font-bold py-2.5 px-4 rounded-md transition-colors" 
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-2">
              {sub.status === 'Paid'     && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={14} /> Paid</span>}
              {sub.status === 'Due Soon' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-info-bg text-info"><Calendar size={14} /> Due Soon</span>}
              {sub.status === 'Overdue'  && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-danger-bg text-danger"><AlertCircle size={14} /> Overdue</span>}
            </div>
          )}

          {!editing && (
            <div className="flex gap-3 pt-4 border-t border-border">
              <button 
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
                onClick={handleRenew} 
                disabled={renewing || renewed || sub.status === 'Paid'}
              >
                {renewing ? <><Loader size={16} className="animate-spin" /> Renewing...</>
                  : renewed ? <><CheckCircle size={16} /> Renewed!</> 
                  : <><Calendar size={16} /> Renew Now</>}
              </button>
              <button 
                className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-input text-text-primary text-sm font-bold py-2.5 px-4 rounded-md transition-colors" 
                onClick={() => setEditing(true)}
              >
                <Edit2 size={16} /> Edit Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
