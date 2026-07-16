import React from 'react';
import { SuperadminDashboardClient } from './SuperadminDashboardClient';
import { fetchSuperadminDashboardData } from './superadmin_dashboard_api/SuperadminDashboardApi';

export default async function SuperAdminDashboardPage() {
  const initialData = await fetchSuperadminDashboardData();
  
  return <SuperadminDashboardClient initialData={initialData} />;
}
