import { useState, useEffect, useRef, useCallback } from 'react';

function readToken(token: string) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function useSuperadminSystemBranding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    libraryName: 'Smart Library 360',
    tagline: 'Your Knowledge Hub',
    primaryColor: '',
    accentColor: '',
  });

  useEffect(() => {
    setForm(f => ({
      ...f,
      primaryColor: readToken('--branding-primary-default'),
      accentColor:  readToken('--branding-accent-default'),
    }));
  }, []);

  useEffect(() => {
    if (!containerRef.current || !form.primaryColor) return;
    containerRef.current.style.setProperty('--preview-primary', form.primaryColor);
    containerRef.current.style.setProperty('--preview-accent',  form.accentColor);
  }, [form.primaryColor, form.accentColor]);

  const handleReset = useCallback(() => {
    setForm(f => ({
      ...f,
      primaryColor: readToken('--branding-primary-default'),
      accentColor:  readToken('--branding-accent-default'),
    }));
  }, []);

  return {
    form,
    setForm,
    containerRef,
    handleReset
  };
}
