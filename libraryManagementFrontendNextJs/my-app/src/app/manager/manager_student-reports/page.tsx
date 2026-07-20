import { Suspense } from 'react';
// RESPONSIBILITY: Renders the Student Reports page (Server Component).
import { ManagerStudentReportsClient } from '@/app/manager/manager_student-reports/ManagerStudentReportsClient';

export default function StudentReportsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentReportsClient />
    </Suspense>
  );
}
