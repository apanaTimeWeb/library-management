import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-management module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminShiftManagementClient } from '@/app/admin/admin_seats_shifts_lockers/shift-management/admin_seats_shifts_lockers_components/AdminShiftManagementClient';

export default function ShiftManagementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminShiftManagementClient />
    </Suspense>
  );
}
