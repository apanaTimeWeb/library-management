// RESPONSIBILITY: Component or Page.
import React from 'react';
import { SuperadminDashboardClient } from '@/app/superadmin/superadmin_dashboard/SuperadminDashboardClient';
import { fetchSuperadminDashboardData } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi';

export default async function SuperAdminDashboardPage() {
  const initialData = await fetchSuperadminDashboardData();
  
  return <SuperadminDashboardClient initialData={initialData.data} />;
}

