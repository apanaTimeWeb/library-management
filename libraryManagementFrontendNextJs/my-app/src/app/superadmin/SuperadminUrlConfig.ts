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
  
  // CRM
  CRM_ENQUIRIES: '/superadmin/superadmin_crm/enquiries',
  CRM_ENQUIRIES_ADD: '/superadmin/superadmin_crm/enquiries/add',
  CRM_ENQUIRIES_ID: (id: string) => `/superadmin/superadmin_crm/enquiries/${id}`,

  // Finance
  FINANCE_COLLECT_FEE: '/superadmin/superadmin_finance/collect-fee',
  FINANCE_RECEIPT: '/superadmin/superadmin_finance/receipt',
  FINANCE_RECEIPT_ID: (id: string) => `/superadmin/superadmin_finance/receipt/${id}`,
  FINANCE_INVOICE: '/superadmin/superadmin_finance/invoice',
  FINANCE_INVOICE_ID: (id: string) => `/superadmin/superadmin_finance/invoice/${id}`,

  // Accounting
  ACCOUNTING_EXPENSES: '/superadmin/superadmin_accounting/expenses',
  ACCOUNTING_EXPENSE_CATEGORIES: '/superadmin/superadmin_accounting/expense-categories',

  // Engagement
  ENGAGEMENT_ATTENDANCE: '/superadmin/superadmin_engagement/attendance',
  ENGAGEMENT_ABSENTEE_REPORT: '/superadmin/superadmin_engagement/absentee-report',
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
  BILLING_INVOICES: '/superadmin/billing/invoices',
  BILLING_INVOICES_MARK_PAID: (id: string) => `/superadmin/billing/invoices/${id}/mark-paid`,
  AUDIT_LOGS: '/superadmin/audit-logs',
  ENGAGEMENT: '/superadmin/engagement',
  COMMUNICATION: '/superadmin/communication',
  
  // CRM
  CRM_ENQUIRIES: '/crm/enquiries',
  CRM_ENQUIRIES_STATUS: (id: string) => `/crm/enquiries/${id}/status`,
  CRM_ENQUIRIES_FOLLOW_UPS: (id: string) => `/crm/enquiries/${id}/follow-ups`,
  
  // Communication
  COMMUNICATION_NOTICES: '/communication/notices',
  COMMUNICATION_WHATSAPP_LOGS: '/communication/whatsapp-logs',

  // Seats & Lockers
  SEATS_LOCKERS: '/seats_shifts_lockers/lockers',
  SEATS_SEAT_MATRIX: '/seats_shifts_lockers/seat-matrix',

  // Finance
  FINANCE_REFUNDS: '/finance/refunds',
  FINANCE_REFERRALS: '/finance/referrals',
  FINANCE_PAYMENTS: '/finance/payments',
} as const;

