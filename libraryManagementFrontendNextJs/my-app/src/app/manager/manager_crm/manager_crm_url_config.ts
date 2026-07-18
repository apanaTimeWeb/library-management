// RESPONSIBILITY: Centralized URL routing configuration for the Manager CRM module.
export const MANAGER_CRM_URLS = {
  ENQUIRIES: '/manager/manager_crm/enquiries',
  QUICK_CONVERT: (name: string, phone: string) => `/manager/manager_crm/enquiries/convert?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
};
