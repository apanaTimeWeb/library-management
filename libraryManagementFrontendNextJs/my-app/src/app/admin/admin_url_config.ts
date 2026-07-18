/**
 * URL Configuration for the Admin Module
 * Contains all internal routes and external API endpoints.
 */

export const ADMIN_ROUTES = {
  PREFIX: '/admin',
  DASHBOARD: '/admin/admin_dashboard',
  REPORTS: '/admin/admin_reports',
  BRANCHES: '/admin/admin_branches',
  STAFF_USERS: '/admin/admin_staff-users',
  PERMISSIONS: '/admin/admin_permissions',
  PLANS: '/admin/admin_plans',
  COUPONS: '/admin/admin_coupons',
  BLACKLIST: '/admin/admin_blacklist',
  AUDIT_LOGS: '/admin/admin_audit-logs',
  EXPENSES: '/admin/admin_expenses',
  STUDENTS: '/admin/admin_students',
  EXPENSE_CATEGORIES: '/admin/admin_expense-categories',
  SETTINGS: '/admin/admin_settings',
  LIBRARIES: '/admin/admin_libraries',
  SUBSCRIPTIONS: '/admin/admin_subscriptions',
  BILLING: '/admin/admin_billing',
  SYSTEM_HEALTH: '/admin/admin_system-health',
  SUPPORT_TICKETS: '/admin/admin_support-tickets',
  // CRM
  CRM_ENQUIRIES: '/admin/admin_crm/enquiries',
  CRM_ENQUIRY_ADD: '/admin/admin_crm/enquiries/add',
  // ACCOUNTING
  ACCOUNTING_ASSETS: '/admin/admin_accounting/assets',
  ACCOUNTING_DAILY_SETTLEMENT: '/admin/admin_accounting/daily-settlement',
  ACCOUNTING_EXPENSES: '/admin/admin_accounting/expenses',
  ACCOUNTING_EXPENSES_ADD: '/admin/admin_accounting/expenses/add',
  ACCOUNTING_FINANCIAL_REPORTS: '/admin/admin_accounting/financial-reports',
  ACCOUNTING_ASSET_MAINTENANCE: '/admin/admin_accounting/asset-maintenance',
  ACCOUNTING_EXPENSE_CATEGORIES: '/admin/admin_accounting/expense-categories',
  ACCOUNTING_SEAT_GAP_REPORT: '/admin/admin_accounting/seat-gap-report',
  ACCOUNTING_SHIFT_GAP_ANALYZER: '/admin/admin_accounting/shift-gap-analyzer',
} as const;

export const ADMIN_API_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  STUDENTS: '/admin/students',
  REPORTS: '/admin/reports',
  BRANCHES: '/admin/branches',
  STAFF_USERS: '/admin/staff-users/users',
  PERMISSIONS: '/admin/permissions',
  SETTINGS: '/admin/settings',
  AUDIT_LOGS: '/admin/audit-logs',
  BLACKLIST: '/admin/blacklist',
  COUPONS: '/admin/coupons',
  PLANS: '/admin/plans',
  EXPENSES: '/admin/expenses',
  EXPENSE_CATEGORIES: '/admin/expense-categories',
  ACCOUNTING_ASSETS: '/admin/accounting/assets',
  ACCOUNTING_DAILY_SETTLEMENT: '/admin/accounting/daily-settlements', // Changed to plural to match backend if any, wait, backend has daily-settlements directory
  ACCOUNTING_EXPENSES: '/admin/accounting/expenses',
  ACCOUNTING_FINANCIAL_REPORTS: '/admin/accounting/financial-reports',
  ACCOUNTING_ASSET_MAINTENANCE: '/admin/accounting/asset-maintenance',
  // CRM
  CRM_ENQUIRIES: '/admin/crm/enquiries', // Wait! The backend crm module mounts at /admin/crm/enquiries or /crm/enquiries?
  CRM_ENQUIRY_BY_ID: (id: string) => `/admin/crm/enquiries/${id}`,
  CRM_ENQUIRY_STATUS: (id: string) => `/admin/crm/enquiries/${id}/status`,
  CRM_ENQUIRY_FOLLOW_UPS: (id: string) => `/admin/crm/enquiries/${id}/follow-ups`,
} as const;

