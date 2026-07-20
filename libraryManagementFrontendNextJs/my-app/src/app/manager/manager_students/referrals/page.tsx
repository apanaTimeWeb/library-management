import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerStudentsReferralsClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsReferralsClient';

export default function ReferralsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsReferralsClient />
    </Suspense>
  );
}

