import { cookies } from 'next/headers';
import { AdminReportsClient } from '@/app/admin/admin_reports/admin_reports_components/AdminReportsClient';
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
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-danger/30 border-t-danger animate-spin" />
        <p className="text-xl font-bold text-primary">Failed to load reports data</p>
        <p className="text-sm text-muted-foreground">Check your backend connection and try again.</p>
      </div>
    );
  }

  return <AdminReportsClient initialData={data as Record<string, Record<string, unknown[]>>} />;
}
