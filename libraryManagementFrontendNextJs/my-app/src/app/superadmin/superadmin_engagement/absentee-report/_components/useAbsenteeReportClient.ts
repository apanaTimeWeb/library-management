/**
 * RESPONSIBILITY: Logic and state management for AbsenteeReportClient.
 */
import { useState } from 'react';
import { SUPERADMIN_ENGAGEMENT_MOCK_ABSENTEES } from '@superadmin/superadmin_engagement/superadmin_engagement_utils/SuperadminEngagementMockData';
import type { SuperadminEngagementAbsenteeRow as AbsenteeRow } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_types/SuperadminEngagementTypes';

export function useAbsenteeReportClient() {
  const [threshold, setThreshold] = useState('3');
  const [shift, setShift]         = useState('All');
  const [rows, setRows]           = useState<AbsenteeRow[]>(SUPERADMIN_ENGAGEMENT_MOCK_ABSENTEES as AbsenteeRow[]);
  const [toast, setToast]         = useState('');
  const [toastType, setToastType] = useState('');

  const showToast = (msg: string, type = 'success') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = rows.filter(r => {
    const thr = threshold === 'all' ? 0 : parseInt(threshold);
    return r.daysAbsent >= thr && (shift === 'All' || r.shift === shift);
  });

  const critical  = filtered.filter(r => r.daysAbsent >= 7);
  const moderate  = filtered.filter(r => r.daysAbsent >= 3 && r.daysAbsent < 7);

  const notify = (id: string) => {
    setRows(p => p.map(( r ) => r.id === id ? { ...r, notified: true } : r));
    showToast('Alert sent to parent successfully');
  };

  const notifyAll = () => {
    const targets = filtered.filter(r => !r.notified);
    if (!targets.length) return showToast('All parents already notified', 'info');
    setRows(p => p.map(( r ) => filtered.find(f=>f.id===r.id) ? { ...r, notified:true } : r));
    showToast(`Bulk alerts sent to ${targets.length} parents`);
  };

  return {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll,
  };
}
