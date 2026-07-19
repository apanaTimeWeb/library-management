// RESPONSIBILITY: Renders or handles logic for useSuperadminSystemMaintenance.ts.
// DATA FLOW: SuperadminSystemMockData -> useSuperadminSystemMaintenance -> SuperadminSystemMaintenanceClient
import { useMemo } from 'react';
import {
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS,
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS,
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS
} from '@/app/superadmin/superadmin_system/superadmin_system_utils/SuperadminSystemMockData';
import {
  SuperadminSystemMaintenanceSeat,
  SuperadminSystemMaintenanceAsset,
  SuperadminSystemMaintenanceLocker
} from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemMaintenanceTypes';

/**
 * Custom hook to manage the state and data for the Maintenance Dashboard.
 * @returns Maintenance dashboard metrics and lists.
 */
export function useSuperadminSystemMaintenance() {
  const seatsNeedingAttention = useMemo(() => 
    SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.filter(s => s.status === 'Needs Attention').length
  , []);
  
  const assetsOverdue = useMemo(() => 
    SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.filter(a => a.daysOverdue > 0).length
  , []);
  
  const lockerIssues = useMemo(() => 
    SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.filter(l => l.status === 'Issue Reported').length
  , []);

  return {
    seatsNeedingAttention,
    assetsOverdue,
    lockerIssues,
    seats: SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS as SuperadminSystemMaintenanceSeat[],
    assets: SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS as SuperadminSystemMaintenanceAsset[],
    lockers: SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS as SuperadminSystemMaintenanceLocker[]
  };
}

