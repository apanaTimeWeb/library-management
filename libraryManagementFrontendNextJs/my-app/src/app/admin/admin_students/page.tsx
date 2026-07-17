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
  
  return response.data.map((s: any) => ({
    id: s.id || s.smartId || s._id || `STU-${Math.random().toString(36).substr(2, 5)}`,
    name: s.fullName || s.name || 'Unknown Student',
    shift: s.shift || 'Morning',
    seat: s.seatId || s.seat || 'N/A',
    plan: s.currentPlanId || s.plan || 'Monthly',
    status: (s.status === 'ACTIVE' || s.status === 'Active') ? 'Active' : 'Inactive',
    branch: s.branchId || s.branch || 'Main Branch'
  }));
}

export default async function AdminStudentsPage() {
  const students = await getStudentsData();

  return <AdminStudentsView initialStudents={students} />;
}

