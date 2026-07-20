import { Suspense } from 'react';
// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-gap module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminShiftGapAnalyzerClient } from '@/app/admin/admin_seats_shifts_lockers/shift-gap/admin_seats_shifts_lockers_components/AdminShiftGapAnalyzerClient';

export default function ShiftGapAnalyzerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminShiftGapAnalyzerClient />
    </Suspense>
  );
}
