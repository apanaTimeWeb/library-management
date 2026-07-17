// RESPONSIBILITY: Hook for fetching, mutating, and tracking active library branch states.
// DATA FLOW: API → superadmin_useSuperadminLibraries.ts → SuperadminLibrariesComponent

import { useState, useEffect, useCallback } from 'react';
import type { SuperadminLibrary, SuperadminLibrariesFetchState } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SUPERADMIN_LIBRARIES_MOCK_DATA } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';
import { logger } from '@/lib/logger';
export function superadmin_useSuperadminLibraries() {
  const [libraries, setLibraries] = useState<SuperadminLibrary[]>([]);
  const [fetchState, setFetchState] = useState<SuperadminLibrariesFetchState>('idle');

  const loadLibraries = useCallback(async () => {
    setFetchState('loading');
    try {
      // Simulate network request
      await new Promise(res => setTimeout(res, 800));
      setLibraries(SUPERADMIN_LIBRARIES_MOCK_DATA);
      setFetchState('success');
    } catch (err) {
      logger.error('Failed to load library branches', err);
      setFetchState('error');
    }
  }, []);

  useEffect(() => {
    loadLibraries();
  }, [loadLibraries]);

  const updateLibrary = async (id: string, updates: Partial<SuperadminLibrary>) => {
    // Simulate network request
    await new Promise(res => setTimeout(res, 1200));
    setLibraries((libs) => libs.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const toggleStatus = async (id: string) => {
    const lib = libraries.find((l) => l.id === id);
    if (!lib) throw new Error('Library not found');
    const newStatus = lib.status === 'Active' ? 'Maintenance' : 'Active';
    
    // Simulate network request
    await new Promise(res => setTimeout(res, 600));
    setLibraries((libs) => libs.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  return {
    libraries,
    fetchState,
    updateLibrary,
    toggleStatus,
  };
}
