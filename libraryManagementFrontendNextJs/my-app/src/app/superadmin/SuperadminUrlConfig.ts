// RESPONSIBILITY: Renders or handles logic for SuperadminUrlConfig.ts.
/**
 * URL Configuration for the Superadmin Module
 * Contains all internal routes and external API endpoints.
 */

export const SUPERADMIN_ROUTES = {
  PREFIX: '/superadmin',
  AUTH_LOGIN: '/auth/login',
  STUDENTS: '/superadmin/superadmin_students',
  LIBRARIES: '/superadmin/superadmin_libraries',
  BILLING: '/superadmin/superadmin_billing',
  SUBSCRIPTIONS: '/superadmin/superadmin_subscriptions',
  REPORTS: '/superadmin/superadmin_reports',
  SYSTEM_HEALTH: '/superadmin/superadmin_system-health',
  AUDIT_LOGS: '/superadmin/superadmin_audit-logs',
  DASHBOARD: '/superadmin/superadmin_dashboard',
  SUPPORT_TICKETS: '/superadmin/superadmin_support-tickets',
  SETTINGS: '/superadmin/superadmin_settings',
  SETUP_WIZARD: '/superadmin/superadmin_setup-wizard',
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
  REPORTS: '/superadmin/reports',
  LIBRARIES: '/superadmin/libraries',
  BILLING: '/superadmin/billing',
  BILLING_INVOICES: '/superadmin/billing/invoices',
  BILLING_INVOICES_MARK_PAID: (id: string) => `/superadmin/billing/invoices/${id}/mark-paid`,
  AUDIT_LOGS: '/superadmin/audit-logs',
} as const;
