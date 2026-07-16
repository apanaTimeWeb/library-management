import { cookies } from 'next/headers';
import { AdminSettingsView } from '@/app/admin/admin_settings/admin_settings_components/AdminSettingsView';
import { fetchAdminSettings } from '@/app/admin/admin_settings/admin_settings_api/admin_settings_api';
import { SettingsState } from '@/app/admin/admin_settings/admin_settings_hooks/useAdminSettings';

const FALLBACK_SETTINGS: SettingsState = {
  libraryName: 'Smart Library 360',
  address: '12, MG Road, Pune, Maharashtra 411001',
  contactEmail: 'hello@smartlibrary.com',
  contactPhone: '+91 9876543210',
  gstin: '27AADCB2230M1Z2',
  receiptPrefix: 'REC-',
  taxPercentage: '18',
  termsAndConditions: '1. Fee once paid is not refundable.\n2. ID card is mandatory.',
};

async function getSettingsData(): Promise<SettingsState> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  
  const response = await fetchAdminSettings(token);
  if (!response.success || !response.data) {
    return FALLBACK_SETTINGS;
  }
  
  return {
    ...FALLBACK_SETTINGS,
    ...response.data
  };
}

export default async function AdminSettingsPage() {
  const settings = await getSettingsData();

  return <AdminSettingsView initialSettings={settings} />;
}

