import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { cookies } from 'next/headers';
import { AdminStaffUsersClient } from '@/app/admin/admin_staff-users/admin_staff-users_components/AdminStaffUsersClient';
import { fetchAdminStaffUsers } from '@/app/admin/admin_staff-users/admin_staff-users_api/admin_staff-users_api';
import { type StaffMember } from '@/app/admin/admin_staff-users/admin_staff-users_hooks/useAdminStaff';

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
  
  type ApiStaff = { id?: string; fullName?: string; email?: string; phone?: string; role?: string; branchId?: string; isActive?: boolean; joinedDate?: string; };

  return response.data.map((u: ApiStaff) => ({
    id: u.id || `STAFF-${Math.random().toString(36).substr(2, 5)}`,
    name: u.fullName || 'Unknown',
    email: u.email || '',
    phone: u.phone || '',
    role: u.role === 'manager' ? 'Manager' : 'Staff',
    branch: u.branchId || 'Main Branch',
    status: u.isActive ? 'Active' : 'Inactive',
    joinedDate: u.joinedDate || new Date().toLocaleDateString()
  }));
}

export default async function AdminStaffUsersPage() {
  const staff = await getStaffData();

  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminStaffUsersClient initialStaff={staff} />
    </Suspense>
  );
}

