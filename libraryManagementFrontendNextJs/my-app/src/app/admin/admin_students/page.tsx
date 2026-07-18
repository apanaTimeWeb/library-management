// RESPONSIBILITY: Renders the page.tsx component/hook.
import { cookies } from 'next/headers';
import { AdminStudentsClient } from '@/app/admin/admin_students/admin_students_components/AdminStudentsClient';
import { fetchAdminStudents } from '@/app/admin/admin_students/admin_students_api/admin_students_api';
import { ADMIN_STUDENTS_MOCK_DATA } from '@/app/admin/admin_students/admin_students_constants/AdminStudentsConstants';
import { type AdminStudentData } from '@/app/admin/admin_students/admin_students_types/admin_students_types';

async function getStudentsData(): Promise<AdminStudentData[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStudents(token);
type ApiStudent = { id?: string; smartId?: string; _id?: string; fullName?: string; name?: string; shift?: string; seatId?: string; seat?: string; currentPlanId?: string; plan?: string; status?: string; branchId?: string; branch?: string; };

  if (!response.success || !response.data || response.data.length === 0 || String(response.data[0]?.id).startsWith('MOCK-')) {
    return ADMIN_STUDENTS_MOCK_DATA.map((s: AdminStudentData) => ({
      id: s.id,
      name: s.name,
      shift: s.shift,
      seat: s.seat,
      plan: s.plan,
      status: s.status,
      branch: s.branch || 'Main Branch'
    }));
  }
  
  return response.data.map((s: ApiStudent) => ({
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

  return <AdminStudentsClient initialStudents={students} />;
}
