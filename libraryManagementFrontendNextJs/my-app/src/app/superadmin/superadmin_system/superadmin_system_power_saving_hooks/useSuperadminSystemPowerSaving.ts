// RESPONSIBILITY: Renders or handles logic for useSuperadminSystemPowerSaving.ts.
import { useState, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_POWER_ZONES, SUPERADMIN_SYSTEM_MOCK_POWER_ALERTS } from '@/app/superadmin/superadmin_system/superadmin_system_utils/SuperadminSystemMockData';
import { SuperadminSystemPowerZone, SuperadminSystemPowerAlert } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemPowerSavingTypes';

export function useSuperadminSystemPowerSaving() {
  const [threshold, setThreshold] = useState(30);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const zones = SUPERADMIN_SYSTEM_MOCK_POWER_ZONES as SuperadminSystemPowerZone[];
  const alerts = SUPERADMIN_SYSTEM_MOCK_POWER_ALERTS as SuperadminSystemPowerAlert[];

  const getZoneStatus = useCallback((occ: number) => {
    if (occ < threshold) return { variant: 'warning' as const, isLow: true };
    return { variant: 'success' as const, isLow: false };
  }, [threshold]);

  return {
    threshold,
    setThreshold,
    alertsEnabled,
    setAlertsEnabled,
    zones,
    alerts,
    getZoneStatus
  };
}

