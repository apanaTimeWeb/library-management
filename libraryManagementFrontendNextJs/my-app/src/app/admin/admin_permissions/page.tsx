import { cookies } from 'next/headers';
import { AdminPermissionsView } from '@/app/admin/admin_permissions/admin_permissions_components/AdminPermissionsView';
import { fetchAdminPermissions } from '@/app/admin/admin_permissions/admin_permissions_api/admin_permissions_api';
import { Permission } from '@/app/admin/admin_permissions/admin_permissions_hooks/useAdminPermissions';
import React from 'react';
import { ADMIN_PERMISSIONS_MOCK_INITIAL } from '@/app/admin/admin_permissions/admin_permissions_constants/AdminPermissionsConstants';

// Hardcoded initial fallback if API fails


async function getPermissionsData(): Promise<Permission[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminPermissions(token);
  const perms = response.data as Permission[];
  if (!response.success || !perms || perms.length === 0) {
    return ADMIN_PERMISSIONS_MOCK_INITIAL as Permission[];
  }
  
  return perms;
}

export default async function AdminPermissionsPage() {
  const perms = await getPermissionsData();

  return <AdminPermissionsView initialPermissions={perms} />;
}

