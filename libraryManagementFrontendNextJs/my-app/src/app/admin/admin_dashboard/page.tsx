// RESPONSIBILITY: Renders the Admin Dashboard, fetching data server-side and delegating UI to the Client Component.
// DATA FLOW: Server Fetch -> AdminDashboardPage -> AdminDashboardClient

import { cookies } from 'next/headers';
import { fetchAdminDashboard } from '@/app/admin/admin_dashboard/admin_dashboard_api/admin_dashboard_api';
import { AdminDashboardClient } from '@/app/admin/admin_dashboard/admin_dashboard_components/AdminDashboardClient';

async function getDashboardData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  const response = await fetchAdminDashboard(token);
  
  if (!response.success) {
    return null;
  }
  return response.data;
}

export default async function AdminDashboardPage() {
  const rawData = await getDashboardData();
  
  if (!rawData) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg font-semibold text-muted-foreground">Failed to load dashboard data.</p>
      </div>
    );
  }

  return <AdminDashboardClient initialData={rawData as never} />;
}
