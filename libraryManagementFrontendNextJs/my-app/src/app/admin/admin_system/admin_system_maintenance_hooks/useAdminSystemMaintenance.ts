// RESPONSIBILITY: Renders the useAdminSystemMaintenance.ts component/hook.
import { useMemo } from 'react';
import { ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS, ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS, ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';

export function useAdminSystemMaintenance() {
  const seatsNeedingAttention = useMemo(() => ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.filter(s => s.status === 'Needs Attention').length, []);
  const assetsOverdue = useMemo(() => ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.filter(a => a.daysOverdue > 0).length, []);
  const lockerIssues = useMemo(() => ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.filter(l => l.status === 'Issue Reported').length, []);

  return {
    seatsNeedingAttention,
    assetsOverdue,
    lockerIssues,
    seats: ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS,
    assets: ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS,
    lockers: ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS
  };
}
