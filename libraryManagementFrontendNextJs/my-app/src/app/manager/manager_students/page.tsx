import { ManagerStudentsClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsClient';
import { ManagerStudentsErrorBoundary } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsErrorBoundary';

// RESPONSIBILITY: Strict Server Component for Manager Students page.

export default function StudentsPage() {
  return (
    <ManagerStudentsErrorBoundary>
      <ManagerStudentsClient />
    </ManagerStudentsErrorBoundary>
  );
}
