import { useState, useEffect, useCallback, useRef } from 'react';

function readToken(token: string) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function useAdminSystemBranding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    libraryName: 'Smart Library 360',
    tagline: 'Your Knowledge Hub',
    primaryColor: '',
    accentColor: '',
  });

  /* Read defaults from system.css tokens on mount */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(f => ({
      ...f,
      primaryColor: readToken('--branding-primary-default'),
      accentColor: readToken('--branding-accent-default'),
    }));
  }, []);

  /* Push user-chosen colors as CSS vars onto the preview container */
  useEffect(() => {
    if (!containerRef.current || !form.primaryColor) return;
    containerRef.current.style.setProperty('--preview-primary', form.primaryColor);
    containerRef.current.style.setProperty('--preview-accent', form.accentColor);
  }, [form.primaryColor, form.accentColor]);

  const handleReset = useCallback(() => {
    setForm(f => ({
      ...f,
      primaryColor: readToken('--branding-primary-default'),
      accentColor: readToken('--branding-accent-default'),
    }));
  }, []);

  return { form, setForm, containerRef, handleReset };
}
