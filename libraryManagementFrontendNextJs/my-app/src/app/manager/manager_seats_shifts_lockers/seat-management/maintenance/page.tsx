// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsSeatMaintenanceClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsSeatMaintenanceClient';

import { Suspense } from 'react';

export default function SeatMaintenancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading maintenance data...</div>}>
      <ManagerSeatsSeatMaintenanceClient />
    </Suspense>
  );
}
