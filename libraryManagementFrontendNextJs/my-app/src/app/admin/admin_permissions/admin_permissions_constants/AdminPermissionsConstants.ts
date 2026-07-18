// RESPONSIBILITY: Renders the AdminPermissionsConstants.ts component/hook.
export const ADMIN_PERMISSIONS_MOCK_INITIAL = [
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
