// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers seat-matrix module.
// DATA FLOW: Next.js Router -> Page -> Components

import { SeatMatrixClient } from '@/app/admin/admin_seats_shifts_lockers/seat-matrix/admin_seats_shifts_lockers_components/SeatMatrixClient';

export default function SeatMatrixPage() {
  return <SeatMatrixClient />;
}
