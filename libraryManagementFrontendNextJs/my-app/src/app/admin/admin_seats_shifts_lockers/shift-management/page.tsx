// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-management module.
// DATA FLOW: Next.js Router -> Page -> Components

import { ShiftManagementClient } from '@/app/admin/admin_seats_shifts_lockers/shift-management/admin_seats_shifts_lockers_components/ShiftManagementClient';

export default function ShiftManagementPage() {
  return <ShiftManagementClient />;
}
