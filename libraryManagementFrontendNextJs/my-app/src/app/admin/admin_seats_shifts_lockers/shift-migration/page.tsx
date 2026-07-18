// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-migration module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminShiftMigrationClient } from '@/app/admin/admin_seats_shifts_lockers/shift-migration/admin_seats_shifts_lockers_components/AdminShiftMigrationClient';

export default function ShiftMigrationPage() {
  return <AdminShiftMigrationClient />;
}
