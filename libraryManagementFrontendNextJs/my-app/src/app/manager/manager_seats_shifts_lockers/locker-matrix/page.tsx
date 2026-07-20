import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsLockerMatrixClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsLockerMatrixClient';

export default function LockerMatrixPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerSeatsLockerMatrixClient />
    </Suspense>
  );
}


