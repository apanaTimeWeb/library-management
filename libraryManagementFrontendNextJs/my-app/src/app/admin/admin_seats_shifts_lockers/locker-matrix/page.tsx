// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers locker-matrix module.
// DATA FLOW: Next.js Router -> Page -> Components

import { LockerMatrixClient } from './admin_seats_shifts_lockers_components/LockerMatrixClient';

export default function LockerMatrixPage() {
  return <LockerMatrixClient />;
}
