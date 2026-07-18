// RESPONSIBILITY: Renders the useAdminSettings.ts component/hook.
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SettingsState } from "./useAdminSettings_types";

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

