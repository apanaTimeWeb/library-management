import managerStudentsMock from '@/app/manager/manager_students/hardcoded.json';
import { MOCK_AUDIT_LOGS } from '@/app/admin/admin_audit-logs/admin_audit-logs_constants/admin_audit-logs_constants';
import { MOCK_BLACKLIST } from '@/app/admin/admin_blacklist/admin_blacklist_constants/admin_blacklist_constants';
import { MOCK_COUPONS } from '@/app/admin/admin_coupons/admin_coupons_constants/admin_coupons_constants';
import { MOCK_EXPENSE_CATEGORIES } from '@/app/admin/admin_expense-categories/admin_expense-categories_constants/admin_expense-categories_constants';
import { MOCK_EXPENSES } from '@/app/admin/admin_expenses/admin_expenses_constants/admin_expenses_constants';
import { MOCK_PLANS } from '@/app/admin/admin_plans/admin_plans_constants/admin_plans_constants';
import { MOCK_MANAGER_REPORTS_DATA } from '@/app/manager/manager_reports/manager_reports_constants/ManagerReportsMockData';
import { SUPERADMIN_ASSET_MAINTENANCE_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/asset-maintenance/superadmin_asset_maintenance_constants/SuperadminAssetMaintenanceConstants';
import { SUPERADMIN_ASSETS_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_constants/SuperadminAssetsConstants';
import { SUPERADMIN_DAILY_SETTLEMENT_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_constants/SuperadminDailySettlementConstants';
import { SUPERADMIN_EXPENSE_CATEGORIES_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_constants/SuperadminExpenseCategoriesConstants';
import { SUPERADMIN_EXPENSES_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_constants/SuperadminExpensesConstants';
import { SUPERADMIN_MONTHLY_REPORTS_MOCK } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_constants/SuperadminFinancialReportsConstants';
import { SUPERADMIN_CATEGORY_BREAKDOWN_MOCK } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_constants/SuperadminFinancialReportsConstants';
import { SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/seat-gap-report/superadmin_seat_gap_report_constants/SuperadminSeatGapReportConstants';
import { SUPERADMIN_SHIFT_GAPS_MOCK } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_constants/SuperadminShiftGapAnalyzerConstants';
import { SUPERADMIN_DAY_GAPS_MOCK } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_constants/SuperadminShiftGapAnalyzerConstants';
import { SUPERADMIN_AUDIT_LOGS_MOCK_DATA } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_constants/SuperadminAuditLogsConstants';
import { SUPERADMIN_BILLING_MOCK_INVOICES } from '@/app/superadmin/superadmin_billing/superadmin_billing_constants/SuperadminBillingConstants';
import { SUPERADMIN_DASHBOARD_MOCK_DATA } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';
import { SUPERADMIN_LIBRARIES_MOCK_DATA } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';
import { SUPERADMIN_REPORTS_MOCK_DATA } from '@/app/superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';
import { SUPERADMIN_SUBSCRIPTIONS_MOCK_DATA } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_constants/SuperadminSubscriptionsConstants';
import { SUPERADMIN_SYSTEM_HEALTH_MOCK_DATA } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_constants/SuperadminSystemHealthConstants';
import { CRM_CONSTANTS } from '@/app/superadmin/superadmin_crm/superadmin_crm_constants';


const GENERIC_DASHBOARD_MOCK = {
  kpiData: [
    { label: "Active Users", value: "150", trend: "+5%" },
    { label: "Revenue", value: "₹15,000", trend: "+10%" },
  ],
  seatData: { total: 100, occupied: 80, available: 20 },
  actionItems: [{ title: "Pending Approvals", count: 3, countClass: "text-red-500", href: "#" }],
  recentAdmissions: [],
  recentEnquiries: [],
  kpiCards: [
    { title: 'Total Active Libraries', value: '1,204', icon: 'store', trend: '+12% this month' },
    { title: 'Total Registered Students', value: '45,892', icon: 'groups', trend: '+8% this month' }
  ],
  systemHealth: { uptime: '99.98%' },
  revenueChart: []
};


/**
 * MOCK REGISTRY
 * Maps backend API endpoints to their respective mock data objects.
 * Auto-generated to include all available hardcoded mock constants.
 */
export const mockRegistry: Record<string, any> = {
  '/manager/manager_students': managerStudentsMock.students,
  '/students': managerStudentsMock.students,
  '/admin/students': managerStudentsMock.students,
  '/manager/manager_dashboard': GENERIC_DASHBOARD_MOCK,
  '/admin/dashboard': GENERIC_DASHBOARD_MOCK,
  '/admin/audit-logs': MOCK_AUDIT_LOGS,
  '/admin/blacklist': MOCK_BLACKLIST,
  '/admin/coupons': MOCK_COUPONS,
  '/admin/expense-categories': MOCK_EXPENSE_CATEGORIES,
  '/admin/expenses': MOCK_EXPENSES,
  '/admin/plans': MOCK_PLANS,
  '/admin/manager-reports-data': MOCK_MANAGER_REPORTS_DATA,
  '/superadmin/accounting/asset-maintenance': SUPERADMIN_ASSET_MAINTENANCE_MOCK_DATA,
  '/superadmin/accounting/assets': SUPERADMIN_ASSETS_MOCK_DATA,
  '/superadmin/accounting/daily-settlement': SUPERADMIN_DAILY_SETTLEMENT_MOCK_DATA,
  '/superadmin/accounting/expense-categories': SUPERADMIN_EXPENSE_CATEGORIES_MOCK_DATA,
  '/superadmin/accounting/expenses': SUPERADMIN_EXPENSES_MOCK_DATA,
  '/superadmin/accounting/monthly-reports': SUPERADMIN_MONTHLY_REPORTS_MOCK,
  '/superadmin/accounting/category-breakdown': SUPERADMIN_CATEGORY_BREAKDOWN_MOCK,
  '/superadmin/accounting/seat-gap-report': SUPERADMIN_SEAT_GAP_REPORT_MOCK_DATA,
  '/superadmin/accounting/shift-gaps': SUPERADMIN_SHIFT_GAPS_MOCK,
  '/superadmin/accounting/day-gaps': SUPERADMIN_DAY_GAPS_MOCK,
  '/superadmin/audit-logs': SUPERADMIN_AUDIT_LOGS_MOCK_DATA,
  '/superadmin/accounting/billing-invoices': SUPERADMIN_BILLING_MOCK_INVOICES,
  '/superadmin/dashboard': SUPERADMIN_DASHBOARD_MOCK_DATA,
  '/superadmin/libraries': SUPERADMIN_LIBRARIES_MOCK_DATA,
  '/superadmin/reports': SUPERADMIN_REPORTS_MOCK_DATA,
  '/superadmin/subscriptions': SUPERADMIN_SUBSCRIPTIONS_MOCK_DATA,
  '/superadmin/system-health': SUPERADMIN_SYSTEM_HEALTH_MOCK_DATA,
  
  // CRM Enquiries (Admin, Manager, Superadmin)
  '/crm/enquiries': CRM_CONSTANTS.enquiries,
  '/admin/crm/enquiries': CRM_CONSTANTS.enquiries,
  '/superadmin/crm/enquiries': CRM_CONSTANTS.enquiries,
  
  // Auth
  '/auth/login': {
    token: 'mock-jwt-token-12345',
    user: {
      id: 'mock-user-1',
      name: 'Test Superadmin',
      email: 'superadmin@example.com',
      role: 'superadmin',
      permissions: ['ALL']
    }
  },
  '/auth/me': {
    user: {
      id: 'mock-user-1',
      name: 'Test Superadmin',
      email: 'superadmin@example.com',
      role: 'superadmin',
      permissions: ['ALL']
    }
  },
};
