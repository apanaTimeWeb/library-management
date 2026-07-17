import { useState, useMemo } from 'react';

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: 'Very Weak', color: 'bg-error' },
    1: { label: 'Weak', color: 'bg-error' },
    2: { label: 'Fair', color: 'bg-tertiary' },
    3: { label: 'Good', color: 'bg-green-500' },
    4: { label: 'Strong', color: 'bg-green-400' },
  };
  return { score, ...map[score] };
}

export function useAdminSystemProfile() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPw, setNewPw] = useState('');
  
  const strength = useMemo(() => getStrength(newPw), [newPw]);

  return {
    showCurrent, setShowCurrent,
    showNew, setShowNew,
    showConfirm, setShowConfirm,
    newPw, setNewPw,
    strength
  };
}
