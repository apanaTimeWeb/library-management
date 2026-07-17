import { useState, useEffect, useCallback } from 'react';

function readToken(token: string) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function useAdminSystemSettings() {
  const [active, setActive] = useState('branding');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    appName: 'Smart Library 360',
    primaryColor: '',
    secondaryColor: '',
    gracePeriod: 5,
    penaltyPerDay: 50,
    enableLateFees: true,
    daysBefore: 10,
    enableAutoSuspend: true,
    enableAutoRestore: true,
    upiId: 'owner@upi',
    acceptCash: true,
    acceptUpi: true,
    acceptCard: false,
    acceptBank: false,
    apiKey: 'sk_live_********************',
  });

  /* Read color defaults from system.css tokens */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(f => ({
      ...f,
      primaryColor: readToken('--branding-primary-default'),
      secondaryColor: readToken('--branding-accent-default'),
    }));
  }, []);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  return { active, setActive, showApiKey, setShowApiKey, saved, form, setForm, handleSave };
}
