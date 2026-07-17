import { cookies } from 'next/headers';
import { AdminBranchesView } from '@/app/admin/admin_branches/admin_branches_components/AdminBranchesView';
import { fetchAdminBranches } from '@/app/admin/admin_branches/admin_branches_api/admin_branches_api';
import { Branch } from '@/app/admin/admin_branches/admin_branches_hooks/useAdminBranches';

async function getBranchesData(): Promise<Branch[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminBranches(token);
  if (!response.success) {
    return [];
  }
  
  const data = (response.data as Record<string, unknown>[]) || [];
  if (data.length === 0 || String(data[0]?.id).startsWith('MOCK-')) {
    return [
      { id: 'B-001', name: 'Main Branch', address: '123 Main St', city: 'City Center', phone: '9876543210', manager: 'Amit Kumar', students: 150, seats: 200, status: 'Active' },
      { id: 'B-002', name: 'South Branch', address: '456 South St', city: 'South District', phone: '8765432109', manager: 'Priya Sharma', students: 80, seats: 100, status: 'Active' }
    ];
  }
  return data.map((b) => ({
    id: (b.id || b.branchId || `B-${Math.random().toString(36).substr(2, 5)}`) as string,
    name: (b.name || b.branchName || b.branch || 'Unknown Branch') as string,
    address: (b.address || '123 Branch St') as string,
    city: (b.city || 'N/A') as string,
    phone: (b.contactPhone || b.phone || '9999999999') as string,
    manager: (b.manager || 'Manager Name') as string,
    students: Number(b.students || 0),
    seats: Number(b.seats || 50),
    status: (b.isActive === undefined ? (b.status === 'Active' || b.status === 'Inactive' ? b.status : 'Active') : (b.isActive ? 'Active' : 'Inactive')) as 'Active' | 'Inactive',
  }));
}

export default async function AdminBranchesPage() {
  const branches = await getBranchesData();

  return <AdminBranchesView initialBranches={branches} />;
}

