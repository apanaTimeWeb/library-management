// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers allocations module.
// DATA FLOW: Next.js Router -> Page -> Components

import { AllocationsClient } from './admin_seats_shifts_lockers_components/AllocationsClient';

export default function AllocationsPage() {
  return <AllocationsClient />;
}
