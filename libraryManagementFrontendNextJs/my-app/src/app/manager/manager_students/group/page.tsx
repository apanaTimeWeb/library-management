import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerStudentsGroupClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsGroupClient';

export default function GroupAdmissionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsGroupClient />
    </Suspense>
  );
}

