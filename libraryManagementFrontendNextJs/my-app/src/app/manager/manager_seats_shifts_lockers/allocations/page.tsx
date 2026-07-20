import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsAllocationsClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsAllocationsClient';

export default function AllocationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerSeatsAllocationsClient />
    </Suspense>
  );
}


