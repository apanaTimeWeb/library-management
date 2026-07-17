// RESPONSIBILITY: Renders the page.tsx component.
import { Suspense } from 'react';
import ManagerStudentsAdmissionForm from '@/app/manager/manager_students/manager_students_components/ManagerStudentsAdmissionForm';

export default function NewAdmissionPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ManagerStudentsAdmissionForm />
    </Suspense>
  );
}

