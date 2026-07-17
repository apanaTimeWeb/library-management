// DATA FLOW: State hooks -> SuperadminSystemDataExportClient
import { useState, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_EXPORT_MODULES } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';

/**
 * Custom hook to manage the state and logic for the Data Export page.
 */
export function useSuperadminSystemDataExport() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [format, setFormat] = useState<'CSV' | 'XLSX'>('XLSX');
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-04-12');
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<Set<string>>(new Set());

  const toggleModule = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(SUPERADMIN_SYSTEM_MOCK_EXPORT_MODULES.map((m) => m.id)));
  }, []);

  const clearAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  const handleExport = useCallback((id?: string) => {
    const key = id ?? 'bulk';
    setExporting(key);
    setTimeout(() => {
      setExporting(null);
      setExported(prev => new Set([...prev, key]));
    }, 1800);
  }, []);

  const estimatedTotal = SUPERADMIN_SYSTEM_MOCK_EXPORT_MODULES
    .filter(m => selected.has(m.id))
    .reduce((sum, m) => sum + m.estimatedRows, 0);

  return {
    selected,
    format,
    setFormat,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    exporting,
    exported,
    toggleModule,
    selectAll,
    clearAll,
    handleExport,
    estimatedTotal,
    exportModules: SUPERADMIN_SYSTEM_MOCK_EXPORT_MODULES
  };
}
