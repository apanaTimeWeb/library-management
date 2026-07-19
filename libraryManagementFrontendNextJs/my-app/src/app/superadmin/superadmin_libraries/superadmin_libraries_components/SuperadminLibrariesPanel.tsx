'use client';
// RESPONSIBILITY: Side-drawer inspection panel for viewing and modifying library branch details, plans, and suspension state.
// DATA FLOW: Props (lib, onSave, onSuspend) -> SuperadminLibrariesPanel -> API callbacks

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Edit2, X, Users, CheckCircle, AlertTriangle, Save, Loader, ShieldAlert } from 'lucide-react';
import type { SuperadminLibrary, SuperadminLibrariesPanelProps as Props } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { superadminLibrarySchema } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SUPERADMIN_LIBRARIES_PLANS } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';
import { logger } from '@/lib/logger';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { maskSuperadminLibraryPhone } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_utils/SuperadminLibrariesUtils';

export function SuperadminLibrariesPanel({ lib, mode, onClose, onSave, onSuspend }: Props) {
  const [editing, setEditing] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const pct = Math.round((lib.occupied / lib.seats) * 100);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SuperadminLibrary>({
    resolver: zodResolver(superadminLibrarySchema),
    defaultValues: lib,
  });

  const onSubmit = async (data: SuperadminLibrary) => {
    setSaving(true);
    try {
      await onSave({ ...lib, ...data });
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
      <div className="absolute inset-0 bg-page/80 backdrop-blur-sm transition-opacity" />
      <div 
        className="relative w-full max-w-md bg-card shadow-2xl border-l border-border overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-6 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">{lib.name}</h2>
              <p className="text-sm text-text-secondary flex items-center gap-1.5 mt-1.5"><MapPin size={14} />{lib.location}</p>
            </div>
            <div className="flex items-center gap-2">
              {!editing && (
                <button className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer" onClick={() => setEditing(true)}>
                  <Edit2 size={16} />
                </button>
              )}
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-input transition-colors cursor-pointer" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
          </div>

          {editing ? (
            <form id="library-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Library Name</label>
                <input 
                  className={`w-full bg-input border ${errors.name ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded-md py-2 px-3 text-sm text-text-primary focus:outline-none transition-colors`}
                  {...register('name')}
                />
                {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Owner</label>
                <input 
                  className={`w-full bg-input border ${errors.owner ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded-md py-2 px-3 text-sm text-text-primary focus:outline-none transition-colors`}
                  {...register('owner')}
                />
                {errors.owner && <p className="text-danger text-xs mt-1">{errors.owner.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Phone</label>
                <input 
                  className={`w-full bg-input border ${errors.phone ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded-md py-2 px-3 text-sm text-text-primary focus:outline-none transition-colors`}
                  {...register('phone')}
                />
                {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Location</label>
                <input 
                  className={`w-full bg-input border ${errors.location ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded-md py-2 px-3 text-sm text-text-primary focus:outline-none transition-colors`}
                  {...register('location')}
                />
                {errors.location && <p className="text-danger text-xs mt-1">{errors.location.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Plan</label>
                <Controller
                  name="plan"
                  control={control}
                  render={({ field }) => (
                    <SuperadminSearchableDropdown
                      options={SUPERADMIN_LIBRARIES_PLANS.map((p: string) => ({ label: p, value: p }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.plan && <p className="text-danger text-xs mt-1">{errors.plan.message}</p>}
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4 bg-page rounded-md p-4 border border-border">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">Owner</p>
                <p className="text-sm font-medium text-text-primary">{lib.owner}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-text-primary">{maskSuperadminLibraryPhone(lib.phone)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">Plan</p>
                <p className="text-sm font-medium text-text-primary">{lib.plan}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider">Joined</p>
                <p className="text-sm font-medium text-text-primary">{lib.joined}</p>
              </div>
            </div>
          )}

          <div className="bg-page rounded-md p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-text-primary flex items-center gap-2"><Users size={16} className="text-primary" /> Seat Occupancy</p>
              <span className={`text-sm font-bold ${pct > 90 ? 'text-danger' : 'text-success'}`}>{pct}%</span>
            </div>
            <div className="h-2 w-full bg-input rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${pct > 90 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs font-medium text-text-secondary mt-2">{lib.occupied} occupied / {lib.seats} total seats</p>
          </div>

          <div>
            {lib.status === 'Active'
              ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={14} /> Active</span>
              : <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-warning-bg text-warning"><AlertTriangle size={14} /> Maintenance</span>}
          </div>

        </div>
        
        <div className="p-6 border-t border-border bg-card mt-auto flex gap-3">
          {editing ? (
            <>
              <button 
                type="submit"
                form="library-form"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                disabled={saving}
              >
                {saving ? <><Loader size={16} className="animate-spin" /> Saving...</>
                  : saved ? <><CheckCircle size={16} /> Saved!</>
                  : <><Save size={16} /> Save Changes</>}
              </button>
              <button 
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-input text-text-primary text-sm font-bold py-2.5 px-4 rounded-md transition-all cursor-pointer" 
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-4 rounded-md transition-all cursor-pointer" 
                onClick={() => setEditing(true)}
              >
                <Edit2 size={16} /> Edit Library
              </button>
              <button 
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-danger-bg text-danger hover:bg-danger hover:text-white text-sm font-bold py-2.5 px-4 rounded-md transition-colors cursor-pointer" 
                onClick={() => { onSuspend(lib.id); onClose(); }}
              >
                <ShieldAlert size={16} /> {lib.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
