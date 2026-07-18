import { ManagerSeatsSeatMatrixClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsSeatMatrixClient';
import { ManagerSeatsErrorBoundary } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsErrorBoundary';

// RESPONSIBILITY: Strict Server Component for Seat Matrix.

export default function SeatMatrixPage() {
  return (
    <ManagerSeatsErrorBoundary>
      <ManagerSeatsSeatMatrixClient />
    </ManagerSeatsErrorBoundary>
  );
}

