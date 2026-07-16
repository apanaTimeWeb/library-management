import { cookies } from 'next/headers';
import { AdminStudentsView } from './admin_students_components/AdminStudentsView';
import { fetchAdminStudents } from '../admin_api/admin_api';

async function getStudentsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStudents(token);
  if (!response.success) {
    return [];
  }
  
  // Mapping logic as per the original fetch
  const data = response.data || [];
  return data.map((s: any) => ({
    id: 'STU-' + (s.id ? s.id.substring(0, 4).toUpperCase() : '0000'),
    name: s.fullName || 'Unknown',
    shift: 'Morning',
    seat: 'A-10',
    plan: 'Monthly',
    status: 'Active',
    branch: s.branch || 'Main Branch'
  }));
}

export default async function AdminStudentsPage() {
  const students = await getStudentsData();

  return <AdminStudentsView initialStudents={students} />;
}
