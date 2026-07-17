// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-management module.
// DATA FLOW: Next.js Router -> Page -> Components

import { ShiftManagementClient } from './admin_seats_shifts_lockers_components/ShiftManagementClient';

export default function ShiftManagementPage() {
  return <ShiftManagementClient />;
}
