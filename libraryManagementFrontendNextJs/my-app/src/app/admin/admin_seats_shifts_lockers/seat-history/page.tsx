// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers seat-history module.
// DATA FLOW: Next.js Router -> Page -> Components

import { SeatHistoryClient } from './admin_seats_shifts_lockers_components/SeatHistoryClient';

export default function SeatHistoryPage() {
  return <SeatHistoryClient />;
}
