import React from 'react';
import { SuperadminReportsClient } from '@/app/superadmin/superadmin_reports/SuperadminReportsClient';
import { fetchSuperadminReportsData } from '@/app/superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsApi';

export default async function SuperAdminReportsPage() {
  const initialData = await fetchSuperadminReportsData('Last 6 Months');
  
  return <SuperadminReportsClient initialData={initialData} />;
}
