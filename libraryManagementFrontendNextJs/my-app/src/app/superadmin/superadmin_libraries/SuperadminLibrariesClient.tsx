'use client';
import React, { useState } from 'react';
import { useSuperadminLibraries } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_hooks/useSuperadminLibraries';
import { SuperadminLibrariesHeader } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesHeader';
import { SuperadminLibrariesGrid } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesGrid';
import { SuperadminLibrariesPanel } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesPanel';
import type { SuperadminLibrary, SuperadminLibraryPanelMode } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SUPERADMIN_LIBRARIES_TOASTS } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';

export function SuperadminLibrariesClient() {
  const { libraries, loading, updateLibrary, toggleStatus } = useSuperadminLibraries();
  const [selected, setSelected] = useState<SuperadminLibrary | null>(null);
  const [panelMode, setPanelMode] = useState<SuperadminLibraryPanelMode>('view');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleSave = async (updated: SuperadminLibrary) => {
    try {
      await updateLibrary(updated.id, updated);
      setSelected(updated);
      showToast(SUPERADMIN_LIBRARIES_TOASTS.UPDATE_SUCCESS(updated.name));
    } catch (err) {
      showToast(SUPERADMIN_LIBRARIES_TOASTS.UPDATE_ERROR);
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await toggleStatus(id);
      showToast(SUPERADMIN_LIBRARIES_TOASTS.STATUS_SUCCESS);
    } catch (err) {
      showToast(SUPERADMIN_LIBRARIES_TOASTS.STATUS_ERROR);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <SuperadminLibrariesHeader />
        <div className="animate-pulse space-y-4 mt-8">
          <div className="h-16 bg-[var(--bg-card)] rounded-[var(--radius-lg)] border border-[var(--border)]" />
          <div className="h-64 bg-[var(--bg-card)] rounded-[var(--radius-lg)] border border-[var(--border)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-[var(--bg-card)] border border-[var(--border)] shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-[var(--text-primary)]">{toast}</span>
        </div>
      )}

      {/* Side Panel Overlay */}
      {selected && (
        <SuperadminLibrariesPanel 
          lib={selected} 
          mode={panelMode} 
          onClose={() => setSelected(null)} 
          onSave={handleSave} 
          onSuspend={handleSuspend} 
        />
      )}

      <div className="p-2 sm:p-4">
        <SuperadminLibrariesHeader />
        <SuperadminLibrariesGrid 
          libraries={libraries} 
          onRowClick={(lib, mode) => { setSelected(lib); setPanelMode(mode); }}
          onSuspend={handleSuspend}
        />
      </div>
    </div>
  );
}
