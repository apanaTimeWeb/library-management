import { Suspense } from 'react';
import AdmissionForm from '@/app/manager/manager_students/manager_students_components/AdmissionForm';

export default function NewAdmissionPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AdmissionForm />
    </Suspense>
  );
}
