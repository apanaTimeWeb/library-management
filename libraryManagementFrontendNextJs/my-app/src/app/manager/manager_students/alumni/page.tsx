import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerStudentsAlumniClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsAlumniClient';

export default function AlumniPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsAlumniClient />
    </Suspense>
  );
}

