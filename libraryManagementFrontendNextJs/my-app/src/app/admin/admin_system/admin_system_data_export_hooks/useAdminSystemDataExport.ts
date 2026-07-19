import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';
// RESPONSIBILITY: Renders the useAdminSystemDataExport.ts component/hook.
import { useState, useCallback, useMemo } from 'react';
import { ADMIN_SYSTEM_EXPORT_MODULES } from '@/app/admin/admin_system/admin_system_utils/AdminSystemMockData2';

export function useAdminSystemDataExport() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [format, setFormat] = useState<'CSV' | 'XLSX'>('XLSX');
  const [dateFrom, setDateFrom] = useUrlState('dateFrom', '2026-01-01' as string);
  const [dateTo, setDateTo] = useUrlState('dateTo', '2026-04-12' as string);
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<Set<string>>(new Set());

  const toggleModule = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => setSelected(new Set(ADMIN_SYSTEM_EXPORT_MODULES.map(m => m.id))), []);
  const clearAll = useCallback(() => setSelected(new Set()), []);

  const estimatedTotal = useMemo(() => 
    ADMIN_SYSTEM_EXPORT_MODULES.filter(m => selected.has(m.id)).reduce((sum, m) => sum + m.estimatedRows, 0),
    [selected]
  );

  const handleExport = useCallback((id?: string) => {
    const key = id ?? 'bulk';
    setExporting(key);
    setTimeout(() => {
      setExporting(null);
      setExported(prev => new Set([...prev, key]));
    }, 1800);
  }, []);

  return {
    selected, toggleModule, selectAll, clearAll,
    format, setFormat,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    exporting, exported, handleExport,
    estimatedTotal,
    modules: ADMIN_SYSTEM_EXPORT_MODULES
  };
}
