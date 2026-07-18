// RESPONSIBILITY: Centralized URL routing configuration for the Manager CRM module.
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';

export const MANAGER_CRM_URLS = {
  ENQUIRIES: MANAGER_ROUTES.CRM_ENQUIRIES,
  QUICK_CONVERT: (name: string, phone: string) => `${MANAGER_ROUTES.CRM_ENQUIRIES}/convert?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
  ENQUIRY_DETAIL: (id: string | number) => `${MANAGER_ROUTES.CRM_ENQUIRIES}/${id}`,
};
