import { cookies } from 'next/headers';
import { AdminStaffView } from './admin_staff-users_components/AdminStaffView';
import { fetchAdminStaffUsers } from '../admin_api/admin_api';
import { StaffMember } from './admin_staff-users_hooks/useAdminStaff';

async function getStaffData(): Promise<StaffMember[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStaffUsers(token);
  if (!response.success) {
    return [];
  }
  
  const data = response.data || [];
  return data.map((u: any) => ({
    id: u.id,
    name: u.fullName || 'Unknown',
    email: u.email,
    phone: u.phone,
    role: u.role === 'manager' ? 'Manager' : 'Staff',
    branch: 'Main Branch',
    status: u.isActive ? 'Active' : 'Inactive',
    joinedDate: new Date().toLocaleDateString()
  }));
}

export default async function AdminStaffUsersPage() {
  const staff = await getStaffData();

  return <AdminStaffView initialStaff={staff} />;
}
