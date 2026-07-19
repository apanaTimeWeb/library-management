// RESPONSIBILITY: Renders or handles logic for useSuperadminAssetMaintenance.ts.
import { useState, useMemo } from 'react';
import type { SuperadminMaintenanceLog } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_types/SuperadminAssetMaintenanceTypes';
import { SUPERADMIN_ASSET_MAINTENANCE_MOCK_DATA, SUPERADMIN_ASSET_MAINTENANCE_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_constants/SuperadminAssetMaintenanceConstants';

// DATA FLOW: API â†’ useSuperadminAssetMaintenance.ts â†’ SuperadminAssetMaintenanceComponent
export function useSuperadminAssetMaintenance() {
  const [logs, setLogs] = useState<SuperadminMaintenanceLog[]>(SUPERADMIN_ASSET_MAINTENANCE_MOCK_DATA);
  const [statusFilter, setStatusFilter] = useState('all');

  const visibleLogs = useMemo(() => {
    return statusFilter === 'all' ? logs : logs.filter(l => l.status === statusFilter);
  }, [logs, statusFilter]);

  const { pendingCount, inProgressCount, completedCount, totalCost } = useMemo(() => {
    return {
      pendingCount: logs.filter(l => l.status === 'pending').length,
      inProgressCount: logs.filter(l => l.status === 'in-progress').length,
      completedCount: logs.filter(l => l.status === 'completed').length,
      totalCost: logs.filter(l => l.status === 'completed').reduce((s, l) => s + l.cost, 0)
    };
  }, [logs]);

  const handleCompleteLog = async (id: number) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setLogs(prev => prev.map(l => l.id === id ? { ...l, status: 'completed' } : l));
  };

  const handleAddLog = async (newLog: Omit<SuperadminMaintenanceLog, 'id' | 'status'>) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    const log: SuperadminMaintenanceLog = {
      ...newLog,
      id: Date.now(),
      status: 'pending'
    };
    setLogs(prev => [log, ...prev]);
  };

  return {
    logs,
    visibleLogs,
    statusFilter,
    setStatusFilter,
    pendingCount,
    inProgressCount,
    completedCount,
    totalCost,
    handleCompleteLog,
    handleAddLog,
    statusStyles: SUPERADMIN_ASSET_MAINTENANCE_STATUS_STYLES
  };
}

