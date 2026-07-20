import { ManagerSeatsSeatMatrixClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsSeatMatrixClient';
import { ManagerSeatsErrorBoundary } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsErrorBoundary';

// RESPONSIBILITY: Strict Server Component for Seat Matrix.

import { Suspense } from 'react';

export default function SeatMatrixPage() {
  return (
    <ManagerSeatsErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
        <ManagerSeatsSeatMatrixClient />
      </Suspense>
    </ManagerSeatsErrorBoundary>
  );
}

