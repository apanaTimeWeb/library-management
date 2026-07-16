import { cookies } from 'next/headers';
import { AdminPermissionsView } from '@/app/admin/admin_permissions/admin_permissions_components/AdminPermissionsView';
import { fetchAdminPermissions } from '@/app/admin/admin_api/admin_api';
import { Permission } from '@/app/admin/admin_permissions/admin_permissions_hooks/useAdminPermissions';
import React from 'react';

// Hardcoded initial fallback if API fails
const INITIAL_PERMISSIONS: Permission[] = [
  {
    module: 'Students',
    actions: [
      { label: 'View Students',    key: 'students.view',   roles: { Manager: true  } },
      { label: 'Add Student',      key: 'students.add',    roles: { Manager: true  } },
      { label: 'Edit Student',     key: 'students.edit',   roles: { Manager: true  } },
      { label: 'Delete Student',   key: 'students.delete', roles: { Manager: false } },
      { label: 'Mark Exit',        key: 'students.exit',   roles: { Manager: true  } },
    ],
  },
  {
    module: 'Finance',
    actions: [
      { label: 'Collect Fee',      key: 'finance.collect', roles: { Manager: true  } },
      { label: 'View Payments',    key: 'finance.view',    roles: { Manager: true  } },
      { label: 'View Profit',      key: 'finance.profit',  roles: { Manager: false } },
      { label: 'Issue Refund',     key: 'finance.refund',  roles: { Manager: false } },
      { label: 'Apply Discount',   key: 'finance.discount',roles: { Manager: true  } },
    ],
  },
  {
    module: 'Attendance',
    actions: [
      { label: 'Mark Attendance',  key: 'attend.mark',     roles: { Manager: true  } },
      { label: 'View Reports',     key: 'attend.report',   roles: { Manager: true  } },
    ],
  },
  {
    module: 'System',
    actions: [
      { label: 'Manage Staff',      key: 'admin.staff',     roles: { Manager: false } },
      { label: 'Manage Plans',      key: 'admin.plans',     roles: { Manager: false } },
      { label: 'View Audit Logs',   key: 'admin.audit',     roles: { Manager: false } },
      { label: 'Blacklist Student', key: 'admin.blacklist', roles: { Manager: false } },
    ],
  },
];

async function getPermissionsData(): Promise<Permission[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminPermissions(token);
  const perms = response.data as Permission[];
  if (!response.success || !perms || perms.length === 0) {
    return INITIAL_PERMISSIONS;
  }
  
  return perms;
}

export default async function AdminPermissionsPage() {
  const perms = await getPermissionsData();

  return <AdminPermissionsView initialPermissions={perms} />;
}
