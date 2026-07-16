export const SUPERADMIN_DASHBOARD_RECENT_ACTIVITY = [
  {
    type: 'success',
    title: 'New Library Registered',
    desc: 'StudyNest Patna — Pro Plan',
    time: '2 hours ago',
    href: '/superadmin/superadmin_libraries',
  },
  {
    type: 'danger',
    title: 'Subscription Overdue',
    desc: 'Scholar Spaces — ₹999 due',
    time: '5 hours ago',
    href: '/superadmin/superadmin_subscriptions',
  },
  {
    type: 'warning',
    title: 'Support Ticket Opened',
    desc: 'TKT-991 — Payment Gateway Failing',
    time: '1 day ago',
    href: '/superadmin/superadmin_support-tickets',
  },
  {
    type: 'info',
    title: 'Automated Backup Completed',
    desc: 'DB Snapshot — AWS S3',
    time: '2 days ago',
    href: '/superadmin/superadmin_system-health',
  },
  {
    type: 'success',
    title: 'Plan Renewed',
    desc: 'The Alexandria Modern — Enterprise Annual',
    time: '3 days ago',
    href: '/superadmin/superadmin_billing',
  },
];

export const SUPERADMIN_DASHBOARD_MOCK_DATA = {
  kpiCards: [
    { title: 'Total Active Libraries', value: '1,204', icon: 'store', trend: '+12% this month' },
    { title: 'Total Registered Students', value: '45,892', icon: 'groups', trend: '+8% this month' },
    { title: 'Monthly Recurring Revenue', value: '₹14.2L', icon: 'currency_rupee', trend: '+5% this month' },
    { title: 'Pending Support Tickets', value: '23', icon: 'pending_actions', alert: '5 High Priority' },
  ],
  systemHealth: {
    uptime: '99.98%',
    activeUsers: 3412,
    apiLatency: '45ms',
    lastBackup: '2 hours ago',
  },
  actionItems: [
    { id: '1', type: 'error', icon: 'credit_card_off', title: '12 Subscriptions Failed Renewal', description: '', actionLabel: '', actionUrl: '' },
    { id: '2', type: 'warning', icon: 'cloud_upload', title: 'High Storage Usage (89%)', description: '', actionLabel: '', actionUrl: '' },
  ],
  recentLibraries: [
    { initials: 'SN', name: 'StudyNest', owner: 'Rahul K', students: 120, plan: 'Pro', status: 'active', joinedAt: 'Today' },
    { initials: 'SS', name: 'Scholar Space', owner: 'Amit S', students: 45, plan: 'Basic', status: 'setup', joinedAt: 'Yesterday' },
  ],
};
