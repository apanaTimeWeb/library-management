import { useState } from 'react';
import toast from 'react-hot-toast';

export interface SettingsState {
  libraryName: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  gstin: string;
  receiptPrefix: string;
  taxPercentage: string;
  termsAndConditions: string;
}

// DATA FLOW: API → useAdminSettings.ts → AdminSettingsComponent
export function useAdminSettings(initialSettings: SettingsState) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SettingsState>(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call to save settings
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully!');
    }, 800);
  };

  return {
    loading,
    form,
    handleChange,
    handleSave,
  };
}

