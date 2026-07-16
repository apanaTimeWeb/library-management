import { cookies } from 'next/headers';
import { AdminStudentsView } from '@/app/admin/admin_students/admin_students_components/AdminStudentsView';
import { fetchAdminStudents } from '@/app/admin/admin_api/admin_api';

async function getStudentsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStudents(token);
  if (!response.success) {
    return [];
  }
  
  // Mapping logic as per the original fetch
  const data = (response.data as Record<string, unknown>[]) || [];
  return data.map((s) => ({
    id: 'STU-' + (s.id ? (s.id as string).substring(0, 4).toUpperCase() : '0000'),
    name: (s.fullName as string) || 'Unknown',
    shift: 'Morning',
    seat: 'A-10',
    plan: 'Monthly',
    status: 'Active',
    branch: (s.branch as string) || 'Main Branch'
  }));
}

export default async function AdminStudentsPage() {
  const students = await getStudentsData();

  return <AdminStudentsView initialStudents={students} />;
}
