'use client';
// RESPONSIBILITY: Side-drawer inspection panel for viewing and modifying library branch details, plans, and suspension state.
// DATA FLOW: Props (lib, onSave, onSuspend) -> SuperadminLibrariesPanel -> API callbacks

import React, { useState } from 'react';
import { MapPin, Edit2, X, Users, CheckCircle, AlertTriangle, Save, Loader, ShieldAlert } from 'lucide-react';
import type { SuperadminLibrary, SuperadminLibraryPanelMode, SuperadminLibrariesPanelProps as Props } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { logger } from '@/lib/logger';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

export function SuperadminLibrariesPanel({ lib, mode, onClose, onSave, onSuspend }: Props) {
  const [editing, setEditing] = useState(mode === 'edit');
  const [form, setForm] = useState({ name: lib.name, owner: lib.owner, phone: lib.phone, location: lib.location, plan: lib.plan });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const pct = Math.round((lib.occupied / lib.seats) * 100);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...lib, ...form });
      setSaved(true);
      setTimeout(() => { setSaved(false); setEditing(false); }, 1200);
    } catch (err) {
      logger.error('Failed to save library details', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-bg-page/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-bg-card shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-border overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">{lib.name}</h2>
              <p className="text-sm text-text-secondary flex items-center gap-1.5 mt-1.5"><MapPin size={14} />{lib.location}</p>
            </div>
            <div className="flex items-center gap-2">
              {!editing && (
                <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer" onClick={() => setEditing(true)}>
                  <Edit2 size={16} />
                </button>
              )}
              <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:text-text-primary hover:bg-bg-input transition-colors cursor-pointer" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4">
              {([['Library Name','name'],['Owner','owner'],['Phone','phone'],['Location','location']] as const).map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">{label}</label>
                  <input 
                    className="w-full bg-bg-input border border-border rounded-[var(--radius-md)] py-2 px-3 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                    value={(form as Record<string, string>)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} 
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Plan</label>
                <SuperadminSearchableDropdown
                  options={['Basic', 'Pro', 'Enterprise'].map((p: string) => ({ label: p, value: p }))}
                  value={form.plan}
                  onChange={val => setForm(f => ({ ...f, plan: val }))}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 bg-bg-page rounded-[var(--radius-md)] p-4 border border-border">
              {([['Owner',lib.owner],['Phone',lib.phone],['Plan',lib.plan],['Joined',lib.joined]] as const).map(([label,val]) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="text-[11px] font-semibold text-text-disabled uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-medium text-text-primary">{val}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-bg-page rounded-[var(--radius-md)] p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-text-primary flex items-center gap-2"><Users size={16} className="text-primary" /> Seat Occupancy</p>
              <span className={`text-sm font-bold ${pct > 90 ? 'text-danger' : 'text-success'}`}>{pct}%</span>
            </div>
            <div className="h-2 w-full bg-bg-input rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${pct > 90 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs font-medium text-text-secondary mt-2">{lib.occupied} occupied / {lib.seats} total seats</p>
          </div>

          <div>
            {lib.status === 'Active'
              ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={14} /> Active</span>
              : <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-warning-bg text-warning"><AlertTriangle size={14} /> Maintenance</span>}
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            {editing ? (
              <>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                  onClick={handleSave} 
                  disabled={saving}
                >
                  {saving ? <><Loader size={16} className="animate-spin" /> Saving...</>
                    : saved ? <><CheckCircle size={16} /> Saved!</>
                    : <><Save size={16} /> Save Changes</>}
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-bg-input text-text-primary text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-all cursor-pointer" 
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-all cursor-pointer" 
                  onClick={() => setEditing(true)}
                >
                  <Edit2 size={16} /> Edit Library
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-danger-bg text-danger hover:bg-danger hover:text-white text-sm font-bold py-2.5 px-4 rounded-[var(--radius-md)] transition-colors cursor-pointer" 
                  onClick={() => { onSuspend(lib.id); onClose(); }}
                >
                  <ShieldAlert size={16} /> {lib.status === 'Active' ? 'Suspend' : 'Reactivate'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
