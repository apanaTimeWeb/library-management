// RESPONSIBILITY: Centralized URL and API endpoint configuration for the manager module.
export const MANAGER_URL_CONFIG = {
  PAGES: {
    DASHBOARD: '/manager',
    STUDENTS: '/manager/students',
    COMMUNICATION: '/manager/communication',
    REPORTS: '/manager/reports',
  },
  API: {
    DASHBOARD_STATS: '/api/manager/dashboard/stats',
    STUDENTS_LIST: '/api/manager/students',
  }
};
