// RESPONSIBILITY: Renders the useAdminSystemPowerSaving.ts component/hook.
import { useState, useCallback } from 'react';
import { ADMIN_SYSTEM_MOCK_POWER_ZONES, ADMIN_SYSTEM_MOCK_POWER_ALERTS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';

export function useAdminSystemPowerSaving() {
  const [threshold, setThreshold] = useState(30);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const getZoneStatus = useCallback((occ: number) => {
    if (occ < threshold) return { label: '⚡ Low — Consolidation Suggested', variant: 'warning' as const };
    return { label: '✅ Normal', variant: 'success' as const };
  }, [threshold]);

  return {
    threshold, setThreshold,
    alertsEnabled, setAlertsEnabled,
    getZoneStatus,
    zones: ADMIN_SYSTEM_MOCK_POWER_ZONES,
    alerts: ADMIN_SYSTEM_MOCK_POWER_ALERTS
  };
}
