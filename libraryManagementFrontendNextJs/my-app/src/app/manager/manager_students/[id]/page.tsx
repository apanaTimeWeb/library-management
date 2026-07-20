import { Suspense } from 'react';
// RESPONSIBILITY: Component or Page.
import { ManagerStudentsStudentProfileClient } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsStudentProfileClient';

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerStudentsStudentProfileClient id={id} />
    </Suspense>
  );
}
