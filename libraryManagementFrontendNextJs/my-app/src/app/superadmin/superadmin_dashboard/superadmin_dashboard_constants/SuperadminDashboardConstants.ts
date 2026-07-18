import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export const SUPERADMIN_DASHBOARD_RECENT_ACTIVITY = [
  {
    type: 'success',
    title: 'New Library Registered',
    desc: 'StudyNest Patna — Pro Plan',
    time: '2 hours ago',
    href: SUPERADMIN_ROUTES.LIBRARIES,
  },
  {
    type: 'danger',
    title: 'Subscription Overdue',
    desc: 'Scholar Spaces — ₹999 due',
    time: '5 hours ago',
    href: SUPERADMIN_ROUTES.SUBSCRIPTIONS,
  },
  {
    type: 'warning',
    title: 'Support Ticket Opened',
    desc: 'TKT-991 — Payment Gateway Failing',
    time: '1 day ago',
    href: SUPERADMIN_ROUTES.SUPPORT_TICKETS,
  },
  {
    type: 'info',
    title: 'Automated Backup Completed',
    desc: 'DB Snapshot — AWS S3',
    time: '2 days ago',
    href: SUPERADMIN_ROUTES.SYSTEM_HEALTH,
  },
  {
    type: 'success',
    title: 'Plan Renewed',
    desc: 'The Alexandria Modern — Enterprise Annual',
    time: '3 days ago',
    href: SUPERADMIN_ROUTES.BILLING,
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
    { type: 'error', icon: 'credit_card_off', text: '12 Subscriptions Failed Renewal' },
    { type: 'warning', icon: 'cloud_upload', text: 'High Storage Usage (89%)' },
  ],
  recentLibraries: [
    { id: '1', initials: 'SN', name: 'StudyNest', owner: 'Rahul K', students: 120, plan: 'Pro', status: 'active', joinedAt: 'Today' },
    { id: '2', initials: 'SS', name: 'Scholar Space', owner: 'Amit S', students: 45, plan: 'Basic', status: 'setup', joinedAt: 'Yesterday' },
  ],
};
