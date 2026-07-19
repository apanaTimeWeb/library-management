'use client';
// RESPONSIBILITY: Renders the SuperadminLibrariesClient component.
import React, { useState, useEffect } from 'react';
import { SuperadminLibrariesHeader } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesHeader';
import { SuperadminLibrariesGrid } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesGrid';
import { SuperadminLibrariesPanel } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesPanel';
import type { SuperadminLibrary, SuperadminLibraryPanelMode, SuperadminLibrariesFetchState } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SUPERADMIN_LIBRARIES_TOASTS, SUPERADMIN_LIBRARIES_MOCK_DATA } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';
import { CheckCircle } from 'lucide-react';
import { logger } from '@/lib/logger';

export function SuperadminLibrariesClient() {
  const [libraries, setLibraries] = useState<SuperadminLibrary[]>([]);
  const [fetchState, setFetchState] = useState<SuperadminLibrariesFetchState>('idle');

  useEffect(() => {
    let mounted = true;
    const loadLibraries = async () => {
      setFetchState('loading');
      try {
        await new Promise(res => setTimeout(res, 800));
        if (mounted) {
          setLibraries(SUPERADMIN_LIBRARIES_MOCK_DATA);
          setFetchState('success');
        }
      } catch (err) {
        logger.error('Failed to load library branches', err);
        if (mounted) setFetchState('error');
      }
    };
    loadLibraries();
    return () => { mounted = false; };
  }, []);

  const updateLibrary = async (id: string, updates: Partial<SuperadminLibrary>) => {
    await new Promise(res => setTimeout(res, 1200));
    setLibraries((libs) => libs.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const toggleStatus = async (id: string) => {
    const lib = libraries.find((l) => l.id === id);
    if (!lib) throw new Error('Library not found');
    const newStatus = lib.status === 'Active' ? 'Maintenance' : 'Active';
    await new Promise(res => setTimeout(res, 600));
    setLibraries((libs) => libs.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

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

  if (fetchState === 'loading') {
    return (
      <div className="p-8">
        <SuperadminLibrariesHeader />
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-card rounded-lg border border-border" />
          <div className="h-64 bg-card rounded-lg border border-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in fade-in duration-300">
          <div className="w-8 h-8 rounded-full bg-success-bg flex items-center justify-center text-success"><CheckCircle size={16} /></div>
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
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
