import { cookies } from 'next/headers';
import { AdminBranchesView } from './admin_branches_components/AdminBranchesView';
import { fetchAdminBranches } from '../admin_api/admin_api';
import { Branch } from './admin_branches_hooks/useAdminBranches';

async function getBranchesData(): Promise<Branch[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminBranches(token);
  if (!response.success) {
    return [];
  }
  
  const data = response.data || [];
  return data.map((b: any) => ({
    id: b.id,
    name: b.name,
    address: b.address,
    city: b.city || 'N/A',
    phone: b.contactPhone,
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
