// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers lockers module.
// DATA FLOW: Next.js Router -> Page -> Components

import { LockersClient } from '@/app/admin/admin_seats_shifts_lockers/lockers/admin_seats_shifts_lockers_components/LockersClient';

export default function LockersPage() {
  return <LockersClient />;
}
