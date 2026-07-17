import { cookies } from 'next/headers';
import { AdminStaffView } from '@/app/admin/admin_staff-users/admin_staff-users_components/AdminStaffView';
import { fetchAdminStaffUsers } from '@/app/admin/admin_staff-users/admin_staff-users_api/admin_staff-users_api';
import { StaffMember } from '@/app/admin/admin_staff-users/admin_staff-users_hooks/useAdminStaff';

async function getStaffData(): Promise<StaffMember[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminStaffUsers(token);
  if (!response.success || !response.data || response.data.length === 0 || String(response.data[0]?.id).startsWith('MOCK-')) {
    return [
      { id: 'STAFF-001', name: 'Ravi Kumar', email: 'ravi@smartlibrary.com', phone: '9876543210', role: 'Manager', branch: 'Main Branch', status: 'Active', joinedDate: '2025-01-10' },
      { id: 'STAFF-002', name: 'Priya Singh', email: 'priya@smartlibrary.com', phone: '8765432109', role: 'Staff', branch: 'South Branch', status: 'Active', joinedDate: '2025-02-15' }
    ];
  }
  
  return response.data.map((u) => ({
    id: u.id,
    name: u.fullName,
    email: u.email,
    phone: u.phone,
    role: u.role === 'manager' ? 'Manager' : 'Staff',
    branch: u.branchId || 'Main Branch',
    status: u.isActive ? 'Active' : 'Inactive',
    joinedDate: u.joinedDate || new Date().toLocaleDateString()
  }));
}

export default async function AdminStaffUsersPage() {
  const staff = await getStaffData();

  return <AdminStaffView initialStaff={staff} />;
}

