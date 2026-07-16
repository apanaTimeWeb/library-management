import React from 'react';
import { SuperadminSystemHealthClient } from './SuperadminSystemHealthClient';
import { fetchSuperadminSystemHealthData } from './superadmin_system_health_api/SuperadminSystemHealthApi';

export default async function SuperAdminSystemHealthPage() {
  const initialData = await fetchSuperadminSystemHealthData();
  
  return <SuperadminSystemHealthClient initialData={initialData} />;
}
