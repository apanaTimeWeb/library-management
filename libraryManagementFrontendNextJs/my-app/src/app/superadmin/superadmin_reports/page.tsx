import React from 'react';
import { SuperadminReportsClient } from './SuperadminReportsClient';
import { fetchSuperadminReportsData } from './superadmin_reports_api/SuperadminReportsApi';

export default async function SuperAdminReportsPage() {
  const initialData = await fetchSuperadminReportsData('Last 6 Months');
  
  return <SuperadminReportsClient initialData={initialData} />;
}
