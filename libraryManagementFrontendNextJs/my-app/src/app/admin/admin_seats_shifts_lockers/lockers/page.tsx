// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers lockers module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminLockersClient } from '@/app/admin/admin_seats_shifts_lockers/lockers/admin_seats_shifts_lockers_components/AdminLockersClient';

export default function LockersPage() {
  return <AdminLockersClient />;
}
