import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsLockersClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsLockersClient';

export default function LockersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerSeatsLockersClient />
    </Suspense>
  );
}


