/**
 * URL Configuration for the Superadmin Module
 * Contains all internal routes and external API endpoints.
 */

export const SUPERADMIN_ROUTES = {
  PREFIX: '/superadmin',
  STUDENTS: '/superadmin/superadmin_students',
  LIBRARIES: '/superadmin/superadmin_libraries',
  BILLING: '/superadmin/superadmin_billing',
  SUBSCRIPTIONS: '/superadmin/superadmin_subscriptions',
  REPORTS: '/superadmin/superadmin_reports',
  SYSTEM_HEALTH: '/superadmin/superadmin_system-health',
  CRM_ENQUIRIES: '/superadmin/superadmin_crm/enquiries',
} as const;

export const SUPERADMIN_API_ROUTES = {
  DASHBOARD: '/superadmin/dashboard',
  SYSTEM_HEALTH: '/superadmin/system-health',
  TENANTS: '/superadmin/system/tenants',
  COMPLAINTS: '/superadmin/complaints',
  SUBSCRIPTIONS: '/superadmin/subscriptions',
  PLANS: '/superadmin/plans',
  STUDENTS: '/superadmin/students',
  ROLES: '/superadmin/roles',
  PERMISSIONS: '/superadmin/permissions',
  SETUP_WIZARD: '/superadmin/setup-wizard',
  STUDENT_SLOTS: '/superadmin/student-slots',
  SHIFTS: '/superadmin/shifts',
  SEATS: '/superadmin/seats',
  REPORTS: '/superadmin/reports',
  LIBRARIES: '/superadmin/libraries',
  PAYMENTS: '/superadmin/payments',
  EXPENSES: '/superadmin/expenses',
  BILLING: '/superadmin/billing',
  AUDIT_LOGS: '/superadmin/audit-logs',
} as const;
