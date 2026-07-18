// RESPONSIBILITY: Renders the useAdminSystemOffline.ts component/hook.
import { useState, useEffect, useCallback } from 'react';
import { ADMIN_SYSTEM_OFFLINE_FEATURES } from '@/app/admin/admin_system/admin_system_utils/AdminSystemMockData2';

export function useAdminSystemOffline() {
  const [dots, setDots] = useState('');
  const [online, setOnline] = useState(false);
  const [checking, setChecking] = useState(false);

  /* Animated dots */
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 500);
    return () => clearInterval(t);
  }, []);

  /* Watch real connectivity */
  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  /* Auto-redirect when connection is restored */
  useEffect(() => {
    if (!online) return;
    const t = setTimeout(() => { window.location.href = '/admin/admin_dashboard'; }, 1500);
    return () => clearTimeout(t);
  }, [online]);

  const handleRetry = useCallback(() => {
    setChecking(true);
    setTimeout(() => {
      if (navigator.onLine) setOnline(true);
      else setChecking(false);
    }, 1200);
  }, []);

  return {
    dots, online, checking, handleRetry, features: ADMIN_SYSTEM_OFFLINE_FEATURES
  };
}
