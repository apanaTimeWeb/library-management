// RESPONSIBILITY: Centralized URL and API endpoint configuration for the admin module.

export const ADMIN_URL_CONFIG = {
  // Page Routes
  PAGES: {
    DASHBOARD: '/admin',
    STUDENTS: '/admin/students',
    FINANCE: '/admin/finance',
    COMMUNICATION: '/admin/communication',
    SETTINGS: '/admin/system',
  },
  
  // API Routes
  API: {
    DASHBOARD_STATS: '/api/admin/dashboard/stats',
    STUDENTS_LIST: '/api/admin/students',
    FINANCE_INVOICES: '/api/admin/finance/invoices',
    SEATS_MANAGEMENT: '/api/admin/seats',
    // add more endpoints here as backend integration progresses
  }
};
