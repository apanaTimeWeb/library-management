import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsShiftManagementClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsShiftManagementClient';

export default function ShiftManagementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerSeatsShiftManagementClient />
    </Suspense>
  );
}


