// RESPONSIBILITY: Renders or handles logic for manager_url_config.ts.
export const MANAGER_ROUTES = {
  // Dashboard
  DASHBOARD: '/manager/manager_dashboard',
  
  // CRM
  CRM_ENQUIRIES: '/manager/manager_crm/enquiries',

  // Students
  STUDENTS: '/manager/manager_students',
  STUDENTS_NEW: '/manager/manager_students/new',
  STUDENTS_GROUP: '/manager/manager_students/group',
  STUDENTS_ALUMNI: '/manager/manager_students/alumni',
  STUDENTS_REFERRALS: '/manager/manager_students/referrals',
  STUDENTS_ID_CARD: '/manager/manager_students/id-card',
  
  // Documents
  DOCUMENTS: '/manager/manager_documents',

  // Finance (Blocked)
  FINANCE_COLLECT_FEE: '/manager/manager_finance/collect-fee',
  FINANCE_RENEWALS: '/manager/manager_finance/renewals',
  FINANCE_PAYMENTS: '/manager/manager_finance/payments',
  FINANCE_PAYMENT_PROMISES: '/manager/manager_finance/payment-promises',
  FINANCE_TRUST_SCORE: '/manager/manager_finance/trust-score',
  FINANCE_SECURITY_DEPOSITS: '/manager/manager_finance/security-deposits',
  FINANCE_LATE_FEES: '/manager/manager_finance/late-fees',
  FINANCE_AUTO_SUSPEND: '/manager/manager_finance/auto-suspend',
  FINANCE_INVOICE: '/manager/manager_finance/invoice',
  FINANCE_RECEIPT: '/manager/manager_finance/receipt',
  FINANCE_REFERRALS: '/manager/manager_finance/referrals',
  FINANCE_REFUNDS: '/manager/manager_finance/refunds',

  // Communication
  COMMUNICATION_NOTICES: '/manager/manager_communication/notices',
  COMMUNICATION_COMPLAINTS: '/manager/manager_communication/complaints',
  COMMUNICATION_WHATSAPP_TEMPLATES: '/manager/manager_communication/whatsapp-templates',
  COMMUNICATION_WHATSAPP_LOGS: '/manager/manager_communication/whatsapp-logs',
  COMMUNICATION_NOTIFICATION_CENTER: '/manager/manager_communication/notification-center',

  // Engagement
  ENGAGEMENT_ATTENDANCE: '/manager/manager_engagement/attendance',
  ENGAGEMENT_QR_SCANNER: '/manager/manager_engagement/qr-scanner',
  ENGAGEMENT_ABSENTEE_REPORT: '/manager/manager_engagement/absentee-report',
  ENGAGEMENT_ANALYTICS: '/manager/manager_engagement/analytics',
  ENGAGEMENT_FEEDBACK: '/manager/manager_engagement/feedback',
  ENGAGEMENT_HOLIDAY_CALENDAR: '/manager/manager_engagement/holiday-calendar',

  // Reports
  STUDENT_REPORTS: '/manager/manager_student-reports',

  // Accounting
  ACCOUNTING_EXPENSES: '/manager/manager_accounting/expenses',
  ACCOUNTING_DAILY_SETTLEMENT: '/manager/manager_accounting/daily-settlement',
  ACCOUNTING_SEAT_GAP_REPORT: '/manager/manager_accounting/seat-gap-report',
  ACCOUNTING_ASSETS: '/manager/manager_accounting/assets',
  ACCOUNTING_ASSET_MAINTENANCE: '/manager/manager_accounting/asset-maintenance',

  // Seats & Assets
  SEATS_SHIFTS_LOCKERS: '/manager/manager_seats_shifts_lockers',

  // Plans & Settings
  PLANS: '/manager/manager_plans',

  SETTINGS: '/manager/manager_settings',
  LIBRARIES: '/manager/manager_libraries',
  SUBSCRIPTIONS: '/manager/manager_finance/subscriptions',
  BILLING: '/manager/manager_billing',
  SYSTEM_HEALTH: '/manager/manager_system-health',
  AUDIT_LOGS: '/manager/manager_audit-logs',
  SUPPORT_TICKETS: '/manager/manager_support-tickets',
  REPORTS: '/manager/manager_student-reports',
};

export const MANAGER_API_ROUTES = {
  DASHBOARD: '/manager/manager_dashboard',
  STUDENTS: '/students',
};

