import { cookies } from 'next/headers';
import { AdminStudentsView } from '@/app/admin/admin_students/admin_students_components/AdminStudentsView';
import { fetchAdminStudents } from '@/app/admin/admin_students/admin_students_api/admin_students_api';

async function getStudentsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStudents(token);
  if (!response.success || !response.data) {
    return [];
  }
  
  return response.data.map((s) => ({
    id: s.id,
    name: s.fullName,
    shift: 'Morning', // Placeholder until shift logic is handled
    seat: s.seatId || 'N/A',
    plan: s.currentPlanId || 'Monthly',
    status: s.status === 'ACTIVE' ? 'Active' : 'Inactive',
    branch: s.branchId || 'Main Branch'
  }));
}

export default async function AdminStudentsPage() {
  const students = await getStudentsData();

  return <AdminStudentsView initialStudents={students} />;
}
