import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerStudentsIdCardClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsIdCardClient';

export default function IdCardGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsIdCardClient />
    </Suspense>
  );
}

