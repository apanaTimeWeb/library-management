// RESPONSIBILITY: Component or Page.
import React from 'react';
import { SuperadminSystemHealthClient } from '@/app/superadmin/superadmin_system-health/SuperadminSystemHealthClient';
import { fetchSuperadminSystemHealthData } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_api/SuperadminSystemHealthApi';

export default async function SuperAdminSystemHealthPage() {
  const response = await fetchSuperadminSystemHealthData();
  
  return <SuperadminSystemHealthClient initialData={response.data!} />;
}
