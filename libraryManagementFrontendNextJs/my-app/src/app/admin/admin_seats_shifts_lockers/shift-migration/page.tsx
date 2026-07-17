// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-migration module.
// DATA FLOW: Next.js Router -> Page -> Components

import { ShiftMigrationClient } from './admin_seats_shifts_lockers_components/ShiftMigrationClient';

export default function ShiftMigrationPage() {
  return <ShiftMigrationClient />;
}
