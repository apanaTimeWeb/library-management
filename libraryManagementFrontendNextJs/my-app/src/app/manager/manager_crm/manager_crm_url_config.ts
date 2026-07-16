// RESPONSIBILITY: Centralized URL configuration for the Manager CRM module (Rule 11).

export const MANAGER_CRM_URLS = {
  HOME: '/manager/manager_crm',
  ENQUIRIES: '/manager/manager_crm/enquiries',
  ADD_ENQUIRY: '/manager/manager_crm/enquiries/add',
  ENQUIRY_DETAIL: (id: string) => `/manager/manager_crm/enquiries/${id}`,
  
  // Quick convert cross-module link
  QUICK_CONVERT: (name: string, phone: string) => 
    `/manager/manager_students/new?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
} as const;
