import { useState, useMemo } from 'react';
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';
import { ABSENTEE_MOCK_DATA } from '@/app/manager/manager_engagement/manager_engagement_constants/ManagerEngagementConstants';

export function useManagerEngagementAbsentee() {
  const [threshold, setThreshold] = useState('3');
  const [shift, setShift]         = useState('All');
  const [rows, setRows]           = useState<AbsenteeRow[]>(ABSENTEE_MOCK_DATA);
  const [toast, setToast]         = useState('');
  const [toastType, setToastType] = useState('');

  const showToast = (msg: string, type = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const thr = threshold === 'all' ? 0 : parseInt(threshold);
      return r.daysAbsent >= thr && (shift === 'All' || r.shift === shift);
    });
  }, [rows, threshold, shift]);

  const critical = useMemo(() => filtered.filter(r => r.daysAbsent >= 7), [filtered]);
  const moderate = useMemo(() => filtered.filter(r => r.daysAbsent >= 3 && r.daysAbsent < 7), [filtered]);

  const notify = (id: string) => {
    setRows(p => p.map(r => r.id === id ? { ...r, notified: true } : r));
    showToast('? Alert sent to parent successfully');
  };

  const notifyAll = () => {
    const targets = filtered.filter(r => !r.notified);
    if (!targets.length) return showToast('All parents already notified', 'info');
    setRows(p => p.map(r => filtered.find(f => f.id === r.id) ? { ...r, notified: true } : r));
    showToast(? Bulk alerts sent to  + targets.length +  parents);
  };

  return {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll
  };
}
