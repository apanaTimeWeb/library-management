import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminMaintenanceClient } from '@/app/admin/admin_seats_shifts_lockers/seat-management/maintenance/admin_maintenance_components/AdminMaintenanceClient';

export default function SeatMaintenancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminMaintenanceClient />
    </Suspense>
  );
}
