import { cookies } from 'next/headers';
import { AdminBranchesView } from '@/app/admin/admin_branches/admin_branches_components/AdminBranchesView';
import { fetchAdminBranches } from '@/app/admin/admin_api/admin_api';
import { Branch } from '@/app/admin/admin_branches/admin_branches_hooks/useAdminBranches';

async function getBranchesData(): Promise<Branch[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminBranches(token);
  if (!response.success) {
    return [];
  }
  
  const data = (response.data as Record<string, unknown>[]) || [];
  return data.map((b) => ({
    id: b.id as string,
    name: b.name as string,
    address: b.address as string,
    city: (b.city as string) || 'N/A',
    phone: b.contactPhone as string,
    manager: 'Manager Name',
    students: 0,
    seats: 50,
    status: b.isActive ? 'Active' : 'Inactive',
  }));
}

export default async function AdminBranchesPage() {
  const branches = await getBranchesData();

  return <AdminBranchesView initialBranches={branches} />;
}
