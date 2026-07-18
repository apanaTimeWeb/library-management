import { useState, useMemo } from 'react';

export function useSuperadminSystemProfile() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPw, setNewPw] = useState('');
  
  const strength = useMemo(() => {
    let score = 0;
    if (newPw.length >= 8) score++;
    if (/[A-Z]/.test(newPw)) score++;
    if (/[0-9]/.test(newPw)) score++;
    if (/[^A-Za-z0-9]/.test(newPw)) score++;
    const map: Record<number, { label: string; color: string }> = {
      0: { label: 'Very Weak', color: 'bg-danger' },
      1: { label: 'Weak', color: 'bg-danger' },
      2: { label: 'Fair', color: 'bg-tertiary' },
      3: { label: 'Good', color: 'bg-success' },
      4: { label: 'Strong', color: 'bg-success' },
    };
    return { score, ...map[score] };
  }, [newPw]);

  return {
    showCurrent, setShowCurrent,
    showNew, setShowNew,
    showConfirm, setShowConfirm,
    newPw, setNewPw,
    strength
  };
}
