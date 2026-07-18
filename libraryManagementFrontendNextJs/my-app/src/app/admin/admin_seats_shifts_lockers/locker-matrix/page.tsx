// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers locker-matrix module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminLockerMatrixClient } from '@/app/admin/admin_seats_shifts_lockers/locker-matrix/admin_seats_shifts_lockers_components/AdminLockerMatrixClient';

export default function LockerMatrixPage() {
  return <AdminLockerMatrixClient />;
}
