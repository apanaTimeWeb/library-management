// RESPONSIBILITY: Renders or handles logic for useSuperadminSystemOffline.ts.
import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';

export function useSuperadminSystemOffline() {
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
    const onOnline  = () => setOnline(true);
    const onOffline = () => setOnline(false);
    
    // Check initial state
    if (typeof navigator !== 'undefined') {
      setOnline(navigator.onLine);
    }
    
    window.addEventListener('online',  onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online',  onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  /* Auto-redirect when connection is restored */
  useEffect(() => {
    if (!online) return;
    const t = setTimeout(() => { window.location.href = SUPERADMIN_ROUTES.DASHBOARD; }, 1500);
    return () => clearTimeout(t);
  }, [online]);

  const handleRetry = () => {
    setChecking(true);
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        setOnline(true);
      } else {
        setChecking(false);
      }
    }, 1200);
  };

  return {
    dots,
    online,
    checking,
    handleRetry
  };
}

