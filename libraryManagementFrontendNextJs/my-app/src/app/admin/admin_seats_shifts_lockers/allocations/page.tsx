// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers allocations module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminAllocationsClient } from '@/app/admin/admin_seats_shifts_lockers/allocations/admin_seats_shifts_lockers_components/AdminAllocationsClient';

export default function AllocationsPage() {
  return <AdminAllocationsClient />;
}
