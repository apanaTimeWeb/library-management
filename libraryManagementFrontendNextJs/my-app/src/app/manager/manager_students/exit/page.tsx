import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerStudentsExitClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsExitClient';

export default function StudentExitPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsExitClient />
    </Suspense>
  );
}

