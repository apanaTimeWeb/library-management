import { useState, useEffect, useCallback } from 'react';
import type { SuperadminLibrary } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SUPERADMIN_LIBRARIES_MOCK_DATA } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';

export function useSuperadminLibraries() {
  const [libraries, setLibraries] = useState<SuperadminLibrary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLibraries = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate network request
      await new Promise(res => setTimeout(res, 800));
      setLibraries(SUPERADMIN_LIBRARIES_MOCK_DATA);
    } catch (err) {
      console.error(err);
      setError('Failed to load libraries');
    } finally {
      setLoading(false);
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
    loading,
    error,
    updateLibrary,
    toggleStatus,
  };
}
