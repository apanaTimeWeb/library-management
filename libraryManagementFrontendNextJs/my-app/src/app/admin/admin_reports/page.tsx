import { cookies } from 'next/headers';
import { AdminReportsView } from '@/app/admin/admin_reports/admin_reports_components/AdminReportsView';
import { fetchAdminReports } from '@/app/admin/admin_reports/admin_reports_api/admin_reports_api';

async function getReportsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminReports(token);
  if (!response.success) {
    return null;
  }
  return response.data;
}

export default async function AdminReportsPage() {
  const data = await getReportsData();

  if (!data) {
    return <div className="p-8">Failed to load reports data. Check backend connection.</div>;
  }

  return <AdminReportsView initialData={data} />;
}
