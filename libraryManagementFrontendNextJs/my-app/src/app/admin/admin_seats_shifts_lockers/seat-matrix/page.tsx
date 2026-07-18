// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers seat-matrix module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminSeatMatrixClient } from '@/app/admin/admin_seats_shifts_lockers/seat-matrix/admin_seats_shifts_lockers_components/AdminSeatMatrixClient';

export default function SeatMatrixPage() {
  return <AdminSeatMatrixClient />;
}
