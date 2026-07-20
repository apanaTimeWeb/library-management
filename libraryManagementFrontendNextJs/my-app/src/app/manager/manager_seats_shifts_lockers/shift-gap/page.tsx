import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerSeatsShiftGapClient } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_components/ManagerSeatsShiftGapClient';

export default function ShiftGapAnalyzerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerSeatsShiftGapClient />
    </Suspense>
  );
}


