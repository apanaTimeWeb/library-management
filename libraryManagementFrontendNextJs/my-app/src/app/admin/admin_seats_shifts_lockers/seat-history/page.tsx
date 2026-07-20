import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers seat-history module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminSeatHistoryClient } from '@/app/admin/admin_seats_shifts_lockers/seat-history/admin_seats_shifts_lockers_components/AdminSeatHistoryClient';

export default function SeatHistoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSeatHistoryClient />
    </Suspense>
  );
}
